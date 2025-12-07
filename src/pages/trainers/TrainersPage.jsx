import { Box, Card, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import StarIcon from '@mui/icons-material/Star'
import { useEffect, useMemo, useState } from 'react'
import api from '../../api/api'
import DashboardLayout from '../../components/DashboardLayout'

export default function TrainersPage() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const data = await api.getTrainers()
        const list = data?.items || data || []
        if (active) setRows(list)
      } catch (_) {}
    })()
    return () => { active = false }
  }, [])

  const totalTrainers = useMemo(() => rows.length, [rows])

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight={600} color="#333">
                Trainers
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                View all trainers and their performance
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <GroupIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography fontSize={14} fontWeight={600}>
                {totalTrainers} Total Trainers
              </Typography>
            </Stack>
          </Stack>

          <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#fafafa' }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Expertise</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: 13 }}>Courses</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: 13 }}>Students</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: 13 }}>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {rows
    .map((trainer) => (
                   

                    <TableRow key={trainer.id} hover>
                      <TableCell sx={{ fontSize: 14 }}>
                        {trainer.first_name} {trainer.last_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: 'text.secondary' }}>
                        {trainer.email}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {(trainer.expertise || trainer.skills || ['Web Development']).slice(0, 3).map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: '#f5f5f5',
                                color: 'text.primary',
                                fontSize: 12,
                                fontWeight: 500,
                                height: 24
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: 14, fontWeight: 600 }}>
                        {trainer.coursesCount || (trainer.courses || []).length || 0}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: 14, fontWeight: 600 }}>
                        {trainer.studentsCount || 0}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end">
                          <StarIcon sx={{ fontSize: 16, color: '#f5c563' }} />
                          <Typography fontSize={14} fontWeight={600}>
                            {trainer.rating || '4.8'}
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      </Box>
    </DashboardLayout>
  )
}
