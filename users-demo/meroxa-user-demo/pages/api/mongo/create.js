import { connectToDatabase } from '../../../utils/mongodb'

export default async function handle(req, res) {
    const { client } = await connectToDatabase()

    const isConnected = await client.isConnected()

    const database = client.db("meroxa");

    const user = database.collection("user");

    const result = await user.insertOne(req.body);

    if(result.result.ok === 1) {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }

    
}