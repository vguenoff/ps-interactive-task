// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

interface Partner {
    partner_id: number
    name: string
    latitude: string
    longitude: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partner[]>,
) {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'mockData')
    //Read the json data file data.json
    const fileContents = await fs.readFile(
        jsonDirectory + '/partners.json',
        'utf8',
    )
    const partners = JSON.parse(fileContents)

    //Return the content of the data file in json format
    res.status(200).json(partners)
}
