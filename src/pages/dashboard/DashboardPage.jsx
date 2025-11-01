import { Avatar, Box, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/api'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const data = await api.getDashboard()
        if (active) setStats(data)
      } catch (_) {}
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f0ec', minHeight: '100vh' }}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6" fontWeight={700}>Dashboard</Typography>
          <Typography color="text.secondary">Welcome to HunarHub Admin Panel{user?.name ? `, ${user.name}` : ''}</Typography>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}><StatCard title="Total Students" value={stats?.totalStudents ?? '-'} color="#5a8f7b" icon={<PeopleOutlineIcon fontSize="small" />} /></Grid>
          <Grid item xs={12} md={3}><StatCard title="Total Trainers" value={stats?.totalTrainers ?? '-'} color="#f8d9d4" icon={<MailOutlineIcon fontSize="small" />} /></Grid>
          <Grid item xs={12} md={3}><StatCard title="Active Courses" value={stats?.activeCourses ?? '-'} color="#e6f0ff" icon={<SchoolOutlinedIcon fontSize="small" />} /></Grid>
          <Grid item xs={12} md={3}><StatCard title="Pending Approvals" value={stats?.pendingApprovals ?? '-'} color="#fff3d6" icon={<PendingActionsOutlinedIcon fontSize="small" />} /></Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700}>Recent Activity</Typography>
                <List sx={{ mt: 1, py: 0 }}>
                  {[
                    { text: 'New student enrolled in Web Development Fundamentals', sub: '2 hours ago', color: '#4caf50' },
                    { text: 'Course pending approval: Data Science with Python', sub: '5 hours ago', color: '#ff9800' },
                    { text: 'New trainer registered: Emily Rodriguez', sub: '1 day ago', color: '#2196f3' },
                    { text: 'Course completed: Graphic Design Essentials', sub: '2 days ago', color: '#673ab7' },
                  ].map((item, idx) => (
                    <ListItem key={idx} disableGutters sx={{ py: 1.2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: item.color, width: 10, height: 10 }} />
                      </ListItemAvatar>
                      <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary={item.text} secondary={item.sub} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700}>Popular Courses</Typography>
                <List sx={{ mt: 1, py: 0 }}>
                  {[
                    { title: 'Web Development Fundamentals', students: 45, rating: 4.8 },
                    { title: 'Graphic Design Essentials', students: 52, rating: 4.9 },
                    { title: 'Digital Marketing Mastery', students: 38, rating: 4.6 },
                    { title: 'Data Science with Python', students: 31, rating: 4.7 },
                  ].map((c, idx) => (
                    <ListItem key={idx} disableGutters sx={{ py: 1.2 }} secondaryAction={<RatingPill value={c.rating} />}> 
                      <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary={c.title} secondary={`${c.students} students enrolled`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

function StatCard({ title, value, color, icon }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ position: 'relative', minHeight: 96 }}>
        <Typography color="text.secondary" fontSize={13}>{title}</Typography>
        <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>{value}</Typography>
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: color || '#eef2f7', color: '#2c2c2c' }}>{icon}</Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}

function RatingPill({ value }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.25, bgcolor: '#fff7e0', borderRadius: 2 }}>
      <StarRateRoundedIcon sx={{ color: '#f5b300', fontSize: 18, mr: 0.25 }} />
      <Typography fontSize={13} fontWeight={600}>{value}</Typography>
    </Box>
  )
}


