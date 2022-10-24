import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const allSurvey = await prisma.survey.findMany({
        orderBy: [
            {
                id: 'asc',
            }
        ],
    })
    res.json({ allSurvey })
}