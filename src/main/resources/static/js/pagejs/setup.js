			
			var delProdID = "";
			var editProdID = "";
			var setupid="";
			var tableData = $('#setupList').DataTable();
		
			$(document).ready(function(){
				
				console.log("-------------------Welcome to authHeader",authHeader);

				getSetUpList();
				
				getAllItems();
				getAllMachines();
				getAllUoms();
				
				
			});
			
		/*	$(document).on("click", "#purchaseAddAction", function(e){
			
			window.location.href = "addpurchaseorder";	

			});*/
		
			function getSetUpList(){  

				
				$.ajax({
					    type: 'GET',
					    url: server_url + "setup/all",
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
									
							
							    tableData = $('#setupList').DataTable( {
								
							    			dom: 'Blfrtip',   
							    			buttons: ['excel', 'print'],
										 	 destroy: true,
						    				 data: data,
						
											  columns: [
												
					    				    { "data": "name" },
											{ "data": "cycletime" },											
											{ "data": "station" },
											{ "data": "uom" },											
											{ "data": "item" },
											{ "data": "itemdesc" },
											

											{ 
												"data":  null,
											  render: function (data, type, row) {
											      var id = data.id;
											      var action = `<a  class="edit-button" id=${data.id}>Edit</a>
											                    <a  class="delete-button" id=${data.isdeleted}>${data.isdeleted}</a> `;
											      return action;
											  },
											},											
											
					    		            ],
					    		            "order": [[0, 'desc']],
							    			} );
							
				
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
				
				
				
				
				/*ihii*/
				
					
				}

				    
		

			$(document).on("click", "#addItemData", function(e){
	
				alert("on save");
				 var i =  0 ;
				 console.log("====save item======","#line"+i);
				 
			/*	 if(NotAllowedNullVal("#poErrAdd","PO Name ",$('#ponumber')))
					 if(ValidationForSelectBox("#poErrAdd","Customer Name ",$('#customerListadd')))
						 if(NotAllowedNullVal("#poErrAdd","PO Date ",$('#poDate')))
							 if(NotAllowedNullVal("#poErrAdd","PO End Date ",$('#poEndDate')))
														
							{*/
					 
					 var dataVal = {
					 
							 itemcode		: $('#itemcode').val(),
							 itemdesc 		: $('#itemdesc').val(),

						};
					 
				 
					 
					 console.log("====data==dataVal===",dataVal);
					 
					 
					 $.ajax({
							
						   type: 'POST',
						   url: server_url+"item/add",  //from API add new data
						   data : JSON.stringify(dataVal),
						   headers: authHeader,
						   processData: false,
						   contentType: "application/json; charset=utf-8",
	   
						   success: function(result) {
	   	
							console.log("insert--Information result==="+result);
							
							if(result.payload==true){
								
								getItemList();
								
								$("#add_item").modal("hide");
							// $('#myTbody').empty();
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
							
							
			
						   }
				});
			//}  //validation if
});
			
			
			
			
			
			
			
			
			
			
			
			
	
	
 
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
		       url: server_url + `item/getAllItems`,
		       enctype: "application/json",
		       headers: authHeader,
		       processData: false,
		       contentType: false,
		       data: null,
		       success: function (response) {
					$("#addItem").empty();
					$("#addItem").append('<option value="0">  Select item </option>');
		           for (i = 0; i < response.payload.length; ++i) {
		               $("#addItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
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
							$("#addStation").empty();
							$("#addStation").append('<option value="0">  Select station </option>');
				           for (i = 0; i < response.payload.length; ++i) {
				               $("#addStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
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


	 if(ValidationForSelectBox("#poErrAdd","Item",$('#addItem')))
		 if(NotAllowedNullVal("#poErrAdd"," Station ",$('#addStation')))
			 if(ValidationForSelectBox("#poErrAdd","UOM ",$('#adduom')))
			 	if(ValidationForSelectBox("#poErrAdd","set up ",$('#setupname')))
			 		if(ValidationForSelectBox("#poErrAdd","set up time ",$('#setuptime')))
				{
		 
		 var dataVal = {
		 
				 itemId				: $('#addItem').val(),
				 stationId 			: $('#addStation').val(),
				 uom				: $('#adduom').val(),
				 setup				: $('#setupname').val(),
				 name				: $('#setuptime').val(),

				 
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
							
							getPOList();
							
							$("#add_po").modal("hide");
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
				
				$.ajax({

					type: 'GET',
					url: server_url+"item/get/"+setupid,  //from API on click of edit icon
					//data : JSON.stringify(dataVal),
					contentType: "application/json",
	
					success: function(result) {
						
						console.log("-----result----------",result);
						$('#edititemcode').val(result.payload.itemcode);
						$('#edititemdesc').val(result.payload.itemdesc);
						$('#edititemcode').val(result.payload.itemcode);
						$('#edititemdesc').val(result.payload.itemdesc);
											
					}
				
					});
				
		    	});	


	
	