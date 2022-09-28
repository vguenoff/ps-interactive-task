import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ps Interactive Task</title>
                <meta name="description" content="Technical Assignment" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Home page</h1>
            </main>
        </div>
    )
}

export default Home
