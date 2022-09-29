import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { Partner, InvitedPartner, GCDOptions, InvitedPartners } from '@/types'
import { earth_radius, sofia_location } from '@/constants'

export async function textToJson({
    directory = '',
    filename,
}: {
    directory: string
    filename: string
}): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(
            `${path.join(process.cwd(), directory)}/${filename}`,
        )
        readStream.on('error', reject)
        const array: any[] = []

        const reader = readline.createInterface({ input: readStream })
        reader.on('line', (line: string) => array.push(JSON.parse(line)))
        reader.on('close', () => resolve(array))
    })
}

export function greatCircleDistance(options: GCDOptions): string {
    const { sin, cos, acos, abs } = Math
    const [lat1, lng1, lat2, lng2] = Object.values(options)
        .map(Number) // making sure we're working with numbers
        .map(coordinate => (coordinate * Math.PI) / 180) // and converting to radiants

    const a = acos(
        sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(abs(lng1 - lng2)),
    )

    const d = earth_radius * a

    return (d / 1000).toPrecision(4) // distance in kilometers with precision around the meters
}

export function setInvitedPartners(partners: Partner[]): InvitedPartner[] {
    return partners
        .map(({ partner_id, name, latitude, longitude }) => ({
            id: partner_id,
            name,
            distance: greatCircleDistance({
                ...sofia_location,
                lat2: latitude,
                lng2: longitude,
            }),
        })) // modified to return only id, name and distance
        .filter(p => Number(p.distance) <= 100) //  filtered to partners within 100 km
        .sort((a, b) => a.id - b.id) // and sorted by id (ascending)
}

export async function loadInvitedPartners(): Promise<InvitedPartners> {
    try {
        const partners = await textToJson({
            directory: 'data',
            filename: 'partners.txt',
        })

        return { partners: setInvitedPartners(partners), error: false }
    } catch (err) {
        return { partners: [], error: true }
    }
}
