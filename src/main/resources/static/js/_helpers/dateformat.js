function  DateformatedYYYYMMDD_to_DDMMYYYY(data){
	return moment(data).format("DD-MM-YYYY");
}


function  DateformatedDDMMYYYY_to_YYYYMMDD(data){
	return moment(data).format("YYYY-MM-DD");
}

function  StringToDateDDMMYYYY_to_YYYYMMDD(dateString){
	// var dateString = "23-10-2025"; // Example date string in dd-mm-yyyy format
	var dateParts = dateString.split("-");
	
	// Note: Month in JavaScript Date object is 0-indexed (0 for January, 11 for December)
	var day = parseInt(dateParts[0], 10);
	var month = parseInt(dateParts[1], 10) - 1; // Subtract 1 for 0-indexed month
	var year = parseInt(dateParts[2], 10);
	
	var dateObject = new Date(year, month, day);
	
	console.log("===========StringToDateDDMMYYYY_to_YYYYMMDD================",dateObject);
	
	
	var dateObject1 = DateformatedDDMMYYYY_to_YYYYMMDD(dateObject)
	
	console.log("===========dateObject1================",dateObject1);
	
	return dateObject1;
}