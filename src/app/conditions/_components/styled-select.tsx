import { Select, SxProps, Theme  } from "@mui/material"
import { IoIosArrowDown } from "react-icons/io"
import { styled } from "@mui/material/styles"

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select.MuiSelect-outlined": {
    fontFamily: "inherit",
    paddingRight: "33px",
    paddingLeft: "0 !important",
  },
  "&.MuiInputBase-root": {
    borderRadius: "8px",
    paddingLeft: theme.spacing(2),
    border: "1px solid #DDE1E6",
  },
  "& .MuiSelect-icon": {
    left: "auto",
    right: "16px",
    color: "#1758BA",
    fontSize: "1.5rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}))

export interface CustomSelectProps {
  width?: number | string
  sx?: SxProps<Theme>
}


export default function CustomSelect({ width, sx, ...props }: CustomSelectProps) {
  return (
    <StyledSelect
      IconComponent={IoIosArrowDown}
      sx={{
        width,
        ...(sx as SxProps<Theme>),
      }}
      {...props}
    />
  )
}