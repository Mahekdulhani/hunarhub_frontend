import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import VerifiedIcon from '@mui/icons-material/Verified'
import GroupsIcon from '@mui/icons-material/Groups'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'

export default function GetStartedPage() {
  return (
    <Box sx={{ bgcolor: '#f3eee9' }}>
      <Box component="header" sx={{ borderBottom: '1px solid #e8e2db', py: 1 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <img src="/vite.svg" width={24} height={24} alt="HunarHub" />
              <Typography fontWeight={700}>HunarHub</Typography>
            </Stack>
            <Button variant="contained" size="small" sx={{ bgcolor: '#6fc6a6', '&:hover': { bgcolor: '#59b391' } }}>
              Get Started
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={5} alignItems="center" textAlign="center">
          <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: '#6fc6a620', display: 'grid', placeItems: 'center' }}>
            <RocketLaunchIcon sx={{ color: '#6fc6a6' }} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Unlock Your <Typography component="span" color="#34a394" fontWeight={800}>Potential</Typography>
          </Typography>
          <Typography color="text.secondary" maxWidth={640}>
            Join HunarHub and learn from expert trainers through online and physical courses. Master new skills and achieve your career goals.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large" sx={{ px: 3, bgcolor: '#6fc6a6', '&:hover': { bgcolor: '#59b391' } }}>
              Start Learning Today
            </Button>
            <Button variant="outlined" size="large">Explore</Button>
          </Stack>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 7 }}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack spacing={1} alignItems="center" textAlign="center">
                  <GroupsIcon sx={{ color: '#6fc6a6', fontSize: 36 }} />
                  <Typography fontWeight={700}>Expert Trainers</Typography>
                  <Typography color="text.secondary" fontSize={14}>Learn from industry professionals with years of experience</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack spacing={1} alignItems="center" textAlign="center">
                  <MenuBookIcon sx={{ color: '#ef9f9f', fontSize: 36 }} />
                  <Typography fontWeight={700}>Flexible Learning</Typography>
                  <Typography color="text.secondary" fontSize={14}>Choose from online or physical courses that fit your schedule</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack spacing={1} alignItems="center" textAlign="center">
                  <WorkspacePremiumIcon sx={{ color: '#91a0ff', fontSize: 36 }} />
                  <Typography fontWeight={700}>Certificates</Typography>
                  <Typography color="text.secondary" fontSize={14}>Earn recognized certificates upon course completion</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 7 }}>
          <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#47b596', color: '#fff' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} md={3}>
                  <Stat value="1000+" label="Students" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Stat value="50+" label="Trainers" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Stat value="100+" label="Courses" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Stat value="4.8★" label="Rating" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight={700}>Ready to Start Your Journey?</Typography>
          <Typography color="text.secondary" maxWidth={700}>Join thousands of students who are already learning and growing with HunarHub</Typography>
          <Button variant="contained" size="large" sx={{ px: 3, bgcolor: '#6fc6a6', '&:hover': { bgcolor: '#59b391' } }} endIcon={<VerifiedIcon />}>
            Get Started Now
          </Button>
        </Stack>
      </Container>

      <Box component="footer" sx={{ mt: 10, py: 5, borderTop: '1px solid #e8e2db', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography color="text.secondary" fontSize={12}>© 2025 HunarHub. All rights reserved.</Typography>
          <Typography color="text.secondary" fontSize={12}>Empowering learners, one skill at a time.</Typography>
        </Container>
      </Box>
    </Box>
  )
}

function Stat({ value, label }) {
  return (
    <Stack spacing={0.5} alignItems="center">
      <Typography variant="h4" fontWeight={800}>{value}</Typography>
      <Typography>{label}</Typography>
    </Stack>
  )
}


