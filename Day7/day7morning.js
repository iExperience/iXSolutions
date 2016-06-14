function getFormValues() { 
	var x=document.getElementById("form1");  		
	for (var i=0;i<x.length;i++) {  		
		if (x.elements[i].value!='Submit') {    		
			console.log(x.elements[i].value);  		
		}		
	}		
	}		
		
function changeColor() {	
	var x = document.getElementById("color-div");
	x.style.color = "red";		
}