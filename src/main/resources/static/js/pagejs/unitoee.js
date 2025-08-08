var delProdID = "";
var editProdID = "";
var tableData = $('#unitOeeList').DataTable();
var editId;
var unitid;
		
$(document).ready(function(){
	
	getUnitList("add");	
	const today = new Date();
	const year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();

	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;

	const formattedToday = `${year}-${month}-${day}`;
	
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	let day1=1;
	
	const firstDayOfMonth1 = `${year}-${month}-01`;
	
	$('#prodDatefrm').val(firstDayOfMonth1);		 
	$('#prodDateto').val(formattedToday);
				
	$('#addUnit').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	     unitid = this.value;
		//	getWorkCentreList("add");
		//	getUnitShifts();	
		getFilterPlanOverviewList();
	});

	$(document).on("change", "#prodDatefrm", function(e){
		getFilterPlanOverviewList();
	});

	$(document).on("change", "#prodDateto", function(e){
		getFilterPlanOverviewList();
	});
});
			
function getUnitList(divId){
		
	$.ajax({
	    type: 'GET',
	    url: server_url + "unit/getActive",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (response) {
	
			$("#"+divId+"Unit").empty();			
			$("#"+divId+"Unit").append('<option value=' + 0+ '>  - Select Unit - </option>');
							
			$.each(response.payload, function( index, value ){
							
			$("#"+divId+"Unit").append('<option value="'+ value.id + '">'+ value.name+' </option>');
			
		    });
		}	
	});
}
				
function getFilterPlanOverviewList(){  
		
		var dataVal = 
		{
			 unitid       	: $('#addUnit').val(),
			 fromdate		: $('#prodDatefrm').val(),						 
			 todate			: $('#prodDateto').val(),
		};
					
		$.ajax({
		    type: 'POST',
		    url: server_url + "production/getUnitOee",
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: "application/json; charset=utf-8",
		    data: JSON.stringify(dataVal),
			
			success: function (response) {		

			var data = response.payload;
			
			tableData.destroy();
       		$('#unitOeeList.tbody').empty();

    		tableData = $('#unitOeeList').DataTable( {
	
				dom: 'Blfrtip',   
				buttons: ['excel', 'print'],
		 	 	destroy: true,
			 	data: data,
				columnDefs: [{
			         "targets": "_all",
			         "defaultContent": ""
			     }],
			  	columns: [
					 { "data": "workcentername" },
				     { "data": "avroeeper" ,
					    "render": function ( data, type, row, meta ) {
		                  	return data+" %";
			    		},
		    		  }
	            ],
	            "order": [[0, 'desc']],
			});
		}
	})
}												