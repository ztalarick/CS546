//I pledge my honor that I have abided by the Stevens Honor System
//Zachary Talarick
// 9/24/19

const collections = require("./collections");
const animals = collections.animals;

async function get(id){
  if(id == null){
    throw "Bad input for ID.";
  }
  const animalCollection = await animals();
  const animal = await animalCollection.findOne({_id: id});
  if(animal === null){
    throw "No animal with that ID.";
  }
  return animal;
}


async function create(name, animalType){
  if(name == null || typeof name != "string"){
    throw "Bad input for name";
  }
  if(animalType == null || typeof animalType != "string"){
    throw "Bad input for animal type.";
  }
  const animalCollection = await animals();
  let newAnimal = {
    name: name,
    animalType: animalType
  };

  const insertInfo = await animalCollection.insertOne(newAnimal);
  if(insertInfo.insertCount === 0){
    throw "Coulnd't add animal";
  }
  const id = insertInfo.insertedId;
  const animal = await this.get(id);
  return animal;
}

async function getAll(){
  const animalCollection = await animals();
  const allAnimals = await animalCollection.find({}).toArray();
  return allAnimals;
}

async function remove(id){
  if (id == null) {
    throw "Bad input for ID.";
  }

  const animalCollection = await animals();

  let animal = await get(id);


  const deletionInfo = await animalCollection.removeOne({_id: id});
  if(deletionInfo === 0){
    throw "Error removing";
  }

  let result = {
    "deleted": true,
    "data": animal
  };

  return result;
}

async function rename(id, newName){
  if(id == null){
    throw "Bad iput for ID.";
  }
  if(newName == null || typeof newName != "string"){
    throw "Bad input for new name.";
  }
  const animalCollection = await animals();

  let animal = await get(id);

  const newAnimal = {
    name: newName,
    animalType: animal.animalType
  };

  const updateInfo = await animalCollection.updateOne({ _id: id }, { $set: newAnimal });
  if(updateInfo === 0){
    throw "Could not update animal.";
  }
  return await this.get(id);
}

async function removeAll(){
  const animalCollection = await animals();
  const removeInfo = await animalCollection.deleteMany({});
  return true;
}

module.exports = {
  get: get,
  create: create,
  getAll: getAll,
  remove: remove,
  rename: rename,
  removeAll: removeAll
};
