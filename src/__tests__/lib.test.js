import { greatCircleDistance as GCD } from 'great-circle-distance'
import { textToJson, greatCircleDistance, setInvitedPartners } from '@/lib'
import { sofia_location } from '@/constants'

import mockDataInitial from '../../mockData/partners.json'
import mockDataInvited from '../../mockData/invitedPartners.json'

async function getPartnersHelper() {
    const partners = await textToJson({
        directory: 'data',
        filename: 'partners.txt',
    })

    const invitedPartners = setInvitedPartners(partners)

    return {
        partners,
        invitedPartners,
    }
}

describe('Lib', () => {
    test('Partner data from the text file should match the mock object', async () => {
        const partners = textToJson({
            directory: 'data',
            filename: 'partners.txt',
        })

        await expect(partners).resolves.toStrictEqual(mockDataInitial)
    })

    test('The circle distance calculates correctly for all partners (from the Sofia location )', async () => {
        const { partners } = await getPartnersHelper()

        // Compare with different implementation of the great circle distance
        partners.forEach(partner => {
            const [lat1, lng1] = sofia_location
            const { latitude: lat2, longitude: lng2 } = partner

            const gcd1 = greatCircleDistance({ lat1, lng1, lat2, lng2 })
            const gcd2 = GCD({ lat1, lng1, lat2, lng2 }).toPrecision(4)

            expect(gcd1).toEqual(gcd2)
        })
    })

    test('The circle distance calculates correctly for all partners (from random location)', async () => {
        const getRandomNum = (min, max) => Math.random() * (max - min) + min // random helper
        const { partners } = await getPartnersHelper()

        partners.forEach(partner => {
            const { latitude: lat1, longitude: lng1 } = partner
            const [lat2, lng2] = [
                getRandomNum(-180, 180),
                getRandomNum(-180, 180),
            ]

            const gcd1 = greatCircleDistance({ lat1, lng1, lat2, lng2 })
            const gcc2 = GCD({ lat1, lng1, lat2, lng2 }).toPrecision(4)

            expect(gcd1).toEqual(gcc2)
        })
    })

    test('Invited partners data from the text file should match the mock object', async () => {
        const { invitedPartners } = await getPartnersHelper()

        expect(invitedPartners).toStrictEqual(mockDataInvited.partners)
    })

    test(`Initial partners should have properties (latitude, partner_id, name, longitude)`, async () => {
        const { partners } = await getPartnersHelper()

        partners.forEach(partner => {
            expect(partner).toHaveProperty('latitude')
            expect(partner).toHaveProperty('partner_id')
            expect(partner).toHaveProperty('name')
            expect(partner).toHaveProperty('longitude')
        })
    })

    test(`Invited partners should have properties (id, name, distance)`, async () => {
        const { invitedPartners } = await getPartnersHelper()

        invitedPartners.forEach(invitedPartner => {
            expect(invitedPartner).toHaveProperty('id')
            expect(invitedPartner).toHaveProperty('name')
            expect(invitedPartner).toHaveProperty('distance')
        })
    })
})
