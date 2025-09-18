function errorBlock(err, msg){
	$(err).empty();
	$("#error_block").show();
	$(err).show();
	$(err).append(msg);
	setTimeout(function(){  $("#error_block").hide(); }, 3000);
}


function successBlock(success, msg){
	$(success).empty();
	$("#success_block").show();
	$(success).show();
	$(success).append(msg);
	setTimeout(function(){  $("#success_block").hide(); }, 3000);
}

function ajaxerrormsg(error){
	var msg = "Something went wrong please contact to Administrator";
	
 	if(error.status == 401) {
		window.location.href =  contextPath;
	} else {
	
	   	if( error.responseJSON != undefined){
			errmssge=error.responseJSON.status;	
		
			if (error.responseJSON.status=="500"){
				msg = error.responseJSON.message ;
			}else{
			 	 msg = error.responseJSON.errors.message;
			}
		} 

   }
    errorBlock("#error_block",  msg) 
}

function ajaxsuccessmsg( msg){
	$("#success_block").empty();
	$("#success_block").append(msg);
	$("#success_block").show();
	setTimeout(function(){  $("#success_block").hide(); }, 3000);
}
