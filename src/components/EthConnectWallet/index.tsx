"use client"

import { useWeb3Modal } from '@web3modal/wagmi/react'
import Button from '../Button';
import styles from './ethwallet.module.css'
import { useAccount } from 'wagmi';
import Image from 'next/image';
import EthLogo from '../../../public/ethereum.svg'
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function EthConnectWallet() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);
  const { publicKey } = useWallet();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setIsClient(true);
  }, []);

  if (loading) {
  return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
      <div className={styles.title}>
        <Image className={styles.icon} src={EthLogo} alt="ETH" /> <h2 className={styles.subtitle}>Ethereum Wallets</h2>
      </div>
      {!publicKey ? <div className={styles.buttons}>
        {isClient && (!isConnected ? <Button overrideEnabled={true} onClick={() => open()}>Connect Wallet</Button> : 
        <Button overrideEnabled={true} onClick={() => open()}>{address}</Button>)}
        {/* {isClient && <Button overrideEnabled={true} onClick={() => open({ view: 'Networks' })}>Choose EVM Networks</Button>} */}
      </div> : <div>Disconnect from Solana to connect</div>}
      </div>
    </div>
  )
}