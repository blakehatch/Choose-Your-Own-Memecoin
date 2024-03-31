import Image from 'next/image'
import styles from '../page.module.css'
import NumericVoter from '@/components/NumericVoter'
import LeaderboardVoter from '@/components/LeaderboardVoter'
import EthConnectWallet from '@/components/EthConnectWallet'
import SolanaConnectWallet from '@/components/SolanaConnectWallet'
import { getXataClient } from '../../xata';
import { useState, useEffect } from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function Home() {
  const xata = getXataClient();
  const totalSupply = await xata.db.Tokenomics.read('Total_Supply');
  const coinsPerETH = await xata.db.Tokenomics.read('Coins_Per_ETH');
  const coinsPerVote = await xata.db.Tokenomics.read('Coins_Per_Vote');
  const presaleMintLimit = await xata.db.Tokenomics.read('Presale_Mint_Limit');
  const totalVotes = await xata.db.Tokenomics.read('Total_Votes');
  const names = await xata.db.Names.sort('votes', 'desc').getAll();
  const tickers = await xata.db.Tickers.sort('votes', 'desc').getAll();
  const chains = await xata.db.Chains.sort('votes', 'desc').getAll();
  const wallets = await xata.db.Wallets.getAll();

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <div className={styles.titleText}>
        CHOOSE YOUR OWN MEMECOIN®
        </div>
      </div> 
      <div className={styles.bookTitle}>
        TOKEN OF THE PEOPLE?
      </div>
      <div className={styles.subtitle}>
      <Link href="/" className={styles.helpLink}>I&apos;m ready to vote! 🗳️</Link>
      </div>
      <div className={styles.coverContainer}>
      <div className={styles.helpText}>
      <h2><b>Choose Your Own Memecoin</b> is a novel and engaging tokenomics experiment that puts the power in the hands of the community. In this experiment, users can vote on various parameters that will determine the tokenomics of a new memecoin, effectively shaping the project&apos;s future through a gamified voting process.</h2>

      <p>The voting system is designed to incentivize users to participate actively and strategize their votes to maximize their potential rewards. The catch? There&apos;s a constantly approaching &quot;Final Countdown&quot; window that, if reached, will lock in the current tokenomics parameters. However, this window can be pushed back through continued voting.</p>

      <h3>Here are the key parameters that users can vote on:</h3>

      <div><b>Total Supply:</b> Users can vote to increase or decrease the total supply of the memecoin in increments of 1,000 tokens per vote.</div>
      <div><b>Coins Granted per Vote:</b> Users can vote to adjust the number of coins they will receive as an airdrop for each vote cast, with an increment of 1 coin per vote.</div>
      <div><b>Coins Minted per 1 ETH/~20 SOL:</b> Users can vote on the number of coins minted for every 1 ETH or approximately 20 SOL invested, with an increment of 100 coins per vote.</div>
      <div><b>Presale Mint Limit:</b> Users can vote to set the maximum number of coins that can be minted during the presale, with an increment of 200 coins per vote.</div>
      <div><b>Total Votes before Final Countdown:</b> Users can vote to determine the total number of votes required before the &quot;Final Countdown&quot; phase is triggered, with an increment of 1 vote per vote.</div>
      
      <div>The voting process is entirely gas-free, allowing users to participate without incurring any transaction fees. The &quot;Coins Granted per Vote&quot; parameter determines the airdrop that voters will receive at the time of the memecoin&apos;s mint, incentivizing widespread participation and engagement.</div>

      <div>As the voting progresses, users will need to strategize their votes carefully, balancing their desire for personal gain with the overall health and sustainability of the memecoin. Should the community reach a consensus on the tokenomics parameters, the final countdown will be triggered, and the memecoin will be minted with the chosen parameters.</div>

      <div>The <b>Choose Your Own Memecoin</b> experiment is a unique and innovative approach to tokenomics, fostering community engagement, gamification, and a sense of collective ownership over the project&apos;s future. Whether you&apos;re a seasoned crypto enthusiast or a newcomer to the space, this experiment promises an exciting and interactive journey into the world of memecoins.</div>
      </div>
      <div className={styles.innerCoverContainer}></div>
      </div>
      <div className={styles.subtitle}>
        A Tokenomics Experiment by Blek
      </div>
    </div>
  )
}
