"use client"

import styles from './leaderboard.module.css'
import { useState } from 'react';
import Button from '../Button';

export default function LeaderboardVoter({title, items}: any) {
  const [voteInput, setVoteInput] = useState('');

  return (
    <div className={styles.container}>
        <div className={styles.inner}>
            <h2 className={styles.title}>{title}:</h2>
            <div className={styles.leaderboard}>
                {items.map((item: any, i: number) => (
                    <div className={styles.vote} key={item.id}>
                    <div>{i + 1}.</div> <div>{item.title}</div>
                    <div className={styles.button}>
                    <Button onClick={() => item.vote()}>Vote</Button>
                    </div>
                    </div>
                ))}
            </div>
            <div className={styles.newVote}>
                <div className={styles.writeInInput}><input className={styles.input} type="text" value={voteInput} onChange={(e) => setVoteInput(e.target.value)} placeholder="Write-in Candidate..." /></div>
                <div className={styles.writeInButton}><Button onClick={() => items.add({ title: voteInput, vote: () => {} })}>Vote</Button></div>
            </div>
      </div>
    </div>
  )
}
