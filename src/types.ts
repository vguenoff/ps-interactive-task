export interface Partner {
    partner_id: number
    name: string
    latitude: string
    longitude: string
}

export interface InvitedPartner {
    id: number
    name: string
    distance: string
}

export interface GCDOptions {
    lat1: number | string
    lng1: number | string
    lat2: number | string
    lng2: number | string
}
