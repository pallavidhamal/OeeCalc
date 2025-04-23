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

