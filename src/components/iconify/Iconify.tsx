"use client"

import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';
//
import { IconifyProps } from './types';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: IconifyProps;
}

// eslint-disable-next-line react/display-name
const Iconify = forwardRef<SVGElement, Props | any>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
))

export default Iconify;
