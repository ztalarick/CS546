//I pledge my honor that I have abided by the Stevens Honor System.
//Zachary Talarick
// 9/8/2019

/*
  Functions:
      capitalize
      repeat
      countChars
*/

//import for countChars
let arrays = require('./arrayUtils.js');

let capitalize = function(string){ 
    if(typeof string != "string"){
	throw "bad string input";
    }
	return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

let repeat = function(string, num){
    if(typeof string != "string"){
	throw "bad string input";
    }
    if(typeof num != "number" || num < 0){
	throw "bad number input";
    }
    let result = "";

    for(let j = 0; j < num; j++){ 
	for(let i = 0; i < string.length; i++){
	    result += string[i];
	}
    }
    return result;
}

let countChars = function(string){
    if(typeof string != "string"){
	throw "bad string input";
    }
    return arrays.countElements(Array.from(string));
}

//EXPORT

module.exports = {
    capitalize: capitalize,
    repeat: repeat,
    countChars: countChars
};
