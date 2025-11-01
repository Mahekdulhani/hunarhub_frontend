import { Box, Button, Card, CardContent, Chip, Container, Divider, Skeleton, Stack, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import { useEffect, useState } from 'react'
import api from '../../api/api'

export default function TrainerApprovalPage() {
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getPendingTrainers()
      setPending(data?.items || data || [])
    } catch (_) {
      setPending([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handle = async (id, action) => {
    try {
      if (action === 'approve') await api.approveTrainer(id)
      else await api.rejectTrainer(id)
      setPending((list) => list.filter((t) => t.id !== id))
    } catch (e) {
      // optionally show snackbar
    }
  }

  return (
    <Box sx={{ bgcolor: '#f5f0ec', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>Trainer Approval</Typography>
          <Typography color="text.secondary">Review and approve trainer applications</Typography>
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip icon={<ScheduleOutlinedIcon />} color="warning" label={`Pending Approval (${pending.length})`} sx={{ borderRadius: 2 }} />
            <Button size="small" onClick={load} disabled={loading}>Refresh</Button>
          </Stack>

          {loading ? (
            <Stack spacing={1}>
              {[1,2,3,4].map((k) => (
                <Card key={k} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Skeleton variant="text" width="30%" height={24} />
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            pending.map((t) => (
              <Card key={t.id} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
                    <Stack spacing={1}>
                      <Typography fontWeight={700}>{t.name}</Typography>
                      <Typography color="text.secondary" sx={{ maxWidth: 980 }}>{t.bio || t.about}</Typography>
                      <Typography color="text.secondary" fontSize={13}>Experience: {t.experienceYears ?? '-'} years&nbsp;&nbsp; Email: {t.email}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                      <Chip size="small" label={t.speciality || t.category || 'General'} sx={{ borderRadius: 2 }} />
                      <Button variant="contained" color="success" size="small" startIcon={<CheckCircleOutlineIcon />} onClick={() => handle(t.id, 'approve')} sx={{ textTransform: 'none', borderRadius: 999 }}>Approve</Button>
                      <Button variant="contained" color="error" size="small" startIcon={<CancelOutlinedIcon />} onClick={() => handle(t.id, 'reject')} sx={{ textTransform: 'none', borderRadius: 999 }}>Decline</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}

          <Divider sx={{ my: 1 }} />
          <Chip icon={<VerifiedOutlinedIcon />} color="success" variant="outlined" label={`Approved Trainers (0)`} sx={{ borderRadius: 2, alignSelf: 'flex-start' }} />
        </Stack>
      </Container>
    </Box>
  )
}


