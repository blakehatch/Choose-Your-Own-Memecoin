import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3Modal } from "../context/Web3Modal";
import localFont from 'next/font/local'
import { SolanaAdapter } from '@/context/SolanaAdapter';
// Font files can be colocated inside of `pages`
const benguait = localFont({ src: '../../public/fonts/BenguiatStd-Book.ttf' })

export const metadata: Metadata = {
  title: 'Choose Your Own Memecoin',
  description: 'A Tokenomics Experiment by and for The People',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={benguait.className}>
        <SolanaAdapter>
          <Web3Modal>{children}</Web3Modal>
        </SolanaAdapter>
      </body>
    </html>
  )
}
