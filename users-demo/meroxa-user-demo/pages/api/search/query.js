import { Client } from '@elastic/elasticsearch'

const client = new Client({
    node: process.env.ELASTIC_URL
})

export default async function handle(req, res) {

    let query = {
        "match_all": {}
    }

    if (req.body.query) {
        query = req.body.query
    }

    const result = await client.search({
        index: 'users',
        body: {
            query: {
                "match_all": {}
            }
        }
    })

    res.json({ success: true, result: result.body.hits, })
}