//Zachary Talarick
//10/10/19
//I pledge my honor that I have abided by the Stevens Honor System

const express = require('express');
const app = express();

const aboutData = require('./data/about.json');
const storyData = require('./data/story.json');
const educationData = require('./data/education')


app.get("/about", async (req, res) => {
  try {
    res.json(aboutData);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/story", async (req, res) => {
  try {
    res.json(storyData);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/education", async (req, res) => {
  try {
    res.json(educationData);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(3000, () => {
  console.log("My Server");
  console.log("On http://localhost:3000");
});
