import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '@/styles/Home.module.scss'
import Table from '@/components/Table'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ps Interactive Task</title>
                <meta name="description" content="Technical Assignment" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Company birthday guests</h1>
                <Table />
            </main>
        </div>
    )
}

export default Home
