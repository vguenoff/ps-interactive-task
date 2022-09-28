import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import { Partner } from '@/types'

export async function getPartnersData(): Promise<Partner[]> {
    const jsonDirectory = path.join(process.cwd(), 'mockData')
    const fileContents = await fs.readFile(
        jsonDirectory + '/partners.json',
        'utf8',
    )
    const partners = JSON.parse(fileContents)

    return partners
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partner[]>,
) {
    const partners = await getPartnersData()

    //Return the content of the data file in json format
    res.status(200).json(partners)
}
