interface Props {
    id: number
    name: string
    distance: number
}

export default function TableRow({ id, name, distance }: Props): JSX.Element {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{distance}</td>
        </tr>
    )
}
