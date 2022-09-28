import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '@/styles/Home.module.scss'
import Table from '@/components/Table'

const Home: NextPage = () => {
    return (
        <div className={styles.home}>
            <Head>
                <title>Ps Interactive Task</title>
                <meta name="description" content="Technical Assignment" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h3>Company birthday guests within 100 km</h3>
                <h1>Partners</h1>
                <Table />
            </main>
        </div>
    )
}

export default Home
