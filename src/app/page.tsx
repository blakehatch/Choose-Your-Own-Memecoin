import Image from 'next/image'
import styles from './page.module.css'
import NumericVoter from '@/components/NumericVoter'
import LeaderboardVoter from '@/components/LeaderboardVoter'
import EthConnectWallet from '@/components/EthConnectWallet'
import SolanaConnectWallet from '@/components/SolanaConnectWallet'
import { getXataClient } from '../xata';
import Button from '@/components/Button'
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
    <main className={styles.main}>
      <div className={styles.title}>
        <div className={styles.titleText}>
        CHOOSE YOUR OWN MEMECOIN®
        </div>
      </div> 
      <div className={styles.bookTitle}>
        TOKEN OF THE PEOPLE
      </div>
      <div className={styles.subtitle}>
        CHOOSE FROM OVER 25 POSSIBLE ENDINGS
      </div>
      <div className={styles.helpLink}><Link href="/about" >Learn More ➜</Link></div>
      <div className={styles.coverContainer}>
      <div>
      </div>
      <SolanaConnectWallet/>
      <EthConnectWallet/>
      <LeaderboardVoter title="Name" items={names} wallets={wallets}/>
      <LeaderboardVoter title="Ticker" items={tickers} wallets={wallets}/>
      <LeaderboardVoter title="Chain" items={chains} wallets={wallets}/>
      <NumericVoter title="Total Supply" value={totalSupply?.votes || 0} voted={false} id={"Total_Supply"} increment={1000} wallets={wallets}/>
      <NumericVoter title="Coins granted per vote" value={coinsPerVote?.votes || 0} voted={false} id={"Coins_Per_Vote"} increment={1} wallets={wallets}/>
      <NumericVoter title="Coins minted per 1 ETH/~20 SOL" value={coinsPerETH?.votes || 0} voted={false} id={"Coins_Per_ETH"} increment={100} wallets={wallets}/>
      <NumericVoter title="Presale Mint Limit" value={presaleMintLimit?.votes || 0} voted={false} id={"Presale_Mint_Limit"} increment={200} wallets={wallets}/>
      <NumericVoter title="Total Votes before Final Countdown" value={totalVotes?.votes || 0} voted={false} id={"Total_Votes"} increment={1} wallets={wallets}/>
      <div className={styles.innerCoverContainer}></div>
      </div>
      <div className={styles.subtitle}>
        A Tokenomics Experiment by Blek
      </div>
    </main>
  )
}
