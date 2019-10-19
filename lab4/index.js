//I pledge my honor that I have abided by the Stevens Honor System
//Zachary Talarick
// 9/24/19

const animals = require("./data/animals.js");

async function main(){
  //const removeAll = animals.removeAll(); //for testing

  const sasha = await animals.create("Sasha", "Dog");
  console.log(sasha);

  const lucy = await animals.create("Lucy", "Dog");

  let all = await animals.getAll();
  console.log(all);

  const duke = await animals.create("Duke", "Walrus");
  console.log(duke);

  const rename = await animals.rename(sasha._id, "Sashita");
  console.log(rename);

  const remove = await animals.remove(lucy._id);
  console.log(remove);

  all = await animals.getAll();
  console.log(all);

  return null;
}

main();
