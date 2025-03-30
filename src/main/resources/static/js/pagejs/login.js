	
var forgetEmailModal = "#forget-email-modal";

console.log("--------LOGIN PAGE---------");
var ErrorDivName;
var PFlag1 = "";


// Local URL
//var url="http://125.99.153.126:8085/Eci/Eci/";
//var url1="http://125.99.153.126:8085/Eci/Eci/";


var url = "http://192.168.29.26:8082/Eci/Eci/";
var url1 = "http://192.168.29.26:8082/Eci/Eci/";


// Test Server URL
/*var url="http://125.63.89.98:8080/Eci";
var url1="http://125.63.89.98:8080/Eci";
*/

//var URL = "http://125.63.89.98:8080/Eci/Eci/";


//var URL = "http://101.53.136.239:4443/Eci/Eci/";
//var url1="http://101.53.136.239:4443/Eci/Eci/";

//var URL="https://proapp.co.in/Eci/Eci/";
//var url1="https://proapp.co.in/Eci/Eci/";

$(document).ready(function() {
	
	
	
	PFlag1 = getParameterByName('PFlag'); // function defn in common_Rep js
	
	if(PFlag1 == "cp"){
		
		$("#passwordValidate").append("Your Password has been changed, Login Again");
		
	}else{
		$("#passwordValidate").empty();
	}
	
	
	$("#password").keyup(function(event) {
		//alert("hiiiiiii");
		
	    if (event.keyCode === 13) {
	        $("#adminLoginAction-js-login").click();
	    }
	    
	    

	    
	    
	    
	});
	function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
	

	$("#adminLoginAction-js-login").bind("click",function() {
		var url="";
		ErrorDivName = "#logInPageErrorMsg";
		$(ErrorDivName).empty();
		//$(ErrorDivName).append("Your Password has been changed, Login Again");
		
		var username 	= $('#username').val();
		var password 	= $('#password').val();
		
		console.log("username is : ",username);
		console.log("password is : ",password);
		
		if(NotAllowedNullVal(ErrorDivName,"Username ",$('#username')))
			if(NotAllowedNullVal(ErrorDivName,"ColumnName",$('#password'))){
				
				/*  by ashwini
				 * check login api is working but because of session not set not working*/
				  
				var dataval = {
							"userName":$('#username').val(),
							"password":$('#password').val()
							}
				console.log("dataval dataval== : ",dataval);
				console.log("dataval dataval==url : ",url1);
				
				
				 $.ajax({

						type: 'POST',
						url: url1+"checkLoginCredential",  //from API on click of edit icon
						data : JSON.stringify(dataval),
						contentType: "application/json",

						success: function(data) {
							
							console.log("checkLoginCredential--Information auth key===",data.authkey);
							console.log("checkLoginCredential--Information role===",data.role);
							console.log("checkLoginCredential--Information role===",data.result);   // if true successfule login
							//result= result.length
							//var btrue = new Boolean(result);
							//console.log("checkLoginCredential--Information result===",btrue,result.length);
							//if(btrue==true){
							if(data.result===true){
								console.log("if   hiiiiiiiiiii===");					
								
								
								//check for roles PM/HPM/admin and accordingly forward pages
								
								if(data.role=="Admin")
								{
									url="MenuPage";
								}
								if(data.role=="PM")
								{									
									url="Summary";								
								}
								if(data.role=="SI Co-Ordinator")
								{									
									url="SITaskStatus";								
								}
								if(data.role=="HPM")
								{
									url="ApproveHPM";
								}
								if(data.role=="Customer")
								{
									url="CustomerHReports";
								}
								if(data.role=="Quality")
								{
									url="QualityReports";
								}
								
								localStorage.setItem("authkey", data.authkey);
								localStorage.setItem("role", data.role);
								localStorage.setItem("uname", data.uname);
								localStorage.setItem("userId", data.userId);
								
							//	setSession(data.uname,url);
								
								window.location.href = url;
								
							}else{
								
								console.log("if   hiiiiiiiiiii hhrhr===");	
								$(ErrorDivName).empty();
								$(ErrorDivName).append("Please enter valid Email ID or Password");
							}
							
						}, 
				 });
				
			
		}
	});
});



function setSession(username,url)
{
	
	$.ajax({
		type : "POST",
		url  : "setSessionValue?"+new Date().getTime(),
		data : "userName="+username		  ,
		success : function(result) {
			
			window.location.href = url;
			
			result= result.trim();
			
		},
	});
	
	
}

$(document).on("click", "#forgetPassBtn", function() {
	
	$("#forget-email").val("");
	$("#forgetEmailErrorMsg").empty();
	
	$('#forget-email-modal').modal('show'); 
	
	
});

/* **************************** Forget password *************************************** */

$(document).on("click", "#forget-submit-btn", function() {

	ErrorDivName = "#forgetEmailErrorMsg";
	
	
	if(EmailValidation(ErrorDivName,"Email ID",$('#forget-email'))){
		$.ajax({
			 url: "adminForgetPwd?"+new Date().getTime(),
		     type: "Post",
		     data: {
		    	 		"forgetEmail" : $("#forget-email").val(),
		    },
		     success: function(data){
		    	 console.log("data : ",data);
		    	 data = data.trim()
		    	 if(data == null || data == ""){
		    		console.log("empty object show error message...");
		    	 }
		    	 else{
		    		 	//showForgetMailResponseData(data);
		    		 if(data == "success"){
		    			 $(ErrorDivName).append("Your Lab India new password has been sent to your email.");
		    				setTimeout(modeHide, 2000, forgetEmailModal);
		    				
		    		 }
		    	 }
		    	 
		     },
		     error: function (e) {
		    	  console.log("here error",e);
		     }
		     ,async:false
	   });
	}
});
/* **************************** End *************************************** */
