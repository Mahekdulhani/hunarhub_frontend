import { Box, Chip, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import api from '../../api/api'

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
    <Box sx={{ bgcolor: '#f5f0ec', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <div>
            <Typography variant="h6">Students</Typography>
            <Typography color="text.secondary">View all enrolled students and their courses</Typography>
          </div>
          <Chip icon={null} label={`${totalStudents} Total Students`} />
        </Stack>

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Enrolled Courses</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>{s.first_name + ' ' + s.last_name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {(s.courses || []).map((c) => (
                        <Chip key={c.id || c} label={c.title || c} size="small" color="success" variant="outlined" />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{(s.courses || []).length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}


