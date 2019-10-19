//I pledge my honor that I have abided by the stevens honor system.
//Zachary Talarick


const questionOne = function questionOne(arr) {
	//sum of squares of an array
	var result = 0;
	for(let i = 0; i < arr.length; i++){
		result += arr[i] * arr[i];
	}
	return result;
}

const questionTwo = function questionTwo(num) { 
	//fibonacci numbers
	if(num <= 1){
		return num;
	}
	return questionTwo(num - 1) + questionTwo(num - 2);
}

const questionThree = function questionThree(text) {
	//returns the number of vowels in 'text'
	var count = 0;
	for(let i = 0; i < text.length; i++){
		if(text.charAt(i) == 'A' || text.charAt(i) == 'E' || text.charAt(i) == 'I' || text.charAt(i) == 'O' || text.charAt(i) == 'U' || text.charAt(i) == 'a' || text.charAt(i) == 'e' || 			text.charAt(i) == 'i' || text.charAt(i) == 'o' || text.charAt(i) == 'u'){
			count += 1;
		}
	}
	return count;
}

const questionFour = function questionFour(num) {
    	//factorial
	if(num < 0){
		return NaN;
	}
	
	var result = 1;
	for(let i = num; i >= 1; i--){
		result *= i;
	}
	return result;
}

module.exports = {
    firstName: "Zachary", 
    lastName: "Talarick", 
    studentId: "10428753",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};


