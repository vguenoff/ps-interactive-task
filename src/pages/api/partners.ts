import type { NextApiRequest, NextApiResponse } from 'next'
import { InvitedPartners } from '@/types'
import { loadInvitedPartners } from '@/lib'

// This is just to have an endpoint with the invited partners data on /api/partners
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<InvitedPartners>,
) {
    const invitedPartners = await loadInvitedPartners()

    res.status(200).json(invitedPartners)
}
