const collections = require('./collections.js');
const animals = collections.animals;
const mongo = require("mongodb");

let exportedMethods = {
  async get(id){
    if(id == null){
      throw "Bad input for ID.";
    }
    const animalCollection = await animals();

    const animal = await animalCollection.findOne({_id: mongo.ObjectId(id)});

    if(animal == null){
      throw "No animal with that ID.";
    }
    return animal;
  },

  async create(name, animalType){
    if(name == null || typeof name != "string"){
      throw "Bad input for name";
    }
    if(animalType == null || typeof animalType != "string"){
      throw "Bad input for animal type.";
    }
    const animalCollection = await animals();
    let likes = [];

    let newAnimal = {
      name: name,
      animalType: animalType,
      likes: likes
    };

    const insertInfo = await animalCollection.insertOne(newAnimal);
    if(insertInfo.insertCount === 0){
      throw "Coulnd't add animal";
    }
    const id = insertInfo.insertedId;
    const animal = await this.get(id);
    return animal;
  },

  async getAll(){
    const animalCollection = await animals();
    const allAnimals = await animalCollection.find({}).toArray();
    return allAnimals;
  },

  async remove(id){
    if (id == null || typeof id != "string") {
      throw "Bad input for ID.";
    }

    const animalCollection = await animals();

    let animal = await exportedMethods.get(id);

    const deletionInfo = await animalCollection.removeOne({_id: mongo.ObjectId(id)});
    if(deletionInfo === 0){
      throw "Error removing";
    }

    let result = {
      "deleted": true,
      "data": animal
    };

    return result;
  },

  async update(id, newName, newType){
    if(id == null || typeof id != "string"){
      throw "Bad iput for ID.";
    }

    const animalCollection = await animals();

    let animal = await exportedMethods.get(id);

    if(newName == null && newType == null){
      throw "must provide at least a new name or new type."
    }
    let newAnimal = {};
    if(newName != null && newType == null){
      newAnimal = {
        name: newName,
        animalType: animal.animalType
      };
    }else if (newName == null && newType != null) {
      newAnimal = {
        name: animal.name,
        animalType: newType
      };
    }else{
      newAnimal = {
        name: newName,
        animalType: newType
      };
    }

    const updateInfo = await animalCollection.updateOne({ _id: mongo.ObjectId(id) }, { $set: newAnimal });
    if(updateInfo === 0){
      throw "Could not update animal.";
    }
    return await exportedMethods.get(id);
  },

  async removeAll(){
    const animalCollection = await animals();
    const removeInfo = await animalCollection.deleteMany({});
    return true;
  },

  async like(id, postID){
    if(id == null || typeof id != "string"){
      throw "Bad iput for ID.";
    }
    if(postID == null || typeof postID != "string"){
      throw "bad postID input"
    }
    const animalCollection = await animals();
    let animal = exportedMethods.get(id);

    let newLikes = animal.likes;
    newLikes.push(postID);
    let newAnimal = {
      name: animal.name,
      animalType: animal.animalType,
      likes: newLikes
    };
    const updateInfo = await animalCollection.updateOne({ _id: mongo.ObjectId(id) }, { $set: newAnimal });
    if(updateInfo === 0){
      throw "Could not update animal.";
    }
    return await exportedMethods.get(id);
  },

  async unlike(id, postID){
    if(id == null || typeof id != "string"){
      throw "Bad iput for ID.";
    }
    if(postID == null || typeof postID != "string"){
      throw "bad postID input"
    }
    const animalCollection = await animals();
    let animal = exportedMethods.get(id);

    let newLikes = animal.likes.filter(function(value, index, arr){
      return value == postID;
    });

    let newAnimal = {
      name: animal.name,
      animalType: animal.animalType,
      likes: newLikes
    };
    const updateInfo = await animalCollection.updateOne({ _id: mongo.ObjectId(id) }, { $set: newAnimal });
    if(updateInfo === 0){
      throw "Could not update animal.";
    }
    return await exportedMethods.get(id);
  },
  async getAll(){
    const animalCollection = await animals();
    const animalList = await animalCollection.find({}).toArray();
    return animalList;
  }

};

module.exports = exportedMethods;
