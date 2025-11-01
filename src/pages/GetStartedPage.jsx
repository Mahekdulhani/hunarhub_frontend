import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import GroupsIcon from '@mui/icons-material/Groups'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import GradientButton from '../components/GradientButton'

export default function GetStartedPage() {
  return (
    <Box sx={{ bgcolor: '#f3eee9', minHeight: '100vh' }}>
      <Box component="header" sx={{ py: 2, px: 3 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <img src="/vite.svg" width={28} height={28} alt="HunarHub" />
              <Typography fontWeight={600} fontSize={18}>HunarHub</Typography>
            </Stack>
            <GradientButton component={Link} to="/login" size="small" sx={{ px: 3, py: 0.8 }}>
              Get Started
            </GradientButton>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box 
            sx={{ 
              width: 64, 
              height: 64, 
              borderRadius: 3, 
              bgcolor: '#6fc6a620', 
              display: 'grid', 
              placeItems: 'center' 
            }}
          >
            <RocketLaunchIcon sx={{ color: '#6fc6a6', fontSize: 32 }} />
          </Box>

          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: '#333'
            }}
          >
            Unlock Your <Typography component="span" color="#5bb5a2" fontWeight={600} fontSize="inherit">
              Potential
            </Typography>
          </Typography>

          <Typography color="text.secondary" maxWidth={640} sx={{ fontSize: 15 }}>
            Join HunarHub and learn from expert trainers through online and physical courses. Master new skills and achieve your career goals.
          </Typography>

          <GradientButton size="large" sx={{ px: 4, py: 1.3, fontSize: 15 }}>
            Start Learning Today
          </GradientButton>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 3, 
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: '100%'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: 2, 
                      bgcolor: '#6fc6a615', 
                      display: 'grid', 
                      placeItems: 'center' 
                    }}
                  >
                    <GroupsIcon sx={{ color: '#6fc6a6', fontSize: 32 }} />
                  </Box>
                  <Typography fontWeight={600} fontSize={16}>Expert Trainers</Typography>
                  <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>
                    Learn from industry professionals with years of experience
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 3, 
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: '100%'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: 2, 
                      bgcolor: '#ef9f9f15', 
                      display: 'grid', 
                      placeItems: 'center' 
                    }}
                  >
                    <MenuBookIcon sx={{ color: '#ef9f9f', fontSize: 32 }} />
                  </Box>
                  <Typography fontWeight={600} fontSize={16}>Flexible Learning</Typography>
                  <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>
                    Choose from online or physical courses that fit your schedule
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 3, 
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: '100%'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: 2, 
                      bgcolor: '#91a0ff15', 
                      display: 'grid', 
                      placeItems: 'center' 
                    }}
                  >
                    <WorkspacePremiumIcon sx={{ color: '#91a0ff', fontSize: 32 }} />
                  </Box>
                  <Typography fontWeight={600} fontSize={16}>Certificates</Typography>
                  <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>
                    Earn recognized certificates upon course completion
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              background: 'linear-gradient(135deg, #6fc6a6 0%, #5bb5a2 100%)', 
              color: '#fff',
              boxShadow: '0 4px 16px rgba(111, 198, 166, 0.3)'
            }}
          >
            <CardContent sx={{ py: 4, px: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stat value="1000+" label="Students" />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stat value="50+" label="Trainers" />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stat value="100+" label="Courses" />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Stat value="4.8★" label="Rating" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        <Stack spacing={3} alignItems="center" textAlign="center" sx={{ mt: 10 }}>
          <Typography variant="h5" fontWeight={600} fontSize={{ xs: 22, md: 26 }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography color="text.secondary" maxWidth={700} fontSize={15}>
            Join thousands of students who are already learning and growing with HunarHub
          </Typography>
          <GradientButton size="large" sx={{ px: 4, py: 1.3 }}>
            Get Started Now
          </GradientButton>
        </Stack>
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          mt: 8, 
          py: 4, 
          borderTop: '1px solid #e8e2db', 
          textAlign: 'center' 
        }}
      >
        <Container maxWidth="lg">
          <Typography color="text.secondary" fontSize={13}>
            © 2025 HunarHub. All rights reserved.
          </Typography>
          <Typography color="text.secondary" fontSize={13} sx={{ mt: 0.5 }}>
            Empowering learners, one skill at a time.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

function Stat({ value, label }) {
  return (
    <Stack spacing={0.5} alignItems="center">
      <Typography variant="h4" fontWeight={700} fontSize={{ xs: 28, md: 36 }}>
        {value}
      </Typography>
      <Typography fontSize={14} sx={{ opacity: 0.95 }}>
        {label}
      </Typography>
    </Stack>
  )
}
