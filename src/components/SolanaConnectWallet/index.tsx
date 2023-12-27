"use client"

import { useWeb3Modal } from '@web3modal/wagmi/react'
import Button from '../Button';
import styles from './solanaconnect.module.css'
import { useAccount } from 'wagmi';
import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import SolanaLogo from '../../../public/solanaLogoMark.svg';

export default function SolanaConnectWallet() {

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.title}>
          <Image className={styles.icon} src={SolanaLogo} alt="SOL" /> <h2 className={styles.subtitle}>Solana Wallets</h2>
        </div>
        <div className={styles.buttons}>
          <WalletMultiButton/>
          {/* <WalletDisconnectButton/> */}
        </div>
      </div>
    </div>
  )
}