import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Paper, Stack, Typography, Link as MuiLink } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GradientButton from '../../components/GradientButton'
import api from '../../api/api'
import { useAuth } from '../../context/AuthContext'

export default function VerifyOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const { authenticateWithToken } = useAuth()

  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const inputsRef = useRef([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(60)

  useEffect(() => {
    if (!email) navigate('/register', { replace: true })
  }, [email, navigate])

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  const otp = useMemo(() => otpValues.join(''), [otpValues])

  const handleChange = (idx, value) => {
    if (/[^0-9]/.test(value)) return
    const next = [...otpValues]
    next[idx] = value.slice(-1)
    setOtpValues(next)
    if (value && idx < 5) inputsRef.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otpValues[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) {
      setError('Enter the 6-digit code')
      return
    }
    try {
      setIsSubmitting(true)
      const data = await api.verifyOtp({ email, otp })
      if (data?.token) {
        await authenticateWithToken(data.token)
      }
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f0ec', display: 'grid', placeItems: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, width: 520, borderRadius: 4 }}>
        <form onSubmit={onSubmit} noValidate>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h6">Verify Your Email</Typography>
            <Typography color="text.secondary" align="center">
              We sent a 6-digit code to <strong>{email}</strong>
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  style={{
                    width: 44,
                    height: 52,
                    textAlign: 'center',
                    fontSize: 20,
                    borderRadius: 10,
                    border: '1px solid #ddd',
                    outline: 'none',
                  }}
                />
              ))}
            </Stack>
            <Typography color="text.secondary" fontSize={13}>
              {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : 'Didn\'t receive the code?'}
            </Typography>
            {error ? (
              <Typography color="error" fontSize={13}>{error}</Typography>
            ) : null}
            <GradientButton type="submit" disabled={isSubmitting} sx={{ alignSelf: 'stretch', py: 1.2 }}>
              Verify & Continue
            </GradientButton>
            <Typography color="text.secondary" fontSize={14}>
              <MuiLink component={Link} to="/register">Back to Sign Up</MuiLink>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}


