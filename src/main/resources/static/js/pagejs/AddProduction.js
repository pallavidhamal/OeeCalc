var optionsData = "";


$(document).ready(function()
{
				
	getUnitList("add");	
	getAllMachines();
	getAllItems();

	
	
	$('#addUnit').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	     unitid = this.value;
		 
		// $("#timePershift").val("");
		//alert(unitid)
		getWorkCentreList("add");
		getUnitShifts();	
		
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

			
	//		 var counter = 0;

			 