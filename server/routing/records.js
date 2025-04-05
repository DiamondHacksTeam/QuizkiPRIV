import express from "express";

import db from "../server.js";

import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the term.
router.get("/terms", async (req, res) => {
  let collection = await db.collection("terms");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you create a new term.
router.post("/terms/:term/:ans", async (req, res) => {
  try {
    let newDocument = {
      term: req.params.term,
      answer: req.params.ans,
    };
    let collection = await db.collection("terms");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you delete a term
// router.delete("/terms", async (req, res) => {
//   try {
//     const query = { _id: new ObjectId(req.params.id) };

//     const collection = db.collection("records");
//     let result = await collection.deleteOne(query);

//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error deleting record");
//   }
// });

export default router;