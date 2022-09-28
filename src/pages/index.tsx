import Table from '@/components/Table'
import TableError from '@/components/TableError'

import styles from '@/styles/Home.module.scss'
import { loadInvitedPartners } from '@/lib'
import { InvitedPartners } from '@/types'

export const getStaticProps = async () => {
    const { partners, error } = await loadInvitedPartners()

    return {
        props: { partners, error },
    }
}

function Home({ partners, error }: InvitedPartners) {
    return (
        <div className={styles.home}>
            <main className="table-background">
                {error ? <TableError /> : <Table {...{ partners }} />}
            </main>
        </div>
    )
}

export default Home
