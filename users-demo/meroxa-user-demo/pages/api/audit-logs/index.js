import { connectToDatabase } from '../../../utils/mongodb'

export default async function handle(req, res) {
    const { client } = await connectToDatabase()

    const isConnected = await client.isConnected()

    const database = client.db("meroxa");
    const logs = database.collection("audit-logs");
  
    const result = await logs.find().toArray();

    res.json({ data: result, isConnected})
}