import { Box, styled, Divider } from "@mui/material";


const Circle = styled(Box)(({ theme }) => ({
    width: '6px', 
    height: '6px',
    borderRadius: '50%',
    backgroundColor: "#DDE1E6",
    margin: '8px 8px', 
  }));
  
  const DashedDivider = styled(Divider)(({ theme }) => ({
    borderStyle: 'dashed',
    borderColor:  "#DDE1E6",
    paddingRight : "10px",
    flexGrow: 1,
  }));
  
  export const CircleDivider = () => {
    return (
      <Box display="flex" alignItems="center">
        <Circle />
        <DashedDivider />
        <Circle />
      </Box>
    );
  };
  