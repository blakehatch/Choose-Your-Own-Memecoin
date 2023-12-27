import Image from 'next/image'
import styles from './page.module.css'
import NumericVoter from '@/components/NumericVoter'
import LeaderboardVoter from '@/components/LeaderboardVoter'
import EthConnectWallet from '@/components/EthConnectWallet'
import SolanaConnectWallet from '@/components/SolanaConnectWallet'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <p className={styles.titleText}>
        CHOOSE YOUR OWN MEMECOIN®
        </p>
      </div> 
      <div className={styles.bookTitle}>
        TOKEN OF THE PEOPLE
      </div>
      <div className={styles.subtitle}>
        CHOOSE FROM OVER 25 POSSIBLE ENDINGS
      </div>
      <div className={styles.coverContainer}>
      <EthConnectWallet/>
      <SolanaConnectWallet/>
      <LeaderboardVoter title="Name" items={[
        {id: 1, title: 'CYOMC'},
        {id: 2, title: 'Ethereum'},
        {id: 3, title: 'Dogecoin'},
      ]}/>
      <LeaderboardVoter title="Ticker" items={[
        {id: 1, title: '$BTC'},
        {id: 2, title: '$ETH'},
        {id: 3, title: '$DOGE'},
      ]}/>
      <LeaderboardVoter title="Chain" items={[
        {id: 1, title: 'Solana'},
        {id: 2, title: 'Ethereum'},
        {id: 3, title: 'Polygon ZkEVM'},
        {id: 4, title: 'Avalanche'},
        {id: 5, title: 'Base'},
      ]}/>
      <NumericVoter title="Total Supply" value="500,000,000"/>
      <NumericVoter title="Coins granted per vote" value="0" />
      <NumericVoter title="Coins minted per 1 ETH/~20 SOL" value="1000" />
      <NumericVoter title="Presale Mint Limit" value="100,000,000" />
      <NumericVoter title="Total Votes before Final Countdown" value="1000" />
      <div className={styles.innerCoverContainer}></div>
      </div>
      <div className={styles.subtitle}>
        A Tokenomics Experiment by Blek
      </div>
    </main>
  )
}
