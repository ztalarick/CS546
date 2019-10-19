//Zachary Talarick
// 9/6/2019
//I pledge my honor that I have abided by the Stevens Honor System.

/*
  Functions:
      head
      last
      remove
      range
      countElements
      isEqual
*/

let head = function(arr){
    if(!Array.isArray(arr) || !arr.length){
	throw "Invalid input";
    }
    return arr[0];
}

let last = function(arr){
    if(!Array.isArray(arr) || !arr.length){
	throw "Invalid input"
    }
    return arr[arr.length - 1];
}

let remove = function(arr, index){
    if(!Array.isArray(arr) || !arr.length){
	throw "Invalid array input";
    }
    if(typeof index != 'number'){
	throw "index is not a number";
    }
    if(index > arr.length - 1 || index < 0){
	throw "index out of bounds";
    }

    arr.splice(index, 1);
    return arr;
}

let range = function(end, value){ //TODO: test value as optional
    if(typeof end != 'number' || end <= 0){
	throw "input for end is invalid";
    }
    const result = new Array(end);
    for(let i = 0; i < end; i++){
	if(value != undefined){
	    result[i] = value;
	}else{
	    result[i] = i;
	}
    }
    return result;
}

let countElements = function(arr){
    if(!Array.isArray(arr)){
	throw "input array is invalid";
    }
    let result = {};
    for(let i = 0; i < arr.length; i++){
	if(countElements_helper(result, arr[i])){
	    result[arr[i]] += 1;
	}else{
	    result[arr[i]] = 1;
	}
    }
    return result;
}

let countElements_helper = function(obj, value){ //i figured it out true == true is false
    let result = false;
    const keys = Object.keys(obj);
    if(keys == null){
	return false;
    }
    for(let i = 0; i < keys.length + 1; i++){
	if(keys[i] == value){
	    result = true;
	}
    }
    return result;
}

let isEqual = function(arrayOne, arrayTwo){
    if(!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)){
	throw "bad array input";
    }
    if(arrayOne.length != arrayTwo.length){
	return false;
    }
    let result = true;
    for(let i = 0; i < arrayOne.length; i++){
	if(arrayOne[i] != arrayTwo[i]){
	    result = false;
	}
    }
    return result;
}

//EXPORT
module.exports = {
    head: head,
    last: last,
    remove: remove,
    range: range,
    countElements_helper: countElements_helper,
    countElements: countElements,
    isEqual: isEqual
};

