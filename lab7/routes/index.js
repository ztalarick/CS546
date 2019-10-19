//Zachary Talarick
const postRoutes = require("./posts.js");
const animalRoutes = require("./animals.js");

const constructorMethod = app => {
  app.use("/posts", postRoutes);
  app.use("/animals", animalRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
