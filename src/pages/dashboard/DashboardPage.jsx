import { Avatar, Box, Card, CardContent, Chip, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined'
import StarIcon from '@mui/icons-material/Star'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/api'
import DashboardLayout from '../../components/DashboardLayout'

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
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" fontWeight={600} color="#333">
              Dashboard
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Welcome to HunarHub Admin Panel
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <StatCard
              title="Total Students"
              value={stats?.totalStudents ?? 6}
              icon={<PeopleOutlineIcon />}
              iconBg="#e0f7f4"
              iconColor="#6fc6a6"
            />
            <StatCard
              title="Total Trainers"
              value={stats?.totalTrainers ?? 5}
              icon={<SchoolOutlinedIcon />}
              iconBg="#ffe5e0"
              iconColor="#f3a2a0"
            />
            <StatCard
              title="Active Courses"
              value={stats?.activeCourses ?? 4}
              icon={<MenuBookIcon />}
              iconBg="#e0ebff"
              iconColor="#91a0ff"
            />
            <StatCard
              title="Pending Approvals"
              value={stats?.pendingApprovals ?? 4}
              icon={<PendingActionsOutlinedIcon />}
              iconBg="#fff8e0"
              iconColor="#f5c563"
            />
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography fontWeight={600} fontSize={16} mb={2}>
                  Recent Activity
                </Typography>
                <List sx={{ p: 0 }}>
                  {[
                    { 
                      text: 'New student enrolled in Web Development Fundamentals', 
                      time: '2 hours ago',
                      color: '#6fc6a6'
                    },
                    { 
                      text: 'Course pending approval: Data Science with Python', 
                      time: '5 hours ago',
                      color: '#f5c563'
                    },
                    { 
                      text: 'New trainer registered: Emily Rodriguez', 
                      time: '1 day ago',
                      color: '#91a0ff'
                    },
                    { 
                      text: 'Course completed: Graphic Design Essentials', 
                      time: '2 days ago',
                      color: '#f3a2a0'
                    },
                  ].map((item, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 1.5 }} divider={idx < 3}>
                      <FiberManualRecordIcon 
                        sx={{ 
                          fontSize: 10, 
                          color: item.color, 
                          mr: 2 
                        }} 
                      />
                      <ListItemText
                        primary={item.text}
                        secondary={item.time}
                        primaryTypographyProps={{ fontSize: 14 }}
                        secondaryTypographyProps={{ fontSize: 12 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography fontWeight={600} fontSize={16} mb={2}>
                  Popular Courses
                </Typography>
                <List sx={{ p: 0 }}>
                  {[
                    { 
                      title: 'Web Development Fundamentals', 
                      students: 45, 
                      rating: 4.8 
                    },
                    { 
                      title: 'Graphic Design Essentials', 
                      students: 52, 
                      rating: 4.9 
                    },
                    { 
                      title: 'Digital Marketing Mastery', 
                      students: 38, 
                      rating: 4.6 
                    },
                    { 
                      title: 'Data Science with Python', 
                      students: 31, 
                      rating: 4.7 
                    },
                  ].map((course, idx) => (
                    <ListItem 
                      key={idx} 
                      sx={{ px: 0, py: 1.5 }}
                      divider={idx < 3}
                      secondaryAction={
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <StarIcon sx={{ fontSize: 16, color: '#f5c563' }} />
                          <Typography fontSize={14} fontWeight={600}>
                            {course.rating}
                          </Typography>
                        </Stack>
                      }
                    >
                      <ListItemText
                        primary={course.title}
                        secondary={`${course.students} students enrolled`}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                        secondaryTypographyProps={{ fontSize: 12 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
      </Box>
    </DashboardLayout>
  )
}

function StatCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <Card 
      sx={{ 
        minWidth: 200, 
        flex: 1,
        borderRadius: 2, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)' 
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography fontSize={13} color="text.secondary" mb={1}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              {value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: iconBg,
              color: iconColor,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  )
}
