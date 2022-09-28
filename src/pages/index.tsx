import useSWR from 'swr'
import type { NextPage } from 'next'

import Table from '@/components/Table'
import TableError from '@/components/TableError'

import styles from '@/styles/Home.module.scss'

const Home: NextPage = () => {
    const { data: partners, error } = useSWR('/api/partners', url =>
        fetch(url).then(res => res.json()),
    )

    return (
        <div className={styles.home}>
            <main className="table-background">
                {error && <TableError />}
                {partners && <Table {...{ partners }} />}
            </main>
        </div>
    )
}

export default Home
