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
  const { handleSubmit, control, setError, formState: { isSubmitting } } = useForm({
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f0ec', display: 'grid', placeItems: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, width: 520, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h6" align="center">Login to continue your journey</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <RHFTextField name="email" control={control} label="Email Address" placeholder="Enter your email" />
              <RHFTextField name="password" control={control} label="Password" placeholder="Enter your password" type="password" />
              <MuiLink component={Link} to="#" underline="hover" sx={{ alignSelf: 'flex-end' }}>Forgot Password?</MuiLink>
              <GradientButton type="submit" disabled={isSubmitting} sx={{ py: 1.2 }}>Login</GradientButton>
            </Stack>
          </form>
          <Typography align="center" color="text.secondary">
            Don't have an account? <MuiLink component={Link} to="/register">Sign Up</MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}


