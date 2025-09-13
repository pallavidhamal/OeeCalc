var optionsData = "";
//var count=1;
var stationId;
var planId;
var timePerShiftVal = 0;

var totalplannedquantity = 0 ;
var totalTimeUtilised = 0 ; 

var planUnitId="";
var planWcId="";
var planShiftId="";
var planStationId="";
var planProdDt="";

$(document).ready(function()
{
				
	//getUnitList("add");	
	//getAllMachines();
//	getAllItems();
	
	/*	planUnitId=1;
		planWcId=1;
		planShiftId=1;
		planStationId="6841089106";*/
		
		
	//	const firstDayOfMonth1 ='2025-09-05';
		
	//	http://localhost:8087/addProduction?unitid=1&wcid=1&shiftid=1&plandate=2025-09-05&stationid=6841089106_Tbody
		
		
		planUnitId = getUrlParameter('unitid');
		planWcId=getUrlParameter('wcid');
		planShiftId=getUrlParameter('shiftid');
		planStationId=getUrlParameter('stationid');
		
		plandate=getUrlParameter('plandate');
		
		console.log("===========planUnitId url============", planUnitId+"-wcid-"+planWcId+"planShiftId=="+planShiftId+"planStationId=="+planStationId+"plandate=="+plandate);

		
		
		if(planUnitId!="")
		{
			
			$('#prodDate').val(plandate);	

			//$('#prodDate').val(firstDayOfMonth1);	
			unitid = planUnitId;					 
			getWorkCentreList("add");
			getUnitShifts();
			
		}


		if(role=="AA" || role=="MAU")
		{
						
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
			 
		//	 var wsid = unitArray[2] ;
		//	 getMachinesByWc(wsid); 
			 
			getUnitShifts();	
		//	getFilterProductionList();
						
						
		}
				


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
	
	
	$('#addShift').on('change', function (e) {
	   
	// var optionSelected = $("option:selected", this);
	// var wsid = this.value;
	// alert();
	 $('#planProdTbody').empty();
	 getMachinesByPlanFilter();
	 
	// getShiftTime();	
		
    });

	
	
	
	
	$('#addStation').on('change', function (e) {
		
		var optionSelected = $("option:selected", this);
		stationId = this.value;
		checkIfProductionAlreadyExist();
		
	
});

$('#Overtime').on('change', function (e) {
	
	totaltimeCal();
	totalLosses()
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
    
    console.log($(this).val())
    console.log($(this).attr("rocnt"))
    
    
    
    
});

 $(document).on('change', '.txtRejectedQty', function() {
    // Code for dynamically created elements
    itemTableCal();
});

function itemTableCal(){
	
	var producedquantityVal = 0;
	var rejectedquantityVal = 0;
	var totalTimeUtilisedVal = 0;
	var totalTimeUtilised = 0;
	
	var totalplannedVal = 0;
	
	var i = 0;
	
	$("#planProdTbody").find('tr').each(function (){
		
//		 producedquantityVal +=  Number($("#planProdTbody").find('tr').eq(i).find('td').eq(3).find("input").eq(0).val());

		if(Number($("#planProdTbody").find('tr').eq(i).find('td').eq(6).find("input").val()) > 0 ){

			 totalplannedVal  +=  Number($("#planProdTbody").find('tr').eq(i).find('td').eq(5).find("input").val());
			 producedquantityVal +=  Number($("#planProdTbody").find('tr').eq(i).find('td').eq(6).find("input").val());
			 rejectedquantityVal +=  Number($("#planProdTbody").find('tr').eq(i).find('td').eq(7).find("input").val());
			 
			 
			 
			 console.log("========producedquantityVal ====="+producedquantityVal+"====",Number($("#planProdTbody").find('tr').eq(i).find('td').eq(6).find("input").val()))
			 console.log("========cycletimeId =========",Number($("#cycletimeId"+i).val()),"========cycletimeId =========",Number($("#cycletimeId"+i).val())/60 )
			 console.log("========setuptimeId =========", Number($("#setuptimeId"+i).val()))
			 
			 
			// console.log("========Total Time Utlised =========",Number(producedquantityVal) * Number($("#cycletimeId"+i).val())/60 + Number($("#setuptimeId"+i).val()))
			 
			 totalTimeUtilisedVal = Number($("#planProdTbody").find('tr').eq(i).find('td').eq(6).find("input").val()) * Number($("#cycletimeId"+i).val())/60 + Number($("#setuptimeId"+i).val());
			 
			 console.log("========= totalTimeUtilisedVal==========", totalTimeUtilisedVal);
			 
			 totalTimeUtilised += totalTimeUtilisedVal;
			 
			 console.log("========= totalTimeUtilised==========", totalTimeUtilised);
			 
			i++;
		}
	});
	
//	$("#totalProdQty").val(producedquantityVal);

		

	$("#totalUtilisedTime").val(totalTimeUtilised.toFixed(2));
	$("#qualityProduction").val(producedquantityVal);
	$("#totalplannedVal").val(totalplannedVal);
	$("#achievementPer").val(((producedquantityVal/totalplannedVal)*100).toFixed(2));
	$("#rejectionPer").val(((rejectedquantityVal/producedquantityVal)*100).toFixed(2));
	
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



	
			//	alert("add po js")
				
				
$("#addMore").on("click", function (event) {
	
      event.preventDefault();

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
      cols += `<td><input type="text" id="rate${counter}"  class="form-input nuz form-control rate decimal minZero" ></td>`;

      cols += `<td><input type="text" id="disocuntpr${counter}"  class="form-input nuz form-control disocuntpr decimal minZero" >`;
      cols += `</td>`;
     
      cols += `<td><input type="text" id="disocunt${counter}"  class="form-input nuz form-control disocunt decimal minZero" disabled></td>`;
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
					
					if(value.id==planUnitId)	
					{					
						$("#"+divId+"Unit").append('<option selected value="'+ value.id + '">'+ value.name+' </option>');
					}
					else
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
									
					if(value.id==planWcId)	
					{	
					$("#"+divId+"WorkCenter").append('<option selected value="'+ value.id + '">'+ value.name+' </option>');
					}
					else
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
								
								
								if(response.payload[i].shiftid==planShiftId)	
								{
								
								shiftOptions=shiftOptions+`<option selected value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`;
								}
								else {
								shiftOptions=shiftOptions+`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`;
									}
								   
					           }
							   
							   $("#addShift").append(shiftOptions);
							   
							   if(planShiftId!="")
								{
							   $('#planProdTbody').empty();
							    getMachinesByPlanFilter();
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
						
						
							console.log("------falseeeeeeeee----------");
											
					        $('#planProdTbody').empty();
							
							$.each(response.payload, function( index1, value1 ){
				   
							console.log("------second for----------");
							
							totalplannedquantity += Number(value1.plannedquantity) ;
												
							$('#planProdTbody').append('<tr class="tr_clone" roCnt = "'+index1+'">'
								+' <td class="table_input"> <input type="hidden" class="form-control width80 line txtStation " rocnt = "'+index1+'" id="stationId'+index1+'" value="'+value1.stationid+'"   disabled>'+value1.stationname +' </td>'
								+' <td class="table_input"><input type="hidden" class="form-control width80 line txtItem " rocnt = "'+index1+'" id="itemId'+index1+'" value="'+value1.itemid+'"   disabled>'+ value1.itemname +' </td>'
								+' <td class="table_input"><input type="hidden" class="form-control width80 line txtSetup " rocnt = "'+index1+'" id="setupId'+index1+'" value="'+value1.setupid+'"   disabled>'+ value1.setupname +' </td>'
								+' <td class="table_input"><input type="text" class="form-control width80 line txtsetuptime" rocnt = "'+index1+'" id="setuptimeId'+index1+'" value="'+value1.setuptime+'"   disabled> </td>'
								+' <td class="table_input"><input type="text" class="form-control width80 line txtcycletime" rocnt = "'+index1+'" id="cycletimeId'+index1+'" value="'+value1.cycletime+'"   disabled> </td>'
								+' <td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty decimal minZero" rocnt = "'+index1+'" id="plannedQty'+index1+'" value="'+value1.plannedquantity+'"   disabled><input type="hidden" class="form-control width80 line txtPlannedMins " rocnt = "'+index1+'" id="plannedMins'+index1+'" value="'+value1.plannedmins+'"   disabled></td>'
								+' <td class="table_input"><input type="text" class="form-control width80 line txtProducedQty decimal minZero" rocnt = "'+index1+'" id="producedQty'+index1+'" value ="0"></td>'
								+' <td class="table_input"><input type="text" class="form-control width80 line txtRejectedQty decimal minZero"  rocnt = "'+index1+'" id="rejectedQty'+index1+'" value="0"></td>'
	
							  +'</tr>');
						  
						  
							//  }); //for each of response.payload.planningShiftWork
						}); //for each of response.payload
				
						console.log("======totalplannedquantity======",totalplannedquantity);
				
			//	$("#totalPlanQty").val(totalplannedquantity);
			
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
							+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty decimal  minZero" rocnt = "'+index1+'" id="plannedQty'+index1+'" value="'+value1.plannedquantity+'"   disabled></td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtProducedQty decimal minZero " rocnt = "'+index1+'" id="producedQty'+index1+'" value="0" ></td>'
							+'<td class="table_input"><input type="text" class="form-control width80 line txtRejectedQty decimal  minZero"  rocnt = "'+index1+'" id="rejectedQty'+index1+'" value="0" ></td>'

						  +'</tr>');
									
							//  }); //for each of response.payload.planningShiftWork
				}); //for each of response.payload
			}
		})//ajax

	}				
				

	$(document).on("click", "#addProduction", function(e){

		
		var myarray=[];
		var i =  0 ;
		
		var totPlannedMins=0;		
		var plmins=0;	
		$("#planProdTbody").find('tr').each(function (){
			
			
			
			console.log($("#planProdTbody").find('tr').eq(i).find('td').eq(0).text());
			console.log($("#planProdTbody").find('tr').eq(i).find('td').eq(0).find("input").eq(0).val());
			
			console.log("=========stationidVal==text=========",$("#planProdTbody").find('tr').eq(i).find('td').eq(0).text());
			
			 var lineData  = {
					 
					 stationid 			 : stationId,
					 planid				 : planId,	
					 itemid			 	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(1).find("input").eq(0).val(),
					 setupid			 : $("#planProdTbody").find('tr').eq(i).find('td').eq(2).find("input").eq(0).val(),											 
					 setuptime	 		 : $("#planProdTbody").find('tr').eq(i).find('td').eq(3).find("input").eq(0).val(),
					 cycletime	 		 : $("#planProdTbody").find('tr').eq(i).find('td').eq(4).find("input").eq(0).val(),
					 plannedquantity	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(5).find("input").eq(0).val(),
					 plannedmins	     : $("#planProdTbody").find('tr').eq(i).find('td').eq(5).find("input").eq(1).val(),
					 producedquantity	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(6).find("input").eq(0).val(),
					 rejectedquantity	 : $("#planProdTbody").find('tr').eq(i).find('td').eq(7).find("input").eq(0).val(),

				};
		 	 
		 	  
			  plmins=  parseFloat(($("#planProdTbody").find('tr').eq(i).find('td').eq(5).find("input").eq(1).val()));
			  console.log("====plmins======",plmins);
			  
			  totPlannedMins = parseFloat((  parseFloat(totPlannedMins)) +  parseFloat(plmins) );
			 myarray.push(lineData);
			 
			 console.log("====totPlannedMins======",totPlannedMins);
			 console.log("====myarray======",myarray);
			 
			 i++;
		});	
		 
		 if(NotAllowedNullVal($('#prodDate'),"Date ","#error_block"))				
		 if(SelectBoxNotAllowedNullVal($('#addUnit'),"Unit","#error_block"))
		 if(SelectBoxNotAllowedNullVal($('#addWorkCenter'),"Work Center","#error_block"))
		 if(SelectBoxNotAllowedNullVal($('#addShift')," Shift","#error_block"))
		 if(SelectBoxNotAllowedNullVal($('#addStation'),"Station","#error_block"))
		 if(SelectBoxNotAllowedNullVal($('#addOperator')," Operator","#error_block"))
		 if(NotAllowedZeroVal($('#totaltime'),"Total time ","#error_block"))							
		 if(NotAllowedZeroVal($('#availabletimeVal'),"Available time ","#error_block"))
		 if(NotAllowedZeroVal($('#totalUtilisedTime'),"Total Time Utilised ","#error_block"))
		 if(NotAllowedMoreThen100Val($('#availabilityPer'),"Availability ","#error_block"))							
		 if(NotAllowedMoreThen100Val($('#productivityper'),"Productivity ","#error_block"))
		 if(NotAllowedMoreThen100Val($('#oeePer'),"OEE ","#error_block")){
							 
							 var dataVal = {
							 
									 planid : planId,
									 proddate : StringToDateDDMMYYYY_to_YYYYMMDD($('#prodDate').val()),
									 unitid : $('#addUnit').val(),
									 workcenterid : $('#addWorkCenter').val(),
									 shiftid : $('#addShift').val(),
									 stationid : $('#addStation').val(),
									 operatorid : $('#addOperator').val(),
									 
									 productionPlanningIncomingDto	: myarray,
									 
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
									 availability_overtime :$('#Overtime').val(),
									 
									 availability_totaltime :$('#totaltime').val(),
									 availability_stdloss :$('#Stdlosses').val(),
									 availability_specloss :$('#Spllosses').val(),
									 availability_totloss :$('#Totallosses').val(),
									 availability_time : $('#availableT').val(),
									 availability_per : $('#availabilityPer').val(),
									// availability_calculation : $('#calculation').val(),
									 
									 productivity_searching : $('#searchT').val(),
									 productivity_personnal : $('#personnalT').val(),
									 productivity_rework : $('#reworkT').val(),
									 productivity_Production_availabletime_qty : $('#availabletimeVal').val(),
									 productivity_total_utilised_time: $('#totalUtilisedTime').val(),
									 productivity_per : $('#productivityper').val(),
									 
									 productivity_Production_qty : $('#qualityProduction').val(),
									 
									 //totalplannedVal
									 total_planned : $("#totalplannedVal").val(),
									 tot_planned_mins :totPlannedMins,
									 achievement_per : $('#achievementPer').val(),
									 rejection_per : $('#rejectionPer').val(),
									 rejection_rejection_qty : $('#rejectQty').val(),
									 rejection_ok_qty : $('#qualityProduction').val(),
									 quality_per : $('#qualityPer').val(),
									 losses_reason : $('#lossesReason').val(),
									 oee_per :  $('#oeePer').val()

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
							}  //validation if
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
		var wcenId="";
		var tunitid=""
		var tshiftId="";
		var tStationId="";
		var tProdDt="";
		
		console.log("planWcId--",planWcId);
		
		if(planWcId!=undefined)
		{
			wcenId=planWcId;
			tunitid=planUnitId;
			tshiftId=planShiftId;
			tProdDt=plandate;
		}
		else
		{
			wcenId=$('#addWorkCenter').val();
			tunitid=$('#addUnit').val();
			tshiftId=$('#addShift').val();
			tProdDt= $('#prodDate').val();
		}			
		
			console.log("workcenterID--+",wcenId);
			console.log("tProdDt--+",tProdDt);
			
		var dataVal = 
			{
							 
				 fromdate		: StringToDateDDMMYYYY_to_YYYYMMDD(tProdDt),
				 workcenterid 	: wcenId,  
				 todate			: StringToDateDDMMYYYY_to_YYYYMMDD(tProdDt),
				 unitid       	:tunitid,
				 shiftid		:tshiftId,

			};
			
			
			console.log("dataval--in getMachinesByPlanFilter",JSON.stringify(dataVal));
			
			
			$.ajax({
				
				 		 type: "POST",
					       url: server_url + `planning/getPlanningByFilterWithGroupBy`,
					       enctype: "application/json",
					       headers: authHeader,
					       processData: false,
					       contentType: "application/json; charset=utf-8",
					       data: JSON.stringify(dataVal),
					       success: function (response) {
								
							

								console.log("======response=========",response);
								if(response.payload.length >0 ){
									
							
									
								$("#addStation").empty();	
								timePerShiftVal = response.payload[0].time_per_shift;
								planId = response.payload[0].id;
								
								console.log("======timePerShiftVal=========",timePerShiftVal);
								console.log("======planId=========",planId);
								
								machinesOptions='<option value="0">  Select Station </option>';
							
								console.log("response.payload.length--"+response.payload.length);


								var reclength=response.payload.length;
								console.log("reclength--"+reclength);
								for (i1 = 0; i1 < response.payload.length; ++i1) {
									
									console.log("for down--",i1,"for stationid down--",response.payload[i1].stationid,"for stationname  down--",response.payload[i1].stationname);
									
								if(response.payload[i1].stationid==planStationId)	
									{
									machinesOptions=machinesOptions+`<option selected value="${response.payload[i1].stationid}">${response.payload[i1].stationname}</option>`;
									}
									else
									{
									machinesOptions=machinesOptions+`<option value="${response.payload[i1].stationid}">${response.payload[i1].stationname}</option>`;
									}
									
								//	$("#addStation").append(`<option  value="${response.payload[i1].stationid}">${response.payload[i1].stationname}</option>`);

									
							   	}
							   
								
							   	$("#addStation").append(machinesOptions);
							   	totaltimeCal();

								if(planStationId!=undefined) {
									
									$("#addStation").val(planStationId);
									$('#addStation').trigger('change');
									
								//	setTimeout(checkIfProductionAlreadyExist, 5000);
							//	checkIfProductionAlreadyExist();
								}
								//}
							   }
							   else
							   {
								
								$("#addStation").val('<option value="0">  Select Station </option>');
								
								errorBlock("#error_block", "Please create a plan! There is no planning done for the selected parameters");
																return false;
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
	availableTime();
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
	
	console.log("=======totaltime========",Number($("#totaltime").val()))
	console.log("=======Totallosses========",Number($("#Totallosses").val()))
	
	if( Number($("#totaltime").val()) > 0 && Number($("#Totallosses").val()) > 0){
		
		var sumofavailableT = Number($("#totaltime").val()) - Number($("#Totallosses").val());
		
		$("#availableT").val(sumofavailableT);
		$("#availabletimeVal").val(sumofavailableT);
		
		availabilityPerCal();
	}else{
		$("#availableT").val(0);
		$("#availabilityPer").val(0);
		$("#oeePer").val(0);
	}
}

function availabilityPerCal(){
	
	if( Number($("#availableT").val()) > 0 && Number($("#totaltime").val()) > 0){
	
		var availabilityCal = (Number($("#availableT").val()) /	Number($("#totaltime").val()) ) * 100;
	
		$("#availabilityPer").val(availabilityCal.toFixed(2));
		oeeCal();
	}else{
		$("#availabilityPer").val(0);
		$("#oeePer").val(0);
	}
	
}

function productivityCal(){
	
	if( Number($("#availabletimeVal").val()) > 0 && Number($("#totalUtilisedTime").val()) > 0){
	
		var productivityPerCal = (Number($("#totalUtilisedTime").val()) /	Number($("#availabletimeVal").val()) ) * 100;
	
		if(productivityPerCal > 100 || productivityPerCal < 0 ){
	    	errorBlock("#error_block" , " Productivity value is more than 100 % is not allow");
		}else{
			$("#productivityper").val(productivityPerCal.toFixed(2));
			oeeCal();
		}
	}else{
		$("#productivityper").val(0);
		$("#oeePer").val(0);
	}
}
function qualityCal(){
	
	if( Number($("#qualityProduction").val()) > 0 ){
	
		var qualityPerCal = ((Number($("#qualityProduction").val()) - Number($("#rejectQty").val()) ) /	Number($("#qualityProduction").val()) ) * 100;
	
	    if(qualityPerCal > 100 || qualityPerCal < 0 ){
	    	errorBlock("#error_block" , " Quality value is more than 100 % is not allow");
		}else{
		
			$("#qualityPer").val(qualityPerCal.toFixed(2));
			oeeCal();
		}
		
	}else{
		$("#qualityPer").val(0);
		$("#oeePer").val(0);
	}
}



function oeeCal(){
	
	if( Number($("#availabilityPer").val()) > 0 && Number($("#productivityper").val()) > 0 && Number($("#qualityPer").val()) > 0){
	
		var oeePerCal = ((Number($("#availabilityPer").val())/100) * (Number($("#productivityper").val())/100) * (Number($("#qualityPer").val())/100) ) * 100;
	
		$("#oeePer").val(oeePerCal.toFixed(2));
	}else{
		$("#oeePer").val(0);
	}
}

function checkIfProductionAlreadyExist()
{
	let flag=false;
		var dataVal = 
		{
			 unitid       	: $('#addUnit').val(),
			 workcenterid 	: $('#addWorkCenter').val(),  
			 shiftid       	: $('#addShift').val(),
			 stationid 		: $('#addStation').val(),
			 fromdate		: StringToDateDDMMYYYY_to_YYYYMMDD($('#prodDate').val()),						 
			 todate			: StringToDateDDMMYYYY_to_YYYYMMDD($('#prodDate').val()),
			 operatorid     : "0",	
			 
		};
									
		console.log("-------------------Welcome to checkIfProductionAlreadyExist---------",dataVal);
		$.ajax({
		    type: 'POST',
		    url: server_url + "production/getFilterProductions",
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: "application/json; charset=utf-8",
		    data: JSON.stringify(dataVal),
			
			success: function (response) {		

			console.log("------response checkIfProductionAlreadyExist----------",response);

			var data = response.payload;
			console.log("------checkIfProductionAlreadyExist----------",data);
			var reclength=response.payload.length;
			console.log("------checkIfProductionAlreadyExist--length--------",reclength);
						
			if(reclength == "0")
			{
				console.log("------return true----------");
							getShiftWorkItemList();
							}
			else
			{
				
				console.log("------trueeeee----------");
								errorBlock("#error_block", "Production entry already exist for selected parameters.");
								return false;
			
					
			}
											
			}
		});		
		
		
}