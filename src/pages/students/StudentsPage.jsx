import { Box, Card, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import { useEffect, useMemo, useState } from 'react'
import api from '../../api/api'
import DashboardLayout from '../../components/DashboardLayout'

export default function StudentsPage() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const data = await api.getStudents()
        const list = data?.items || data || []
        if (active) setRows(list)
      } catch (_) {}
    })()
    return () => { active = false }
  }, [])

  const totalStudents = useMemo(() => rows.length, [rows])

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight={600} color="#333">
                Students
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                View all enrolled students and their courses
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <GroupIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography fontSize={14} fontWeight={600}>
                {totalStudents} Total Students
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
                    <TableCell sx={{ fontWeight: 600, fontSize: 13 }}>Enrolled Courses</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: 13 }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell sx={{ fontSize: 14 }}>
                        {student.first_name} {student.last_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: 14, color: 'text.secondary' }}>
                        {student.email}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {(student.courses || []).map((course, idx) => (
                            <Chip
                              key={idx}
                              label={course.title || course}
                              size="small"
                              sx={{
                                bgcolor: '#e0f7f4',
                                color: '#6fc6a6',
                                fontSize: 12,
                                fontWeight: 500,
                                height: 24
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: 14, fontWeight: 600 }}>
                        {(student.courses || []).length}
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
