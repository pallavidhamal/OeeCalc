			
var delProdID = "";
var editProdID = "";
var tableData = $('#prodList').DataTable();
var editId;
var unitid;

const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;

const formattedToday = `${day}-${month}-${year}`;

const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let day1=1;

const firstDayOfMonth1 = `01-${month}-${year}`;

console.log("firstDayOfMonth1-",firstDayOfMonth1);
console.log("formattedToday-",formattedToday);

$('#prodDatefrm').val(firstDayOfMonth1);		 
$('#prodDateto').val(formattedToday);


$(document).ready(function(){
	
	//getUnitList("add");	
	
	if(role=="AA" || role=="MAU"){
		getUnitList("add");
	}
				
	if(role=="PRU"){
		 var unitString = localStorage.getItem("set") ; 
		 console.log("===========unitString============", unitString);
		 var unitArray = unitString.split("#")
		 
		 console.log("===========unitArray============", unitArray);
		 $("#addUnit").empty();
		 $("#addUnit").append('<option value="'+ unitArray[0] + '">'+ unitArray[1]+' </option>');
		 $("#addUnit").prop("disabled", true);
		 
		 unitid = unitArray[0];
		 
		 $("#addWorkCenter").empty();
		 $("#addWorkCenter").append('<option value="'+ unitArray[2] + '">'+ unitArray[3]+' </option>');
		 $("#addWorkCenter").prop("disabled", true);
		 
		 var wsid = unitArray[2] ;
		 getMachinesByWc(wsid); 
		 
		getUnitShifts();	
		getFilterProductionList();
	}
getOpertors();
getPOList();

});
				
$('#addUnit').on('change', function (e) {
    var optionSelected = $("option:selected", this);
     unitid = this.value;
	getWorkCentreList("add");
	getUnitShifts();	
	getFilterProductionList();
});

$('#addWorkCenter').on('change', function (e) {
	 var optionSelected = $("option:selected", this);
	 var wsid = this.value;
	 getMachinesByWc(wsid);
	 getFilterProductionList();
		
});				
$(document).on("change", "#addShift", function(e){
	getFilterProductionList();
});


$(document).on("change", "#addSelMachine", function(e){
	getFilterProductionList();
});

$(document).on("change", "#addOperator", function(e){
	getFilterProductionList();
});				

$(document).on("change", "#prodDatefrm", function(e){
	getFilterProductionList();
});

$(document).on("change", "#prodDateto", function(e){
	getFilterProductionList();
});
			
$(document).on("click", "#addProduction", function(e){
	window.location.href = "addProduction";	
});
$(document).on("click", ".edit-button", function(e){
	editId = $(this).attr('id');
	console.log("editId----",editId);
	window.location.href = "editProduction?prodid="+editId;
});
			
//get purchase order list
function getPOList(){  

	$.ajax({
	    type: 'GET',
	    url: server_url + "production/allproduction",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (response) {		
			console.log("------response data----------",response);
			var data = response.payload;
			console.log("------getPOList data----------",data);
			tableData.destroy();
	        $('#prodList.tbody').empty();
    		tableData = $('#prodList').DataTable( {
			 dom: 'Blfrtip',   
			 buttons: ['excel', 'print'],
		 	 destroy: true,
			 data: data,
			 columnDefs: [{
				         "targets": "_all",
				         "defaultContent": ""
				     }],
			  columns: [
				{ "data": "proddate" ,
					render: function (data, type, row) {
		               	let formatted = moment(data).format("DD-MM-YYYY");
              	 		return formatted;
          	 		},
      	 		},
			    { "data": "unitname" },
			    { "data": "workcentername" },
			    { "data": "shiftname" },
				{ "data": "operatorname" },
			    { "data": "stationname" },
			    { "data": "availabilityper" },
			    { "data": "productivityper" },
				{ "data": "rejectionper" },
				{ "data": "oeeper" },
				{ "data":  null,
		           render: function (data, type, row) {
		               var id = data.id;
		               var action = `<a  class="edit-button" id=${id}>View</a>`;
		               return action;
		           },
	            },
	            ],
	            "order": [[0, 'desc']],
			});
		},
       error: function (error) {
           ajaxerrormsg(error);
       },
	})
}
	//get purchase order list

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
			$("#"+divId+"Unit").append('<option value=' + 0+ '>  - Select Unit - </option>');
							
			$.each(response.payload, function( index, value ){
							
			$("#"+divId+"Unit").append('<option value="'+ value.id + '">'+ value.name+' </option>');
			
		    });
		},
       error: function (error) {
           ajaxerrormsg(error);
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
			$("#"+divId+"WorkCenter").empty();			
			$("#"+divId+"WorkCenter").append('<option value=' + 0+ '>  - Select workcenter - </option>');
			$.each(response.payload, function( index, value ){
				$("#"+divId+"WorkCenter").append('<option value="'+ value.id + '">'+ value.name+' </option>');
		    });
		},
	   error: function (error) {
	       ajaxerrormsg(error);
	   }	
	});
}
	
function getUnitShifts(){
	$.ajax({
       type: "GET",
       url: server_url + `shift/getShiftByUnit/`+unitid,
       enctype: "application/json",
       headers: authHeader,
       processData: false,
       contentType: false,
       data: null,
       success: function (response) {
			$("#addShift").empty();
			shiftOptions='<option value="0">  Select Shift </option>';
			console.log("=====getUnitShifts=======",response)

           for (i = 0; i < response.payload.length; ++i) {
				shiftOptions=shiftOptions+`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`;
           }
		   $("#addShift").append(shiftOptions);
       },
       error: function (error) {
           ajaxerrormsg(error);
       }
   });
}
function getMachinesByWc(wsid) {
	$.ajax({
	   type: "GET",
	   url: server_url + `station/getStationByWc/`+wsid,
	   enctype: "application/json",
	   headers: authHeader,
	   processData: false,
	   contentType: false,
	   data: null,
	   success: function (response) {
			$("#addSelMachine").empty();
			machinesOptions='<option value="0">  Select Station </option>';
	       for (i = 0; i < response.payload.length; ++i) {
				machinesOptions=machinesOptions+`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`;
           }
		   $("#addSelMachine").append(machinesOptions);
		   
       },
       error: function (error) {
           ajaxerrormsg(error);
       }
   });
}			

function getOpertors(){
	$.ajax({
       type: "GET",
       url: server_url + `operator/allActive`,
       enctype: "application/json",
       headers: authHeader,
       processData: false,
       contentType: false,
       data: null,
       success: function (response) {
			$("#addOperator").empty();
		//	$("#editItem").empty();
			//$(".addItem").append('<option value="0">  Select item </option>');
			
			itemOptions='<option value="0">  Select Operator </option>';

			
		//	$("#editItem").append('<option value="0">  Select item </option>');

           for (i = 0; i < response.payload.length; ++i) {
             
			//  $(".addItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
			   
			itemOptions=itemOptions+`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`;
			
			//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
           }
		   
		   $("#addOperator").append(itemOptions);
		   
       },
       error: function (error) {
           ajaxerrormsg(error);
       }
   });
}
				
				
function getFilterProductionList(){  
	
	var dataVal = 
	{
		 unitid       	: $('#addUnit').val(),
		 workcenterid 	: $('#addWorkCenter').val(),
		 shiftid       	: $('#addShift').val(),
		 stationid 		: $('#addSelMachine').val(),
		 operatorid     : $('#addOperator').val(),						 
		 fromdate		: StringToDateDDMMYYYY_to_YYYYMMDD($('#prodDatefrm').val()),						 
		 todate			: StringToDateDDMMYYYY_to_YYYYMMDD($('#prodDateto').val()),
		 
	};
				
	console.log("-------------------Welcome to product getFilterProductionList---------",dataVal);
	$.ajax({
	    type: 'POST',
	    url: server_url + "production/getFilterProductions",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: "application/json; charset=utf-8",
	    data: JSON.stringify(dataVal),
		
		success: function (response) {		

		console.log("------response data----------",response);

		var data = response.payload;
		console.log("------getPOList data----------",data);
//		console.log("------getPOList data.result----------",data.result);
	
		
		tableData.destroy();
    $('#prodList.tbody').empty();


	tableData = $('#prodList').DataTable( {

			dom: 'Blfrtip',   
			buttons: ['excel', 'print'],
		 	 destroy: true,
			 data: data,
			 
			 "columnDefs": [{
			         "targets": "_all",
			         "defaultContent": ""
			     }],

			  columns: [
			{ "data": "proddate" },
		    { "data": "unitname" },
		    { "data": "workcentername" },
		    { "data": "shiftname" },
			{ "data": "operatorname" },
		    { "data": "stationname" },
			
		    { "data": "availabilityper" },
		    { "data": "productivityper" },
			{ "data": "rejectionper" },
			{ "data": "oeeper" },
			
			 { "data":  null,
	           render: function (data, type, row) {
	               var id = data.id;
	               var action = `<a  class="edit-button" id=${id}>View</a>`;
	               return action;
	           },
             },
			
            ],
            "order": [[0, 'desc']],
			} );
		},
       error: function (error) {
           ajaxerrormsg(error);
       }
	})
}												