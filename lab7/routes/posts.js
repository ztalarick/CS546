//Zachary Talarick
const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/", async (req, res) => { //TODO FIX LIKES ARRAY TO CONTAIN TITLES
  try {
    const postList = await postData.readAll();
    res.json(postList);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await postData.read(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const newData = req.body;
  try{
    const {title, author, content} = newData;
    const newPost = await postData.create(title, author, content);
    res.json(newPost);
  } catch(e){
    res.status(400).json({ error: e });
  }
});

router.put("/:id", async (req, res)  => {
  const putData = req.body;
  try {
    await postData.read(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "post not found" });
  }
  try{
    const {title, content} = putData;
    const updatedPost = await postData.update(req.params.id, title, content);
    res.json(updatedPost);
  } catch(e){
    res.status(400).json({ error: e })
  }
});

router.delete("/:id", async (req, res) => { //also needs to remove posts.
  try {
    await postData.read(req.params.id);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Post not found" });
  }
  try {
    const removedPost = await postData.delete(req.params.id);
    res.json(removedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});



module.exports = router;
