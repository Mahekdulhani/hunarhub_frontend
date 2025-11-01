import { Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { useAuth } from '../context/AuthContext'

const DRAWER_WIDTH = 240

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon /> },
  { label: 'Trainer Approval', path: '/trainer-approval', icon: <CheckCircleOutlineIcon /> },
  { label: 'Students', path: '/students', icon: <PeopleOutlineIcon /> },
  { label: 'Trainers', path: '/trainers', icon: <SchoolOutlinedIcon /> },
]

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: '#f8f8f8',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Box sx={{ p: 2.5, borderBottom: '1px solid #e0e0e0' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <img src="/vite.svg" width={24} height={24} alt="HunarHub" />
            <Box>
              <Typography fontWeight={600} fontSize={15}>HunarHub</Typography>
              <Typography fontSize={11} color="text.secondary">Admin Panel</Typography>
            </Box>
          </Stack>
        </Box>

        <List sx={{ px: 1.5, py: 2 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive ? '#6fc6a6' : 'transparent',
                    color: isActive ? '#fff' : 'text.primary',
                    '&:hover': {
                      bgcolor: isActive ? '#6fc6a6' : 'rgba(111, 198, 166, 0.08)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: '#6fc6a6',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontSize={13} fontWeight={600} noWrap>
                Admin User
              </Typography>
              <Typography fontSize={11} color="text.secondary" noWrap>
                {user?.email || 'admin@hunarhub.com'}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#fafafa', minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  )
}
