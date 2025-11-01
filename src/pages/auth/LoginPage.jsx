import { Box, Link as MuiLink, Paper, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import RHFTextField from '../../components/form/RHFTextField'
import GradientButton from '../../components/GradientButton'
import { useAuth } from '../../context/AuthContext'

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { handleSubmit, control, setError, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (values) => {
    try {
      await login(values)
      navigate('/dashboard', { replace: true })
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
          maxWidth: 420, 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        <Stack spacing={3}>
          <Stack alignItems="center" spacing={2}>
            <img src="/vite.svg" width={32} height={32} alt="HunarHub" />
            <Typography fontWeight={600} fontSize={14} color="text.secondary">
              Login to continue your journey
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <RHFTextField 
                name="email" 
                control={control} 
                label="Email Address" 
                placeholder="Enter your email"
                size="small"
              />
              
              <RHFTextField 
                name="password" 
                control={control} 
                label="Password" 
                placeholder="Enter your password" 
                type="password"
                size="small"
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MuiLink 
                  component={Link} 
                  to="#" 
                  underline="hover" 
                  sx={{ fontSize: 13, color: '#6fc6a6' }}
                >
                  Forgot Password?
                </MuiLink>
              </Box>

              {errors.root && (
                <Typography color="error" fontSize={13} textAlign="center">
                  {errors.root.message}
                </Typography>
              )}

              <GradientButton 
                type="submit" 
                fullWidth
                disabled={isSubmitting} 
                sx={{ py: 1.3, fontSize: 15 }}
              >
                Login
              </GradientButton>
            </Stack>
          </form>

          <Typography align="center" fontSize={13} color="text.secondary">
            Don't have an account?{' '}
            <MuiLink 
              component={Link} 
              to="/register" 
              sx={{ color: '#6fc6a6', fontWeight: 500 }}
            >
              Sign Up
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
