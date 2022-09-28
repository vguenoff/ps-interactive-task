import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { earth_radius } from '@/constants'
import { GCDOptions } from '@/types'

export async function textToJson(
    fileDirectory: string,
    fileName: string,
): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(
            `${path.join(process.cwd(), fileDirectory)}/${fileName}`,
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
