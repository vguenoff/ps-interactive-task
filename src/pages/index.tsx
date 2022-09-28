import { InvitedPartners } from '@/types'
import Table from '@/components/Table'
import TableError from '@/components/TableError'
import { loadInvitedPartners } from '@/lib'

import styles from '@/styles/Home.module.scss'

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
