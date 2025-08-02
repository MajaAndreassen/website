import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maja A. Moger - Personal Blog & Portfolio',
  description: 'Personal blog and portfolio of Maja A. Moger featuring projects, drawings, thoughts, reviews, and travel stories.',
  keywords: ['blog', 'portfolio', 'projects', 'drawings', 'travel', 'reviews'],
  authors: [{ name: 'Maja A. Moger' }],
  openGraph: {
    title: 'Maja A. Moger - Personal Blog & Portfolio',
    description: 'Personal blog and portfolio of Maja A. Moger featuring projects, drawings, thoughts, reviews, and travel stories.',
    type: 'website',
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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}