// /app/layout.tsx
'use client'

import '@solana/wallet-adapter-react-ui/styles.css'
import './globals.css'
import { ReactNode, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import Providers from './providers'
import { WalletSyncWrapper } from '@/components/WalletSyncWrapper'
import MotionWrapper from '@/components/MotionWrapper'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  TorusWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets'

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

  const WalletModalProvider = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletModalProvider),
    { ssr: false }
  )

  return (
    <html lang="en" className="font-inter">
      <body className="bg-background text-textPrimary min-h-screen">
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
      </body>
    </html>
  )
}
