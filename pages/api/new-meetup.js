import { MongoClient } from "mongodb";

export default async function handler(req, res) { 
    if (req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://fuadIsayev:MCnhwPl2x7dCT7k0@cluster0.mj2wcxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        const db = client.db();

        const meetupCollections = db.collection("meetups");

        const result = await meetupCollections.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: "A new meetup added"})
    }
}