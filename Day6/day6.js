function average(numbers_list) {
	var sum = 0;
	for(var i = 0; i < numbers_list.length; i++) {
		sum += numbers_list[i];
	}
	var average = sum / numbers_list.length;
	return average;
}

function assignGrade(grade) {
	if(grade < 60) {
		return 'F';
	}
	else if(grade >= 60 && grade < 70) {
		return 'D';
	}
	else if(grade >= 70 && grade < 80) {
		return 'C';
	}
	else if(grade >= 80 && grade < 90) {
		return 'B';
	}
	else if(grade >= 90) {
		return 'A';
	}
}

function pluralize(num, noun) {
	if(num > 1) {
		return num + " " + noun + "s";
	}
	else
		return num + " " + noun;
}

function longestWord(sentence) {
	var splitSentence = sentence.split(" ");
	var currLongestWord = "";
	var currLongestLength = 0;
	for (var i = 0; i < splitSentence.length; i++) {
		var tempLength = splitSentence[i].length;
		if(tempLength > currLongestLength) {
			currLongestLength = tempLength;
			currLongestWord = splitSentence[i];
		}
	}
	return currLongestWord;
}

function palindrome(word) {
	var len = word.length;
	for (var i = 0; i < Math.floor(len/2); i++) {
		if (word[i] !== word[len - 1 - i]) {
			return "no";
		}
	}
	return "yes";
}

function letterCounter(phrase, letter) {
	var currCount = 0;
	for(var i = 0; i < phrase.length; i++) {
		if(phrase[i] === letter)
			currCount++;
	}
	return currCount;
}

function longestPalindrome(sentence) {
	var longest = longestWord(sentence);
	if(palindrome(longest) === "yes") {
		return longest + " is a palindrome";
	}
	else {
		return longest + " is not a palindrome";
	}
}

function doItTwice(f) {
	var a = f();
	var b = f();
	return a + b;
}

function objectFun(first, last, age, email, color) {
	var person = {
		first_name: first,
		last_name: last,
		age: age,
		email: email,
		fav_color: color
	}
	return person;
}

function numChildren(obj) {
	var children = obj["children"];
	return children.length;
}

function greeting(name) {
	return "Hello, " + name + "!";
}

function sayHello(first, last, greet) {
	var name = first + " "  + last;
	return greet(name);
}

function goodnight(name) {
	return "Goodnight, " + name + "!";
}

function sayGoodnight(name, status, message) {
	if(status === "Morning") {
		return "It's not bedtime!";
	}
	else {
		return message(name);
	}

}
