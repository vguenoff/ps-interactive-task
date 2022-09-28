import { InvitedPartner } from '@/types'

export default function TableRow({
    id,
    name,
    distance,
}: InvitedPartner): JSX.Element {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{distance}</td>
        </tr>
    )
}
