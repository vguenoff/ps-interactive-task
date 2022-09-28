import TableRow from './TableRow'
import { Partner } from '@/types'
import styles from '@/styles/Table.module.scss'

interface Props {
    partners: Partner[]
}

export default function Table({ partners }: Props): JSX.Element {
    return (
        <>
            <h3>Company birthday guests within 100 km</h3>
            <h1>Partners</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Partner Id</th>
                        <th>Name</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {partners
                        ?.sort((a, b) => a.partner_id - b.partner_id)
                        .map(
                            ({ partner_id: id, name, latitude, longitude }) => {
                                const distance = 100

                                return (
                                    <TableRow
                                        key={id}
                                        {...{ id, name, distance }}
                                    />
                                )
                            },
                        )}
                </tbody>
            </table>
        </>
    )
}
