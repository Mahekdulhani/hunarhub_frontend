import { Box, Grid, Link as MuiLink, Paper, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import RHFTextField from '../../components/form/RHFTextField'
import GradientButton from '../../components/GradientButton'
import api from '../../api/api'

const schema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
  cnic: yup.string().required('CNIC is required'),
  dob: yup.string().required('Date of birth is required'),
  city: yup.string().required('City is required'),
})

export default function RegisterPage() {
  const navigate = useNavigate()
  const { handleSubmit, control, setError, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (values) => {
    try {
      const formatDob = (dob) => {
        if (!dob) return dob
        const slash = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
        const dashYmd = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
        if (slash.test(dob)) {
          const [, mm, dd, yyyy] = dob.match(slash)
          return `${dd.padStart(2, '0')}-${mm.padStart(2, '0')}-${yyyy}`
        }
        if (dashYmd.test(dob)) {
          const [, yyyy, mm, dd] = dob.match(dashYmd)
          return `${dd.padStart(2, '0')}-${mm.padStart(2, '0')}-${yyyy}`
        }
        return dob
      }

      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        dob: formatDob(values.dob),
        city: values.city,
        phone: values.phone,
        cnic: values.cnic,
        email: values.email,
        password: values.password,
      }

      await api.register(payload)
      navigate('/verify-otp', { state: { email: values.email } })
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f3eee9', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, sm: 4 }, 
          width: '100%',
          maxWidth: 480, 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        <Stack spacing={3}>
          <Stack alignItems="center" spacing={2}>
            <img src="/vite.svg" width={32} height={32} alt="HunarHub" />
            <Typography fontWeight={600} fontSize={14} color="text.secondary">
              Create your Account
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <RHFTextField 
                    name="first_name" 
                    control={control} 
                    label="First Name" 
                    placeholder="First name"
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <RHFTextField 
                    name="last_name" 
                    control={control} 
                    label="Last Name" 
                    placeholder="Last name"
                    size="small"
                  />
                </Grid>
              </Grid>

              <RHFTextField 
                name="email" 
                control={control} 
                label="Email Address" 
                placeholder="Enter your email"
                size="small"
              />

              <RHFTextField 
                name="phone" 
                control={control} 
                label="Phone Number" 
                placeholder="+92 300 1234567"
                size="small"
              />

              <RHFTextField 
                name="password" 
                control={control} 
                label="Password" 
                placeholder="Create a strong password" 
                type="password"
                size="small"
              />

              <RHFTextField 
                name="cnic" 
                control={control} 
                label="CNIC" 
                placeholder="12345-1234567-1"
                size="small"
              />

              <Box sx={{ position: 'relative' }}>
                <RHFTextField 
                  name="dob" 
                  control={control} 
                  label="Date of Birth" 
                  placeholder="mm/dd/yyyy"
                  size="small"
                />
                <CalendarMonthIcon 
                  sx={{ 
                    position: 'absolute', 
                    right: 12, 
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'text.secondary',
                    fontSize: 20,
                    pointerEvents: 'none'
                  }} 
                />
              </Box>

              <RHFTextField 
                name="city" 
                control={control} 
                label="City" 
                placeholder="Enter your city"
                size="small"
              />

              {errors.root && (
                <Typography color="error" fontSize={13} textAlign="center">
                  {errors.root.message}
                </Typography>
              )}

              <GradientButton 
                type="submit" 
                fullWidth
                disabled={isSubmitting} 
                sx={{ py: 1.3, fontSize: 15, mt: 1 }}
              >
                Sign Up
              </GradientButton>
            </Stack>
          </form>

          <Typography align="center" fontSize={13} color="text.secondary">
            Already have an account?{' '}
            <MuiLink 
              component={Link} 
              to="/login" 
              sx={{ color: '#6fc6a6', fontWeight: 500 }}
            >
              Login
            </MuiLink>
          </Typography>

          <Typography align="center" fontSize={11} color="text.secondary" sx={{ pt: 1 }}>
            By continuing, you agree to our Terms & Privacy Policy
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
