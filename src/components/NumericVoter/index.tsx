"use client"

import styles from './numeric.module.css'
import Button from '../Button'
import { NumbericI } from '@/types/numeric'
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';

const updateTokenomics = async (id: string, value: number, increment: number, isAdd: boolean, wallet: string) => {
  const { status } = await fetch('/api/tokenomics', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, value: value, increment: increment, isAdd: isAdd, wallet: wallet }),
  })

  if (status === 200) {
    window?.location.reload()
  }
}

export default function NumericVoter({title, value, voted, id, increment, wallets}: NumbericI) {
  const { address, isConnected } = useAccount();
  const { publicKey } = useWallet();

  const findItemById = (id: string, title: string) => {
    if (wallets) {
      let item = wallets.find((item: any) => item.id === id)
      if (item) {
        if (title === "Total Supply") {
          return item["Total_Supply"];
        }
        if (title === "Coins granted per vote") {
          return item["Coins_Per_Vote"];
        }
        if (title === "Coins minted per 1 ETH/~20 SOL") {
          return item["Coins_Per_ETH"];
        }
        if (title === "Presale Mint Limit") {
          return item["Presale_Mint_Limit"];
        }
        if (title === "Total Votes before Final Countdown") {
          return item["Total_Votes"];
        }
      }
    }
    else {
      return null;
    }
  }

  return (
    <div className={styles.container}>
      {address && JSON.stringify(findItemById(address?.toString(), title))}
      {publicKey && JSON.stringify(findItemById(publicKey?.toString(), title))}
        <div className={styles.inner}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.inputs}>
                <div className={styles.buttonContainer}><Button onClick={async () => {
                  if (value) {
                    if (publicKey) {
                      await updateTokenomics(id, value, increment, false, publicKey?.toString())
                    }
                    if (address) {
                      await updateTokenomics(id, value, increment, false, address?.toString())
                    }
                  }
                }}>-</Button></div> <div>{value}</div> <div className={styles.buttonContainer}><Button onClick={async () => {
                  if (value) {
                    if (publicKey) {
                      await updateTokenomics(id, value, increment, true, publicKey?.toString())
                    }
                    if (address) {
                      await updateTokenomics(id, value, increment, true, address?.toString())
                    }
                  }
                }}>+</Button></div>
            </div>
        </div>
    </div>
  )
}
