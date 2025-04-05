import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import records from "./routing/records.js";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.ATLAS_URI || "";
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/records', records);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

await client.connect();
let db = await client.db("QuizMe");

if (db) {
    await client.db("QuizMe").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
    
} else {
    console.log("Failed to connect to database");
}

export default db;
