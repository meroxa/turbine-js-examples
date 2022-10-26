
import Chance from 'chance'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const chance = new Chance();

export default async function handle(req, res) {

    const { id } = req.query

    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: chance.name(),
            email: chance.email({ domain: "example.com" }),
            birthday: chance.birthday({ string: true }),
        },
    })

    res.json({ updatedUser })

}