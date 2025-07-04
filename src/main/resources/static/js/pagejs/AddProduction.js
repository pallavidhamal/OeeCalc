var optionsData = "";
//var count=1;
var stationId;
var planId;
var timePerShiftVal = 0;

var totalplannedquantity = 0 ; 

$(document).ready(function()
{
				
	getUnitList("add");	
	//getAllMachines();
//	getAllItems();
	getOpertors();
StdlossesCal();
	
	
	$('#addUnit').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	     unitid = this.value;
		 
		// $("#timePershift").val("");
		//alert(unitid)
		getWorkCentreList("add");
		getUnitShifts();	
		
	});
	
	
	$('#addStation').on('change', function (e) {
		
		var optionSelected = $("option:selected", this);
		stationId = this.value;

		getShiftWorkItemList();
});

$('#Overtime').on('change', function (e) {
	
	totaltimeCal();
})

$('.Stdlosses').on('change', function (e) {
	
	StdlossesCal();
})

$('.Spllosses').on('change', function (e) {
	
	SpllossesCal();
})


/*$('.txtProducedQty').on('change', function (e) {
	
	
	itemTableCal();
	
})

$('.txtRejectedQty').on('change', function (e) {
	
	
	 itemTableCal();
	
})
*/

 $(document).on('change', '.txtProducedQty', function() {
    // Code for dynamically created elements
    itemTableCal();
});

 $(document).on('change', '.txtRejectedQty', function() {
    // Code for dynamically created elements
    itemTableCal();
});

function itemTableCal(){
	
	var producedquantityVal = 0;
	var rejectedquantityVal = 0;
	var i = 0;
	
	$("#planProdTbody").find('tr').each(function (){
		
//		 producedquantityVal +=  Number($("#planProdTbody").find('tr').eq(i).find('td').eq(3).find("input").eq(0).val());
		 producedquantityVal +=  Number($("#planProdTbody").find('tr').eq(i).find('td').eq(4).find("input").eq(0).val());
		 rejectedquantityVal +=  Number($("#planProdTbody").find('tr').eq(i).find('td').eq(5).find("input").eq(0).val());
		i++;
	});
	
	$("#totalProdQty").val(producedquantityVal);
	$("#qualityProduction").val(producedquantityVal);
	//$("#totalPlanQty").val();
	$("#rejectQty").val(rejectedquantityVal);
	
	productivityCal();
	qualityCal();
}


/*$('#addWorkCenter').on('change', function (e) {
	   
	 var optionSelected = $("option:selected", this);
	 var wsid = this.value;
	
	 getMachinesByWc(wsid);

	 
	// getShiftTime();	
		
});*/


$('#addShift').on('change', function (e) {
	   
	// var optionSelected = $("option:selected", this);
	// var wsid = this.value;
	// alert();
	 getMachinesByPlanFilter();
	 
	// getShiftTime();	
		
});

	
			//	alert("add po js")
				
				
				$("#addMore").on("click", function (event) {
						      event.preventDefault();

							  
							  alert("add button")
								
							  counter++;

						      var newRow = $("<tr>");
						      var cols = "";

						      // Table columns
						    /*  cols += '<th scrope="row">' + counter + "</th>";*/
						      cols +=
						        `<td><select name="titles" id="productCategory${counter}" class="form-input demo productCategory form-control" style="width: 100%" >
						        <option value="">Select</option>` +
						        optionsData +
						        `</select>`;
						        cols +=
						        `</td>`;
						     
						      cols += `<td><input type="text" id="buyprice${counter}" class="form-input form-control" disabled=""></td>`;
						      
						      cols += `<td><input type="text" id="qty${counter}"  class="form-input nuz form-control qty  integer">	</td>`;
						      
						//      cols += `<td><input type="text" id="availableQ${counter}" class="form-input  form-control" disabled></td>`;
						//      	cols += `<td><input type="text" id="mstprice${counter}" class="form-input form-control" disabled></td>`;
						      cols += `<td><input type="text" id="rate${counter}"  class="form-input nuz form-control rate decimal" ></td>`;

						      cols += `<td><input type="text" id="disocuntpr${counter}"  class="form-input nuz form-control disocuntpr decimal" >`;
						      cols += `</td>`;
						     
						      cols += `<td><input type="text" id="disocunt${counter}"  class="form-input nuz form-control disocunt decimal" disabled></td>`;
						      cols += `<td><input type="text" id="amount${counter}" class="form-input form-control rate amount" disabled ></td>`;
						      
						      cols += `<td><input type="text" id="gstpr${counter}"  class="form-input nuz form-control gstpr integer" disabled>	</td>`;
						      
						      cols += `<td><a class="deletBtn deleteBtn1" id="deleteRow${counter}"><img  src="images/delete.png"  ></a></td>`;

						      // Insert the columns inside a row
						      newRow.append(cols);

						      // Insert the row inside a table
						      $("#tableBody").append(newRow);
						      
						      
						      $('#productCategory'+counter).select2();
							  $('#product'+counter).select2();

						      // Increase counter after each row insertion
						      counter++;
						      // Remove row when delete btn is clicked
						      $("table").on("click", "#deleteRow", function (event) {
						        $(this).closest("tr").remove();
						        counter -= 1;
						      });
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
	
			console.log("==========response=====",response)
			
					$("#"+divId+"Unit").empty();			
					$("#"+divId+"Unit").append('<option value=' + 0+ '>  - Select Unit - </option>');
									
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
			
					$("#"+divId+"WorkCenter").empty();			
					$("#"+divId+"WorkCenter").append('<option value=' + 0+ '>  - Select workcenter - </option>');
									
					$.each(response.payload, function( index, value ){
									
					$("#"+divId+"WorkCenter").append('<option value="'+ value.id + '">'+ value.name+' </option>');
					
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
							$("#addSelMachine").empty();
							//$("#editStation").empty();
							
							machinesOptions='<option value="0">  Select Station </option>';
						//	$("#editStation").append('<option value="0">  Select station </option>');
				           for (i = 0; i < response.payload.length; ++i) {
							
							
							machinesOptions=machinesOptions+`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`;
							
				           //   $(".addStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
							 //  $("#editStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
				           }
						   
						   $("#addSelMachine").append(machinesOptions);
						   
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
			
				console.log("=====getUnitShifts====unitid===",unitid)
				
				
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
							//	$("#editItem").empty();
							//	$(".addShift").append('<option value="0">  Select item </option>');
								
								
								shiftOptions='<option value="0">  Select Shift </option>';
								
								console.log("=====getUnitShifts=======",response)
								
								
							//	$("#editItem").append('<option value="0">  Select item </option>');

					           for (i = 0; i < response.payload.length; ++i) {
					            //   $(".addShift").append(`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`);
								
								
								shiftOptions=shiftOptions+`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`;
								   
								//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
								   
					           }
							   
							   $("#addShift").append(shiftOptions);
							   
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

				
	function getShiftWorkItemList()
	{
		var dataVal = 
		{
			 id			: planId,
			 stationid 	: stationId
		};
		
			console.log("-------------------Welcome to getShiftWorkItemList"+JSON.stringify(dataVal));
				$.ajax({
					    type: 'POST',
					    url: server_url + "planningshift/getShiftWorkDtlsByPlanAndStation",
					    enctype: 'application/json',
					    headers: authHeader,
					    processData: false,
					    contentType: "application/json; charset=utf-8",
					    data: JSON.stringify(dataVal),
						
						success: function (response) {		

						console.log("------response data----------",response);


						var data = response.payload;

						console.log("------getPOList data----------",data);
									
//										tableData.destroy();
				        $('#planProdTbody').empty();
						
						
					$.each(response.payload, function( index1, value1 ){
			
					//console.log("------first for----------"+value.planningShiftWork);
				//	$.each(value.planningShiftWork, function( index1, value1 ){
			   
						console.log("------second for----------");
						
						totalplannedquantity += Number(value1.plannedquantity) ;
											
						$('#planProdTbody').append('<tr class="tr_clone" roCnt = "'+index1+'">'
							+'<td class="table_input"> <input type="hidden" class="form-control width80 line txtStation " rocnt = "'+index1+'" id="stationId'+index1+'" value="'+value1.stationid+'"   disabled>'+value1.stationname +' </td>'
							+'<td class="table_input"><input type="hidden" class="form-control width80 line txtItem " rocnt = "'+index1+'" id="itemId'+index1+'" value="'+value1.itemid+'"   disabled>'+ value1.itemname +' </td>'
							+'<td class="table_input"><input type="hidden" class="form-control width80 line txtSetup " rocnt = "'+index1+'" id="setupId'+index1+'" value="'+value1.setupid+'"   disabled>'+ value1.setupname +'</td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty decimal" rocnt = "'+index1+'" id="plannedQty'+index1+'" value="'+value1.plannedquantity+'"   disabled></td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtProducedQty decimal" rocnt = "'+index1+'" id="producedQty'+index1+'" value ="0"></td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtRejectedQty decimal"  rocnt = "'+index1+'" id="rejectedQty'+index1+'" value="0"></td>'

						  +'</tr>');
									
							//  }); //for each of response.payload.planningShiftWork
				}); //for each of response.payload
				
				console.log("======totalplannedquantity======",totalplannedquantity);
				
				$("#totalPlanQty").val(totalplannedquantity);
			}
		})//ajax

	}			
				
	function getPlanningItemList()
		{
	/*	var dataVal = 
		{
			 id			: planId,
			 stationid 	: stationId
		};
		
			console.log("-------------------Welcome to getShiftWorkItemList"+JSON.stringify(dataVal));
	*/			$.ajax({
					    type: 'GET',
					    url: server_url + "planning/get/"+planId+"/"+stationId,
					    enctype: 'application/json',
					    headers: authHeader,
					    processData: false,
					    contentType: "application/json; charset=utf-8",
				//	    data: JSON.stringify(dataVal),
						
						success: function (response) {		

						console.log("------response data----------",response);


						var data = response.payload;

						console.log("------getPOList data----------",data);
									
//										tableData.destroy();
				        $('#planProdTbody').empty();
						
					$.each(response.payload, function( index1, value1 ){
			
					//console.log("------first for----------"+value.planningShiftWork);
				//	$.each(value.planningShiftWork, function( index1, value1 ){
			   
						console.log("------second for----------");
											
						$('#planProdTbody').append('<tr class="tr_clone" roCnt = "'+index1+'">'
							+'<td class="table_input"> <input type="hidden" class="form-control width80 line txtStation  " rocnt = "'+index1+'" id="stationId'+index1+'" value="'+value1.stationid+'"   disabled>'+value1.stationname +' </td>'
							+'<td class="table_input"><input type="hidden" class="form-control width80 line txtItem  " rocnt = "'+index1+'" id="itemId'+index1+'" value="'+value1.itemid+'"   disabled>'+ value1.itemname +' </td>'
							+'<td class="table_input"><input type="hidden" class="form-control width80 line txtSetup  " rocnt = "'+index1+'" id="setupId'+index1+'" value="'+value1.setupid+'"   disabled>'+ value1.setupname +'</td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty decimal " rocnt = "'+index1+'" id="plannedQty'+index1+'" value="'+value1.plannedquantity+'"   disabled></td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtProducedQty decimal " rocnt = "'+index1+'" id="producedQty'+index1+'" value="0" ></td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtRejectedQty decimal "  rocnt = "'+index1+'" id="rejectedQty'+index1+'" value="0" ></td>'

						  +'</tr>');
									
							//  }); //for each of response.payload.planningShiftWork
				}); //for each of response.payload
			}
		})//ajax

	}				
				
			
	//		 var counter = 0;
	function getFilterPlanningList(){  

					
					var dataVal = 
					{
									 
						 fromdate		: $('#prodDate').val(),
						 workcenterid 	: $('#addWorkCenter').val(),
						 todate			: $('#prodDate').val(),
						 unitid       	: $('#addUnit').val(),
						 stationid       	: $('#addUnit').val(),
					};
					
					
										console.log("-------------------Welcome to product getplanningList"+JSON.stringify(dataVal));
									$.ajax({
										    type: 'POST',
										    url: server_url + "planning/filterPlanning",
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
								//		
									
//										tableData.destroy();
								        $('#planProdTbody.tbody').empty();
									$.each(response.payload, function( index, value ){
			
										console.log("------first for----------"+value.planningShiftWork);
										$.each(value.planningShiftWork, function( index1, value1 ){
								   
											console.log("------second for----------");

											
							$('#planProdTbody').append('<tr class="tr_clone" roCnt = "'+index1+'">'
								+'<td class="table_input"> <input type="hidden" class="form-control width80 line txtStation " rocnt = "'+index1+'" id="stationId'+index1+'" value="'+value1.stationid+'"   disabled>'+value1.stationname +' </td>'
								+'<td class="table_input"><input type="hidden" class="form-control width80 line txtItem " rocnt = "'+index1+'" id="itemId'+index1+'" value="'+value1.itemid+'"   disabled>'+ value1.itemname +' </td>'
								+'<td class="table_input"><input type="hidden" class="form-control width80 line txtSetup " rocnt = "'+index1+'" id="setupId'+index1+'" value="'+value1.setupid+'"   disabled>'+ value1.setupname +'</td>'
								+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty  decimal" rocnt = "'+index1+'" id="plannedQty'+index1+'" value="'+value1.plannedquantity+'"   disabled></td>'
								+'<td class="table_input"><input type="text" class="form-control width80 line txtProducedQty  decimal" rocnt = "'+index1+'" id="producedQty'+index1+'" value="0" ></td>'
								+'<td class="table_input"><input type="text" class="form-control width80 line txtRejectedQty  decimal"  rocnt = "'+index1+'" id="rejectedQty'+index1+'" value="0" ></td>'
								

							  +'</tr>');
									
							  }); //for each of response.payload.planningShiftWork

									
									}); //for each of response.payload
									
											}
									})//ajax
								}// function
					//get planning list
			 
					
					

					$(document).on("click", "#addProduction", function(e){

						
						var myarray=[];
						var i =  0 ;
						
						
						$("#planProdTbody").find('tr').each(function (){
									
									
									console.log($("#planProdTbody").find('tr').eq(i).find('td').eq(0).text());
									console.log($("#planProdTbody").find('tr').eq(i).find('td').eq(0).find("input").eq(0).val());
									
									console.log("=========stationidVal==text=========",$("#planProdTbody").find('tr').eq(i).find('td').eq(0).text());
									
									 var lineData  = {
											 
											 stationid 			 : stationId,
											 planid				 : planId,	
											 itemid			 	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(1).find("input").eq(0).val(),
											 setupid			 : $("#planProdTbody").find('tr').eq(i).find('td').eq(2).find("input").eq(0).val(),											 
											 plannedquantity	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(3).find("input").eq(0).val(),
											 producedquantity	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(4).find("input").eq(0).val(),
											 rejectedquantity	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(5).find("input").eq(0).val(),

										};
								 	  i++;
								 	  
									 myarray.push(lineData);
									 
									 console.log("====myarray======",myarray);
								});						
						

						/* if(SelectBoxNotAllowedNullVal($('#addStationType'),"Station Type","#error_block"))
							 if(NotAllowedNullVal($('#addStationNumber'),"Station Number ","#error_block"))
								 if(SelectBoxNotAllowedNullVal($('#addUom'),"UOM ","#error_block"))
								 	if(SelectBoxNotAllowedNullVal($('#addWorkCentre')," Work Centre","#error_block")){*/
							 
							 var dataVal = {
							 
									
									 shiftid : $('#addShift').val(),
									 unitid : $('#addUnit').val(),
									 workcenterid : $('#addWorkCenter').val(),
									 workcenterid : $('#addOperator').val(),
									 
									 availability_lunchtime : $('#lunchT').val(),
									 availability_teatime : $('#teaT').val(),
									 availability_reviewtime : $('#reviewT').val(),
									 availability_inpectiontime : $('#inspecT').val(),
									 availability_machinebreakdown : $('#machineBrkT').val(),
									 availability_setupchange : $('#setupT').val(),
									 availability_nomaterial : $('#noMatT').val(),
									 availability_nolabour : $('#noLabT').val(),
									 availability_inspection : $('#waitInspecT').val(),
									  
									 availability_tooling : $('#noToolT').val(),
									 availability_drawing : $('#noDrawT').val(),
									 availability_guages : $('#noGaugT').val(),
									 availability_otherlosses : $('#anyLossT').val(),
									// availability_calculation : $('#calculation').val(),
									 availability_time : $('#availableT').val(),
									 availability_per : $('#availableP').val(),
									 
									 availability_overtime :$('#Overtime').val(),
									 availability_totaltime :$('#totaltime').val(),
									 availability_stdloss :$('#Stdlosses').val(),
									 availability_specloss :$('#Spllosses').val(),
									 availability_totloss :$('#Totallosses').val(),
									   
									 productivity_searching : $('#searchT').val(),
									 productivity_personnal : $('#personnalT').val(),
									 productivity_rework : $('#reworkT').val(),
									 productivity_Production_qty : $('#totalProdQty').val(),
									 productivity_standard_qty : $('#stdQty').val(),
									 productivity_per : $('#productvityP').val(),
									  
									 rejection_rejection_qty : $('#rejectQty').val(),
									 rejection_ok_qty : $('#okQty').val(),
									 rejection_per : $('#rejectionP').val(),
									 productionPlanningIncomingDto	: myarray
									 

								};
									 
								 
									 
							 	console.log("====data==dataVal===",dataVal);
									 
									 
									 $.ajax({
											
										   type: 'POST',
										   url: server_url+"production/add",  //from API add new data
										   data : JSON.stringify(dataVal),
								//		   processData: false,
										   headers: authHeader,
										   contentType: "application/json; charset=utf-8",
					   
										   success: function(result) {
					   	
											console.log("insert--Information result==="+result.status);
											
											if(result.status=="CREATED"){
												
											 window.location.href = "production";
												
												
											}
										},
									error: function (error) {
							             console.log(error);
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
								     	}
							        },
								});   
							//}  //validation if
					});

					
function getMachinesByWc(wsid)
{
		
		$.ajax({
				       type: "GET",
				       url: server_url + `station/getStationByWc/`+wsid,
				       enctype: "application/json",
				       headers: authHeader,
				       processData: false,
				       contentType: false,
				       data: null,
				       success: function (response) {
							$("#addStation").empty();
							//$("#editStation").empty();
							
							machinesOptions='<option value="0">  Select Station </option>';
						//	$("#editStation").append('<option value="0">  Select station </option>');
				           for (i = 0; i < response.payload.length; ++i) {
							
							
							machinesOptions=machinesOptions+`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`;
							
				           //   $(".addStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
							 //  $("#editStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
				           }
						   
						   $("#addStation").append(machinesOptions);
						   
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
	
	function getMachinesByPlanFilter()
	{
		
		
		var dataVal = 
			{
							 
				 fromdate		: $('#prodDate').val(),
				 workcenterid 	: $('#addWorkCenter').val(),
				 todate			: $('#prodDate').val(),
				 unitid       	: $('#addUnit').val(),
				 shiftid		:$('#addShift').val(),

			};
			
			
			console.log("dataval--in getMachinesByPlanFilter",JSON.stringify(dataVal));
			
			
			$.ajax({
				
				 		 type: "POST",
					       url: server_url + `planning/getPlanningByFilter`,
					       enctype: "application/json",
					       headers: authHeader,
					       processData: false,
					       contentType: "application/json; charset=utf-8",
					       data: JSON.stringify(dataVal),
					       success: function (response) {
								$("#addStation").empty();
								
								console.log("======response=========",response)
								timePerShiftVal = response.payload.timePerShift;
								planId = response.payload.id;
								
								machinesOptions='<option value="0">  Select Station </option>';
							
							console.log("response.payload.length--"+response.payload.planningShiftWork.length);
							
								for (i1 = 0; i1 < response.payload.planningShiftWork.length; ++i1) {
									
									console.log("for down--"+i1);
								
									machinesOptions=machinesOptions+`<option value="${response.payload.planningShiftWork[i1].stationid}">${response.payload.planningShiftWork[i1].stationname}</option>`;
								
					           }
							   
							   $("#addStation").append(machinesOptions);
							   totaltimeCal();
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
	
function getOpertors()
{
	
	
	console.log("oper");
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



function totaltimeCal(){
	
	
/*	var sumoftotaltime = 
	Number($("#lunchT").val()) +
	Number($("#teaT").val()) +
	Number($("#reviewT").val()) +
	Number($("#inspecT").val()) +
	Number($("#machineBrkT").val()) +
	Number($("#setupT").val()) +
	Number($("#noMatT").val()) +
	Number($("#noLabT").val()) +
	Number($("#waitInspecT").val()) +
	Number($("#noToolT").val()) +
	Number($("#noDrawT").val()) +
	Number($("#noGaugT").val()) +
	Number($("#anyLossT").val()) +
	Number($("#Overtime").val()) ;
*/	
	
	
	var sumoftotaltime = 
	Number($("#Overtime").val()) +Number(timePerShiftVal)
	
	
	$("#totaltime").val(sumoftotaltime);
	
}

function StdlossesCal(){
	
	
	var sumofStdlosses = 
	Number($("#lunchT").val()) +
	Number($("#teaT").val()) +
	Number($("#reviewT").val()) +
	Number($("#inspecT").val()) +
	Number($("#machineBrkT").val()) ; 
	
	
	$("#Stdlosses").val(sumofStdlosses);
	totalLosses();
}

function SpllossesCal(){
	
	
	var sumofSpllosses = 
	Number($("#setupT").val()) +
	Number($("#noMatT").val()) +
	Number($("#noLabT").val()) +
	Number($("#waitInspecT").val()) +
	Number($("#noToolT").val()) +
	Number($("#noDrawT").val()) +
	Number($("#noGaugT").val()) +
	Number($("#anyLossT").val()); 
	
	
	$("#Spllosses").val(sumofSpllosses);
	totalLosses();
}

function totalLosses(){
	
	
	var sumofTotallosses = Number($("#Stdlosses").val()) + Number($("#Spllosses").val());
	
	$("#Totallosses").val(sumofTotallosses);
	
	availableTime();
	
}
function availableTime(){
	
	if( Number($("#totaltime").val()) > 0 && Number($("#Totallosses").val()) > 0){
		
		var sumofavailableT = Number($("#totaltime").val()) - Number($("#Totallosses").val());
		
		$("#availableT").val(sumofavailableT);
		
		availabilityPerCal();
	}
}

function availabilityPerCal(){
	
	if( Number($("#availableT").val()) > 0 && Number($("#totaltime").val()) > 0){
	
		var availabilityCal = (Number($("#availableT").val()) /	Number($("#totaltime").val()) ) * 100;
	
		$("#availabilityPer").val(availabilityCal.toFixed(2));
		oeeCal();
	}
}

function productivityCal(){
	
	if( Number($("#totalProdQty").val()) > 0 && Number($("#totalPlanQty").val()) > 0){
	
		var productivityPerCal = (Number($("#totalProdQty").val()) /	Number($("#totalPlanQty").val()) ) * 100;
	
		$("#productivityper").val(productivityPerCal.toFixed(2));
		oeeCal();
	}
}
function qualityCal(){
	
	if( Number($("#qualityProduction").val()) > 0 && Number($("#rejectQty").val()) > 0){
	
		var qualityPerCal = ((Number($("#qualityProduction").val()) - Number($("#rejectQty").val()) ) /	Number($("#qualityProduction").val()) ) * 100;
	
		$("#qualityPer").val(qualityPerCal.toFixed(2));
		
		oeeCal();
	}
}



function oeeCal(){
	
	if( Number($("#availabilityPer").val()) > 0 && Number($("#productivityper").val()) > 0 && Number($("#qualityPer").val()) > 0){
	
		var oeePerCal = ((Number($("#availabilityPer").val())/100) * (Number($("#productivityper").val())/100) * (Number($("#qualityPer").val())/100) ) * 100;
	
		$("#oeePer").val(oeePerCal.toFixed(2));
	}
}

