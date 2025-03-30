$(document).ready(function() {
	
});

$(document).on("click", "#exportToExcelForSales", function(){
	
	$("#exportToExcelSales").modal("show");
	
});
$(document).on("click", "#exportAsExcelSales", function(){
	
	
	var eDate = new Date($("#endDateSales").val());
	var sDate = new Date($("#startDateSales").val());
	
	if(NotAllowedNullVal("#errSelExcel","Start Date",$('#startDateSales')))
		if(NotAllowedNullVal("#errSelExcel","End Date",$('#endDateSales')))
			if(sDate < eDate){
				
				var data = { 
						startDate 	: $("#startDateSales").val(),
						endDate 	: $("#endDateSales").val()
			 	};
				
				$.ajax({
					url  : "requestSalesOrderA_forExcel?"+new Date().getTime(),
					type : 'POST',
			    	data : {
			    		"dataVal" : JSON.stringify(data)
				     },
					success : function(res) {
						
						console.log(res);
						
						var CtrObj = $.parseJSON(res);
						
						console.log(CtrObj);
						console.log(CtrObj.result);
						
							
						window.location.href = "exportAsExcelSales?ExcelFilePath="+CtrObj.result;
						
						$("#exportToExcelSales").modal("hide");
					}
				});
				
			}else{
					$("#errSelExcelSales").empty();
					$("#errSelExcelSales").append("Please ensure that the End Date is greater than or equal to the Start Date.");
				return false;
		    }
});



$(document).on("click", "#exportToExcelForService", function(){
	
	$("#exportToExcelService").modal("show");
	
});
$(document).on("click", "#exportAsExcelService", function(){
	
	
	var eDate = new Date($("#endDateService").val());
	var sDate = new Date($("#startDateService").val());
	
	if(NotAllowedNullVal("#errSelExcel","Start Date",$('#startDateService')))
		if(NotAllowedNullVal("#errSelExcel","End Date",$('#endDateService')))
			if(sDate < eDate){
				
				var data = { 
						startDate 	: $("#startDateService").val(),
						endDate 	: $("#endDateService").val()
			 	};
				
				$.ajax({
					url  : "requestServiceOrderA_forExcel?"+new Date().getTime(),
					type : 'POST',
			    	data : {
			    		"dataVal" : JSON.stringify(data)
				     },
					success : function(res) {
						
						console.log(res);
						
						var CtrObj = $.parseJSON(res);
						
						console.log(CtrObj);
						console.log(CtrObj.result);
						
							
						window.location.href = "exportAsExcelService?ExcelFilePath="+CtrObj.result;
						
						$("#exportToExcelService").modal("hide");
					}
				});
				
			}else{
					$("#errSelExcelService").empty();
					$("#errSelExcelService").append("Please ensure that the End Date is greater than or equal to the Start Date.");
				return false;
		    }
});
