import { PrismaClient } from '@prisma/client'
import { Client } from '@elastic/elasticsearch'

const client = new Client({
    node: process.env.ELASTIC_URL
})
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

    await client.indices.delete({
        index: 'users',
    })

    const bulkUsers = allUsers.flatMap(doc => {
        doc['@timestamp'] = new Date()
        return [{ index: { _index: 'users', _id: doc.id } }, doc]
    })

    //perform bulk indexing of the data passed
    client.bulk({ body: bulkUsers }, function (err) {
        if (err) {
            console.log("Failed Bulk operation".red, err)
            res.json({ success: false, err: err, allUsers, })
        } else {
            console.log("Successfully imported %s".green, allUsers.length);
            res.json({ success: true, allUsers, })
        }
    });

}

