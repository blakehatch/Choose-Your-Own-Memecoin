import styles from './numeric.module.css'
import Button from '../Button'

export default function NumericVoter({title, value, voted}: any) {
  return (
    <div className={styles.container}>
        <div className={styles.inner}>
            <h2 className={styles.title}>{title}:</h2>
            <div className={styles.inputs}>
                <div className={styles.buttonContainer}><Button>-</Button></div> <div>{value}</div> <div className={styles.buttonContainer}><Button>+</Button></div>
            </div>
        </div>
    </div>
  )
}
