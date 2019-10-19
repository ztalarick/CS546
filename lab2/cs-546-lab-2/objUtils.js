//Zachary Talarick
// 9/9/19
//I pledge my honor that I have abided by the stevens honor system.

let arrays = require('./arrayUtils.js'); //for countElements_helper

let extend = function(... args){
	let result = {};
	if(args.length < 2){
		throw "not enough args";
	}
	for(let i = 0; i < args.length; i++){
		if(typeof args[i] != "object"){
			throw "not an object";
		}
		let keys = Object.keys(args[i]);
		for(let j = 0; j < keys.length; j++){
			if(!arrays.countElements_helper(result, keys[j])){
				result[keys[j]] = args[i][keys[j]];
			}
		}
	}

	return result;
}

let smush = function(... args){
	let result = {};
	if(args.length < 2){
		throw "not enough args";
	}
	for(let i = 0; i < args.length; i++){
		if(typeof args[i] != "object"){
			throw "not an object";
		}
		let keys = Object.keys(args[i]);
		for(let j = 0; j < keys.length; j++){
			result[keys[j]] = args[i][keys[j]];
		}
	}

	return result;
}

let mapValues = function(obj, func){
	let result = {};
	if(typeof obj != 'object' || typeof func != "function"){
		throw "bad input";
	}
	let values = Object.values(obj);
	let keys = Object.keys(obj);

	for(let i = 0; i < keys.length; i++){
		result[keys[i]] = func(values[i]);
	}
	return result;
}

module.exports = {
	extend: extend,
	smush: smush,
	mapValues: mapValues
};
