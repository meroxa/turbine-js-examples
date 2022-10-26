import { connectToDatabase } from '../../../utils/mongodb'

export default async function handle(req, res) {
    const { client } = await connectToDatabase()

    const isConnected = await client.isConnected()

    const database = client.db("meroxa");
    const user = database.collection("user");
  
    const result = await user.find().toArray();

    res.json({ data: result, isConnected})
}