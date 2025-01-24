import React from 'react';
import { Select, MenuItem, SxProps, Theme, SelectProps } from '@mui/material';
import { IoIosArrowDown } from "react-icons/io";


interface CustomSelectProps extends Omit<SelectProps, 'sx'> {
  options: { value: string; label: string }[];
  sx?: SxProps<Theme>;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, sx, ...props }) => {
  return (
    <Select
      IconComponent={IoIosArrowDown}
      variant="outlined"
      sx={{
        "& .MuiSelect-select.MuiSelect-outlined": {
          fontFamily: "inherit",
          paddingRight: "33px",
          paddingLeft: "0 !important",
        },
        "&.MuiInputBase-root": {
          borderRadius: "8px",
          paddingLeft: 2,
          border: "1px solid #DDE1E6",
        },
        "& .MuiSelect-icon": {
          left: "auto",
          right: "16px",
          color: "#1758BA",
          fontSize: "1.5rem"
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        ...(sx as SxProps<Theme>),
      }}
      {...props}
    >
      {options.map((option) => (
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
  );
};

export default CustomSelect;