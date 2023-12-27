"use client"

import Image from 'next/image';
import styles from "./button.module.css";
import React from 'react';
import { ButtonI } from '../../types/button';

const Button = ({ icon, children, onClick }: ButtonI): JSX.Element => {

  return (
    <button className={styles.button} onClick={onClick || (() => {})}>
        {icon && <div className={styles.icon}>
            <Image src={icon} width={32} height={32} alt="alt"/>
        </div>}
        {children}
    </button> 
  );
};

export default Button;