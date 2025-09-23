			
			var delProdID = "";
			var editProdID = "";
			var setupid="";
			var tableData = $('#setupList').DataTable();
			var apiName="";
			var setupapiName="";
			var editWcId="";
			var editStationId="";
			var editUnitId="";
			
			$(document).ready(function(){
				
				console.log("-------------------Welcome to authHeader",authHeader);
				
				if(role=="AA" || role=="MAU")
				 {
				 	apiName="allActive";
					setupapiName="all";
				 }
				 							
				 if(role=="PLU")
				 {
					var unitString = localStorage.getItem("set") ; 
											
						console.log("===========unitString============", unitString);
						
						 var unitArray = unitString.split("#")
						 unitid = unitArray[0];
						 
						//  apiName="getStationByUnit/"+unitid;
						  setupapiName="getSetUpByUnit/"+unitid;
						  
				 }
					
				//	getStationList(apiName);
				getSetUpList(setupapiName);
				getAllItems();
			//	getAllMachines(apiName);
				getAllUoms();
				
				$('#addItem').select2({
			      placeholder: 'Select a Item',
			      allowClear: true,
			     // width: 'resolve' // adjusts to container
			    });
				
			});
			
			$(document).on("click", "#setupAddAction", function(e){
				
				 getUnitList("add");
				 
				 if(role=="AA" || role=="MAU")
				 {
				 	apiName="getAllActive";
				 }
				 							
				 if(role=="PLU")
				 {
					var unitString = localStorage.getItem("set") ; 
					console.log("===========unitString============", unitString);
					 var unitArray = unitString.split("#")
					 unitid = unitArray[0];
					 apiName="getWorkcenterByUnit/"+unitid;
				 }
				 
				// getWorkCentreList("add",apiName);
				 
				 $("#add_setup").modal("show");
			});
		
			
			$(document).on("change", "#addUnit", function(e){
				 
				   var optionSelected = $("option:selected", this);
				     unitid = this.value;
					// alert(unitid)
					apiName="getWorkcenterByUnit/"+unitid;
					getWorkCentreList("add",apiName);
					
					//getFilterPlanningList();
					
			});	
			
			$(document).on("change", "#addWorkCentre", function(e){
							 
							   var optionSelected = $("option:selected", this);
							    var wcid = this.value;
								// alert(unitid)
								apiName="getStationByWc/"+wcid;
								getAllMachines(apiName);
								
			});	
			
			function getSetUpList(setupapiName){  
				$.ajax({
					    type: 'GET',
					    url: server_url + "setup/"+setupapiName,
					    enctype: 'application/json',
					    headers: authHeader,
					    processData: false,
					    contentType: false,
					    data: null,
					    success: function (response) {
							
							console.log("-------------------Welcome to setupList",response);
							
							var data = response.payload;
									
							tableData.destroy();
					        $('#setupList.tbody').empty();
							
					        //if(data.result == "success"){
								
						
						    tableData = $('#setupList').DataTable({
							
				    			dom: 'Blfrtip',   
				    			buttons: [
									{
										extend : 'excel',
										exportOptions: {
								        	columns: [0,1,2,3,4,5]
							            }	
									} ,
								 	{extend : 'print'}
								 ],
							 	 destroy: true,
			    				 data: data,
								 columns: [
									{ "data": "unit" },
									{ "data": "workcenter" },
									{ "data": "item" },
									{ "data": "itemdesc" },
									{ "data": "station" },
			    				    { "data": "name" },
									{ "data": "cycletime" },											
									{ "data": "uom" },											
									{ "data":  null,
									  render: function (data, type, row) {
									      var id = data.id;
									      var action = `<a  class="edit-button" id=${data.id}>Edit</a> <a  class="delete-button" id=${data.id}>${data.isdeleted}</a> `;
									      return action;
									  },
									},											
		    		            ],
		    		            "order": [[0, 'desc']],
			    			});
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
					    }	  
					  })
				}

				    
		
	
	
	
 
	 var temp;
	$(document).on("click", ".deleteRow", function()
	{		 
		console.log("---del current row----------");
		
		  $(this).closest('tr').remove();
		  console.log("on change prodList====",$(this).attr("value"));
		  
		  temp=$("#hidendelId").val()+$(this).attr("value")+",";
		  //alert(temp);
		  $("#hidendelId").val(temp);
		  
		  
		   
	});
	
	
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
				
				console.log("====response====",response);
				
					$("#addItem").empty();
					$("#editItem").empty();
					$("#addItem").append('<option value="0">  Select item </option>');
					$("#editItem").append('<option value="0">  Select item </option>');

		           for (i = 0; i < response.payload.length; ++i) {
		               $("#addItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemcode} ( ${response.payload[i].itemdesc} )</option>`);
					   
					   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemcode} ( ${response.payload[i].itemdesc} )</option>`);
					   
		           }
		           
		           $('#addItem').select2({
				      placeholder: 'Select a Item',
				      allowClear: true,
				     // width: 'resolve' // adjusts to container
				    });
				    $('#editItem').select2({
				      placeholder: 'Select a Item',
				      allowClear: true,
				     // width: 'resolve' // adjusts to container
				    });
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
	
	
	function	getAllMachines(apiName)
	{
		$.ajax({
				       type: "GET",
				       url: server_url + `station/`+apiName,
				       enctype: "application/json",
				       headers: authHeader,
				       processData: false,
				       contentType: false,
				       data: null,
				       success: function (response) {
							$("#addStation").empty();
							$("#editStation").empty();
							
							$("#addStation").append('<option value="0">  Select station </option>');
							$("#editStation").append('<option value="0">  Select station </option>');
				           for (i = 0; i < response.payload.length; ++i) {
				               $("#addStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
							   
							   if(response.payload[i].id==editStationId)
							   {
								$("#editStation").append(`<option selected value="${response.payload[i].id}">${response.payload[i].name}</option>`);
							   }
							   else
							   $("#editStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
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
	
	function	getAllUoms()
	{
		$.ajax({
						       type: "GET",
						       url: server_url + `uom/allActive`,
						       enctype: "application/json",
						       headers: authHeader,
						       processData: false,
						       contentType: false,
						       data: null,
						       success: function (response) {
								$("#adduom").empty();
								$("#adduom").append('<option value="0">  Select uom </option>');
						           for (i = 0; i < response.payload.length; ++i) {
						               $("#adduom").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
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
					

$(document).on("click", "#addSetup", function(e){

	if(SelectBoxNotAllowedNullVal($('#addUnit'),"Unit","#error_block"))
		if(SelectBoxNotAllowedNullVal($('#addWorkCentre'),"Workcenter","#error_block"))					
	if(SelectBoxNotAllowedNullVal($('#addItem'),"Item","#error_block"))
		if(SelectBoxNotAllowedNullVal($('#addStation'),"Station","#error_block"))
		  if(NotAllowedNullVal($('#setupname'),"set up","#error_block"))
			if(NotAllowedNullVal($('#setuptime'),"set up time ","#error_block"))
				{
		 
		 var dataVal = {
		 
				 itemId				: $('#addItem').val(),
				 stationid 			: $('#addStation').val(),
				 uom				: $('#adduom').val(),
				 name				: $('#setupname').val(),
				 cycletime				: $('#setuptime').val(),
				 workcenterid		: $('#addWorkCentre').val(),
				 unitid		: 		$('#addUnit').val(),


				 
			};
				 
		 	console.log("====data==dataVal===",dataVal);
				 
				 
				 $.ajax({
						
					   type: 'POST',
					   url: server_url+"setup/add",  //from API add new data
					   data : JSON.stringify(dataVal),
					   processData: false,
					   headers: authHeader,
					   contentType: "application/json; charset=utf-8",
   
					   success: function(result) {
   	
						console.log("insert--Information result==="+result);
						
						if(result.status=="CREATED"){
							
							ajaxsuccessmsg("New Setup added sucessfully.");
							getSetUpList(setupapiName);
							
							$("#add_setup").modal("hide");
						// $('#myTbody').empty();
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
							}
					});  // add setup





$(document).on("click", ".edit-button", function(){
				
				//alert($(this).attr("itemid"));
				$('#setupErrEdit').empty();
				
				
				$("#edit_setup").modal("show");
				
				setupid=$(this).attr("id");
				
				//alert(setupid);
				
				$.ajax({

					type: 'GET',
					url: server_url+"setup/get/"+setupid,  //from API on click of edit icon
					//data : JSON.stringify(dataVal),
					contentType: "application/json",
	
					success: function(result) {
						
						editUnitId=result.payload.unitid;
						editWcId=result.payload.workcenterid;
						apiName="getWorkcenterByUnit/"+result.payload.unitid;
						getWorkCentreList("edit",apiName);
						
						editStationId=result.payload.stationid;
						var stationapiName="getStationByWc/"+editWcId;
						getAllMachines(stationapiName);
						
						
						console.log("-----result----------",result);
						$('#editsetupname').val(result.payload.name);
						$('#editsetuptime').val(result.payload.cycletime);
						
					//	$("#editItem").val(result.payload.itemid);
						$('#editItem').val(result.payload.itemid).trigger('change');
						
						$("#editStation").val(result.payload.stationid);
						$("#editUnit").val(result.payload.unit);
						
						
						
						}
				
					});
				
		    	});	


				$(document).on("click", "#editSetup", function(e){

					if(SelectBoxNotAllowedNullVal($('#editWorkCentre'),"Workcenter","#error_block"))					
					if(SelectBoxNotAllowedNullVal($('#editItem'),"Item","#error_block"))
							if(SelectBoxNotAllowedNullVal($('#editStation'),"Station","#error_block"))
							  if(NotAllowedNullVal($('#editsetupname'),"set up","#error_block"))
								if(NotAllowedNullVal($('#editsetuptime'),"set up time ","#error_block"))										
								{
						 
						 var dataVal = {
						 
								setupid					:setupid,
								 itemId				: $('#editItem').val(),
								 stationid 			: $('#editStation').val(),
								 name				: $('#editsetupname').val(),
								 cycletime				: $('#editsetuptime').val(),
								 workcenterid		: $('#editWorkCentre').val(),
								 unitid				: editUnitId,
							};
								 
						 	console.log("====data==dataVal===",dataVal);
								 
								 
								 $.ajax({
										
									   type: 'PUT',
									   url: server_url+"setup/edit",  //from API add new data
									   data : JSON.stringify(dataVal),
									   processData: false,
									   headers: authHeader,
									   contentType: "application/json; charset=utf-8",
				   
									   success: function(result) {
				   	
										console.log("edit setup--Information result==="+result);
										
										console.log("edit setup--Information result==="+result.payload);
										console.log("edit setup--Information result==="+result.status);
										
										if(result.payload==true){
											
											ajaxsuccessmsg("Setup edited sucessfully.");
											getSetUpList(setupapiName);
											
											$("#edit_setup").modal("hide");
											
										}else if(result.result==false){
											
											window.location.href = "sessionOut";
											
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
							}
					});
				
				
$(document).on("click", ".delete-button", function()
	{		 
		console.log("---del current row----------");
		  console.log("on delete====",$(this).attr("id"));
		  selid=$(this).attr("id");
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
							   url: server_url+"setup/delete/"+selid,  //from API add new data
							   headers: authHeader,
							   processData: false,
							   contentType: "application/json; charset=utf-8",

							   success: function(result) {
								console.log("delete result==="+result);
								
								if(result.payload==true){
									getSetUpList(setupapiName);
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}
							   }
							});
		  }
		  })
		   
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
				$("#"+divId+"Unit").append('<option value=' +0+ '>  - All Unit - </option>');
								
				$.each(response.payload, function( index, value ){
								
				$("#"+divId+"Unit").append('<option value="'+ value.id + '">'+ value.name+' </option>');
				
			    });
			}	
		});
	}
	
	
	function getWorkCentreList(divId,apiName){
			
		
		
		$.ajax({
		    type: 'GET',
		    url: server_url + "workcenter/"+apiName,
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: false,
		    data: null,
		    success: function (response) {
		
				console.log("==========response=====",response)
				
						$("#"+divId+"WorkCentre").empty();			
						$("#"+divId+"WorkCentre").append('<option value=' + 0+ '>  - Select workcenter - </option>');
										
						$.each(response.payload, function( index, value )
						{
									
						if(value.id==editWcId)		
						{						
						$("#"+divId+"WorkCentre").append('<option selected value="'+ value.id + '">'+ value.name+'  ('+ value.unitDto.name +' ) </option>');
						}
						else
						{
							$("#"+divId+"WorkCentre").append('<option  value="'+ value.id + '">'+ value.name+'  ('+ value.unitDto.name +' ) </option>');

						}
						
						
					    });
					
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
		
	} 
	