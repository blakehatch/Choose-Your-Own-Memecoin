"use client"

import styles from './leaderboard.module.css'
import { useEffect, useState } from 'react';
import Button from '../Button';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';

const updateLeaderboardItem = async (id: string, value: number, wallet: string) => {
  const { status } = await fetch('/api/tokenomics', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, value: value, wallet: wallet }),
  })

  if (status === 200) {
    window?.location.reload()
  }
}

export default function LeaderboardVoter({title, items, wallets}: any) {
  const [voteInput, setVoteInput] = useState('');
  const [itemsState, setItemsState] = useState(items)
  const { address, isConnected } = useAccount();
  const { publicKey } = useWallet();

  const findItemById = (id: string, title: string) => {
    if (wallets) {
      let item = wallets.find((item: any) => item.id === id)
      if (item) {
        if (title === "Name") {
          return item["voted_name"];
        }
        if (title === "Ticker") {
          return item["voted_ticker"];
        }
        if (title === "Chain") {
          return item["voted_chain"];
        }
      }
    }
    else {
      return {};
    }
  }

  return (
    <div className={styles.container}>
      {address && JSON.stringify(findItemById(address?.toString(), title))}
      {publicKey && JSON.stringify(findItemById(publicKey?.toString(), title))}
        <div className={styles.inner}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.labels}>
                <div className={styles.innerLabel}>
                      <div>Votes</div> <div className={styles.choices}>Choices</div>
                      <div>
                      Pick
                      </div>
                    </div>
            </div>

            <div className={styles.leaderboard}>
                {itemsState.map((item: any, i: number) => (
                    <div className={styles.vote} key={i}>
                    <div>{item.votes}</div> <div>{title === "Ticker" && "$"}{item.id}</div>
                    <div className={styles.button}>
                    <Button onClick={() => {
                      if (address) {updateLeaderboardItem(item.id, item.votes, address?.toString())}
                      if (publicKey) {updateLeaderboardItem(item.id, item.votes, publicKey?.toString())}
                    }}>Vote</Button>
                    </div>
                    </div>
                ))}
            </div>
            <div className={styles.newVote}>
              {voteInput}
                <div className={styles.writeInInput}><input className={styles.input} type="text" value={voteInput} onChange={(e) => setVoteInput(e.target.value)} placeholder="Write-in Candidate..." /></div>
                <div className={styles.writeInButton}><Button onClick={() => {
                  setItemsState([ { id: voteInput, votes: 1 }, ...itemsState]);
                  if (address) {updateLeaderboardItem(voteInput, 0, address?.toString());}
                  if (publicKey) {updateLeaderboardItem(voteInput, 0, publicKey?.toString());}
                }}>Vote</Button></div>
            </div>
      </div>
    </div>
  )
}
