import type React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  type Theme,
  type SxProps,
  type SelectProps,
  FormHelperText,
  LinearProgress,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { useFormContext, Controller } from "react-hook-form";

interface CustomSelectProps extends Omit<SelectProps, "sx" | "name"> {
  options: { value: string; label: string }[];
  sx?: SxProps<Theme>;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  sx,
  name,
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <Select
            IconComponent={IoIosArrowDown}
            variant="outlined"
            value={value}
            onChange={onChange}
            disabled={disabled || isLoading}
            displayEmpty
            renderValue={(selected) => {
              if (isLoading) {
                return (
                  <LinearProgress
                    variant="buffer"
                    value={0}
                    valueBuffer={0}
                    sx={{ width: 28, pt: 1 }}
                  />
                );
              }
              const selectedOption = options.find(option => option.value === selected);
              return selectedOption ? selectedOption.label : "";
            }}
            sx={{
              "& .MuiSelect-select.MuiSelect-outlined": {
                fontFamily: "inherit",
                paddingRight: "33px",
                paddingLeft: "0 !important",
              },
              "&.MuiInputBase-root": {
                borderRadius: "8px",
                paddingLeft: 2,
                border: error ? "1px solid #FA4D56" : "1px solid #DDE1E6",
              },
              "& .MuiSelect-icon": {
                left: "auto",
                right: "16px",
                color: error ? "#FA4D56" : "#1758BA",
                fontSize: "1.5rem",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              ...(sx as SxProps<Theme>),
            }}
            {...props}
          >
            {options?.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  backgroundColor: "#1758BA0D",
                  padding: "10px",
                  paddingX: "15px",
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText sx={{ color: "#FA4D56" }}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default CustomSelect;
