import type { NextApiRequest, NextApiResponse } from 'next'
import { Partner, InvitedPartner } from '@/types'
import { textToJson, greatCircleDistance } from '@/utils'
import { sofia_location } from '@/constants'

function setPartnersToInvite(partners: Partner[]): InvitedPartner[] {
    return partners
        .sort((a, b) => a.partner_id - b.partner_id) // sorted by id
        .map(({ partner_id, name, latitude, longitude }) => ({
            id: partner_id,
            name,
            distance: greatCircleDistance({
                ...sofia_location,
                lat2: latitude,
                lng2: longitude,
            }),
        })) // modified to return only id, name and distance
        .filter(p => Number(p.distance) <= 100) // and filtered to partners within 100 km
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<InvitedPartner[]>,
) {
    try {
        const partners = await textToJson('data', 'partners.txt')
        const partnersToInvite = setPartnersToInvite(partners)

        res.status(200).json(partnersToInvite)
    } catch (err) {
        console.error(err)
    }
}
