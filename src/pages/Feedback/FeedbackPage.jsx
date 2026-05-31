import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Rating,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import CloseIcon from '@mui/icons-material/Close'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
import StarIcon from '@mui/icons-material/Star'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import TextField from '@mui/material/TextField'
import { useEffect, useMemo, useState } from 'react'
import api from '../../api/api'
import DashboardLayout from '../../components/DashboardLayout'

// ─── Skeleton rows ────────────────────────────────────────────────────────────
function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell><Skeleton width={24} /></TableCell>
      <TableCell><Skeleton width={160} /></TableCell>
      <TableCell><Skeleton width={120} /></TableCell>
      <TableCell><Skeleton width={80} /></TableCell>
      <TableCell><Skeleton width={200} /></TableCell>
      <TableCell><Skeleton width={90} /></TableCell>
      <TableCell><Skeleton width={36} /></TableCell>
    </TableRow>
  ))
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, iconColor, value, label }) {
  return (
    <Card sx={{ flex: 1, minWidth: 140, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
      <CardContent sx={{ py: 2, px: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: iconBg, width: 44, height: 44, color: iconColor }}>
            {icon}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700} lineHeight={1.2}>{value}</Typography>
            <Typography fontSize={12} color="text.secondary">{label}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ item, onClose }) {
  if (!item) return null
  return (
    <Card sx={{ width: 300, flexShrink: 0, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', height: 'fit-content', position: 'sticky', top: 24 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography fontWeight={600} fontSize={15}>Feedback Details</Typography>
          <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
        </Stack>

        {/* Course thumbnail placeholder */}
        <Box sx={{ width: '100%', height: 90, borderRadius: 2, bgcolor: '#e0f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <FeedbackOutlinedIcon sx={{ color: '#6fc6a6', fontSize: 36 }} />
        </Box>

        <Typography fontWeight={600} fontSize={14} mb={0.3}>{item.course_title || '—'}</Typography>
        <Typography fontSize={12} color="text.secondary" mb={1.5}>
          {item.first_name} {item.last_name} ({item.email || 'student'})
        </Typography>
        <Typography fontSize={12} color="text.secondary" mb={2}>
          {item.created_at ? new Date(item.created_at).toLocaleString() : '—'}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography fontWeight={600} fontSize={13} mb={0.5}>Rating</Typography>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Rating value={Number(item.rating) || 0} readOnly precision={0.5} size="small" />
          <Typography fontWeight={700} fontSize={14}>{item.rating}</Typography>
        </Stack>

        <Typography fontWeight={600} fontSize={13} mb={0.5}>Review</Typography>
        <Typography fontSize={13} color="text.secondary" lineHeight={1.7}>
          {item.message || item.review || '—'}
        </Typography>
      </CardContent>
    </Card>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 5

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await api.getAllFeedback()
        const list = res?.feedback || res?.data || res || []
        setFeedbacks(Array.isArray(list) ? list : [])
      } catch (_) {
        setFeedbacks([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Derived stats
  const avgRating = useMemo(() => {
    if (!feedbacks.length) return '0.0'
    return (feedbacks.reduce((s, f) => s + Number(f.rating || 0), 0) / feedbacks.length).toFixed(1)
  }, [feedbacks])

  const fiveStarCount = useMemo(() => feedbacks.filter((f) => Number(f.rating) === 5).length, [feedbacks])

  // Unique courses for filter
  const courses = useMemo(() => {
    const titles = [...new Set(feedbacks.map((f) => f.course_title).filter(Boolean))]
    return titles
  }, [feedbacks])

  // Filtered list
  const filtered = useMemo(() => {
    let list = feedbacks
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (f) =>
          `${f.first_name} ${f.last_name}`.toLowerCase().includes(q) ||
          (f.course_title || '').toLowerCase().includes(q) ||
          (f.message || f.review || '').toLowerCase().includes(q),
      )
    }
    if (ratingFilter !== 'all') {
      list = list.filter((f) => Math.floor(Number(f.rating)) === Number(ratingFilter))
    }
    if (courseFilter !== 'all') {
      list = list.filter((f) => f.course_title === courseFilter)
    }
    return list
  }, [feedbacks, search, ratingFilter, courseFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h5" fontWeight={600} color="#333">Feedback Management</Typography>
            <Typography fontSize={14} color="text.secondary">Monitor and manage student feedback and reviews</Typography>
          </Box>

          {/* Stats */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" useFlexGap>
            <StatCard
              icon={<FeedbackOutlinedIcon />}
              iconBg="#eef2ff"
              iconColor="#6366f1"
              value={loading ? '—' : feedbacks.length}
              label="Total Feedback"
            />
            <StatCard
              icon={<StarIcon />}
              iconBg="#fff7ed"
              iconColor="#f59e0b"
              value={loading ? '—' : avgRating}
              label="Average Rating"
            />
            <StatCard
              icon={<StarIcon />}
              iconBg="#ecfdf5"
              iconColor="#10b981"
              value={loading ? '—' : fiveStarCount}
              label="5 Star Reviews"
            />
            <StatCard
              icon={<ThumbUpAltOutlinedIcon />}
              iconBg="#fdf4ff"
              iconColor="#a855f7"
              value={loading ? '—' : feedbacks.filter((f) => Number(f.rating) >= 4).length}
              label="Positive Reviews"
            />
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
                  <Typography fontWeight={600} fontSize={15}>All Course Feedback</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <TextField
                      size="small"
                      placeholder="Search feedback..."
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
                      <Select value={courseFilter} onChange={(e) => { setCourseFilter(e.target.value); setPage(1) }}>
                        <MenuItem value="all">All Courses</MenuItem>
                        {courses.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select value={ratingFilter} onChange={(e) => { setRatingFilter(e.target.value); setPage(1) }}>
                        <MenuItem value="all">All Ratings</MenuItem>
                        {[5, 4, 3, 2, 1].map((r) => (
                          <MenuItem key={r} value={r}>{r} Stars</MenuItem>
                        ))}
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
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Course</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Student</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Rating</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Review</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 13 }} align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableSkeleton />
                      ) : paginated.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                            <Stack alignItems="center" spacing={1}>
                              <FeedbackOutlinedIcon sx={{ fontSize: 40, color: '#ccc' }} />
                              <Typography color="text.secondary" fontSize={14}>No feedback found</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginated.map((item, idx) => (
                          <TableRow key={item.id || idx} hover sx={{ cursor: 'pointer' }} onClick={() => setSelected(item)}>
                            <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>
                              {(page - 1) * PAGE_SIZE + idx + 1}
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={1.5} alignItems="center">
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#e0f7f4', color: '#6fc6a6', fontSize: 13, fontWeight: 700 }}>
                                  {(item.course_title || 'C').charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography fontSize={13} fontWeight={600} noWrap sx={{ maxWidth: 160 }}>
                                    {item.course_title || '—'}
                                  </Typography>
                                  <Typography fontSize={11} color="text.secondary">
                                    {item.lesson_title || ''}
                                  </Typography>
                                </Box>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Typography fontSize={13} fontWeight={600}>
                                {item.first_name} {item.last_name}
                              </Typography>
                              <Typography fontSize={11} color="text.secondary">{item.email || ''}</Typography>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <Rating value={Number(item.rating) || 0} readOnly precision={0.5} size="small" />
                                <Typography fontSize={13} fontWeight={600}>{item.rating}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Typography fontSize={13} color="text.secondary" sx={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.message || item.review || '—'}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                              {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
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
                      Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} feedback
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

            {/* Detail panel */}
            {selected && <DetailPanel item={selected} onClose={() => setSelected(null)} />}
          </Stack>
        </Stack>
      </Box>
    </DashboardLayout>
  )
}
