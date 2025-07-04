var unitid="";
var machinesOptions;
var itemOptions;
var shiftOptions;

var editId;
var editWsId;
var shiftid;
var count=1;
var stationid="";
var itemid="";
var rowcount="";

var addstationid="";
var additemid="";
var addrowcount="";
var flag;
var deleteItem = [];
var deleteStationItem = [];
var deleteViewItem = [];

$(document).ready(function(){
	
	getUnitList("edit");	
	//getAllMachines();
	getAllItems();
	
	//get data for plan edit
	
	editId = GetURLParameter('planid');
	
	console.log("EditID"+editId);
	
	$.ajax({
	    type: 'GET',
	    url: server_url + `planning/get/${editId}`,
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (result) {

			console.log("------response data----------",result.payload);

			unitid = result.payload.unitid;
			editWsId = result.payload.workcenterid;
			shiftid = result.payload.shiftid;
			
			$("#editUnit").val(result.payload.unitname);
			$("#editWorkCentre").val(result.payload.workcentername);
			$("#frmDate").val(result.payload.fromdate);
			$("#toDate").val(result.payload.todate);
			$("#editShift").val(result.payload.shiftname);
			$("#timePershift").val(result.payload.timePerShift);
			
		
			for (i = 0; i < result.payload.planningShiftWork.length; ++i) {
				
				var buttonDiv = "";
				
				if(result.payload.planningShiftWork[i].isdeleted == 'Inactive' ){
				
					//if(i == 0){
						buttonDiv = '<a  class="edit-button" viewid="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'_Tbody">View </a> <a  class="delete-button rowdelete" deleteid="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'_Tbody">Delete</a>  ' ;
					//}
					
					var lodstId = jQuery.trim(result.payload.planningShiftWork[i].stationid);
					
					 console.log("====lodstId=======",lodstId,"====lodstIdEnd=======",lodstIdEnd)
					
					$('#planningBbody').append('<tr class="tr_clone  '+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'_Tbody " roCnt = "'+i+'"  id = "'+jQuery.trim(result.payload.planningShiftWork[i].id)+'" >'
						+'<td class="table_input"> '+ (lodstId != lodstIdEnd ? jQuery.trim(result.payload.planningShiftWork[i].stationname) : " ") + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'"  disabled >  </td>'
						//+'<td class="table_input"> '+  jQuery.trim(result.payload.planningShiftWork[i].stationname)   + ' <input type="hidden" id=addSelMachineId${'+i+'} value="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'"  disabled >  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].itemname) + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].itemid)+'"  disabled > </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].setupname) + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].setupid)+'"  disabled >  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].setuptime) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].cycletime) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].plannedquantity) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].plannedmins) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].itemtimeutilised) + ' % <input type="hidden" id="additemtimeutilised'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].itemtimeutilised)+'"  disabled > </td>'
						+'<td class="table_input"> '+ (lodstId != lodstIdEnd ? jQuery.trim(result.payload.planningShiftWork[i].machinetimeutilised) +" %" : " " )  + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].machinetimeutilised)+'"  disabled >  </td>'
						+'<td class="table_input">'
	//					+'<a  class="edit-button" id=${id}>Edit</a>'
	 					+ (lodstId != lodstIdEnd ? buttonDiv : " ")+ '<input type="hidden" id="shiftworkid'+i+'" value="'+result.payload.planningShiftWork[i].id+'"  disabled >'
						+'</td>'
					  +'</tr>');
					  
					  var lodstIdEnd = jQuery.trim(result.payload.planningShiftWork[i].stationid);
				  
				  }
				  
				//  console.log("====lodstId=======",lodstId,"====lodstIdEnd=======",lodstIdEnd)
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
	})
	
	//end get data for plan edit
	
	$('#editUnit').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	     unitid = this.value;
		//alert(unitid)
		getWorkCentreList("edit");
		getUnitShifts();	
	});
	
	
	$(document).on("change", ".addStation", function () 
	{
		 var optionSelected = $("option:selected", this);
	     addstationid = this.value;
		 rowcount=$(this).attr("rocnt");
		 var itemjqid="#selItem"+rowcount;
	    	itemid=$(itemjqid).val();
		 					
		 getSetups("#addselSetUp"+rowcount,addstationid,itemid);
	});
	
	
	$(document).on("change", ".addItem", function () 
	{
		 var optionSelected = $("option:selected", this);
	     additemid = this.value;
		 rowcount=$(this).attr("rocnt");
		 // var stationjqid="#selMachine"+rowcount;
		 // stationid=$(stationjqid).val();
		 
		 stationid=$("#addSelMachine").val();
		 
		 getSetups("#addselSetUp"+rowcount,stationid,additemid);
	});
	
	$(document).on("change", ".addSetup", function () 
	{
		 var optionSelected = $("option:selected", this);
	     addsetupid = this.value;
		 rowcount=$(this).attr("rocnt");
		 // var stationjqid="#selMachine"+rowcount;
		 // stationid=$(stationjqid).val();
		 
		// stationid=$("#addSelMachine").val();
		 
		 getCycletime("#add","cycletime",addsetupid,rowcount);
	});	
	

	$(document).on("change", ".addtxtSetUptime", function () 
	{
	   
		console.log("minn planned cal");
		var setupTimeVal=this.value;
		var planQty="";
		var cycletime="";
		 rowcount=$(this).attr("rocnt");
		 
		 var planQtyId="#addplannedQty"+rowcount;
		 planQty=$(planQtyId).val();
		 
		 var cycletimeId="#addcycletime"+rowcount;
		 cycletime=$(cycletimeId).val();
		 
		 console.log("values"+setupTimeVal+"---plqty"+planQty);
		 
		 calculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	
	$(document).on("change", ".addtxtCycletime", function () 
	{
		
		
	   
		console.log("minn cycletime cal");
		var cycletime=this.value;
		var planQty="";
		var setupTimeVal="";
		 rowcount=$(this).attr("rocnt");
		 var planQtyId="#addplannedQty"+rowcount;
		 planQty=$(planQtyId).val();
		 
		 var setupTimeId="#addsetUptime"+rowcount;
		 setupTimeVal=$(setupTimeId).val();
		 
		 console.log("values"+setupTime+"---plqty"+planQty);
		 
		 calculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	
	$(document).on("change", ".addtxtPlannedQty", function () 
	{
	   
		console.log("minn planned cal");
		var planQty=this.value;
		var cycletime="";
		var setupTimeVal="";
		 rowcount=$(this).attr("rocnt");
		 var cycletimeId="#addcycletime"+rowcount;
		 cycletime=$(cycletimeId).val();
		 
		 var setupTimeId="#addsetUptime"+rowcount;
		 setupTimeVal=$(setupTimeId).val();
		 
		 console.log("values"+cycletime+"---plqty"+planQty);
		 
		 calculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	function calculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount)
	{
		
		console.log("=======setupTime=====",setupTimeVal,"--cycletime----",cycletime,"--planQty----",planQty);
		
		console.log("=======setupTime=====", (cycletime*planQty) );
		
		console.log("=======setupTime=====", (cycletime*planQty)/60 );
		
		console.log("=======setupTime=====", Number(setupTimeVal) );
		
		console.log("=======setupTime=====", Number(setupTimeVal) + (cycletime*planQty)/60 );
		
		var minPlanned= (Number(setupTimeVal) +(cycletime*planQty)/60).toFixed(2);
		
		console.log("minPlanned"+minPlanned+"--rowcount"+rowcount);
		
		var minPlannedId="#addplannedMins"+rowcount;
		console.log("minPlannedId---"+minPlannedId);
		
		$(minPlannedId).val(minPlanned);
		
		var timeUtilisedVal = (( minPlanned / $("#timePershift").val() ) * 100 ).toFixed(2) ;
		
		$("#addtimeUtilised"+rowcount).val(timeUtilisedVal);
		
		calculateMachinUtilis();
	}
	
	
	function calculateMachinUtilis(){
		var mins = 0;
		console.log($("#addplanningBbody").find("tr").length)
		
		for(i=0 ; i<$("#addplanningBbody").find("tr").length; i++){
			
			mins = Number(mins) + Number($("#addplanningBbody").find("tr").eq(i).find("td").eq(5).find("input[type='text']").val());
		}
		var minsVal = (( mins / $("#timePershift").val() ) * 100 ).toFixed(2)
		
		$("#addmachineTimeUtilised").val(minsVal );
	}
	

$('.add_item_add_row').on('click',function(){
						
//	SelectBoxNotAllowedNullVal
	
	if(SelectBoxNotAllowedNullVal($('#editUnit'),"Unit","#error_block"))
		if(SelectBoxNotAllowedNullVal($('#editWorkCentre'),"WorkCenter","#error_block"))
			if(NotAllowedNullVal($('#frmDate'),"From Date","#error_block"))
				if(NotAllowedNullVal($('#toDate'),"To Date","#error_block"))
					if(SelectBoxNotAllowedNullVal($('#editShift'),"Shift","#error_block"))
						//if(compareDate("#error_block",$('#frmDate').val(),$('#toDate').val()))
							if(NotAllowedNullVal($('#timePershift'),"Time per shift ","#error_block"))
							//	if(numberValidation($('#timePershift').val(),"Time per shift ", "#error_block"))
								{
	
	
	console.log("-------------table_add_link----this---------",$("#planningBbody").find('tr').length);
	
	//count = $("#planningBbody").find('tr').length;
	
      $('#addplanningBbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
//		+'<td class="table_input"><select class="form-control addStation"  id="selMachine'+count+'" rocnt = "'+count+'">	</select> </td>'
//		+'<td class="table_input"><select class="form-control addShift"  id="selShift'+count+'" rocnt = "'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control addItem"  id="addselItem'+count+'" rocnt = "'+count+'">	</select> </td>'
		+'<td class="table_input"><select class="form-control addSetup"  id="addselSetUp'+count+'" rocnt = "'+count+'" >	</select> </td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line addtxtSetUptime integer" rocnt = "'+count+'" id="addsetUptime'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line addtxtCycletime integer" rocnt = "'+count+'" id="addcycletime'+count+'" disabled></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line addtxtPlannedQty integer" rocnt = "'+count+'" id="addplannedQty'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line addtxtPlannedMins"  rocnt = "'+count+'" id="addplannedMins'+count+'" disabled></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line addtxtTimeUtilised integer" rocnt = "'+count+'" id="addtimeUtilised'+count+'" disabled></td>'
		+'<td class="table_input"><a href="#" class="deleteRow"><i class="fa fa-minus"></i></a></td>'
		

	  +'</tr>');
	  
	  
	 // alert(machinesOptions);
	  
	 // $("#selMachine"+count).append(machinesOptions);
	  $("#addselItem"+count).append(itemOptions);
	  $("#addselShift"+count).append(shiftOptions);
	  
	  
	  $("#selSetUp"+count).append('<option value=' + 0+ '>  - Select Setup - </option>');
	  
	  count++;
	  
	  }//validation if
	  
});  //end add row

	$(document).on("click", ".deleteRow", function(e){	
	
//  	$(this).closest('tr').remove();
  	
  	 $(this).closest('tr').remove();
  	
  	console.log( $(this).closest('tr').attr("rocnt") );
  	
  	var rowcount = $(this).closest('tr').attr("rocnt");
  	
  	calculateMinPlanned($("#addsetUptime"+rowcount).val(),$("#addcycletime"+rowcount).val(),$("#addplannedQty"+rowcount).val(),rowcount);
  	
  });
  
  
  	$(document).on("click", ".editdeleteRow", function(e){	
	
//  	$(this).closest('tr').remove();
  	
	  	$(this).closest('tr').remove();
	  	
	  	console.log( $(this).closest('tr').attr("rocnt") );
	  	
	  	console.log( $(this).closest('td').find("input").val() );
	  	
	  	var data = {};
	  	
	  	data.id = $(this).closest('td').find("input").val();
	  	
	  	deleteViewItem.push(data);
	  	
	  	console.log( "=======deleteItem================",deleteViewItem );
	  	
	  	
	  	var rowcount = $(this).closest('tr').attr("rocnt");
	  	
	  	editcalculateMinPlanned($("#editsetUptime"+rowcount).val(),$("#editcycletime"+rowcount).val(),$("#editplannedQty"+rowcount).val(),rowcount);

  });

  	$(document).on("click", ".neweditdeleteRow", function(e){	
	
//  	$(this).closest('tr').remove();
  	
	  	$(this).closest('tr').remove();
	  	
	  	console.log( $(this).closest('tr').attr("rocnt") );
	  	
	  	var rowcount = $(this).closest('tr').attr("rocnt");
	  	
	  	editcalculateMinPlanned($("#editsetUptime"+rowcount).val(),$("#editcycletime"+rowcount).val(),$("#editplannedQty"+rowcount).val(),rowcount);

  });

/*
		$(document).on("click", "#editPlanningData", function(e){
	
				var myarray=[];
				
				 var i =  0 ;
				 
				 
		//		if (ValidateMachine())
		//		if (ValidateShift())	
		//		if (ValidateItem())
		//		if (ValidateSetup())
		//		if(ValidateDupRow())
		//		if(ValidateSetupTimeForBlank())
		//			if(ValidatePlannedQtyForBlank())
		//		{
					//if//if(ValidateTimeUtilisedForBlank()) (ValidateSetupTimeForNum())					if(ValidatePlannedQtyForNum())					if(ValidatePlannedMinsForNum())						if(ValidateTimeUtilisedForNum())

				 $("#planningBbody").find('tr').each(function (){
		 
					 var lineData  = {
							 

							 stationid 			: $("#planningBbody").find('tr').eq(i).find('td').eq(0).find('select').val(),
							 shiftid 			: $("#planningBbody").find('tr').eq(i).find('td').eq(1).find('select').val(),
							 itemid				: $("#planningBbody").find('tr').eq(i).find('td').eq(2).find('select').val(),
							 setupid 			: $("#planningBbody").find('tr').eq(i).find('td').eq(3).find('select').val(),
							 setuptime			: $("#planningBbody").find('tr').eq(i).find('td').eq(4).find('input').val(),
							 plannedquantity	: $("#planningBbody").find('tr').eq(i).find('td').eq(5).find('input').val(),
							 plannedmins		: $("#planningBbody").find('tr').eq(i).find('td').eq(6).find('input').val(),
							 timeutilised		: $("#planningBbody").find('tr').eq(i).find('td').eq(7).find('input').val()

					};
					
		 
					 i++;
					 myarray.push(lineData);
					 
					 console.log("====myarray======",myarray);
				
				 });	 
				 console.log("====linelinelinelinelinelineline======","#line"+i);
				 
			//	 if(NotAllowedNullVal("#poErrAdd","PO Name ",$('#ponumber')))
			//		 if(ValidationForSelectBox("#poErrAdd","Customer Name ",$('#customerListadd')))
			//			 if(NotAllowedNullVal("#poErrAdd","PO Date ",$('#poDate')))
			//				 if(NotAllowedNullVal("#poErrAdd","PO End Date ",$('#poEndDate')))
			//					 if(validateLineId("#poErrAdd"))
			//						 if(validateProduct())
			//						 if(validateRegion())
			//						 if(validatePOQty()) 
						//	{
					 
					 var dataVal = {
					 
							 fromdate		: $('#frmDate').val(),
							 todate 		: $('#toDate').val(),
							 timepershift	: $('#timePershift').val(),
							 unitid       	: $('#editUnit').val(),
							 workcenterid 	:$('#editWorkCentre').val(),
							 planningShiftWorkIncomingDto	:	myarray

						};
					 
					 console.log("====data==dataVal===",dataVal);
					 
					 $.ajax({
							
						   type: 'POST',
						   url: server_url+"planning/edit",  //from API edit new data
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
								
								//$("#edit_po").modal("hide");
							// $('#planningBbody').empty();
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
						   }
				});
		//	}
			
		//	}//else of validation
			
			
});
*/


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
					
					$("#editWorkCentre").val(editWsId);
				
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

/*
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
							
				           //   $(".editStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
							 //  $("#editStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
				           }
						   
						   $("#addSelMachine").append(machinesOptions);
						   $("#editSelMachine").append(machinesOptions);
						   
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
	}*/


	function getAllItems()
		{
			$.ajax({
			       type: "GET",
			       url: server_url + `item/getActiveItems`,
			       enctype: "application/json",
			       headers: authHeader,
			       processData: false,
			       contentType: false,
			       data: null,
			       success: function (response) {
						$(".editItem").empty();
						$(".addItem").empty();
					//	$("#editItem").empty();
						//$(".editItem").append('<option value="0">  Select item </option>');
						
						itemOptions='<option value="0">  Select Item </option>';

						
					//	$("#editItem").append('<option value="0">  Select item </option>');

			           for (i = 0; i < response.payload.length; ++i) {
			             
						//  $(".editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
						   
						itemOptions=itemOptions+`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`;
						
						//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
			           }
					   
					   $(".editItem").append(itemOptions);
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
								$("#editShift").empty();
							//	$("#editItem").empty();
							//	$(".editShift").append('<option value="0">  Select item </option>');
								
								
								$("#editShift").append('<option value="0">  Select Shift </option>');
								
								
								
							//	$("#editItem").append('<option value="0">  Select item </option>');

					           for (i = 0; i < response.payload.length; ++i) {
					            //   $(".editShift").append(`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`);
								
								
								$("#editShift").append(`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`);
								   
								//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
								   
					           }
							   
							   $("#editShift").val(shiftid);
							   
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
				function getSetups(divNameAndRowCount,stationid,itemid)
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
								$(divNameAndRowCount).empty();
							
									console.log("=======response=======",response);
								
									
								//	$(".editShift").empty();
								//	$("#editItem").empty();
									$(divNameAndRowCount).append('<option value="0">  Select Setup </option>');
								//	$("#editItem").append('<option value="0">  Select item </option>');

						           for (i = 0; i < response.payload.length; ++i) {
						               $(divNameAndRowCount).append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
									   
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
				
			function getAndSetSetups(divNameAndRowCount,stationid,itemid,setupid)
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
								$(divNameAndRowCount).empty();
							
									console.log("=======response=======",response);
								
									
								//	$(".editShift").empty();
								//	$("#editItem").empty();
									$(divNameAndRowCount).append('<option value="0">  Select Setup </option>');
								//	$("#editItem").append('<option value="0">  Select item </option>');

						           for (i = 0; i < response.payload.length; ++i) {
						               $(divNameAndRowCount).append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
									   
						           }
						           
						           $(divNameAndRowCount).val(setupid);
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
								
				
		function getCycletime(divType,dviname,setupid,rowcount)
				{
					

					console.log(divType+dviname+rowcount);
										
						$.ajax({
						       type: "GET",
						       url: server_url + `setup/get/`+setupid,
						       enctype: "application/json",
						       headers: authHeader,
						       processData: false,
						       contentType: false,
						       data: null,
						       success: function (response) {
								
							//	'#product'+counter
								$(divType+dviname+rowcount).empty();
							
								
								console.log("========response========",response)
								console.log("========response========",divType+dviname+rowcount)
									
								console.log("========response========",	$(divType+"setUptime"+rowcount).val(),response.payload.cycletime,$(divType+"plannedQty"+rowcount).val(),rowcount);
									
									$(divType+dviname+rowcount).val(response.payload.cycletime);
									
									if(divType == "#add"){
										calculateMinPlanned($(divType+"setUptime"+rowcount).val(),response.payload.cycletime,$(divType+"plannedQty"+rowcount).val(),rowcount);	
									}
									
									if(divType == "#edit"){
										editcalculateMinPlanned($(divType+"setUptime"+rowcount).val(),response.payload.cycletime,$(divType+"plannedQty"+rowcount).val(),rowcount);	
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

/*function ValidateMachine()
{
		$(".editStation").each(function() {
			console.log("in vali sel",$(this).val());
				
			if(SelectBoxNotAllowedNullVal($(this),"Station","#error_block"))		
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
}*/				


function validateRows(tBodyId)
{
	var tbodylen=$("#"+tBodyId).find("tr").length;
	
	if(tbodylen > 0)
		return true;
	else
	{
		errorBlock("#error_block", "Add at least one row of item.");
		return false;
	}
	
	
}
		
function ValidateItem(classid)
{
	var flag=false;
	
	console.log("in item vali--"+classid+"--");
		$("."+classid+"Item").each(function() {
			
			if(SelectBoxNotAllowedNullVal($(this),"Item","#error_block"))	
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
	var flag=false;
		$(".editShift").each(function() {
			
			console.log("in vali sel",$(this).val());
						
				if(SelectBoxNotAllowedNullVal($(this),"Shift","#error_block"))
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

function ValidateSetup(classid)
{
	var flag=false;
		$("."+classid+"Setup").each(function() {
			
			console.log("in vali sel",$(this).val());
						
			//if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
			if(SelectBoxNotAllowedNullVal($(this),"Setup","#error_block"))	
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


function ValidateSetupTimeForBlank(classid)  
{
	var flag=false;
		$("."+classid+"txtSetUptime").each(function() {
			
			console.log("in vali sel",$(this).val());
			
		if(NotAllowedNullVal($(this),"Setup Time","#error_block"))
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




function ValidatePlannedQtyForBlank(classid)  
{
	
	var flag=false;
			$("."+classid+"txtPlannedQty").each(function() {
				
				console.log("in vali sel txtPlannedQty",$(this).val());
				
	//			if(validationSelectBox($(this).val(),"Setup","#setupErrDiv"))
			//	if(NotAllowedNullVal("#setupErrDiv","Planned Quantity",$(this)))
					
				if(NotAllowedNullVal($(this),"Planned Quantity","#error_block"))
					if(NotAllowedZeroVal($(this),"Planned Quantity","#error_block"))
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


/*	
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
		}*/

		
/*	
	
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
*/

function ValidateDupRow(classid)
{
	//$(setupErrDiv).empty();
	var seen = new Set();
	 var duplicateFound = true;
	 
	$('#'+classid+'_po_table_modal tr').each(function () {
	
	//  var st = $(this).find('td:eq(0) select').val();
	//  var sht = $(this).find('td:eq(1) select').val();
	  var it = $(this).find('td:eq(0) select').val();
	  var sett = $(this).find('td:eq(1) select').val();
	  
	//  var key = st + '-' + sht+ '-' +it+ '-' +sett;
	
	var key = it+ '-' +sett;

	  if (seen.has(key)) {
		
		console.log("dupp found "+key);
		
		//$(setupErrDiv).append("Duplicate row found");
		errorBlock("#error_block", " Duplicate row for Item and Setup found ")
		
	    duplicateFound = false;
	    return false; // break out of loop
	  } else {
	    seen.add(key);
	  }
	});
	
	return duplicateFound;
	
}

						
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}

 function idgenerator() {
 
	 this.length = 8;
	 this.timestamp = +new Date;
	 
	 var _getRandomInt = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	 }
	 
	 this.generate = function() {
		 var ts = this.timestamp.toString();
		 var parts = ts.split( "" ).reverse();
		 var id = "";
		 
		 for( var i = 0; i < this.length; ++i ) {
			var index = _getRandomInt( 0, parts.length - 1 );
			id += parts[index];	 
		 }
		 
		 return id;
	 }
 }
			

 function PercentLimit(value,Msg)	
 	{
 			
 		if(value < 100)
 			return true;
 		else
 		{
 			errorBlock("#error_block", Msg+" can not be more than 100")
 			return false;
 		}
 	}	
 
 
$(document).on("click", "#additemmodal", function(e){
	
	
	EmptyModal();
	$("#add_item").modal("show");
	getMachinesByWc(editWsId);
	
	
});			


function EmptyModal()
{
	console.log("inside empty");
	
	$("#po_table_modal").find("tr:gt(1)").remove();
	
	$("#addSelMachine").prop("selectedIndex", 0);
	$("#addmachineTimeUtilised").val("");
	$("#po_table_modal").find("tr").eq(1).find("td").eq(2).find("input[type='text']").val('');
	$("#po_table_modal").find("tr").eq(1).find("td").eq(3).find("input[type='text']").val('');
	$("#po_table_modal").find("tr").eq(1).find("td").eq(4).find("input[type='text']").val('');
	$("#po_table_modal").find("tr").eq(1).find("td").eq(5).find("input[type='text']").val('');
	$("#po_table_modal").find("tr").eq(1).find("td").eq(6).find("input[type='text']").val('');
	$("#po_table_modal").find("tr").eq(1).find("td").eq(0).find("select").prop("selectedIndex", 0); 
	$("#po_table_modal").find("tr").eq(1).find("td").eq(1).find("select").prop("selectedIndex", 0); 
	
}
			
			
 $(document).on("click", "#addItemDataInPlanningTable", function(e){
	
	console.log("in add validation");
	
	
	var addSelMachine = $("#addSelMachine").find(":selected").text();
	var addSelMachineval = $("#addSelMachine").find(":selected").val();
	var machineutilised = $("#addmachineTimeUtilised").val();


	//console.log($("#addplanningBbody").find("tr").length)
	
	var col1="";
	var col2="";
	var col3="";
	
	if(SelectBoxNotAllowedNullVal($("#addSelMachine"),"Machine","#error_block"))
		if(validateRows("addplanningBbody"))
			if (ValidateItem("add"))
			if (ValidateSetup("add"))
			if(ValidateSetupTimeForBlank("add"))
			 if(ValidatePlannedQtyForBlank("add"))
				if(PercentLimit($("#addmachineTimeUtilised").val(),"Machine Time Utilised"))
				if(ValidateDupRow("add"))
	{
	for(i=0 ; i<$("#addplanningBbody").find("tr").length; i++){
		
	//	console.log($("#addplanningBbody").find("tr").eq(i).find("td"));
	//	console.log($("#addplanningBbody").find("tr").eq(i).find("td").length);
		
		
		//for(j=0 ; j<$("#planningBbody").find("tr").eq(i).find("td").length; j++){
			
			var itemrowcount  = $("#addplanningBbody").find("tr").eq(i).find("td").length;
			var item = $("#addplanningBbody").find("tr").eq(i).find("td").eq(0).find("select option:selected").text();
			var itemId = $("#addplanningBbody").find("tr").eq(i).find("td").eq(0).find("select option:selected").val();
			var setup = $("#addplanningBbody").find("tr").eq(i).find("td").eq(1).find("select option:selected").text();
			var setupId = $("#addplanningBbody").find("tr").eq(i).find("td").eq(1).find("select option:selected").val();
			
			var setuptime = $("#addplanningBbody").find("tr").eq(i).find("td").eq(2).find("input[type='text']").val();
			var cycletime = $("#addplanningBbody").find("tr").eq(i).find("td").eq(3).find("input[type='text']").val();
			var quantity = $("#addplanningBbody").find("tr").eq(i).find("td").eq(4).find("input[type='text']").val();
			var mins = $("#addplanningBbody").find("tr").eq(i).find("td").eq(5).find("input[type='text']").val();
			var itemutilised = $("#addplanningBbody").find("tr").eq(i).find("td").eq(6).find("input[type='text']").val();
		
	//	}
		if(i == 0){
			 col1 = " <tr  class='tr_clone  "+jQuery.trim(addSelMachineval)+ "_Tbody ' roCnt = '"+count+"'  id = '"+jQuery.trim(addSelMachine)+"'   ><td > "+addSelMachine+ " <input type='hidden' id=addSelMachineId"+i+" value="+addSelMachineval+"  disabled > </td> ";
			 col2 = " <td>"+item +" <input type='hidden' id=itemId"+i+" value="+itemId+"  disabled>  </tb><td>"+setup +"  <input type='hidden' id='setupId"+i+"'  value="+setupId+"  disabled>  </tb><td>"
			 +setuptime +"</tb><td>"+cycletime +"</tb><td>"+quantity +"</tb><td>"+mins +"</tb><td>"+itemutilised +" % <input type='hidden' id='itemutilisedId"+i+"' value="+itemutilised+"  disabled> </tb> " ;
			 col3 = " <td> "+machineutilised+" % <input type='hidden' id='machineutilisedId"+i+"' value="+machineutilised+"  disabled> </td> <td>  <a  class='edit-button' viewid='"+jQuery.trim(addSelMachineval)+"_Tbody'>View</a> <a  class='delete-button newrowdelete' deleteid='"+jQuery.trim(addSelMachineval)+"_Tbody'>Delete </a> </td></tr>";
			 
			 $("#planningBbody").append(col1+col2+col3);
		}else{
			
			 col1 = "<tr  class='tr_clone  "+jQuery.trim(addSelMachineval)+ "_Tbody ' roCnt = '"+count+"'  id = '"+jQuery.trim(addSelMachine)+"'  ><td> <input type='hidden' id='addSelMachineId"+i+"' value="+addSelMachineval+"  disabled > </td> ";
			 col2 ="<td>"+item +" <input type='hidden' id='itemId"+i+"' value="+itemId+"  disabled>  </tb><td>"+setup +"   <input type='hidden' id='setupId"+i+"'  value="+setupId+"  disabled>  </tb><td>"
			 +setuptime +"</tb><td>"+cycletime +"</tb><td>"+quantity +"</tb><td>"+mins +"</tb><td>"+itemutilised +"% <input type='hidden' id='itemutilisedId"+i+"' value="+itemutilised+"  disabled> </tb> " ;
			 col3 = " <td> <input type='hidden' id='machineutilisedId"+i+"' value="+machineutilised+"  disabled> </td> <td> </td></tr>";
			 $("#planningBbody").append(col1+col2+col3);
		}
		
		$("#add_item").modal("hide");

		
	}
	
	}//validation if
//	console.log($("#addPlantListBody").find("tr"))
	
	
	
	
//	$("#add_item").append("<tr><td> "+addSelMachine+ " </td> <td>"+ +"</tb> <td> 60 % </td></tr>")
	
	});
	
	
	$(document).on("click", ".edit-button", function(e){
	
	console.log("=======viewid===========",$(this))
	console.log("=======viewid===========",$(this).attr("viewid"));
	
	var editstationidId;
	var editmachinetimeutilised;
	
	deleteViewItem = [];
	
	console.log("=======deleteItem===========",deleteViewItem)
	
	$("#editSelMachine").prop("disabled", true);
	
	$('#editplanningBbody').empty();
	
	
		if(SelectBoxNotAllowedNullVal($('#editUnit'),"Unit","#error_block"))
		if(SelectBoxNotAllowedNullVal($('#editWorkCentre'),"WorkCenter","#error_block"))
			if(NotAllowedNullVal($('#frmDate'),"From Date","#error_block"))
				if(NotAllowedNullVal($('#toDate'),"To Date","#error_block"))
					if(SelectBoxNotAllowedNullVal($('#editShift'),"Shift","#error_block"))
						//if(compareDate("#error_block",$('#frmDate').val(),$('#toDate').val()))
							if(NotAllowedNullVal($('#timePershift'),"Time per shift ","#error_block"))
							//	if(numberValidation($('#timePershift').val(),"Time per shift ", "#error_block"))
								{
	
			for(i=0 ; i<$("#planningBbody").find("tr."+$(this).attr("viewid")).length; i++){
				
				console.log($("#planningBbody").find("tr").eq(i).find("td"));
				console.log($("#planningBbody").find("tr").eq(i).find("td").length);
				
				if(i== 0 ){
					editstationidId = $("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(0).find("input").eq(0).val() ;
					
					$("#editSelMachine").val(editstationidId);
					$("#editmachineTimeUtilised").val($("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(8).find("input").eq(0).val());
				}
				
				
			//	console.log(" ========planningBbody===========8====",$("#planningBbody").find('tr').eq(i).find('td').eq(8).text());
				
			//	$("#editmachineTimeUtilised").val($("#planningBbody").find('tr').eq(i).find('td').eq(8).text());
				
				
				 $('#editplanningBbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
		//		+'<td class="table_input"><select class="form-control addStation"  id="selMachine'+count+'" rocnt = "'+count+'">	</select> </td>'
		//		+'<td class="table_input"><select class="form-control addShift"  id="selShift'+count+'" rocnt = "'+count+'" >	</select> </td>'
				+'<td class="table_input"><select class="form-control editItem"  id="editselItem'+count+'" rocnt = "'+count+'">'+itemOptions+'</select> </td>'
				+'<td class="table_input"><select class="form-control editSetup"  id="editselSetUp'+count+'" rocnt = "'+count+'" >'+shiftOptions+'</select> </td>'
				+'<td class="table_input"><input type="text" class="form-control width80 line edittxtSetUptime integer" rocnt = "'+count+'" id="editsetUptime'+count+'"></td>'
				+'<td class="table_input"><input type="text" class="form-control width80 line edittxtCycletime integer" rocnt = "'+count+'" id="editcycletime'+count+'" disabled></td>'
				+'<td class="table_input"><input type="text" class="form-control width80 line edittxtPlannedQty integer" rocnt = "'+count+'" id="editplannedQty'+count+'"></td>'
				+'<td class="table_input"><input type="text" class="form-control width80 line edittxtPlannedMins"  rocnt = "'+count+'" id="editplannedMins'+count+'" disabled></td>'
				+'<td class="table_input"><input type="text" class="form-control width80 line edittxtTimeUtilised integer" rocnt = "'+count+'" id="edittimeUtilised'+count+'" disabled></td>'
				+'<td class="table_input"><a href="#" class="editdeleteRow"><i class="fa fa-minus"></i></a><input type="hidden" class="form-control editItemId" id="editItemId'+count+'" disabled> </td>'
				
		
			  +'</tr>');
			  
			  var itemid  = $("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(1).find("input").eq(0).val();
			  var setupid = $("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(2).find("input").eq(0).val()
			  $("#editselItem"+count).val(itemid);
			  
			  getAndSetSetups("#editselSetUp"+count,editstationidId,itemid,setupid);
			  
			  
			  $("#editsetUptime"+count).val(jQuery.trim($("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(3).text()));
			  $("#editcycletime"+count).val(jQuery.trim($("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(4).text()));
			  $("#editplannedQty"+count).val(jQuery.trim($("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(5).text()));
			  $("#editplannedMins"+count).val(jQuery.trim($("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(6).text()));
			  $("#edittimeUtilised"+count).val(jQuery.trim($("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(7).find("input").eq(0).val()));
			  $("#editItemId"+count).val($("#planningBbody").find('tr.'+$(this).attr("viewid")).eq(i).find('td').eq(9).find("input").eq(0).val());
			  
			  
			  count++;
				/*
					 itemid			 	 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(1).find("input").eq(0).val(),
					 setupid			 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(2).find("input").eq(0).val(),
					 setuptime 			 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(3).text(),
					 cycletime			 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(4).text(),
					 plannedquantity	 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(5).text(),
					 plannedmins		 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(6).text(),
					 itemtimeutilised	 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(7).text(),
					 machinetimeutilised : $("#addPlantListBody").find('tr').eq(i).find('td').eq(8).text()
				*/
			 }
	 	}
	
		$("#edit_item").modal("show");
	
	});
	
	
	
	$(document).on("change", ".editStation", function () 
	{
		 var optionSelected = $("option:selected", this);
	     stationid = this.value;
		 rowcount=$(this).attr("rocnt");
		 var itemjqid="#selItem"+rowcount;
	    	itemid=$(itemjqid).val();
		 					
		 getSetups("#editselSetUp"+rowcount,stationid,itemid);
	});
	
	
	$(document).on("change", ".editItem", function () 
	{
		 var optionSelected = $("option:selected", this);
	     itemid = this.value;
		 rowcount=$(this).attr("rocnt");
		 // var stationjqid="#selMachine"+rowcount;
		 // stationid=$(stationjqid).val();
		 
		 stationid=$("#editSelMachine").val();
		 
		 getSetups("#editselSetUp"+rowcount,stationid,itemid);
	});
	
	$(document).on("change", ".editSetup", function () 
	{
		 var optionSelected = $("option:selected", this);
	     setupid = this.value;
		 rowcount=$(this).attr("rocnt");
		 // var stationjqid="#selMachine"+rowcount;
		 // stationid=$(stationjqid).val();
		 
		// stationid=$("#editSelMachine").val();
		 
//		 getCycletime("#editcycletime"+rowcount,setupid);
		 getCycletime("#edit","cycletime",setupid,rowcount);
	});	
	

	$(document).on("change", ".edittxtSetUptime", function () 
	{
	   
		console.log("minn planned cal");
		var setupTimeVal=this.value;
		var planQty="";
		var cycletime="";
		 rowcount=$(this).attr("rocnt");
		 
		 var planQtyId="#editplannedQty"+rowcount;
		 planQty=$(planQtyId).val();
		 
		 var cycletimeId="#editcycletime"+rowcount;
		 cycletime=$(cycletimeId).val();
		 
		 console.log("values"+setupTimeVal+"---plqty"+planQty);
		 
		 editcalculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	
	$(document).on("change", ".edittxtCycletime", function () 
	{
	   
		console.log("minn cycletime cal");
		var cycletime=this.value;
		var planQty="";
		var setupTimeVal="";
		 rowcount=$(this).attr("rocnt");
		 var planQtyId="#editplannedQty"+rowcount;
		 planQty=$(planQtyId).val();
		 
		 var setupTimeId="#editsetUptime"+rowcount;
		 setupTimeVal=$(setupTimeId).val();
		 
		 console.log("values"+setupTime+"---plqty"+planQty);
		 
		 editcalculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	
	$(document).on("change", ".edittxtPlannedQty", function () 
	{
	   
		console.log("minn planned cal");
		var planQty=this.value;
		var cycletime="";
		var setupTimeVal="";
		 rowcount=$(this).attr("rocnt");
		 var cycletimeId="#editcycletime"+rowcount;
		 cycletime=$(cycletimeId).val();
		 
		 var setupTimeId="#editsetUptime"+rowcount;
		 setupTimeVal=$(setupTimeId).val();
		 
		 console.log("values"+cycletime+"---plqty"+planQty);
		 
		 editcalculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	function editcalculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount)
	{
		
		console.log("=======setupTime=====",setupTimeVal,"--cycletime----",cycletime,"--planQty----",planQty);
		
		console.log("=======setupTime=====", (cycletime*planQty) );
		
		console.log("=======setupTime=====", (cycletime*planQty)/60 );
		
		console.log("=======setupTime=====", Number(setupTimeVal) );
		
		console.log("=======setupTime=====", Number(setupTimeVal) + (cycletime*planQty)/60 );
		
		var minPlanned= (Number(setupTimeVal) +(cycletime*planQty)/60).toFixed(2);
		
		console.log("minPlanned"+minPlanned+"--rowcount"+rowcount);
		
		var minPlannedId="#editplannedMins"+rowcount;
		console.log("minPlannedId---"+minPlannedId);
		
		$(minPlannedId).val(minPlanned);
		
		var timeUtilisedVal = (( minPlanned / $("#timePershift").val() ) * 100 ).toFixed(2) ;
		
		$("#edittimeUtilised"+rowcount).val(timeUtilisedVal);
		
		editcalculateMachinUtilis();
	}
	
	function editcalculateMachinUtilis(){
			var mins = 0;
			console.log($("#editplanningBbody").find("tr").length)
			
			for(i=0 ; i<$("#editplanningBbody").find("tr").length; i++){
				
				mins = Number(mins) + Number($("#editplanningBbody").find("tr").eq(i).find("td").eq(5).find("input[type='text']").val());
			}
			var minsVal = (( mins / $("#timePershift").val() ) * 100 ).toFixed(2)
			
			$("#editmachineTimeUtilised").val(minsVal  );
	}
	
	
$('.edit_item_add_row').on('click',function(){
						
//	SelectBoxNotAllowedNullVal
	
	if(SelectBoxNotAllowedNullVal($('#editUnit'),"Unit","#error_block"))
		if(SelectBoxNotAllowedNullVal($('#editWorkCentre'),"WorkCenter","#error_block"))
			if(NotAllowedNullVal($('#frmDate'),"From Date","#error_block"))
				if(NotAllowedNullVal($('#toDate'),"To Date","#error_block"))
					if(SelectBoxNotAllowedNullVal($('#editShift'),"Shift","#error_block"))
						//if(compareDate("#error_block",$('#frmDate').val(),$('#toDate').val()))
							if(NotAllowedNullVal($('#timePershift'),"Time per shift ","#error_block"))
							//	if(numberValidation($('#timePershift').val(),"Time per shift ", "#error_block"))
								{
	
	
	console.log("-------------table_add_link----this---------",$("#planningBbody").find('tr').length);
	
	//count = $("#planningBbody").find('tr').length;
	
      $('#editplanningBbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
//		+'<td class="table_input"><select class="form-control addStation"  id="selMachine'+count+'" rocnt = "'+count+'">	</select> </td>'
//		+'<td class="table_input"><select class="form-control addShift"  id="selShift'+count+'" rocnt = "'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control editItem"  id="editselItem'+count+'" rocnt = "'+count+'">	</select> </td>'
		+'<td class="table_input"><select class="form-control editSetup"  id="editselSetUp'+count+'" rocnt = "'+count+'" >	</select> </td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line edittxtSetUptime integer" rocnt = "'+count+'" id="editsetUptime'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line edittxtCycletime integer" rocnt = "'+count+'" id="editcycletime'+count+'" disabled></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line edittxtPlannedQty integer" rocnt = "'+count+'" id="editplannedQty'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line edittxtPlannedMins"  rocnt = "'+count+'" id="editplannedMins'+count+'" disabled></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line edittxtTimeUtilised integer" rocnt = "'+count+'" id="edittimeUtilised'+count+'" disabled></td>'
		+'<td class="table_input"><a href="#" class="neweditdeleteRow"><i class="fa fa-minus"></i></a> <input type="hidden" class="form-control editItemId " id="editItemId'+count+'" disabled="" value=""></td>'
		

	  +'</tr>');
	  
	  
	 // alert(machinesOptions);
	  
	 // $("#selMachine"+count).append(machinesOptions);
	  $("#editselItem"+count).append(itemOptions);
	  $("#editselShift"+count).append(shiftOptions);
	  
	  
	  $("#selSetUp"+count).append('<option value=' + 0+ '>  - Select Setup - </option>');
	  
	  count++;
	  
  }//validation if
	  
});

$(document).on("click", ".newrowdelete", function(e){

	console.log($(this).attr("deleteid"));

	$("."+$(this).attr("deleteid")).remove()
	
	$("#planningBbody")
	
});


$(document).on("click", ".rowdelete", function(e){

	console.log($(this).attr("deleteid"));

		for(i=0 ; i<$("#planningBbody").find("tr."+$(this).attr("deleteid")).length; i++){
				
				//console.log($("#planningBbody").find("tr."+$(this).attr('deleteid')).eq(i).find("td"));
				//console.log($("#planningBbody").find("tr."+$(this).attr('deleteid')).eq(i).find("td").length);
				
				
				//console.log($("#planningBbody").find('tr.'+$(this).attr("deleteid")).eq(i).find('td').eq(9).find("input").eq(0).val());
				
				//if(i== 0 ){
					editstationidId = $("#planningBbody").find('tr.'+$(this).attr("deleteid")).eq(i).find('td').eq(9).find("input").eq(0).val() ;
					
					
					var data = {};
	  	
				  	data.id = editstationidId;
				  	
				  	deleteStationItem.push(data);
				  	
					console.log("----------rowdelete-----",deleteStationItem);
			//	}
		}

	$("."+$(this).attr("deleteid")).remove()
	
});



$(document).on("click", "#editItemDataInPlanningTable", function(e){
	
	
	console.log("in edit save");
	
	var editSelMachine = $("#editSelMachine").find(":selected").text();
	var editSelMachineval = $("#editSelMachine").find(":selected").val();
	var machineutilised = jQuery.trim($("#editmachineTimeUtilised").val());


	var machineutilisedsplit = machineutilised.split("%");
	var machineutilisedVal = jQuery.trim(machineutilisedsplit[0]);

//console.log("==============editSelMachineval===machineutilisedsplit=====",machineutilisedsplit);
//console.log("==============editSelMachineval===machineutilisedsplit=====",machineutilisedsplit[0]);

	//console.log($("#editplanningBbody").find("tr").length)
	
	var col1="";
	var col2="";
	var col3="";
	
	console.log("==============editSelMachineval========",editSelMachineval);
		/*for(j=0 ; j<$("#planningBbody").find("tr").length; j++){
		
			console.log( $("#planningBbody").find('tr'));
			console.log( $("#planningBbody").find('tr').eq(j).attr("rostationid") );*/
			
			/*
			if(editSelMachineval == $("#planningBbody").find('tr').eq(j).find('td').eq(0).find("input").eq(0).val() ){
				
				console.log( $("#planningBbody").find('tr').eq(j).remove() );
			}
			*/
		//	console.log( $("#"+editSelMachineval).remove() );
		//	console.log( $("."+editSelMachineval+"_Tbody").remove() );
			
			
	//	}
	
	
		if(SelectBoxNotAllowedNullVal($("#editSelMachine"),"Machine","#error_block"))
		if(validateRows("editplanningBbody"))
		if(ValidateItem("edit"))
		if(ValidateSetup("edit"))
		if(ValidateSetupTimeForBlank("edit"))
		if(ValidatePlannedQtyForBlank("edit"))
		if(PercentLimit($("#editmachineTimeUtilised").val(),"Machine Time Utilised"))
		if(ValidateDupRow("edit"))	
			{
			
			$("."+editSelMachineval+"_Tbody").remove()
	
			for(i=0 ; i<$("#editplanningBbody").find("tr").length; i++){
			
				console.log($("#editplanningBbody").find("tr").eq(i).find("td"));
				console.log($("#editplanningBbody").find("tr").eq(i).find("td").length);
				
				//for(j=0 ; j<$("#planningBbody").find("tr").eq(i).find("td").length; j++){
				
				var itemrowcount  = $("#editplanningBbody").find("tr").eq(i).find("td").length;
				var item = $("#editplanningBbody").find("tr").eq(i).find("td").eq(0).find("select option:selected").text();
				var itemId = $("#editplanningBbody").find("tr").eq(i).find("td").eq(0).find("select option:selected").val();
				var setup = $("#editplanningBbody").find("tr").eq(i).find("td").eq(1).find("select option:selected").text();
				var setupId = $("#editplanningBbody").find("tr").eq(i).find("td").eq(1).find("select option:selected").val();
				
				var setuptime = jQuery.trim($("#editplanningBbody").find("tr").eq(i).find("td").eq(2).find("input[type='text']").val());
				var cycletime = jQuery.trim($("#editplanningBbody").find("tr").eq(i).find("td").eq(3).find("input[type='text']").val());
				var quantity = jQuery.trim($("#editplanningBbody").find("tr").eq(i).find("td").eq(4).find("input[type='text']").val());
				var mins = jQuery.trim($("#editplanningBbody").find("tr").eq(i).find("td").eq(5).find("input[type='text']").val());
				var itemutilised = jQuery.trim($("#editplanningBbody").find("tr").eq(i).find("td").eq(6).find("input[type='text']").val());
				var itemrowId = $("#editplanningBbody").find("tr").eq(i).find("td").eq(7).find("input[type='hidden']").val();
			
				var itemutilisedsplit = itemutilised.split("%");
				var itemutilisedVal = jQuery.trim(itemutilisedsplit[0]);
				
				if(itemrowId == undefined){
					itemrowId = "";
				}
				
					console.log("========itemrowId===========",itemrowId);
					console.log("========i===========",i);	
			//	}
				if(i == 0){
					 col1 = " <tr class= 'tr_clone "+jQuery.trim(editSelMachineval)+"_Tbody'  roCnt ='"+i+"'  id = '"+jQuery.trim(editSelMachineval)+"' ><td > "
					 		+editSelMachine+ " <input type='hidden' id='editSelMachineId"+itemrowId+"_"+i+"' value='"+jQuery.trim(editSelMachineval)+"'  disabled > </td> ";
					 		
					 col2 = " <td>"+item+" <input type='hidden' id='itemId"+itemrowId+"_"+i+"' value='"+itemId+"'  disabled>  </tb><td>"+setup+"  <input type='hidden' id='setupId"+itemrowId+"_"+i+"'  value='"+setupId+"'  disabled>  </tb><td>"
					 		+setuptime+"</tb><td>"+cycletime+"</tb><td>"+quantity+"</tb><td>"+mins+"</tb><td>"
					 		+itemutilised+"  <input type='hidden' class='form-control editItemutilisedId '  value='"+itemutilisedVal+"' id='editItemutilisedId"+itemrowId+"_"+i+"' disabled> </tb> " ;
					 
					 col3 = " <td> "+machineutilised+"  <input type='hidden' class='form-control editItemId '  value='"+machineutilisedVal+"' id='editItemId"+itemrowId+"_"+i+"_m' disabled>  </td> <td>  <a  class='edit-button' viewid='"
					 		+jQuery.trim(editSelMachineval)+"_Tbody'>View</a> <a  class='delete-button rowdelete'  deleteid='"+jQuery.trim(editSelMachineval)+"_Tbody'>Delete </a> <input type='hidden' class='form-control editItemId '   id='editItemId"+itemrowId+"_"+i+"' disabled> </td></tr>";
					 
					 $("#planningBbody").append(col1+col2+col3);
				}else{
					
					 col1 = "<tr class= 'tr_clone "+jQuery.trim(editSelMachineval)+"_Tbody'  roCnt ='"+i+"'  id = '"
					 		+jQuery.trim(editSelMachineval)+"' ><td> <input type='hidden' id='editSelMachineId"+itemrowId+"_"+i+"' value='"+editSelMachineval+"'  disabled > </td> ";
					 
					 col2 ="<td>"+item+" <input type='hidden' id='itemId"+itemrowId+"_"+i+"' value='"+itemId+"'  disabled>  </tb><td>"+setup+"   <input type='hidden' id='setupId"+itemrowId+"_"+i+"'  value='"+setupId+"'  disabled>  </tb><td>"
					 		+setuptime+"</tb><td>"+cycletime+"</tb><td>"+quantity+"</tb><td>"+mins+"</tb><td>"
					 		+itemutilised+"   <input type='hidden' class='form-control editItemutilisedId '  value='"+itemutilisedVal+"' id='editItemutilisedId"+itemrowId+"_"+i+"' disabled> </tb> " ;
					 col3 = " <td> <input type='hidden' class='form-control editmachineutilisedId '  value='"+machineutilisedVal+"' id='editmachineutilisedId"+itemrowId+"_"+i+"' disabled> </td> <td> <input type='hidden' class='form-control editItemId'   id='editItemId"+itemrowId+"_"+i+"' disabled> </td></tr>";
					 $("#planningBbody").append(col1+col2+col3);
				}
				
				$("#editItemId"+itemrowId+"_"+i).val(itemrowId)
				
			}
		
		
		
		if(deleteItem.length > 0){
			
			deleteItem = $.merge(deleteItem, deleteViewItem)

			
		}else{
			deleteItem = deleteViewItem.slice()
		}
		
		console.log("=========deleteItem============",deleteItem)
		
		$("#edit_item").modal("hide");
		}//validation if
	
//	console.log($("#addPlantListBody").find("tr"))
//	$("#add_item").append("<tr><td> "+addSelMachine+ " </td> <td>"+ +"</tb> <td> 60 % </td></tr>")
	
});	



	$(document).on("click", "#editPlanningData", function(e){
	
		console.log($("#planningBbody").find('tr'));

		console.log($("#planningBbody").find('tr').eq(0).find('td').eq(0).text());
		console.log($("#planningBbody").find('tr').eq(0).find('td').eq(0).text());

		var myarray=[];

		var i =  0 ;
		
		var stationidId = "";

		$("#planningBbody").find('tr').each(function (){
			
			
			console.log($("#planningBbody").find('tr').eq(i).find('td').eq(0).text());
			
			console.log($("#planningBbody").find('tr').eq(i).find('td').eq(0).find("input").eq(0).val());
			
			
			if($("#planningBbody").find('tr').eq(i).find('td').eq(0).text() == '' 
				|| $("#planningBbody").find('tr').eq(i).find('td').eq(0).text() == ' ' 
					|| $("#planningBbody").find('tr').eq(i).find('td').eq(0).text() == '&nbsp;' ){
				
				stationidId = stationidId;
				
				console.log("=========stationidVal======if=====");
				
			}else{
				
				console.log("=========stationidVal=====else======");
				stationidId =  $("#planningBbody").find('tr').eq(i).find('td').eq(0).find("input").eq(0).val();
				
			}
			
			console.log("=========stationidVal==text=========",$("#planningBbody").find('tr').eq(i).find('td').eq(0).text());
			console.log("=========stationidVal===========",stationidId);
			
			//shiftid
			console.log("=========stationidVal=====9).find(input======",$("#planningBbody").find('tr').eq(i).find('td').eq(9).find("input").val());
			 var lineData  = {
					 
					 stationid 			 : stationidId,
					 itemid			 	 : $("#planningBbody").find('tr').eq(i).find('td').eq(1).find("input").eq(0).val(),
					 setupid			 : $("#planningBbody").find('tr').eq(i).find('td').eq(2).find("input").eq(0).val(),
					 
					 setuptime 			 : $("#planningBbody").find('tr').eq(i).find('td').eq(3).text(),
					 cycletime			 : $("#planningBbody").find('tr').eq(i).find('td').eq(4).text(),
					 plannedquantity	 : $("#planningBbody").find('tr').eq(i).find('td').eq(5).text(),
					 plannedmins		 : $("#planningBbody").find('tr').eq(i).find('td').eq(6).text(),
					 
					 itemtimeutilised	 : $("#planningBbody").find('tr').eq(i).find('td').eq(7).find("input").eq(0).val(),
					 machinetimeutilised : $("#planningBbody").find('tr').eq(i).find('td').eq(8).find("input").eq(0).val(),
					 id			 		 : $("#planningBbody").find('tr').eq(i).find('td').eq(9).find("input").val()

				};
		 	  i++;
		 	  
			 myarray.push(lineData);
			 
			 console.log("====myarray======",myarray);
		});
		
		
		 deleteItem = $.merge(deleteItem, deleteStationItem)
		 
		 console.log("====deleteItem======",deleteItem);
		
		
				 var dataVal = {
				 		 id									: editId,
						 fromdate							: $('#frmDate').val(),
						 todate 							: $('#toDate').val(),
						/* timepershift						: $('#timePershift').val(),
						 shiftid							: $('#editShift').val(),
						 unitid       						: $('#editUnit').val(),
						 workcenterid 						: $('#editWorkCentre').val(),*/
						 planningShiftWorkIncomingDto		: myarray,
						 planningShiftWorkDeleteIncomingDto : deleteItem

					};
				 
				 console.log("====data==dataVal===",dataVal);
				 
				 $.ajax({
						
					   type: 'PUT',
					   url: server_url+"planning/update",  //from API add new data
					   headers: authHeader,
					   data : JSON.stringify(dataVal),
					   processData: false,
					   contentType: "application/json; charset=utf-8",
   
					   success: function(result) {
   	
						console.log("insert--planning===",result);
						
						if((result.payload==true))
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
	});
	
	
	
			
	
	/*
	$('#editSelMachine').on('change', function (e) 
	{
			
		var addSelMachine = $("#editSelMachine").find(":selected").text();
		if(MachineAlreadySelected(addSelMachine,"#error_block"))
		{
				$("#po_table_modal").find("tr:gt(1)").remove();
				
				$("#editmachineTimeUtilised").val("");
				$("#po_table_modal").find("tr").eq(1).find("td").eq(2).find("input[type='text']").val('');
				$("#po_table_modal").find("tr").eq(1).find("td").eq(3).find("input[type='text']").val('');
				$("#po_table_modal").find("tr").eq(1).find("td").eq(4).find("input[type='text']").val('');
				$("#po_table_modal").find("tr").eq(1).find("td").eq(5).find("input[type='text']").val('');
				$("#po_table_modal").find("tr").eq(1).find("td").eq(6).find("input[type='text']").val('');
				$("#po_table_modal").find("tr").eq(1).find("td").eq(0).find("select").prop("selectedIndex", 0); 
				$("#po_table_modal").find("tr").eq(1).find("td").eq(1).find("select").prop("selectedIndex", 0); 
	
		}else
		{
			$("#editselMachine").prop("selectedIndex", 0);
				return false;
		}
	});	*/
	
	$('#addSelMachine').on('change', function (e) 
	{
				
			var addSelMachine = $("#addSelMachine").find(":selected").text();
			if(MachineAlreadySelected(addSelMachine,"#error_block"))
			{
					$("#po_table_modal").find("tr:gt(1)").remove();
					
					$("#addmachineTimeUtilised").val("");
					$("#po_table_modal").find("tr").eq(1).find("td").eq(2).find("input[type='text']").val('');
					$("#po_table_modal").find("tr").eq(1).find("td").eq(3).find("input[type='text']").val('');
					$("#po_table_modal").find("tr").eq(1).find("td").eq(4).find("input[type='text']").val('');
					$("#po_table_modal").find("tr").eq(1).find("td").eq(5).find("input[type='text']").val('');
					$("#po_table_modal").find("tr").eq(1).find("td").eq(6).find("input[type='text']").val('');
					$("#po_table_modal").find("tr").eq(1).find("td").eq(0).find("select").prop("selectedIndex", 0); 
					$("#po_table_modal").find("tr").eq(1).find("td").eq(1).find("select").prop("selectedIndex", 0); 
		
			}else
			{
				$("#editselMachine").prop("selectedIndex", 0);
					return false;
			}
		});	
	
	
	
	function MachineAlreadySelected(machineSelected,ErrDivName)	
	{
		
			var firstColumnValues = [];
			$('#po_table_modal_list tr').each(function() {
			    // Select the first <td> (or <th> if it's a header) in the current row
			    var firstColumnText = $(this).find('td:first').text().trim(); 
			    // If you have header cells (<th>) in the first column, use:
			    // var firstColumnText = $(this).find('td:first, th:first').text(); 
			    firstColumnValues.push(firstColumnText);
			});
			
			console.log("machineSelected"+machineSelected.trim());
			console.log("machines selected array--"+firstColumnValues);
			console.log("firstColumnValues.indexOf(machineSelected)=====::"+firstColumnValues.indexOf(machineSelected));
			
		if(firstColumnValues.indexOf(machineSelected) == -1)
			return true;
		else
		{
			
			errorBlock("#error_block", machineSelected +" is already selected");
			return false;
		}
	}	
	
	
				
});












function	getMachinesByWc(wsid)
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

