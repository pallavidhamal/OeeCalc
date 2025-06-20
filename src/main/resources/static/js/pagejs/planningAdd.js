var unitid="";
var machinesOptions;
var itemOptions;
var shiftOptions;

var count=1;
var stationid="";
var itemid="";
var setupid = "";
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
		 var itemjqid="#selItem"+rowcount;
	    	itemid=$(itemjqid).val();
		 					
		 getSetups(rowcount,stationid,itemid);
		
	});
	
	
	$(document).on("change", ".addItem", function () 
	{
	   
		 var optionSelected = $("option:selected", this);
	     itemid = this.value;
		 rowcount=$(this).attr("rocnt");
		 // var stationjqid="#selMachine"+rowcount;
		 // stationid=$(stationjqid).val();
		 
		 stationid=$("#addSelMachine").val();
		 
		 getSetups(rowcount,stationid,itemid);
		
	});
	
	$(document).on("change", ".addSetup", function () 
	{
	   
		 var optionSelected = $("option:selected", this);
	     setupid = this.value;
		 rowcount=$(this).attr("rocnt");
		 // var stationjqid="#selMachine"+rowcount;
		 // stationid=$(stationjqid).val();
		 
		// stationid=$("#addSelMachine").val();
		 
		 getCycletime(rowcount,setupid);
		
	});	
	

	$(document).on("change", ".txtSetUptime", function () 
	{
	   
		console.log("minn planned cal");
		var setupTimeVal=this.value;
		var planQty="";
		var cycletime="";
		 rowcount=$(this).attr("rocnt");
		 
		 var planQtyId="#plannedQty"+rowcount;
		 planQty=$(planQtyId).val();
		 
		 var cycletimeId="#cycletime"+rowcount;
		 cycletime=$(cycletimeId).val();
		 
		 console.log("values"+setupTimeVal+"---plqty"+planQty);
		 
		 calculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	
	$(document).on("change", ".txtCycletime", function () 
	{
	   
		console.log("minn cycletime cal");
		var cycletime=this.value;
		var planQty="";
		var setupTimeVal="";
		 rowcount=$(this).attr("rocnt");
		 var planQtyId="#plannedQty"+rowcount;
		 planQty=$(planQtyId).val();
		 
		 var setupTimeId="#setUptime"+rowcount;
		 setupTimeVal=$(setupTimeId).val();
		 
		 console.log("values"+setupTime+"---plqty"+planQty);
		 
		 calculateMinPlanned(setupTimeVal,cycletime,planQty,rowcount);
		
	});
	
	
	$(document).on("change", ".txtPlannedQty", function () 
	{
	   
		console.log("minn planned cal");
		var planQty=this.value;
		var cycletime="";
		var setupTimeVal="";
		 rowcount=$(this).attr("rocnt");
		 var cycletimeId="#cycletime"+rowcount;
		 cycletime=$(cycletimeId).val();
		 
		 var setupTimeId="#setUptime"+rowcount;
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
		
		var minPlannedId="#plannedMins"+rowcount;
		console.log("minPlannedId---"+minPlannedId);
		
		$(minPlannedId).val(minPlanned);
		
		var timeUtilisedVal = (( minPlanned / $("#timePershift").val() ) * 100 ).toFixed(2) ;
		
		$("#timeUtilised"+rowcount).val(timeUtilisedVal);
		
		calculateMachinUtilis();
	}
	
	
	function calculateMachinUtilis(){
		
		
		var mins = 0;
		
		console.log($("#planningBbody").find("tr").length)
		
		for(i=0 ; i<$("#planningBbody").find("tr").length; i++){
			
			
			mins = Number(mins) + Number($("#planningBbody").find("tr").eq(i).find("td").eq(5).find("input[type='text']").val());
			
		}
		
		var minsVal = (( mins / $("#timePershift").val() ) * 100 ).toFixed(2)
		
		$("#addmachineTimeUtilised").val(minsVal );
		
	}
	

$('.table_add_link').on('click',function(){
						
//	SelectBoxNotAllowedNullVal
	
	if(SelectBoxNotAllowedNullVal($('#addUnit'),"Unit","#error_block"))
		if(SelectBoxNotAllowedNullVal($('#addWorkCentre'),"WorkCenter","#error_block"))
			if(NotAllowedNullVal($('#frmDate'),"From Date","#error_block"))
					if(NotAllowedNullVal($('#toDate'),"To Date","#error_block"))
						//if(compareDate("#error_block",$('#frmDate').val(),$('#toDate').val()))
							if(NotAllowedNullVal($('#timePershift'),"Time per shift ","#error_block"))
							//	if(numberValidation($('#timePershift').val(),"Time per shift ", "#error_block"))
								{
	
	
	console.log("-------------table_add_link----this---------",$("#planningBbody").find('tr').length);
	
	//count = $("#planningBbody").find('tr').length;
	
      $('#planningBbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
//		+'<td class="table_input"><select class="form-control addStation"  id="selMachine'+count+'" rocnt = "'+count+'">	</select> </td>'
//		+'<td class="table_input"><select class="form-control addShift"  id="selShift'+count+'" rocnt = "'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control addItem"  id="selItem'+count+'" rocnt = "'+count+'">	</select> </td>'
		+'<td class="table_input"><select class="form-control addSetup"  id="selSetUp'+count+'" rocnt = "'+count+'" >	</select> </td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtSetUptime integer" rocnt = "'+count+'" id="setUptime'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtCycletime integer" rocnt = "'+count+'" id="cycletime'+count+'" disabled></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty integer" rocnt = "'+count+'" id="plannedQty'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedMins"  rocnt = "'+count+'" id="plannedMins'+count+'" disabled></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line txtTimeUtilised integer" rocnt = "'+count+'" id="timeUtilised'+count+'" disabled></td>'
		+'<td class="table_input"><a href="#" class="deleteRow"><i class="fa fa-minus"></i></a></td>'
		

	  +'</tr>');
	  
	  
	 // alert(machinesOptions);
	  
	  $("#selMachine"+count).append(machinesOptions);
	  $("#selItem"+count).append(itemOptions);
	  $("#selShift"+count).append(shiftOptions);
	  
	  
	  $("#selSetUp"+count).append('<option value=' + 0+ '>  - Select Setup - </option>');
	  
	  count++;
	  
	  }//validation if
	  
});  //end add row

	$(document).on("click", ".deleteRow", function(e){	
	
  	$(this).closest('tr').remove();
  });
  
  
  $(document).on("click", "#addItemDataInPlanningTable", function(e){
	
	 
	
	var addSelMachine = $("#addSelMachine").find(":selected").text();
	var addSelMachineval = $("#addSelMachine").find(":selected").val();
	var machineutilised = $("#addmachineTimeUtilised").val();


	console.log($("#planningBbody").find("tr").length)
	
	var col1="";
	var col2="";
	var col3="";
	
	for(i=0 ; i<$("#planningBbody").find("tr").length; i++){
		
		console.log($("#planningBbody").find("tr").eq(i).find("td"));
		console.log($("#planningBbody").find("tr").eq(i).find("td").length);
		
		
		//for(j=0 ; j<$("#planningBbody").find("tr").eq(i).find("td").length; j++){
			
			var itemrowcount  = $("#planningBbody").find("tr").eq(i).find("td").length;
			var item = $("#planningBbody").find("tr").eq(i).find("td").eq(0).find("select option:selected").text();
			var itemId = $("#planningBbody").find("tr").eq(i).find("td").eq(0).find("select option:selected").val();
			var setup = $("#planningBbody").find("tr").eq(i).find("td").eq(1).find("select option:selected").text();
			var setupId = $("#planningBbody").find("tr").eq(i).find("td").eq(1).find("select option:selected").val();
			
			var setuptime = $("#planningBbody").find("tr").eq(i).find("td").eq(2).find("input[type='text']").val();
			var cycletime = $("#planningBbody").find("tr").eq(i).find("td").eq(3).find("input[type='text']").val();
			var quantity = $("#planningBbody").find("tr").eq(i).find("td").eq(4).find("input[type='text']").val();
			var mins = $("#planningBbody").find("tr").eq(i).find("td").eq(5).find("input[type='text']").val();
			var itemutilised = $("#planningBbody").find("tr").eq(i).find("td").eq(6).find("input[type='text']").val();
		
	//	}
		if(i == 0){
			 col1 = " <tr><td > "+addSelMachine+ " <input type='hidden' id=addSelMachineId${"+i+"} value="+addSelMachineval+"  disabled > </td> ";
			 col2 = " <td>"+item +" <input type='hidden' id=itemId${"+i+"} value="+itemId+"  disabled>  </tb><td>"+setup +"  <input type='hidden' id=setupId${"+i+"}  value="+setupId+"  disabled>  </tb><td>"+setuptime +"</tb><td>"+cycletime +"</tb><td>"+quantity +"</tb><td>"+mins
			 +"</tb><td>"+itemutilised +" %   <input type='hidden' id=itemutilised${"+i+"} value="+itemutilised+"  disabled> </tb> " ;
			 col3 = " <td> "+machineutilised+" %  <input type='hidden' id=machineutilised${"+i+"} value="+machineutilised+"  disabled>   </td> <td> <a  class='edit-button' id=${id}>View</a> <a  class='delete-button' id=${id}>Delete </a> </td></tr>";
			 $("#addPlantListBody").append(col1+col2+col3);
		}else{
			
			 col1 = "<tr><td> <input type='hidden' id=addSelMachineId${"+i+"} value="+addSelMachineval+"  disabled > </td> ";
			 col2 ="<td>"+item +" <input type='hidden' id=itemId${"+i+"} value="+itemId+"  disabled>  </tb><td>"+setup +"   <input type='hidden' id=setupId${"+i+"}  value="+setupId+"  disabled>  </tb><td>"+setuptime +"</tb><td>"+cycletime +"</tb><td>"+quantity +"</tb><td>"+mins
			 +"</tb><td>"+itemutilised +" %  <input type='hidden' id=itemutilised${"+i+"} value="+itemutilised+"  disabled></tb> " ;
			 col3 = " <td> <input type='hidden' id=machineutilised${"+i+"} value="+machineutilised+"  disabled>  </td> <td> </td></tr>";
			 $("#addPlantListBody").append(col1+col2+col3);
		}
		
		 
		
	}
	
	
//	console.log($("#addPlantListBody").find("tr"))
	
	
			$("#add_item").modal("hide");
	
	
//	$("#add_item").append("<tr><td> "+addSelMachine+ " </td> <td>"+ +"</tb> <td> 60 % </td></tr>")
	
	});

	$(document).on("click", "#addPlanningData", function(e){
	
		console.log($("#addPlantListBody").find('tr'));

		console.log($("#addPlantListBody").find('tr').eq(0).find('td').eq(0).text());
		console.log($("#addPlantListBody").find('tr').eq(0).find('td').eq(0).text());

		var myarray=[];

		var i =  0 ;
		
		var stationidId = "";

		$("#addPlantListBody").find('tr').each(function (){
			
			
			console.log($("#addPlantListBody").find('tr').eq(i).find('td').eq(0).text());
			
			console.log($("#addPlantListBody").find('tr').eq(i).find('td').eq(0).find("input").eq(0).val());
			
			
			if($("#addPlantListBody").find('tr').eq(i).find('td').eq(0).text() == '' 
				|| $("#addPlantListBody").find('tr').eq(i).find('td').eq(0).text() == ' ' 
					|| $("#addPlantListBody").find('tr').eq(i).find('td').eq(0).text() == '&nbsp;' ){
				
				stationidId = stationidId;
				
				console.log("=========stationidVal======if=====");
				
			}else{
				
				console.log("=========stationidVal=====else======");
				stationidId =  $("#addPlantListBody").find('tr').eq(i).find('td').eq(0).find("input").eq(0).val();
				
			}
			
			console.log("=========stationidVal==text=========",$("#addPlantListBody").find('tr').eq(i).find('td').eq(0).text());
			console.log("=========stationidVal===========",stationidId);
			
			//shiftid
			
			 var lineData  = {
					 
					 stationid 			 : stationidId,
					 itemid			 	 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(1).find("input").eq(0).val(),
					 setupid			 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(2).find("input").eq(0).val(),
					 
					 setuptime 			 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(3).text(),
					 cycletime			 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(4).text(),
					 plannedquantity	 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(5).text(),
					 plannedmins		 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(6).text(),
					 
					 itemtimeutilised	 : $("#addPlantListBody").find('tr').eq(i).find('td').eq(7).find("input").eq(0).val(),
					 machinetimeutilised : $("#addPlantListBody").find('tr').eq(i).find('td').eq(8).find("input").eq(0).val()

				};
		 	  i++;
		 	  
			 myarray.push(lineData);
			 
			 console.log("====myarray======",myarray);
		});
		
		
				 var dataVal = {
				 
						 fromdate						: $('#frmDate').val(),
						 todate 						: $('#toDate').val(),
						 timepershift					: $('#timePershift').val(),
						 shiftid						: $('#addShift').val(),
						 unitid       					: $('#addUnit').val(),
						 workcenterid 					: $('#addWorkCentre').val(),
						 planningShiftWorkIncomingDto	: myarray

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
	});
	
		$(document).on("click", "#addPlanningData1", function(e){
	
				var myarray=[];
				
				var planItemArray=[];
				
				
				
				
				
				$("#addPlantListBody").find('tr').each(function (){
		 
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
				
				});
				
				
				
				 var i =  0 ;
				 
				 
				if (ValidateMachine())
				if (ValidateShift())	
				if (ValidateItem())
				if (ValidateSetup())
				if(ValidateDupRow())
				if(ValidateSetupTimeForBlank())
					if(ValidatePlannedQtyForBlank())
				{	
					//if//if(ValidateTimeUtilisedForBlank()) (ValidateSetupTimeForNum())					if(ValidatePlannedQtyForNum())					if(ValidatePlannedMinsForNum())						if(ValidateTimeUtilisedForNum())

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
						//	{
					 
					 var dataVal = {
					 
							 fromdate						: $('#frmDate').val(),
							 todate 						: $('#toDate').val(),
							 timepershift					: $('#timePershift').val(),
							 shift							: $('#addShift').val(),
							 unitid       					: $('#addUnit').val(),
							 workcenterid 					: $('#addWorkCentre').val(),
							 planningShiftWorkIncomingDto	: myarray

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
			
		//	}//else of validation
			
			
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
				
		function getCycletime(rowcount,setupid)
				{
					

					console.log(rowcount,setupid);
										
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
								$("#cycletime"+rowcount).empty();
							
								
								console.log("========response========",response)
									
									$("#cycletime"+rowcount).val(response.payload.cycletime);
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
}				

		
function ValidateItem()
{
		$(".addItem").each(function() {
			
			//console.log("in vali ValidateItem",$(this).val());
						
		//	if(validationSelectBox($(this).val(),"Item","#setupErrDiv"))
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
		$(".addShift").each(function() {
			
			console.log("in vali sel",$(this).val());
						
			//if(validationSelectBox($(this).val(),"Shift","#setupErrDiv"))
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

function ValidateSetup()
{
		$(".addSetUp").each(function() {
			
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


function ValidateSetupTimeForBlank()  
{
		$(".txtSetUptime").each(function() {
			
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
			//	if(NotAllowedNullVal("#setupErrDiv","Planned Quantity",$(this)))
					
				if(NotAllowedNullVal($(this),"Planned Quantity","#error_block"))
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
		
		$(setupErrDiv).append("Duplicate row found");
		
	    duplicateFound = false;
	    return false; // break out of loop
	  } else {
	    seen.add(key);
	  }
	});
	
	return duplicateFound;
	
}

		$(document).on("click", "#additemmodal", function(e){
			
			$("#add_item").modal("show");
			
		});			
						
				
});