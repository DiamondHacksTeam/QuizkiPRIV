import express from "express";

import db from "../server.js";

const router = express.Router();

//get all terms/points/collectedSmiskis/smiskiInfo
router.get("/:desired", async (req, res) => {
  let collection = await db.collection(`${req.params.desired}`);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//create a new term
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
//for posting new smiskis 
// router.post("/smiskis/:name/:series/:img", async (req, res) => {
//     try {
//       let newDocument = {
//         name: req.params.name,
//         series: req.params.series,
//         img: decodeURI(req.params.img)
//       };
//       let collection = await db.collection("smiskis");
//       let result = await collection.insertOne(newDocument);
//       res.send(result).status(204);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error adding record");
//     }
//   });
//updates points
router.patch("/points/:amnt", async (req, res) =>{
    try{
        let amnt = parseInt(req.params.amnt);
        const changeBal = {$inc: {points: amnt}}

        const query = {name: 'Guest'};
        
        let collection = await db.collection("points");
        let result = await collection.updateOne(query, changeBal);
        res.send(result).status(200);
    } catch (err){
        console.error(err);
        res.status(500).send("Error updating balance");
    }
});

//resets progress
router.delete("/", async (req, res) => {
  try {
    const collection = db.collection("terms");
    let result = await collection.deleteMany();

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting all terms");
  }
  try {
    const collection = db.collection("points");
    let query = {$set: {points: 0}}
    let result = await collection.updateOne({name: 'Guest'}, query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting all terms");
  }
});

export default router;