import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext'
import styles from '../styles/Dashboard.module.css'
import { useContext } from 'react';
const crypto = require('crypto');

const Home: NextPage = () => {
  const { lnData } = useContext(AuthContext);
  const user = crypto.createHash('sha256').update(lnData.key).digest('hex'); 
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
         <a>Ln-Auth Authenticated!</a> Dashboard
        </h1>
        <b>User:</b> {user}
      </main>
    </div>
  )
}

export default Home
