
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {

    const { id } = req.query

    const deletePosts = prisma.post.deleteMany({
        where: {
            authorId: parseInt(id),
        },
    })

    const deleteProfile = prisma.profile.delete({
        where: {
            userId: parseInt(id),
        },
    })

    const deleteUser = prisma.user.delete({
        where: {
            id: parseInt(id),
        },
    })

    const transaction = await prisma.$transaction([deletePosts, deleteProfile, deleteUser])


    res.json({ transaction })

}