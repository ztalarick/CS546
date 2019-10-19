//Zachary Talarick
//How to send response code
//how to send/receive json object for post requests
const express = require("express");
const router = express.Router();
const data = require("../data");
const animalData = data.animal;

router.get("/", async (req, res) => { //TODO FIX LIKES ARRAY TO CONTAIN TITLES
  try {
    const animalList = await animalData.getAll();
    res.json(animalList);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const animal = await animalData.get(req.params.id);
    res.status(200).json(animal);
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/", async (req, res) => {
  const newData = req.body;
  try {

    const { name, animalType } = newData;

    const newAnimal = await animalData.create(name, animalType);
    res.json(newAnimal);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const putData = req.body;
  try {
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
  }
  try {
    const {name, animalType} = putData;
    const updatedAnimal = await animalData.update(req.params.id, name, animalType);
    res.json(updatedAnimal);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e })
  }
});

router.delete("/:id", async (req, res) => { //also needs to remove posts.
  try {
    await animalData.get(req.params.id);
  } catch (e) {

    res.status(404).json({ error: "Animal not found" });
  }
  try {
    const removedAnimal = await animalData.remove(req.params.id);
    res.json(removedAnimal);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
