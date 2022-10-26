import { connectToDatabase } from '../../../utils/mongodb'

export default async function handle(req, res) {
    const { client } = await connectToDatabase()

    const isConnected = await client.isConnected()

    const database = client.db("meroxa");
    const logs = database.collection("audit-logs");

    if(!req.body.payload.op){
        res.status(400).json({ error: 'no op provided' })
    }

    let doc = {}
    
    switch (req.body.payload.op) {
        case 'r':
            doc = { type: "snapshot", userId: req.body.payload.after.id, raw: req.body };
            break;
        case 'c':
            doc = { type: "create", userId: req.body.payload.after.id, raw: req.body };
            break;
        case 'u':
            doc = { type: "update", userId: req.body.payload.after.id, raw: req.body };
            break;
        case 'd':
            doc = { type: "delete", userId: req.body.payload.before.id, raw: req.body };
            break;
    
        default:
            break;
    }

    const result = await logs.insertOne(doc);

    res.json({ isConnected, result })
}