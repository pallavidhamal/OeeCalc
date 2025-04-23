
function bootstrapSelect(divID){
	
	console.log("--bootstrapSelect--divID---",divID);
	
	// $("#"+divID).selectpicker();
	
	$("#"+divID).selectpicker('refresh');
	
	$("#"+divID).selectpicker({
	    dropupAuto: false
	});
	
}