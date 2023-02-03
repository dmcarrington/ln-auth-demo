import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
         <a href="/">Ln-Auth Authenticated!</a> Dashboard
        </h1>
      </main>
    </div>
  )
}

export default Home
