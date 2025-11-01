import { Button } from '@mui/material'

export default function GradientButton({ children, sx, ...props }) {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        background: 'linear-gradient(90deg, #6fc6a6 0%, #f3a2a0 100%)',
        color: '#fff',
        textTransform: 'none',
        borderRadius: 3,
        '&:hover': { opacity: 0.9, background: 'linear-gradient(90deg, #6fc6a6 0%, #f3a2a0 100%)' },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}


