import { connectToDatabase } from '../../../utils/mongodb'
const {ObjectId} = require('mongodb');

export default async function handle(req, res) {
    const { client } = await connectToDatabase()

    const isConnected = await client.isConnected()

    const database = client.db("meroxa");

    const user = database.collection("user");

    const query = { "_id": ObjectId(req.body.id) };

    const result = await user.deleteOne(query);

    if (result.deletedCount === 1) {
        res.json({ success: true, message: "Successfully deleted one document."})
    } else {
        res.json({ success: false, message: "No documents matched the query. Deleted 0 documents."})
    }
    
}