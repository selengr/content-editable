import type React from "react"
import { TextField, type TextFieldProps } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form"

interface CustomTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ name, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField {...props} value={value} onChange={onChange} error={!!error} helperText={error?.message} />
      )}
    />
  )
}

export default CustomTextField

