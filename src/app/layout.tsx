"use client"

import type { Metadata } from "next";
import { iranSans } from './fonts/fonts'
import "./globals.css";
// mui
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { useState } from "react";
import { ActionOpenDialogContext, OpenDialogContext } from "@/context/AllContexts";
// import { ThemeProvider } from '@mui/material/styles'
// import { CacheProvider } from '@emotion/react'
// import CssBaseline from '@mui/material/CssBaseline'
// import theme, { cacheRtl } from './../components/ThemeRegistry/theme'
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [openDialog, setOpenDialog] = useState<boolean>(false);


  return (
    <html lang="en">
      <body className={`${iranSans.variable} font-sans`}>
        <ThemeRegistry>
          <ActionOpenDialogContext.Provider value={setOpenDialog}>
            <OpenDialogContext.Provider value={openDialog}>
              {children}
            </OpenDialogContext.Provider>
          </ActionOpenDialogContext.Provider>
        </ThemeRegistry>
      </body>
    </html >
  );
}


