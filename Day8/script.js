$(document).ready(function() {
	 $("#submit-btn").click(function(){ 
  		phoneValidator($("#phone").val());
		emailValidator($("#email").val());
	});
}); 


function phoneValidator(phoneNum) {  
	var phoneTest=phoneNum.split('-');
	if(phoneTest.length !== 3) {
		$("#phone-error").text("invalid number");
	}
	else if((phoneTest[0].length !== 3) || (phoneTest[0] == NaN)) {
		$("#phone-error").text("invalid number");
	}
	else if((phoneTest[1].length !== 3) || (phoneTest[1] == NaN)) {
		$("#phone-error").text("invalid number");
	}
	else if((phoneTest[2].length !== 4) || (phoneTest[2] == NaN)) {
		$("#phone-error").text("invalid number");
	}
	else {
		$("#phone-error").text("valid number");
	}
}


function emailValidator(email) {
	var emailTest = email.split('@');
	if(emailTest.length !==2 ) {
		$("#email-error").text("invalid email");
	}
	else {
		var emailTest2 = emailTest[1].split('.');
		if (emailTest2.length !== 2) {
			$("#email-error").text("invalid email");
		}
		else if(emailTest2[0].length <= 0 || emailTest2[1].length  <= 0) {
			$("#email-error").text("invalid email");
		}
		else {
			$("#email-error").text("valid email");
		}
	}

}