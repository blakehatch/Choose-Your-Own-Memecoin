"use client"

import Image from 'next/image';
import styles from "./button.module.css";
import React from 'react';
import { ButtonI } from '../../types/button';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';


const Button = ({ icon, children, onClick, disabled, overrideEnabled }: ButtonI): JSX.Element => {
  const { address, isConnected } = useAccount();
  const { publicKey } = useWallet();

  return (
    <>
    {(!disabled && (isConnected || publicKey)) || overrideEnabled ? <button className={styles.button} onClick={onClick || (() => {})}>
        {icon && <div className={styles.icon}>
            <Image src={icon} width={32} height={32} alt="alt"/>
        </div>}
        {children}
    </button> : <button className={styles.disabledButton}>
    {icon && <div className={styles.icon}>
        <Image src={icon} width={32} height={32} alt="alt"/>
        ...
    </div>}
  </button>} 
  </>
  );
};

export default Button;