import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export default function RHFTextField({ name, control, label, type = 'text', ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          {...rest}
        />
      )}
    />
  )
}


