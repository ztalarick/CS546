//Zachary Talarick
//9/6/19
//I pledge my honor that I have abided by the Stevens Honor System.

//IMPORT
let arrays = require('./arrayUtils.js');
let strings = require('./stringUtils.js');
let objects = require('./objUtils.js');

//arrayUtils tests

function arrayUtils_head(){
    let pass = false;
  
    try{
	pass = 1 == arrays.head([1, 2, 3]);
    }catch(e){
	pass = false;
    }

    try{//should fail
	arrays.head(); 
	pass = false;
    }catch(e){
	pass = true;
    }

    try{
	arrays.head([]);
	pass = false;
    }catch(e){
	pass = true;
    }	
    return pass;
}

function arrayUtils_last(){
    let pass = false;

    try{
	pass = 1 == arrays.last([3, 2, 1]);
    }catch(e){
	pass = false;
    }

    try{
	arrays.last();
	pass = false;
    }catch(e){
	pass = true;
    }

    try{
	arrays.last("not an array")
	pass = false;
    }catch(e){
	pass = true;
    }

    return pass;
}

function arrayUtils_remove(){
    let pass = false;

    try{
	pass = [5, 6] == arrays.remove([5, 6, 7], 1);
	pass = true;
    }catch(e){
	pass = false;
    }

    try{
	arrays.remove([5, 6, 7], -1)
	pass = false;
    }
    catch(e){
	pass = true;
    }

    try{
	arrays.remove(1, "hi");
	pass = false;
    }
    catch (e){
	pass = true;
    }
    
    return pass;
}

function stringUtils_capitalize(){
	let pass = true;

	try{
		pass =	"Foobar" == strings.capitalize("foobar");
	}catch(e){
		pass = false;
	}
	
	try{
		pass = "Foobar" == string.capitalize("FOOBAR");
	} catch(e){
		pass = false;
	}try{
		string.capitalize(6);
		pass = false;
	}catch(e){
		pass = true;
	}

	return pass;
}




console.log("arrayUtils:");
console.log("Head: " + arrayUtils_head());
console.log("Last: " + arrayUtils_last());
console.log("Remove: " + arrayUtils_remove());

console.log(" ");
console.log("stringUtils: ");
console.log("Capitalize: " + stringUtils_capitalize());






