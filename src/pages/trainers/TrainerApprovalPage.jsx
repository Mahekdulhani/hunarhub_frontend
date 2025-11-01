import { Box, Button, Card, CardContent, Chip, Divider, Skeleton, Stack, Typography } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useEffect, useState } from 'react'
import api from '../../api/api'
import DashboardLayout from '../../components/DashboardLayout'

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
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" fontWeight={600} color="#333">
              Trainer Approval
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Review and approve trainer applications
            </Typography>
          </Box>

          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <WarningAmberIcon sx={{ fontSize: 20, color: '#f5c563' }} />
              <Typography fontSize={14} fontWeight={600}>
                Pending Approval ({pending.length})
              </Typography>
            </Stack>

            {loading ? (
              <Stack spacing={2}>
                {[1, 2, 3, 4].map((k) => (
                  <Card key={k} sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Skeleton variant="text" width="30%" height={24} />
                      <Skeleton variant="text" width="90%" />
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Stack spacing={2}>
                {pending.map((trainer) => (
                  <Card 
                    key={trainer.id} 
                    sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack 
                          direction={{ xs: 'column', sm: 'row' }} 
                          justifyContent="space-between" 
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          spacing={1}
                        >
                          <Typography fontWeight={600} fontSize={16}>
                            {trainer.name || `${trainer.first_name} ${trainer.last_name}`}
                          </Typography>
                          <Chip 
                            label={trainer.speciality || trainer.category || 'Web Development'} 
                            size="small"
                            sx={{ 
                              bgcolor: '#e0f7f4', 
                              color: '#6fc6a6',
                              fontWeight: 500,
                              fontSize: 12
                            }}
                          />
                        </Stack>

                        <Typography fontSize={14} color="text.secondary">
                          {trainer.bio || trainer.about || 'Experienced full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about teaching modern web development.'}
                        </Typography>

                        <Stack 
                          direction={{ xs: 'column', sm: 'row' }} 
                          justifyContent="space-between"
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          spacing={1}
                        >
                          <Typography fontSize={13} color="text.secondary">
                            <strong>Experience:</strong> {trainer.experienceYears || trainer.experience_years || 8} years
                            &nbsp;&nbsp;•&nbsp;&nbsp;
                            <strong>Email:</strong> {trainer.email}
                          </Typography>
                          
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handle(trainer.id, 'approve')}
                              sx={{
                                bgcolor: '#6fc6a6',
                                textTransform: 'none',
                                fontSize: 13,
                                px: 2.5,
                                '&:hover': { bgcolor: '#5bb591' }
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handle(trainer.id, 'reject')}
                              sx={{
                                bgcolor: '#f3a2a0',
                                textTransform: 'none',
                                fontSize: 13,
                                px: 2.5,
                                '&:hover': { bgcolor: '#e88886' }
                              }}
                            >
                              Decline
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleOutlineIcon sx={{ fontSize: 20, color: '#6fc6a6' }} />
              <Typography fontSize={14} fontWeight={600}>
                Approved Trainers (0)
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </DashboardLayout>
  )
}
