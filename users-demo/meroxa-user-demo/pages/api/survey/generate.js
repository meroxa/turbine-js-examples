import Chance from 'chance'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const chance = new Chance();

export default async function handle(req, res) {

    let platformId = chance.integer({ min: 0, max: 2000 })

    if (req.body.platformId) {
        platformId = req.body.platformId
    }

    await prisma.survey.create({
        data: {
            platformId: platformId.toString(),
            surveyType: chance.pickone(['nps']),
            score: chance.integer({ min: 0, max: 10 }),
            comment: chance.sentence({ words: 4 }),
            source: chance.pickone(['Link', 'Web']),
            device: chance.pickone(['Desktop', 'Mobile']),
            os: chance.pickone(['Windows', 'MacOS', 'Linux']),
            browser: chance.pickone(['Opera', 'Firefox', 'Safari', 'Chrome', 'Brave']),
        },
    })

    const responses = await prisma.survey.findMany()

    res.json({ responses })

}