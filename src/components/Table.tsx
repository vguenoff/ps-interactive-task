import { InvitedPartners } from '@/types'
import TableRow from './TableRow'

import styles from '@/styles/Table.module.scss'

export default function Table({ partners }: InvitedPartners) {
    return (
        <>
            <h3>Company birthday guests within 100 km</h3>
            <h1>Partners</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Distance (km)</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.map(({ id, name, distance }) => (
                        <TableRow key={id} {...{ id, name, distance }} />
                    ))}
                </tbody>
            </table>
        </>
    )
}
