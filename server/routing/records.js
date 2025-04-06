import express from "express";

import db from "../server.js";

const router = express.Router();

//get all users/smiskis info
router.get("/:desired", async (req, res) => {
  let collection = await db.collection(`${req.params.desired}`);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//adds a new term
router.patch("/vocab/:user/:term/:ans", async (req, res) => {
  try {
    let term = req.params.term;
    let answer = req.params.ans;

    let user = req.params.user;
    let query = {$push: {terms : {[term]: answer}}};

    let collection = await db.collection("users");
    let result = await collection.updateOne({name: user}, query);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});
//increments points
router.patch("/balance/:user/:amnt", async (req, res) => {
    try {
      let user = req.params.user;
      let amnt = parseInt(req.params.amnt);
      
      let query = {$inc: {points : amnt}};
  
      let collection = await db.collection("users");
      let result = await collection.updateOne({name: user}, query);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });

//adds collected smiski
router.patch("/smiskis/:user/:smiski", async (req, res) => {
    try {
      let user = req.params.user;
      let smiski = req.params.smiski;
      
      let query1 = {$push: {collected : smiski}}
      let query2 = {$inc: {points : -100}};

      let collection = await db.collection("users");
      let result1 = await collection.updateOne({name: user}, query1);
      let result2 = await collection.updateOne({name: user}, query2);
      res.send(result1).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });

//create new user
router.post("/users/:name", async (req, res) => {
    try {
      let newDocument = {
        name: req.params.name,
        points: 0,
        collected: [],
        terms: []
      };
      let collection = await db.collection("users");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });

//for posting new smiskis 
router.post("/smiskis/:name/:series/:img", async (req, res) => {
    try {
      let newDocument = {
        name: req.params.name,
        series: req.params.series,
        img: decodeURI(req.params.img)
      };
      let collection = await db.collection("smiskis");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });

//resets progress
router.delete("/:user", async (req, res) => {
  let user = req.params.user;
  let collection = db.collection("users");
  try {
    let resetPoints = {$set: {points: 0}}
    let resetCollected = {$set: {collected: []}}
    let resetTerms = {$set: {terms: []}}
    let result = await collection.updateOne({name: user}, resetPoints);
    let resultt = await collection.updateOne({name: user}, resetCollected);
    let resulttt = await collection.updateOne({name: user}, resetTerms);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error resetting progress");
  }
});

export default router;