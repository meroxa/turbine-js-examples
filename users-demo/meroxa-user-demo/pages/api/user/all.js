import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
        orderBy: [
            {
                id: 'asc',
            }
        ],
    })
    res.json({ allUsers })
}