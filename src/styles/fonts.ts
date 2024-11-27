import localFont from 'next/font/local'

export const marianne = localFont({
  src: [
    // Light (300)
    {
      path: '../../public/dsfr/fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/dsfr/fonts/Marianne-Light_Italic.woff2',
      weight: '300',
      style: 'italic',
    },
    // Regular (400)
    {
      path: '../../public/dsfr/fonts/Marianne-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/dsfr/fonts/Marianne-Regular_Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    // Medium (500)
    {
      path: '../../public/dsfr/fonts/Marianne-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/dsfr/fonts/Marianne-Medium_Italic.woff2',
      weight: '500',
      style: 'italic',
    },
    // Bold (700)
    {
      path: '../../public/dsfr/fonts/Marianne-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/dsfr/fonts/Marianne-Bold_Italic.woff2',
      weight: '700',
      style: 'italic',
    }
  ],
  variable: '--font-marianne',
  display: 'swap',
})

export const spectral = localFont({
  src: [
    // Regular (400)
    {
      path: '../../public/dsfr/fonts/Spectral-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    // ExtraBold (800)
    {
      path: '../../public/dsfr/fonts/Spectral-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    }
  ],
  variable: '--font-spectral',
  display: 'swap',
})
