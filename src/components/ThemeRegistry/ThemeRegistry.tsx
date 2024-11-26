'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import theme, { cacheRtl } from './theme'


import { CacheProvider } from '@emotion/react'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouterCacheProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </CacheProvider>
        </AppRouterCacheProvider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}