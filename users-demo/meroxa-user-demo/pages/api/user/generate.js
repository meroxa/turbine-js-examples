import Chance from 'chance'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const chance = new Chance();

export default async function handle(req, res) {
    await prisma.user.create({
        data: {
            name: chance.name(),
            email: chance.email({ domain: "example.com" }),
            birthday: chance.birthday({ string: true }),
            posts: {
                create: { title: chance.sentence({ words: 3 }), content: chance.sentence({ words: 3 }) },
            },
            profile: {
                create: { bio: chance.sentence({ words: 10 }) },
            },
        },
    })

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })

    res.json({ allUsers })

}