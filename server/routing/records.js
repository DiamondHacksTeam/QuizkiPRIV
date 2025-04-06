import express from "express";

import db from "../server.js";

const router = express.Router();

//get all users/smiskis info
router.get("/:desired", async (req, res) => {
  let collection = await db.collection(`${req.params.desired}`);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});
//get specific user info
router.get("/users/:name", async (req, res) => {
  let collection = await db.collection("users");
  let name = req.params.name;
  let results = await collection.find({ email: `${name}` }).toArray();
  res.send(results).status(200);
});

//adds a new term
router.patch("/vocab/:user/:term/:ans/:group", async (req, res) => {
  try {
    let term = req.params.term;
    let answer = req.params.ans;
    let group = req.params.group;

    let user = req.params.user;
    let collection = await db.collection("users");

    let exist =  await collection.findOne(
        {email: user,
        [`terms.${group}`]: {$exists: true}});
    
    if (exist){
        let result = await collection.updateOne(
            { email: user, [`terms.${group}`]: { $exists: true } },
            { $set: { [`terms.$[elem].${group}.${term}`]: answer } },
            { arrayFilters: [{ [`elem.${group}`]: { $exists: true } }] }
          );
        res.status(200).send(result);
        return;
    }
    
    let result = await collection.updateOne(
        {email: user}, 
        { $push: { terms: { [group]: { [term]: answer } } } }
    );
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});
router.patch("/vocab/:user/:group", async (req, res) => {
    try{
        let group = req.params.group;
        let user = req.params.user;
        let collection = await db.collection("users");

        let result = await collection.updateOne(
            {email: user},
            {$push: {terms: {[group] : {}}}}
        );
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
})
//increments points
router.patch("/balance/:user/:amnt", async (req, res) => {
  try {
    let user = req.params.user;
    let amnt = parseInt(req.params.amnt);

    let query = { $inc: { points: amnt } };

    let collection = await db.collection("users");
    let result = await collection.updateOne({ email: user }, query);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});
//adds collected smiski
router.patch("/smiskis/:user/:smiskiName", async (req, res) => {
    try {
      let user = req.params.user;
      let smiskiName = req.params.smiskiName;
      let smiskiCollection = await db.collection("smiskis");

      let smiskiInfo = await smiskiCollection.findOne({name: smiskiName});

    let collection = await db.collection("users");

    //   let exists = await collection.findOne({name: smiskiName[0].name});
      
    //   if (exists){
    //     let query = {$inc: {points : -75}};
    //     let result = await collection.updateOne({email: user}, query);

    //     let troll = await smiskiCollection.findOne({name: "Troll"});
    //     let queryy = {$push: {collected : troll }};
    //     let resultt = await collection.updateOne({email: user}, queryy);
      
    //     res.status(200).send(troll);
    //     return;
    //   }
      let query1 = {$push: {collected : smiskiInfo}};
      let query2 = {$inc: {points : -100}};

      
      let result1 = await collection.updateOne({email: user}, query1);
      let result2 = await collection.updateOne({email: user}, query2);
      res.send(smiskiInfo).status(204);
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
      img: decodeURI(req.params.img),
    };
    let collection = await db.collection("smiskis");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

//resets flashcards
router.delete("/:user", async (req, res) => {
  let user = req.params.user;
  let collection = db.collection("users");
  try {
    let resetTerms = {$set: {terms: []}}
    let result = await collection.updateOne({email: user}, resetTerms);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error resetting progress");
  }
});

export default router;
