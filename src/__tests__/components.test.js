import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Table from '../components/Table'
import TableRow from '../components/TableRow'
import TableError from '../components/TableError'
import mockData from '../../mockData/invitedPartners.json'

describe('Components', () => {
    test('renders a table headings', () => {
        const props = mockData
        render(<Table {...props} />)

        expect(
            screen.getByRole('heading', { name: /partners/i }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: /birthday guests within 100 km/i,
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('row', {
                name: /Id Name Distance/i,
            }),
        ).toBeInTheDocument()
    })

    test('renders a table row', () => {
        const props = mockData.partners.at(0)
        const tableRow = document.createElement('tbody')
        render(<TableRow {...props} />, {
            container: document.body.appendChild(tableRow),
        })

        expect(
            screen.getByRole('row', {
                name: /1 Jamelia Waller 11.73/i,
            }),
        ).toBeInTheDocument()
    })

    test('renders a table error', () => {
        render(<TableError />)

        expect(
            screen.getByRole('heading', { name: /error/i }),
        ).toBeInTheDocument()
    })
})
