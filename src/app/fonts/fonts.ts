import localFont from 'next/font/local'



export const iranSans = localFont({
  src: [
    {
      path: './IranSans/IRANSansMobile(FaNum)_UltraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './IranSans/IRANSansMobile(FaNum)_Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './IranSans/IRANSansMobile(FaNum).ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './IranSans/IRANSansMobile(FaNum)_Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './IranSans/IRANSansMobile(FaNum)_Bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './IranSans/IRANSansMobile(FaNum)_Black.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-iransans',
})

