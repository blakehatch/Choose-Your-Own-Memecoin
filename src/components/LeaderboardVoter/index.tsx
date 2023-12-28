"use client"

import styles from './leaderboard.module.css'
import { useEffect, useState } from 'react';
import Button from '../Button';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';

const getPathFromTitle = (title: string) => {
    if (title === "Name") {
      return "names";
    }
    if (title === "Ticker") {
      return "tickers";
    }
    if (title === "Chain") {
      return "chains";
    }
}


const updateLeaderboardItem = async (id: string, value: number, wallet: string, title: string) => {
  const { status } = await fetch('/api/' + getPathFromTitle(title), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, value: value, wallet: wallet }),
  })

  if (status === 200) {
    //window?.location.reload()
  }
}

export default function LeaderboardVoter({title, items, wallets}: any) {
  const [voteInput, setVoteInput] = useState('');
  const [unsubmittedInput, setUnsubmittedInput] = useState('');
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

  const itemFound = () => {
    return ((address && findItemById(address?.toString(), title) !== null) 
                || (publicKey && findItemById(publicKey?.toString(), title) !== null)) || false
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
                    <Button disabled={(itemFound() && (findItemById(address?.toString() || publicKey?.toString() || "", title) !== item.id)) || '' !== voteInput && voteInput !== item.id} onClick={() => {
                      setVoteInput(item.id);
                      if (!findItemById(address?.toString() || publicKey?.toString() || "", title)) {
                        if (address) {updateLeaderboardItem(item.id, item.votes, address?.toString(), title)}
                        if (publicKey) {updateLeaderboardItem(item.id, item.votes, publicKey?.toString(), title)}
                      }
                    }}>{(voteInput === item.id || findItemById(address?.toString() || publicKey?.toString() || "", title)) ? "Voted" : "Vote"}</Button>
                    </div>
                    </div>
                ))}
            </div>
            <div className={styles.newVote}>
              {/* {voteInput} */}
                <div className={styles.writeInInput}><input className={styles.input} type="text" value={unsubmittedInput} onChange={(e) => setUnsubmittedInput(e.target.value)} placeholder="Write-in Candidate..." /></div>
                <div className={styles.writeInButton}><Button disabled={itemFound() || '' !== voteInput} onClick={() => {
                  setVoteInput(unsubmittedInput);
                  setItemsState([ { id: unsubmittedInput, votes: 1 }, ...itemsState]);
                  if (address) {updateLeaderboardItem(unsubmittedInput, 0, address?.toString(), title);}
                  if (publicKey) {updateLeaderboardItem(unsubmittedInput, 0, publicKey?.toString(), title);}
                }}>Vote</Button></div>
            </div>
      </div>
    </div>
  )
}
