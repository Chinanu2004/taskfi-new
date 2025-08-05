// app/layout.tsx
'use client'

import '@solana/wallet-adapter-react-ui/styles.css'
import './globals.css'
import { ReactNode, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/context/ThemeContext'
import MotionWrapper from '@/components/MotionWrapper'
import Providers from './providers'
import { WalletSyncWrapper } from '@/components/WalletSyncWrapper'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  TorusWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const WalletModalProvider = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletModalProvider),
  { ssr: false }
)

export const metadata = {
  title: 'TaskFi',
  description: 'Decentralized freelance marketplace',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new CloverWalletAdapter(),
      new TorusWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    [network]
  )

  return (
    <html lang="en" className={`scroll-smooth ${inter.className}`}>
      <body className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark transition-colors duration-300 min-h-screen">
        <ThemeProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <WalletSyncWrapper>
                  <Providers>
                    <Toaster position="top-right" />
                    <main className="pb-16 p-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                      <MotionWrapper>{children}</MotionWrapper>
                    </main>
                  </Providers>
                </WalletSyncWrapper>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}