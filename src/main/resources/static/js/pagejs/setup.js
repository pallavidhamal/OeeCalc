			
			var delProdID = "";
			var editProdID = "";
			var setupid="";
			var tableData = $('#setupList').DataTable();
			var apiName="";
			var setupapiName="";
			
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
						 
						  apiName="getStationByUnit/"+unitid;
						  setupapiName="getSetUpByUnit/"+unitid;
						  
				 }
					
				//	getStationList(apiName);
				getSetUpList(setupapiName);
				getAllItems();
				getAllMachines(apiName);
				
				
				
				getAllUoms();
				
				
			});
			
		/*	$(document).on("click", "#purchaseAddAction", function(e){
			
			window.location.href = "addpurchaseorder";	

			});*/
		
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
					$("#addItem").empty();
					$("#editItem").empty();
					$("#addItem").append('<option value="0">  Select item </option>');
					$("#editItem").append('<option value="0">  Select item </option>');

		           for (i = 0; i < response.payload.length; ++i) {
		               $("#addItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemcode}</option>`);
					   
					   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemcode}</option>`);
					   
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
							
							getSetUpList();
							
							$("#add_setup").modal("hide");
						// $('#myTbody').empty();
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
						
						
		
					   }
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
						
						console.log("-----result----------",result);
						$('#editsetupname').val(result.payload.name);
						$('#editsetuptime').val(result.payload.cycletime);
						
						$("#editItem").val(result.payload.itemid);
						$("#editStation").val(result.payload.stationid);
						
						}
				
					});
				
		    	});	


				$(document).on("click", "#editSetup", function(e){


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
											
											getSetUpList();
											
											$("#edit_setup").modal("hide");
										// $('#myTbody').empty();
											
										}else if(result.result==false){
											
											window.location.href = "sessionOut";
											
										}
										
										
						
									   }
							});
						}
				});  // add setup
				
				
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
									getSetUpList();
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}
							   }
							});
		  }
		  })
		   
	});				
