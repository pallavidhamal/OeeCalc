var unitid="";
var machinesOptions;
var itemOptions;
var shiftOptions;

var count=1;
var stationid="";
var itemid="";
var rowcount="";

$(document).ready(function(){
	
	getUnitList("add");	
	getAllMachines();
	getAllItems();
	
	$('#addUnit').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	     unitid = this.value;
		//alert(unitid)
		getWorkCentreList("add");
		getUnitShifts();	
		
	});
	
	
	$(document).on("change", ".addStation", function () 
	{
	   
		 var optionSelected = $("option:selected", this);
	     stationid = this.value;
		 rowcount=$(this).attr("rocnt");
		 
		// alert("rowcount--"+rowcount);
		 
		// alert("stationid--"+stationid);
		 var itemjqid="#selItem"+rowcount;
	    	itemid=$(itemjqid).val();
		 					
		 getSetups(rowcount,stationid,itemid);
		
	});
	
	
	$(document).on("change", ".addItem", function () 
	{
	   
		 var optionSelected = $("option:selected", this);
	     itemid = this.value;
		 rowcount=$(this).attr("rocnt");
		 
		// alert("rowcount--"+rowcount);
		 	 
		 //	 alert("itemid--"+itemid);
			 
			 		 
		 var stationjqid="#selMachine"+rowcount;
		 stationid=$(stationjqid).val();
		 
		 getSetups(rowcount,stationid,itemid);
		
	});
	
	
	
	

$('.table_add_link').on('click',function(){
						
	
	
	if(ValidationForSelectBox("#setupErrDiv","Unit",$('#addUnit')))
		if(ValidationForSelectBox("#setupErrDiv","WorkCenter",$('#addWorkCentre')))
			if(NotAllowedNullVal("#setupErrDiv","From Date",$('#frmDate')))
				if(NotAllowedNullVal("#setupErrDiv","To Date",$('#toDate')))
					if(compareDate("#setupErrDiv",$('#frmDate').val(),$('#toDate').val()))
					if(NotAllowedNullVal("#setupErrDiv","Time per shift ",$('#timePershift')))
					{
	
	
	console.log("-------------table_add_link----this---------",$("#planningBbody").find('tr').length);
	
	//count = $("#planningBbody").find('tr').length;
	
      $('#planningBbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
		+'<td class="table_input"><select class="form-control addStation"  id="selMachine'+count+'" rocnt = "'+count+'">	</select> </td>'
		+'<td class="table_input"><select class="form-control"  id="selShift'+count+'" rocnt = "'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control addItem"  id="selItem'+count+'" rocnt = "'+count+'">	</select> </td>'
		+'<td class="table_input"><select class="form-control addSetup "  id="selSetUp'+count+'" >	</select> </td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtSetUptime " id="setUptime'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty" id="plannedQty'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedMins" id="plannedMins'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtTimeUtilised" id="timeUtilised'+count+'"></td>'
		+'<td class="table_input"><a href="#" class="deleteRow"><i class="fa fa-minus"></i></a></td>'
		

	  +'</tr>');
	  
	  
	 // alert(machinesOptions);
	  
	  $("#selMachine"+count).append(machinesOptions);
	  $("#selItem"+count).append(itemOptions);
	  
	  $("#selShift"+count).append(shiftOptions);
	  
	  count++;
	  
	  }//validation if
	  
});  //end add row

	$(document).on("click", ".deleteRow", function(e){	
	
  	$(this).closest('tr').remove();
  });


		$(document).on("click", "#addPlanningData", function(e){
	
				var myarray=[];
				
				 var i =  0 ;
				 
				 
				if (ValidateMachine())
				if (ValidateShift())	
				if (ValidateItem())
				if (ValidateSetup())
				if(ValidateDupRow())
				
				if(ValidateSetupTimeForBlank())
					if(ValidateSetupTimeForNum())
						if(ValidatePlannedQtyForBlank())
					if(ValidatePlannedQtyForNum())
						if(ValidatePlannedMinsForBlank())	
							if(ValidatePlannedMinsForNum())
					if(ValidateTimeUtilisedForBlank())	
				if(ValidateTimeUtilisedForNum())
												
				{	
				 $("#planningBbody").find('tr').each(function (){
		 
					 var lineData  = {
							 

							 stationid 		: $("#planningBbody").find('tr').eq(i).find('td').eq(0).find('select').val(),
							 shiftid 		: $("#planningBbody").find('tr').eq(i).find('td').eq(1).find('select').val(),
							 itemid	:		 $("#planningBbody").find('tr').eq(i).find('td').eq(2).find('select').val(),
							 setupid 		:$("#planningBbody").find('tr').eq(i).find('td').eq(3).find('select').val(),
							 setuptime		: $("#planningBbody").find('tr').eq(i).find('td').eq(4).find('input').val(),
							 plannedquantity			: $("#planningBbody").find('tr').eq(i).find('td').eq(5).find('input').val(),
							 plannedmins		: $("#planningBbody").find('tr').eq(i).find('td').eq(6).find('input').val(),
							 timeutilised		: $("#planningBbody").find('tr').eq(i).find('td').eq(7).find('input').val()

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
					 
							 fromdate		: $('#frmDate').val(),
							 todate 		: $('#toDate').val(),
							 timepershift	: $('#timePershift').val(),
							 unitid       : $('#addUnit').val(),
							 workcenterid :$('#addWorkCentre').val(),
							 planningShiftWorkIncomingDto:myarray

						};
					 
					 console.log("====data==dataVal===",dataVal);
					 
					 $.ajax({
							
						   type: 'POST',
						   url: server_url+"planning/add",  //from API add new data
						   headers: authHeader,
						   data : JSON.stringify(dataVal),
						   processData: false,
						   contentType: "application/json; charset=utf-8",
	   
						   success: function(result) {
	   	
							console.log("insert--planning==="+result);
							
							if((result.payload==true)&&(result.status=="CREATED"))
								{
								
								
								window.location.href ="planning";
								//getPOList();
								
								//$("#add_po").modal("hide");
							// $('#planningBbody').empty();
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
						   }
				});
			}
			
			}//else of validation
			
			
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
					$("#"+divId+"Unit").append('<option value=' + 0+ '>  - Select Unit - </option>');
									
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
							
							machinesOptions='<option value="0">  Select Station </option>';
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
						//$(".addItem").append('<option value="0">  Select item </option>');
						
						itemOptions='<option value="0">  Select Item </option>';

						
					//	$("#editItem").append('<option value="0">  Select item </option>');

			           for (i = 0; i < response.payload.length; ++i) {
			             
						//  $(".addItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
						   
						itemOptions=itemOptions+`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`;
						
						//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
			           }
					   
					   $(".addItem").append(itemOptions);
					   
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
							//	$(".addShift").append('<option value="0">  Select item </option>');
								
								
								shiftOptions='<option value="0">  Select Shift </option>';
								
								
								
							//	$("#editItem").append('<option value="0">  Select item </option>');

					           for (i = 0; i < response.payload.length; ++i) {
					            //   $(".addShift").append(`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`);
								
								
								shiftOptions=shiftOptions+`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`;
								   
								//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
								   
					           }
							   
							   $(".addShift").append(shiftOptions);
							   
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

			//stationid,itemid
				function getSetups(rowcount,stationid,itemid)
				{
					

					console.log(rowcount,stationid,itemid);
										
						$.ajax({
						       type: "GET",
						       url: server_url + `setup/getSetUpByStationItem/`+stationid +'/'+itemid,
						       enctype: "application/json",
						       headers: authHeader,
						       processData: false,
						       contentType: false,
						       data: null,
						       success: function (response) {
								
							//	'#product'+counter
								$("#selSetUp"+rowcount).empty();
							
								
									
								//	$(".addShift").empty();
								//	$("#editItem").empty();
									$("#selSetUp"+rowcount).append('<option value="0">  Select Setup </option>');
								//	$("#editItem").append('<option value="0">  Select item </option>');

						           for (i = 0; i < response.payload.length; ++i) {
						               $("#selSetUp"+rowcount).append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
									   
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
				
		

function ValidateMachine()
{
		$(".addStation").each(function() {
			console.log("in vali sel",$(this).val());
						
			if(validationSelectBox($(this).val(),"Station","#setupErrDiv"))
		     {
		    	flag=true; 
		    	console.log("iff-----");
		     }
			 else
			 {
				 flag=false;
				 return flag;
				 console.log("else-----");
			 }
		 });
		return flag;
}				

		
function ValidateItem()
{
		$(".addItem").each(function() {
			
			//console.log("in vali ValidateItem",$(this).val());
						
			if(validationSelectBox($(this).val(),"Item","#setupErrDiv"))
		     {
		    	flag=true; 
		    	console.log("iff-----");
		     }
			 else
			 {
				 flag=false;
				 return flag;
				 console.log("else-----");
			 }
		 });
		return flag;
}	


function ValidateShift()
{
		$(".addShift").each(function() {
			
			console.log("in vali sel",$(this).val());
						
			if(validationSelectBox($(this).val(),"Shift","#setupErrDiv"))
		     {
		    	flag=true; 
		    	console.log("iff-----");
		     }
			 else
			 {
				 flag=false;
				 return flag;
				 console.log("else-----");
			 }
		 });
		return flag;
}	

function ValidateSetup()
{
		$(".addSetUp").each(function() {
			
			console.log("in vali sel",$(this).val());
						
			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
		     {
		    	flag=true; 
		    	console.log("iff-----");
		     }
			 else
			 {
				 flag=false;
				 return flag;
				 console.log("else-----");
			 }
		 });
		return flag;
}


function ValidateSetupTimeForBlank()  
{
		$(".txtSetUptime").each(function() {
			
			console.log("in vali sel",$(this).val());
			
//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
			if(NotAllowedNullVal("#setupErrDiv","Setup Time",$(this)))
		     {
		    	flag=true; 
		    	console.log("iff-----");
		     }
			 else
			 {
				 flag=false;
				 return flag;
				 console.log("else-----");
			 }
		 });
		return flag;
}


function ValidateSetupTimeForNum()
{
		$(".txtSetUptime").each(function() {
			
			console.log("ValidateSetupTimeForNum",$(this).val());
			
//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
			if(AllowedOnlyNumberNoDecimal("#setupErrDiv","Setup Time",$(this)))
		     {
		    	flag=true; 
		    	console.log("iff-----");
		     }
			 else
			 {
				 flag=false;
				 return flag;
				 console.log("else-----");
			 }
		 });
		return flag;
}


function ValidatePlannedQtyForBlank()  
{
			$(".txtPlannedQty").each(function() {
				
				console.log("in vali sel txtPlannedQty",$(this).val());
				
	//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
				if(NotAllowedNullVal("#setupErrDiv","Planned Quantity",$(this)))
			     {
			    	flag=true; 
			    	console.log("iff-----");
			     }
				 else
				 {
					 flag=false;
					 return flag;
					 console.log("else-----");
				 }
			 });
			return flag;
	}

	
	function ValidatePlannedQtyForNum()
	{
			$(".txtPlannedQty").each(function() {
				
				console.log("Validatepln qtyForNum txtPlannedQty",$(this).val());
				
	//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
				if(AllowedOnlyNumberNoDecimal("#setupErrDiv","Planned Quantity",$(this)))
			     {
			    	flag=true; 
			    	console.log("iff-----");
			     }
				 else
				 {
					 flag=false;
					 return flag;
					 console.log("else-----");
				 }
			 });
			return flag;
	}	
	
	function ValidatePlannedMinsForBlank()  
	{
				$(".txtPlannedMins").each(function() {
					
					console.log("in vali sel txtPlannedMins",$(this).val());
					
		//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
					if(NotAllowedNullVal("#setupErrDiv","Planned Mins",$(this)))
				     {
				    	flag=true; 
				    	console.log("iff-----");
				     }
					 else
					 {
						 flag=false;
						 return flag;
						 console.log("else-----");
					 }
				 });
				return flag;
		}

		
		function ValidatePlannedMinsForNum()
		{
				$(".txtPlannedMins").each(function() {
					
					console.log("Validatepln qtyForNum txtPlannedMins",$(this).val());
					
		//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
					if(AllowedOnlyNumberNoDecimal("#setupErrDiv","Planned Mins",$(this)))
				     {
				    	flag=true; 
				    	console.log("iff-----");
				     }
					 else
					 {
						 flag=false;
						 return flag;
						 console.log("else-----");
					 }
				 });
				return flag;
		}		
	
	
function ValidateTimeUtilisedForBlank()  
{
			$(".txtTimeUtilised").each(function() {
				
				console.log("in vali sel txtPlannedMins",$(this).val());
				
	//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
				if(NotAllowedNullVal("#setupErrDiv","Time Utilised",$(this)))
			     {
			    	flag=true; 
			    	console.log("iff-----");
			     }
				 else
				 {
					 flag=false;
					 return flag;
					 console.log("else-----");
				 }
			 });
			return flag;
	}

function ValidateTimeUtilisedForNum()
{
		$(".txtTimeUtilised").each(function() {
			
			console.log("Validatepln  txtTimeUtilised",$(this).val());
			
//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
			if(AllowedOnlyNumberNoDecimal("#setupErrDiv","Time Utilised",$(this)))
		     {
		    	flag=true; 
		    	console.log("iff-----");
		     }
			 else
			 {
				 flag=false;
				 return flag;
				 console.log("else-----");
			 }
		 });
		return flag;
}






















function ValidateDupRow()
{
	$(setupErrDiv).empty();
	var seen = new Set();
	 var duplicateFound = true;
	 
	$('#planningBbody tr').each(function () {
	
	  var st = $(this).find('td:eq(0) select').val();
	  var sht = $(this).find('td:eq(1) select').val();
	  var it = $(this).find('td:eq(2) select').val();
	  var sett = $(this).find('td:eq(3) select').val();
	  
	  var key = st + '-' + sht+ '-' +it+ '-' +sett;

	  if (seen.has(key)) {
		
		console.log("dupp found "+key);
		
		$(setupErrDiv).append("Please select duplicate row found");
		
	    duplicateFound = false;
	    return false; // break out of loop
	  } else {
	    seen.add(key);
	  }
	});
	
	return duplicateFound;
	
}

						
						
				
});