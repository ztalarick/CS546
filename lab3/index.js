//Zachary Talarick
//I pledge my honor that I have abided by the Stevens Honor System
// 9/14/19
const axios = require('axios');

async function getJson(url) {
  const { data } = await axios.get(url);
  return data;
}

async function getPersonById(index){
  let people = await getJson('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  if (typeof index != "number" || index == null || index < 0 || index > people.lenth){
      throw "Bad index input";
  }
  return people[index].firstName + " " + people[index].lastName;
}


async function lexIndex(index){
  let people = await getJson('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  if(typeof index != "number" || index == null || index < 0 || index > people.length){
    throw "Bad index input";
  }

  //let sorted = people.sort(function(a,b){return a.lastame - b.lastName});
  let sorted = []
  for (let name in people) {
    sorted.push([people[name].firstName, people[name].lastName])
  }
  sorted.sort(function(a, b){
    return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;

  });
  return sorted[index][0] + " " + sorted[index][1];
}

async function firstNameMetrics(){
  let people = await getJson('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  let result = {
    "totalLetters": 0,
    "totalVowels": 0,
    "totalConsonants": 0,
    "longestName": " ",
    "shortestName": " "
  }
  let currentShortest = 50;
  let currentLongest = 0;
  let currentLength = 0;
  for(let i = 0; i < people.length; i++){
    for(let char in people[i].firstName){
      result.totalLetters++;
      if(people[i].firstName.charAt(char) == 'a' || people[i].firstName.charAt(char) == 'A' || people[i].firstName.charAt(char) == 'e' ||
      people[i].firstName.charAt(char) == 'E' || people[i].firstName.charAt(char) == 'i' || people[i].firstName.charAt(char) == 'I' ||
      people[i].firstName.charAt(char) == 'o' || people[i].firstName.charAt(char) == 'O' || people[i].firstName.charAt(char) == 'u' || people[i].firstName.charAt(char) == 'U'){
        result.totalVowels++;
      }else{
        result.totalConsonants++;
      }
      currentLength++;
    }
    if(currentLength > currentLongest){
      currentLongest = currentLength;
      result.longestName = people[i].firstName;
    }
    if(currentLength < currentShortest){
      currentShortest = currentLength;
      result.shortestName = people[i].firstName;
    }
    currentLength = 0;
  }
  return result;
}

async function shouldTheyGoOutside(firstName, lastName){
  let people = await getJson('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  let weather = await getJson('https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json');
  if(firstName == null || typeof firstName != "string"){
    throw "Bad input for firstName";
  }
  if(lastName == null || typeof lastName != "string"){
    throw "Bad input for lastName";
  }
  let personNotFound = true;
  let i = 0;
  while (personNotFound) {
    if (people[i].firstName == firstName && people[i].lastName == lastName) {
      personNotFound = false;
      break;
    }
    i++;
    if (i > people.length) {
      break;
    }
  }
  if (personNotFound) {
    throw "Error no such person";
  }

  let zip = people[i].zip;
  let zipNotFound = true;
  let j = 0;
  while(zipNotFound){
    if (zip == weather[j].zip) {
      zipNotFound = false;
      break;
    }
    j++;
    if(j > weather.length){
      break;
    }
  }
  if (zipNotFound) {
    throw "zip not found";
  }
  if(weather[j].temp >= 34){
    return "Yes, " + firstName + " should go outside.";
  }else{
    return "No, " + firstName + " should not go outside";
  }
}

async function whereDoTheyWork(firstName, lastName){
  let people = await getJson('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  let work = await getJson('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json');
  if(firstName == null || typeof firstName != "string"){
    throw "Bad input for firstName";
  }
  if(lastName == null || typeof lastName != "string"){
    throw "Bad input for lastName";
  }
  let personNotFound = true;
  let i = 0;
  while (personNotFound) {
    if (people[i].firstName == firstName && people[i].lastName == lastName) {
      personNotFound = false;
      break;
    }
    i++;
    if (i > people.length) {
      break;
    }
  }
  if (personNotFound) {
    throw "Error no such person";
  }
  let ssn = people[i].ssn

  let j = 0;
  while(true){
    if(work[j].ssn == ssn){
      break;
    }
    j++;
    if(j > work.length){
      throw "ssn not found in work.json";
    }
  }
  if(work[j].willBeFired){
    return firstName + " " + lastName + " - " + work[j].jobTitle + " at " + work[j].company + ". They will be fired.";
  }else{
    return firstName + " " + lastName + " - " + work[j].jobTitle + " at " + work[j].company + ". They will not be fired.";
  }
}

async function findTheHacker(ip){
  let people = await getJson('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  let work = await getJson('https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json');
  if(ip == null || typeof ip != "string"){
    throw "bad string input";
  }

  let i = 0;
  while (true) {
    if(ip == work[i].ip){
      break;
    }
    i++;
    if(i > work.length) {
      throw "IP adress not in work.json";
    }
  }
  let ssn = work[i].ssn;
  let j = 0;
  while(true){
    if(ssn == people[j].ssn){
      break;
    }
    j++;
    if(j > people.length){
      throw "ssn not in people.json";
    }
  }
  return people[j].firstName + " " + people[j].lastName + " is the hacker!";
}

async function test() {
  let result1 = await getPersonById(42);
  console.log(result1);

  let result2 = await lexIndex(2);
  console.log(result2);

  let result3 = await firstNameMetrics();
  console.log(result3);

  let result4 = await shouldTheyGoOutside("Scotty", "Barajaz");
  console.log(result4);

  try{
    let result5 = await shouldTheyGoOutside("Bob", "Smith");
  }catch(e){"Hank", "Tarling"
    console.log("good");
  }

  let result6 = await shouldTheyGoOutside("Calli", "Ondrasek");
  console.log(result6);

  let result7 = await whereDoTheyWork("Demetra", "Durrand");
  console.log(result7);

  let result8 = await whereDoTheyWork("Hank", "Tarling");
  console.log(result8);

  try {
    let result9 = await whereDoTheyWork("bob", "smith");
  } catch (e) {
    console.log("good");
  }

  let result10 = await findTheHacker("79.222.167.180");
  console.log(result10);
}

test();

//exports
module.exports = {
  getPersonById: getPersonById,
  lexIndex: lexIndex,
  firstNameMetrics: firstNameMetrics,
  shouldTheyGoOutside: shouldTheyGoOutside,
  whereDoTheyWork: whereDoTheyWork,
  findTheHacker: findTheHacker
};
