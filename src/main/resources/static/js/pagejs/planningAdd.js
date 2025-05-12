var unitid="";
var machinesOptions;
var count=1;

$(document).ready(function(){
	
	
	
	getUnitList("add");	

	getAllMachines();
	
	getAllItems();
	

	
	
	
	
	$('#addUnit').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	     unitid = this.value;
		
		//alert(optionSelected);
		
		alert(unitid)
		
		getWorkCentreList("add");
		
		getUnitShifts();	
		
	});
	
	
	
	
	

$('.table_add_link').on('click',function(){
						
	console.log("-------------table_add_link----this---------",$("#myTbody").find('tr').length);
	
	//count = $("#myTbody").find('tr').length;
	
      $('#myTbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
		+'<td class="table_input"><select class="form-control addStation"  id="selMachine'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control"  id="selShift'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control"  id="selItem'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control"  id="selSetUp'+count+'" >	</select> </td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="setUptime'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="plannedQty'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="plannedMins'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="timeUtilised'+count+'"></td>'
		+'<td class="table_input"><a href="#" class="deleteRow"><i class="fa fa-minus"></i></a></td>'
		

	  +'</tr>');
	  
	  
	 // alert(machinesOptions);
	  
	  $("#selMachine"+count).append(machinesOptions);

	  count++;

	  
	
	  
});  //end add row

$('.deleteRow').on('click',function(){
  	$(this).closest('tr').remove();
  });


$(document).on("click", "#addPlanningData", function(e){
	
				var myarray=[];
				
				 var i =  0 ;
				 $("#myTbody").find('tr').each(function (){
		 
					 var lineData  = {
							 

							 machine 		: $("#myTbody").find('tr').eq(i).find('td').eq(0).find('select').val(),
							 shift 		: $("#myTbody").find('tr').eq(i).find('td').eq(1).find('select').val(),
							 item	: $("#myTbody").find('tr').eq(i).find('td').eq(2).find('select').val(),
							 setup 		:$("#myTbody").find('tr').eq(i).find('td').eq(3).find('select').val(),
							 setuptime		: $("#myTbody").find('tr').eq(i).find('td').eq(4).find('input').val(),
							 plannqty			: $("#myTbody").find('tr').eq(i).find('td').eq(5).find('input').val(),
							 plannmins		: $("#myTbody").find('tr').eq(i).find('td').eq(6).find('input').val(),
							 timeutilised		: $("#myTbody").find('tr').eq(i).find('td').eq(7).find('input').val()

					};
					
		 
					 i++;
					 myarray.push(lineData);
					 
					 console.log("====myarray======",myarray);
				
				 });	 
				 console.log("====linelinelinelinelinelineline======","#line"+i);
				 
			/*	 if(NotAllowedNullVal("#poErrAdd","PO Name ",$('#ponumber')))
					 if(ValidationForSelectBox("#poErrAdd","Customer Name ",$('#customerListadd')))
						 if(NotAllowedNullVal("#poErrAdd","PO Date ",$('#poDate')))
							 if(NotAllowedNullVal("#poErrAdd","PO End Date ",$('#poEndDate')))
								 if(validateLineId("#poErrAdd"))
									 if(validateProduct())
									 if(validateRegion())
									 if(validatePOQty())*/
							{
					 
					 var dataVal = {
					 
							 PO_NO			: $('#ponumber').val(),
							 Customer 		: $('#customerListadd').val(),
							 PODate			: $('#poDate').val(),
							 POEDate		: $('#poEndDate').val(),
							 authKey		: localStorage.getItem("authkey"),
							 lineData       : myarray

						};
					 
				 
					 
					 console.log("====data==dataVal===",dataVal);
					 
					 
					 $.ajax({
							
						   type: 'POST',
						   url: url+"insertPO",  //from API add new data
						   data : JSON.stringify(dataVal),
						   processData: false,
						   contentType: "application/json; charset=utf-8",
	   
						   success: function(result) {
	   	
							console.log("insert--Information result==="+result);
							
							if(result.result==true){
								
								getPOList();
								
								$("#add_po").modal("hide");
							// $('#myTbody').empty();
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
							
							
			
						   }
				});
			}
});



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
					$("#"+divId+"WorkCentre").append('<option value=' + 0+ '>  - Select workcenter - </option>');
									
					$.each(response.payload, function( index, value ){
									
					$("#"+divId+"WorkCentre").append('<option value="'+ value.id + '">'+ value.name+' </option>');
					
				    });
				
			}	
		});
	
}


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
					$("#"+divId+"Unit").append('<option value=' + 0+ '>  - Select workcenter - </option>');
									
					$.each(response.payload, function( index, value ){
									
					$("#"+divId+"Unit").append('<option value="'+ value.id + '">'+ value.name+' </option>');
					
				    });
				
			}	
		});
	
}


function	getAllMachines()
	{
		
		
		$.ajax({
				       type: "GET",
				       url: server_url + `station/allActive`,
				       enctype: "application/json",
				       headers: authHeader,
				       processData: false,
				       contentType: false,
				       data: null,
				       success: function (response) {
							$("#addStation0").empty();
							//$("#editStation").empty();
							
							machinesOptions='<option value="0">  Select station </option>';
						//	$("#editStation").append('<option value="0">  Select station </option>');
				           for (i = 0; i < response.payload.length; ++i) {
							
							
							machinesOptions=machinesOptions+`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`;
							
				           //   $(".addStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
							 //  $("#editStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
				           }
						   
						   $(".addStation").append(machinesOptions);
						   
				       },

				       error: function (error) {
				           /*console.log(error);
				      		 if (error.status == 401) {
					    	  window.location.href =  contextPath;
					      } else {
					    	if( error.responseJSON != undefined){
								errmssge=error.responseJSON.status;	
							
								if (error.responseJSON.status=="500"){
									console.log("in errr");
									 errorBlock("#error_block", error.responseJSON.message);
								}else{
											 errorBlock("#error_block", error.responseJSON.errors.message);
											}
							}
							else{
					   	  		console.log("Server Error! Please contact administrator");
					   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
					     	}
				     	}*/
				       },
				   });
	}


	function getAllItems()
		{
			$.ajax({
			       type: "GET",
			       url: server_url + `item/getAllItems`,
			       enctype: "application/json",
			       headers: authHeader,
			       processData: false,
			       contentType: false,
			       data: null,
			       success: function (response) {
						$(".addItem").empty();
					//	$("#editItem").empty();
						$(".addItem").append('<option value="0">  Select item </option>');
					//	$("#editItem").append('<option value="0">  Select item </option>');

			           for (i = 0; i < response.payload.length; ++i) {
			               $(".addItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
						   
						//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
						   
			           }
			       },

			       error: function (error) {
			           /*console.log(error);
			      		 if (error.status == 401) {
				    	  window.location.href =  contextPath;
				      } else {
				    	if( error.responseJSON != undefined){
							errmssge=error.responseJSON.status;	
						
							if (error.responseJSON.status=="500"){
								console.log("in errr");
								 errorBlock("#error_block", error.responseJSON.message);
							}else{
										 errorBlock("#error_block", error.responseJSON.errors.message);
										}
						}
						else{
				   	  		console.log("Server Error! Please contact administrator");
				   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
				     	}
			     	}*/
			       },
			   });
		}
	
	
		function getUnitShifts()
				{
					$.ajax({
					       type: "GET",
					       url: server_url + `shift/getShiftByUnit/`+unitid,
					       enctype: "application/json",
					       headers: authHeader,
					       processData: false,
					       contentType: false,
					       data: null,
					       success: function (response) {
								$(".addShift").empty();
							//	$("#editItem").empty();
								$(".addShift").append('<option value="0">  Select item </option>');
							//	$("#editItem").append('<option value="0">  Select item </option>');

					           for (i = 0; i < response.payload.length; ++i) {
					               $(".addShift").append(`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`);
								   
								//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
								   
					           }
					       },

					       error: function (error) {
					           /*console.log(error);
					      		 if (error.status == 401) {
						    	  window.location.href =  contextPath;
						      } else {
						    	if( error.responseJSON != undefined){
									errmssge=error.responseJSON.status;	
								
									if (error.responseJSON.status=="500"){
										console.log("in errr");
										 errorBlock("#error_block", error.responseJSON.message);
									}else{
												 errorBlock("#error_block", error.responseJSON.errors.message);
												}
								}
								else{
						   	  		console.log("Server Error! Please contact administrator");
						   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
						     	}
					     	}*/
					       },
					   });
				}

});