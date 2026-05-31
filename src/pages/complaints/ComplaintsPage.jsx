import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Alert,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import CloseIcon from '@mui/icons-material/Close'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useEffect, useMemo, useState } from 'react'
import api from '../../api/api'
import DashboardLayout from '../../components/DashboardLayout'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:     { label: 'Pending',     color: 'warning' },
  resolved:    { label: 'Resolved',    color: 'success' },
  in_progress: { label: 'In Progress', color: 'info' },
  rejected:    { label: 'Rejected',    color: 'error' },
}

const PRIORITY_CONFIG = {
  high:   { label: 'High',   sx: { bgcolor: '#fee2e2', color: '#dc2626' } },
  medium: { label: 'Medium', sx: { bgcolor: '#fef9c3', color: '#ca8a04' } },
  low:    { label: 'Low',    sx: { bgcolor: '#dcfce7', color: '#16a34a' } },
}

function StatusChip({ status }) {
  const cfg = STATUS_CONFIG[status?.toLowerCase()] || { label: status || 'Unknown', color: 'default' }
  return <Chip label={cfg.label} color={cfg.color} size="small" sx={{ fontWeight: 600, fontSize: 11 }} />
}

function PriorityChip({ priority }) {
  const cfg = PRIORITY_CONFIG[priority?.toLowerCase()] || { label: priority || '—', sx: {} }
  return <Chip label={cfg.label} size="small" sx={{ fontWeight: 600, fontSize: 11, ...cfg.sx }} />
}

function TypeChip({ type }) {
  return (
    <Chip
      label={type || '—'}
      size="small"
      sx={{ bgcolor: '#f3f4f6', color: '#374151', fontWeight: 500, fontSize: 11, maxWidth: 130 }}
    />
  )
}

// ─── Skeleton rows ────────────────────────────────────────────────────────────
function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: 8 }).map((__, j) => (
        <TableCell key={j}><Skeleton width={j === 0 ? 24 : 100} /></TableCell>
      ))}
    </TableRow>
  ))
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, iconColor, value, label }) {
  return (
    <Card sx={{ flex: 1, minWidth: 130, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
      <CardContent sx={{ py: 2, px: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: iconBg, width: 44, height: 44, color: iconColor }}>{icon}</Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700} lineHeight={1.2}>{value}</Typography>
            <Typography fontSize={12} color="text.secondary">{label}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// ─── Detail / Respond drawer ──────────────────────────────────────────────────
function DetailPanel({ item, onClose, onRespond }) {
  const [responseText, setResponseText] = useState(item?.admin_response || '')
  const [status, setStatus] = useState(item?.status || 'pending')
  const [submitting, setSubmitting] = useState(false)

  // Reset when item changes
  useEffect(() => {
    setResponseText(item?.admin_response || '')
    setStatus(item?.status || 'pending')
  }, [item])

  if (!item) return null

  const handleSubmit = async () => {
    setSubmitting(true)
    await onRespond(item.id, responseText, status)
    setSubmitting(false)
  }

  return (
    <Card sx={{ width: 320, flexShrink: 0, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', height: 'fit-content', position: 'sticky', top: 24 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography fontWeight={600} fontSize={15}>Complaint Details</Typography>
          <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
        </Stack>

        {/* User info */}
        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: '#6fc6a6', width: 36, height: 36, fontSize: 14, fontWeight: 700 }}>
            {(item.first_name || item.student_name || 'U').charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography fontWeight={600} fontSize={13}>
              {item.first_name ? `${item.first_name} ${item.last_name || ''}` : item.student_name || '—'}
            </Typography>
            <Typography fontSize={11} color="text.secondary">{item.email || ''}</Typography>
          </Box>
          <Typography fontSize={11} color="text.secondary" sx={{ ml: 'auto', whiteSpace: 'nowrap' }}>
            {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
            <br />
            {item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1.5} mb={2}>
          <Row label="Course" value={item.course_title || item.course || '—'} />
          <Row label="Problem Type" value={<TypeChip type={item.problem_type || item.complaint_type || item.type} />} />
          <Row label="Title" value={item.title || '—'} />
          <Row label="Description" value={item.description || item.message || '—'} multiline />
          <Row label="Priority" value={<PriorityChip priority={item.priority} />} />
          <Row label="Status" value={<StatusChip status={item.status} />} />
        </Stack>

        {/* Existing response */}
        {item.admin_response && (
          <Box sx={{ bgcolor: '#f9fafb', borderRadius: 2, p: 1.5, mb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography fontWeight={600} fontSize={13}>Admin Response</Typography>
              <Chip label="Resolved" color="success" size="small" sx={{ fontSize: 10 }} />
            </Stack>
            <Typography fontSize={12} color="text.secondary" mb={1}>{item.admin_response}</Typography>
            {item.responded_by && (
              <Typography fontSize={11} color="text.secondary">Responded By: {item.responded_by}</Typography>
            )}
            {item.responded_at && (
              <Typography fontSize={11} color="text.secondary">
                Responded On: {new Date(item.responded_at).toLocaleString()}
              </Typography>
            )}
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Response form */}
        <Typography fontWeight={600} fontSize={13} mb={1.5}>Add / Update Response</Typography>

        <Typography fontSize={12} fontWeight={500} mb={0.5}>Status</Typography>
        <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <Typography fontSize={12} fontWeight={500} mb={0.5}>Admin Response <span style={{ color: '#ef4444' }}>*</span></Typography>
        <TextField
          multiline
          rows={3}
          fullWidth
          size="small"
          placeholder="Issue has been fixed successfully"
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" fullWidth onClick={onClose} sx={{ textTransform: 'none', borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            disabled={submitting || !responseText.trim()}
            onClick={handleSubmit}
            sx={{ textTransform: 'none', borderRadius: 2, bgcolor: '#6fc6a6', '&:hover': { bgcolor: '#5bb591' } }}
          >
            {submitting ? 'Submitting…' : 'Submit Response'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

function Row({ label, value, multiline }) {
  return (
    <Stack direction={multiline ? 'column' : 'row'} spacing={multiline ? 0.3 : 1} alignItems={multiline ? 'flex-start' : 'center'}>
      <Typography fontSize={12} color="text.secondary" sx={{ minWidth: 90, flexShrink: 0 }}>{label}</Typography>
      {typeof value === 'string' ? (
        <Typography fontSize={13} fontWeight={500}>{value}</Typography>
      ) : value}
    </Stack>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const PAGE_SIZE = 5

  const load = async () => {
    setLoading(true)
    try {
      const res = await api.getAllComplaints()
      const list = res?.complaints || res?.data || res || []
      setComplaints(Array.isArray(list) ? list : [])
    } catch (_) {
      setComplaints([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // Stats
  const stats = useMemo(() => ({
    total: complaints.length,
    pending: complaints.filter((c) => c.status?.toLowerCase() === 'pending').length,
    resolved: complaints.filter((c) => c.status?.toLowerCase() === 'resolved').length,
    inProgress: complaints.filter((c) => c.status?.toLowerCase() === 'in_progress').length,
  }), [complaints])

  // Filtered
  const filtered = useMemo(() => {
    let list = complaints
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (c) =>
          `${c.first_name || ''} ${c.last_name || ''}`.toLowerCase().includes(q) ||
          (c.student_name || '').toLowerCase().includes(q) ||
          (c.title || '').toLowerCase().includes(q) ||
          (c.description || c.message || '').toLowerCase().includes(q) ||
          (c.complaint_type || c.problem_type || c.type || '').toLowerCase().includes(q),
      )
    }
    if (statusFilter !== 'all') {
      list = list.filter((c) => c.status?.toLowerCase() === statusFilter)
    }
    return list
  }, [complaints, search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleRespond = async (id, adminResponse, status) => {
    try {
      await api.respondToComplaint(id, adminResponse, status)
      // Update locally
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, admin_response: adminResponse, status, responded_at: new Date().toISOString() }
            : c,
        ),
      )
      if (selected?.id === id) {
        setSelected((prev) => ({ ...prev, admin_response: adminResponse, status, responded_at: new Date().toISOString() }))
      }
      setSnackbar({ open: true, message: 'Response submitted successfully', severity: 'success' })
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to submit response', severity: 'error' })
    }
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h5" fontWeight={600} color="#333">Complaint Management</Typography>
            <Typography fontSize={14} color="text.secondary">Review and respond to student complaints</Typography>
          </Box>

          {/* Stats */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" useFlexGap>
            <StatCard icon={<WarningAmberIcon />} iconBg="#fff7ed" iconColor="#f59e0b"
              value={loading ? '—' : stats.total} label="Total Complaints" />
            <StatCard icon={<AccessTimeIcon />} iconBg="#fef9c3" iconColor="#ca8a04"
              value={loading ? '—' : stats.pending} label="Pending" />
            <StatCard icon={<CheckCircleOutlineIcon />} iconBg="#ecfdf5" iconColor="#10b981"
              value={loading ? '—' : stats.resolved} label="Resolved" />
            <StatCard icon={<MoreHorizIcon />} iconBg="#eff6ff" iconColor="#3b82f6"
              value={loading ? '—' : stats.inProgress} label="In Progress" />
          </Stack>

          {/* Table + Detail panel */}
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="flex-start">
            {/* Table card */}
            <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', minWidth: 0 }}>
              <CardContent sx={{ p: 0 }}>
                {/* Toolbar */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'stretch', sm: 'center' }}
                  spacing={1.5}
                  sx={{ px: 2.5, pt: 2.5, pb: 2 }}
                >
                  <Typography fontWeight={600} fontSize={15}>All Complaints</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <TextField
                      size="small"
                      placeholder="Search complaints..."
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ width: 200 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 130 }}>
                      <Select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}>
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in_progress">In Progress</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: 1.5 }}>
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#fafafa' }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13, width: 40 }}>#</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Student</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Course</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Problem Type</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Title</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Priority</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }} align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableSkeleton />
                      ) : paginated.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                            <Stack alignItems="center" spacing={1}>
                              <WarningAmberIcon sx={{ fontSize: 40, color: '#ccc' }} />
                              <Typography color="text.secondary" fontSize={14}>No complaints found</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginated.map((item, idx) => (
                          <TableRow
                            key={item.id || idx}
                            hover
                            sx={{ cursor: 'pointer', bgcolor: selected?.id === item.id ? 'rgba(111,198,166,0.06)' : 'inherit' }}
                            onClick={() => setSelected(item)}
                          >
                            <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>
                              {(page - 1) * PAGE_SIZE + idx + 1}
                            </TableCell>
                            <TableCell>
                              <Typography fontSize={13} fontWeight={600}>
                                {item.first_name ? `${item.first_name} ${item.last_name || ''}` : item.student_name || '—'}
                              </Typography>
                              <Typography fontSize={11} color="text.secondary">{item.email || ''}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography fontSize={13} noWrap sx={{ maxWidth: 140 }}>
                                {item.course_title || item.course || '—'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <TypeChip type={item.problem_type || item.complaint_type || item.type} />
                            </TableCell>
                            <TableCell>
                              <Typography fontSize={13} noWrap sx={{ maxWidth: 120 }}>
                                {item.title || '—'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <PriorityChip priority={item.priority} />
                            </TableCell>
                            <TableCell>
                              <StatusChip status={item.status} />
                            </TableCell>
                            <TableCell sx={{ fontSize: 12, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                              {item.created_at
                                ? new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                                : '—'}
                              <br />
                              <span style={{ fontSize: 11 }}>
                                {item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton size="small" onClick={(e) => { e.stopPropagation(); setSelected(item) }}>
                                <VisibilityOutlinedIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                {!loading && filtered.length > 0 && (
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2.5, py: 2 }}>
                    <Typography fontSize={13} color="text.secondary">
                      Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} complaints
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      <IconButton size="small" disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                        sx={{ border: '1px solid #e0e0e0', borderRadius: 1, width: 28, height: 28, fontSize: 13 }}>‹</IconButton>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Box
                          key={p}
                          onClick={() => setPage(p)}
                          sx={{
                            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderRadius: 1, cursor: 'pointer', fontSize: 13, fontWeight: p === page ? 600 : 400,
                            bgcolor: p === page ? '#6fc6a6' : 'transparent',
                            color: p === page ? '#fff' : 'text.primary',
                            border: '1px solid', borderColor: p === page ? '#6fc6a6' : '#e0e0e0',
                          }}
                        >{p}</Box>
                      ))}
                      <IconButton size="small" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
                        sx={{ border: '1px solid #e0e0e0', borderRadius: 1, width: 28, height: 28, fontSize: 13 }}>›</IconButton>
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </Card>

            {/* Detail / respond panel */}
            {selected && (
              <DetailPanel
                item={selected}
                onClose={() => setSelected(null)}
                onRespond={handleRespond}
              />
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Success / error snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  )
}
