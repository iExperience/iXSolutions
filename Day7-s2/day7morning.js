function getFormValues() {
	console.log(document.getElementById("first").value);
	console.log(document.getElementById("last").value);
}

function changeColor() {
	document.getElementById("color-div").style.color = "red";
}

function toggleImage() {
	document.getElementById("lightbox").classList.toggle("isVisible");
}

document.getElementById("name-btn").onclick = function() {
	getFormValues();
};

document.getElementById("color-btn").onclick = function() {
	changeColor();
};

document.getElementById("image-btn").onclick = function() {
	toggleImage();
};

document.getElementById("screen").onclick = function() {
	toggleImage();
}