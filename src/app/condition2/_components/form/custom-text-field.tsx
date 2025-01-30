import type React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

interface CustomTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderColor: "none",
              "& fieldset": {
                paddingLeft: 2,
                borderRadius: "8px",
                border: "1px solid #DDE1E6",
              },
              "&:hover fieldset": {
                border: "1px solid #DDE1E6",
              },
              "&.Mui-focused fieldset": {
                border: "2px solid #DDE1E6",
              },
              "&.Mui-error fieldset": {
                borderColor: "#FA4D56",
              },
            },
          }}
        />
      )}
    />
  );
};

export default CustomTextField;
