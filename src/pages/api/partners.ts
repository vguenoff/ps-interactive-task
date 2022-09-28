import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { Partner } from '@/types'

async function textToJson(file: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(file)
        readStream.on('error', reject)
        const array: any[] = []

        const reader = readline.createInterface({ input: readStream })
        reader.on('line', (line: string) => array.push(JSON.parse(line)))
        reader.on('close', () => resolve(array))
    })
}

async function getPartnersData(): Promise<Partner[]> {
    const fileDirectory = path.join(process.cwd(), 'data')
    const response = await textToJson(`${fileDirectory}/partners.txt`)

    return response
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partner[]>,
) {
    try {
        const data = await getPartnersData()
        const sortedPartners = data.sort((a, b) => a.partner_id - b.partner_id)

        res.status(200).json(sortedPartners)
    } catch (err) {
        console.error(err)
    }
}
