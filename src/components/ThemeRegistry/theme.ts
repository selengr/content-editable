import { createTheme } from '@mui/material/styles';
import { iranSans } from './../../app/fonts/fonts';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

// Create rtl cache
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: iranSans.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'IRANSans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('IRANSans'), url('/IranSans/IRANSansMobile(FaNum).ttf') format('truetype');
        }
        @font-face {
          font-family: 'IRANSans';
          font-style: normal;
          font-display: swap;
          font-weight: 200;
          src: local('IRANSans'), url('/IranSans/IRANSansMobile(FaNum)_UltraLight.ttf') format('truetype');
        }
        @font-face {
          font-family: 'IRANSans';
          font-style: normal;
          font-display: swap;
          font-weight: 300;
          src: local('IRANSans'), url('/IranSans/IRANSansMobile(FaNum)_Light.ttf') format('truetype');
        }
        @font-face {
          font-family: 'IRANSans';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('IRANSans'), url('/IranSans/IRANSansMobile(FaNum)_Medium.ttf') format('truetype');
        }
        @font-face {
          font-family: 'IRANSans';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('IRANSans'), url('/IranSans/IRANSansMobile(FaNum)_Bold.ttf') format('truetype');
        }
        @font-face {
          font-family: 'IRANSans';
          font-style: normal;
          font-display: swap;
          font-weight: 800;
          src: local('IRANSans'), url('/IranSans/IRANSansMobile(FaNum)_Black.ttf') format('truetype');
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Global border radius for buttons
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Global border radius for inputs
        },
      },
    },
  },
});

export default theme;

