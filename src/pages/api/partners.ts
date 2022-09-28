import type { NextApiRequest, NextApiResponse } from 'next'
import { InvitedPartners } from '@/types'
import { loadInvitedPartners } from '@/lib'

// This is just to have a working endpoint with the invited partners data
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<InvitedPartners>,
) {
    const InvitedPartners = await loadInvitedPartners()

    res.status(200).json(InvitedPartners)
}
