import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.majamoger.com'),
  title: {
    default: 'Maja A. Moger - Creative Developer & Artist',
    template: '%s | Maja A. Moger',
  },
  description: 'Personal blog and portfolio of Maja A. Moger - developer, designer, and creative. Featuring projects, drawings, thoughts, reviews, and travel stories.',
  keywords: [
    'blog', 
    'portfolio', 
    'projects', 
    'drawings', 
    'travel', 
    'reviews', 
    'art', 
    'sketches', 
    'creative', 
    'design',
    'Maja Moger',
    'personal website'
  ],
  authors: [{ name: 'Maja A. Moger' }],
  creator: 'Maja A. Moger',
  publisher: 'Maja A. Moger',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.majamoger.com', // Replace with your actual domain
    title: 'Maja A. Moger - Creative Developer & Artist',
    description: 'Personal blog and portfolio of Maja A. Moger - developer, designer, and creative. Featuring projects, drawings, thoughts, reviews, and travel stories.',
    siteName: 'Maja A. Moger',
    images: [
      {
        url: '/images/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Maja A. Moger - Creative Developer & Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maja A. Moger - Creative Developer & Artist',
    description: 'Personal blog and portfolio of Maja A. Moger - developer, designer, and creative. Featuring projects, drawings, thoughts, reviews, and travel stories.',
    images: ['/images/og-image.jpg'], // You'll need to add this image
  },
  alternates: {
    canonical: 'https://www.majamoger.com',
  },
  verification: {
    google: 'p1ehQmOmLdED36g4YMN1R8iIAw71ryV3afm8i82W5D4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="bfd97f33-9c1d-475d-958f-74badc4eec77"
          strategy="afterInteractive"
        />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}