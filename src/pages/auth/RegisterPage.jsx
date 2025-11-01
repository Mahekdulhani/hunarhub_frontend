import { Box, Link as MuiLink, Paper, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
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
  const { handleSubmit, control, setError, formState: { isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (values) => {
    try {
      const formatDob = (dob) => {
        if (!dob) return dob
        // convert mm/dd/yyyy or yyyy-mm-dd -> dd-mm-yyyy if possible
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f0ec', display: 'grid', placeItems: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, width: 720, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h6" align="center">Create your account</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <RHFTextField name="first_name" control={control} label="First Name" placeholder="First name" />
                <RHFTextField name="last_name" control={control} label="Last Name" placeholder="Last name" />
              </Stack>
              <RHFTextField name="email" control={control} label="Email Address" placeholder="Enter your email" />
              <RHFTextField name="phone" control={control} label="Phone Number" placeholder="+92 300 1234567" />
              <RHFTextField name="password" control={control} label="Password" placeholder="Create a strong password" type="password" />
              <RHFTextField name="cnic" control={control} label="CNIC" placeholder="12345-1234567-1" />
              <RHFTextField name="dob" control={control} label="Date of Birth" placeholder="mm/dd/yyyy" />
              <RHFTextField name="city" control={control} label="City" placeholder="Enter your city" />
              <GradientButton type="submit" disabled={isSubmitting} sx={{ py: 1.2 }}>Sign Up</GradientButton>
            </Stack>
          </form>
          <Typography align="center" color="text.secondary">
            Already have an account? <MuiLink component={Link} to="/login">Login</MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}


