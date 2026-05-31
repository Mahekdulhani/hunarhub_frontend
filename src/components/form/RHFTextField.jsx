import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

export default function RHFTextField({ name, control, ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}