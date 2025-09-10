var tableData = $('#planningList').DataTable();
		
$(document).ready(function()
{
  	const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    const formattedToday = `${day}-${month}-${year}`;
				
	//	const formattedToday1 = `${year}-${month}-1`;
	
	const firstDayOfMonth1 = `01-${month}-${year}`;
	
    $('#planCalender').val(firstDayOfMonth1);
	$('#planCalender1').val(formattedToday);
			
	getUnitList("sel");
	getPlanningList();
				
			
	$('#planCalender').on('change', function (e) 
	{
		var frmdate=$(this).val();
		$("#planCalender1").attr("min", frmdate);
		//$("#myDateField").attr("min", "2023-01-01");
	});
	
	
	$(".bd-example-modal-lg").modal('show');
			
					
});

			

		
		
$(document).on("change", "#selUnit", function(e){
	 
	   var optionSelected = $("option:selected", this);
	     unitid = this.value;
		// alert(unitid)
		getWorkCentreList("sel");
		
		getFilterPlanningList();
		
		//getUnitShifts();	
});			


$(document).on("change", "#selWorkCentre", function(e){
		getFilterPlanningList();
});			


$(document).on("change", "#planCalender", function(e){
		getFilterPlanningList();
});

$(document).on("change", "#planCalender1", function(e){
				getFilterPlanningList();
});

$(document).on("change", "#txtTimePerShift", function(e){
	getFilterPlanningList();
});
		
			
			
function getFilterPlanningList(){  
	
	var dataVal = 
	{
		 fromdate		: StringToDateDDMMYYYY_to_YYYYMMDD($('#planCalender').val()),
		// workcenterid 	: $('#selWorkCentre').val(),
		 todate			: StringToDateDDMMYYYY_to_YYYYMMDD($('#planCalender1').val()),
		 unitid       	: $('#selUnit').val(),
		// shiftid       	: 0,
	};
			
//	if ($.fn.DataTable.isDataTable('#planningList')) {
	//    $('#planningList').DataTable().destroy();
	//}
		
	console.log("-------------------Welcome to product getplanningList---------",dataVal);
	$.ajax({
	    type: 'POST',
	    url: server_url + "production/getTotalProdReport",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: "application/json; charset=utf-8",
	    data: JSON.stringify(dataVal),
		
		success: function (response) {		

		console.log("------response data getTotalProdReport ----------",response);

		var data = response.payload;
		console.log("------getPOList data----------",data);
//		console.log("------getPOList data.result----------",data.result);
	
		tableData.destroy();
        $('#planningList.tbody').empty();
		
        //if(data.result == "success"){
			
        var editIcon = function ( data, type, row ) 
        {
		    if ( type === 'display' ) {
		   	 	return '<span class="button" data-toggle="modal" data-target="#edit_po"> Edit </span>';
		    }
	    	return data;
	    };
	    
	    tableData = $('#planningList').DataTable( {
			dom: 'Blfrtip',   
			buttons: ['excel', 'print'],
		 	destroy: true,
			data: data,
			//fixedHeader: true,
			scrollX: true,
		//	responsive: false,
	
			columns: [
				{ "data": "unitname" },
			    { "data": "wcname" },
				{ "data": "shiftname" }, 
				{ "data": "availability_drawing" },
				{ "data": "availability_guages" },
				{ "data": "availability_inpectiontime" },
				{ "data": "availability_inspection" },
				{ "data": "availability_lunchtime" },
				{ "data": "availability_machinebreakdown" },
			    { "data": "availability_nolabour" },
				{ "data": "availability_nomaterial" },
				{ "data": "availability_otherlosses" },
			    { "data": "availability_overtime" },
				{ "data": "availability_per" },
				{ "data": "availability_reviewtime" },
				{ "data": "availability_setupchange" },
			    { "data": "availability_specloss" },
				{ "data": "availability_stdloss" },
				{ "data": "availability_teatime" },
				{ "data": "availability_time" },
				{ "data": "availability_tooling" },
				{ "data": "availability_totaltime" },
				{ "data": "availability_totloss" },
				{ "data": "company" },
			    { "data": "proddate" },
				{ "data": "productivity_production_qty" },
				{ "data": "productivity_per" },
			    { "data": "productivity_personnal" },
				{ "data": "productivity_rework" },
				{ "data": "productivity_searching" },
				{ "data": "productivity_standard_qty" },
			    { "data": "rejection_ok_qty" },
				{ "data": "rejection_per" },
				{ "data": "rejection_rejection_qty" },
			    { "data": "oee_per" },
				{ "data": "achievement_per" },
				{ "data": "productivity_production_availabletime_qty" },
				{ "data": "productivity_total_utilised_time" },
				{ "data": "quality_per" },
			    { "data": "tot_planned_mins" },
				{ "data": "qty_planned" },
				{ "data": "qty_produced" },
			    { "data": "qty_rejected" },
				{ "data": "cycletime" },
				{ "data": "setuptime" },				
				{ "data": "mins_planned" },
				
				/*mp.from_date ,mp.to_date ,
				mp.time_per_shift ,mpsw.cycletime,mpsw.itemtimeutilised,mpsw.machinetimeutilised,
				mpsw.plannedmins,mpsw.plannedquantity,mpsw.setuptime*/
				
			/*	{ "data":  null,
	           		render: function (data, type, row) {
	               		var id = data.id;
		               var action = // `<a  class="edit-button" id=${id}>Edit</a>
					   `<a  class="edit-button" id=${id}>View </a>
		                                   <a  class="delete-button" id=${id}>${data.isdeleted}</a> `;
	              	 	return action;
	           		},
	         	},*/
			
            ],
            "order": [[0, 'desc']],
			} );
		}
	})
//		});
}
				//get planning list
	
			//get  list
function getPlanningList(){  

	console.log("-------------------Welcome to product getplanningList");
	$.ajax({
		    type: 'GET',
		    url: server_url + "planning/getTotalPlanningReport",
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: false,
		    data: null,
		    success: function (response) {		

			console.log("------response data----------",response);


			var data = response.payload;

			console.log("------total plan details data----------",data);
	//		console.log("------getPOList data.result----------",data.result);
	//		
		
			tableData.destroy();
	        $('#planningList.tbody').empty();
			
	        //if(data.result == "success"){
				
	        var editIcon = function ( data, type, row ) 
	        {
			    if ( type === 'display' ) {
			           
			   	 	return '<span class="button" data-toggle="modal" data-target="#edit_po"> Edit </span>';
			        
			    }
		       
		    	return data;
		    };
					    
		    tableData = $('#planningList').DataTable( {
    			dom: 'Blfrtip',   
    			buttons: ['excel', 'print'],
			 	 destroy: true,
				 data: data,

				  columns: [
					{ "data": "from_date" },
				    { "data": "to_date" },
				    { "data": "from_date" },
		            { "data": "from_date" },
		            { "data": "from_date"},
		            { "data": "from_date" },
			   
					{ "data": "from_date" },
				    { "data": "to_date" },
					{"data": "from_date" },
						            { "data": "from_date" },
						            { "data": "from_date"},
						            { "data": "from_date" },
					
					
			/*		 { "data":  null,
		           render: function (data, type, row) {
		               var id = data.id;
		               var action = //`<a  class="edit-button" id=${id}>Edit</a>
					   `<a  class="edit-button" id=${id}>View </a>
		                                   <a  class="delete-button" plandate=${data.fromdate} id=${id}>${data.isdeleted}</a> `;
		               return action;
		           },
	             },*/
				
	            ],
	            "order": [[0, 'desc']],
			} );
		}
	})
		//		});
}
	//get planning list

			
	//get Customer list
			
			
			
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
	
		console.log("==========response=====",response)
		
			$("#"+divId+"Unit").empty();			
			$("#"+divId+"Unit").append('<option value=' +0+ '>  - All Unit - </option>');
							
			$.each(response.payload, function( index, value ){
							
			$("#"+divId+"Unit").append('<option value="'+ value.id + '">'+ value.name+' </option>');
			
		    });
		}	
	});
}

function getWorkCentreList(divId){
		
	$.ajax({
	    type: 'GET',
	    url: server_url + "workcenter/getWorkcenterByUnit/"+unitid,
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (response) {
	
			console.log("==========response=====",response)
			
			$("#"+divId+"WorkCentre").empty();			
			$("#"+divId+"WorkCentre").append('<option value="0">  - All Workcenter - </option>');
							
			$.each(response.payload, function( index, value ){
							
				$("#"+divId+"WorkCentre").append('<option value="'+ value.id + '">'+ value.name+' </option>');
			
		    });
			
		}	
	});
}			

$(document).on("click", ".edit-button", function(e){
	
	
	/*var today = new Date();
	var plandt = $(this).attr('plandate');
	var compareDate = new Date(plandt);
	
	console.log("plandt"+plandt);
	
	console.log("compareDate"+compareDate);

	
	today.setHours(0, 0, 0, 0);
	compareDate.setHours(0, 0, 0, 0);	
	
	
	if (compareDate > today) {
	       console.log("The string date is in the future.");
	   } else if (compareDate < today) {
	       console.log("The string date is in the past.");
	   } else {
	       console.log("The string date is today.");
	   }
	*/
	
	editId = $(this).attr('id');
	console.log("editId----",editId);
	window.location.href = "editPlanning?planid="+editId;	
	
	
});
			
$(document).on("click", ".delete-button", function(e){
	
	var delId = $(this).attr('id');
	console.log("delId----",delId);
	
	swal({
		  text: "Are you sure, please confirm?",
		  buttons: [
		   'Cancel',
		    'Ok'
		  ],
	  }).then(function (isConfirm) {
     if(isConfirm){
	
		$.ajax({
			    type: 'PUT',
			    url: server_url + "planning/delete/"+delId,
			    enctype: 'application/json',
			    headers: authHeader,
			    processData: false,
			    contentType: false,
			    data: null,
			    success: function (response) {
			
					console.log("==========response=====",response)
					window.location.href = "planning";	
				}	
			});
		
		}
	});
});		