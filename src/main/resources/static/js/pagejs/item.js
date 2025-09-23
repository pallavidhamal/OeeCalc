			
			var delProdID = "";
			var editProdID = "";
			var tableData = $('#itemList').DataTable();
			var selitemid="";
		
			$(document).ready(function(){
				
				console.log("-------------------Welcome to authHeader",authHeader);

				getItemList();
				
			});
			
		
			function getItemList(){  

				
				$.ajax({
					    type: 'GET',
					    url: server_url + "item/getAllItems",
					    enctype: 'application/json',
					    headers: authHeader,
					    processData: false,
					    contentType: false,
					    data: null,
					    success: function (response) {
							
							console.log("-------------------Welcome to getItemList",response);
							
							var data = response.payload;
									
								tableData.destroy();
						        $('#itemList.tbody').empty();
								
									
							
							    tableData = $('#itemList').DataTable( {
								
							    			dom: 'Blfrtip',   
											buttons: [
												{extend : 'excel',
											exportOptions: {
											                columns: [0,1]
											            }	
													
													
												} ,
												
												 {extend : 'print'}],
										 	 destroy: true,
						    				 data: data,
						
											  columns: [
												
					    				    { "data": "itemcode" },
											{ "data": "itemdesc" },
											
										
										
											{ 
												"data":  null,
								           render: function (data, type, row) {
								               var action = `<a  class="edit-button" itemid=${data.itemid}>Edit</a>
								                             <a  class="delete-button" itemid=${data.itemid}>${data.isdeleted}</a> `;
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
				
				}

				
$(document).on("click", "#purchaseAddAction", function(e){

	$('#itemcode').val('');
	$('#itemdesc').val('');
	
});		

			$(document).on("click", "#addItemData", function(e){
	
				 var i =  0 ;
				 console.log("====save item======","#line"+i);
				 
			    if(NotAllowedNullVal($('#itemcode'),"Item Code ","#error_block"))
			     if(NotAllowedNullVal($('#itemdesc'),"Item Description ","#error_block"))
					{
					 
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
								
								ajaxsuccessmsg("New Item added sucessfully.");
								getItemList();
								
								$("#add_item").modal("hide");
							// $('#myTbody').empty();
								
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
			}  //validation if
});
			
			
			
		$(document).on("click", "#editItemData", function(e){
	
				 var i =  0 ;
				 console.log("====save item======","#line"+i);
				 
		 if(NotAllowedNullVal($('#edititemcode'),"Item Code ","#error_block"))
	     	if(NotAllowedNullVal($('#edititemdesc'),"Item Description ","#error_block"))						
					{
					 
					 var dataVal = {
					 
							 itemid			: selitemid,
							 itemcode		: $('#edititemcode').val(),
							 itemdesc 		: $('#edititemdesc').val(),

						};
					 
					 console.log("====data==dataVal===",dataVal);
					 
					 $.ajax({
							
						   type: 'PUT',
						   url: server_url+"item/edit",  //from API add new data
						   data : JSON.stringify(dataVal),
						   headers: authHeader,
						   processData: false,
						   contentType: "application/json; charset=utf-8",
	   
						   success: function(result) {
	   	
							console.log("insert--Information result==="+result);
							
								if(result.payload==true){
									
									ajaxsuccessmsg("Item edited sucessfully.");
									getItemList();
									
									$("#edit_item").modal("hide");
								// $('#myTbody').empty();
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}
			
						   }
					});
				}  //validation if
});			
			
			
 
	 var temp;
	$(document).on("click", ".delete-button", function()
	{		 
		console.log("---del current row----------");
		  console.log("on delete====",$(this).attr("itemid"));
		  selitemid=$(this).attr("itemid");
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
							   url: server_url+"item/delete/"+selitemid,  //from API add new data
							   headers: authHeader,
							   processData: false,
							   contentType: "application/json; charset=utf-8",

							   success: function(result) {
								console.log("insert--Information result==="+result);
								
								if(result.payload==true){
									getItemList();
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}
							   }
							});
		  }
		  })
		   
	});


	
	$(document).on("click", ".edit-button", function(){
					
					//alert($(this).attr("itemid"));
					 $('#itemErredt').empty();
					$("#edit_item").modal("show");
					
					selitemid=$(this).attr("itemid");
					
					$.ajax({

						type: 'GET',
						url: server_url+"item/get/"+selitemid,  //from API on click of edit icon
						//data : JSON.stringify(dataVal),
						contentType: "application/json",
		
						success: function(result) {
							
							console.log("-----result----------",result);
							$('#edititemcode').val(result.payload.itemcode);
							$('#edititemdesc').val(result.payload.itemdesc);
												
						}
					
						});
					
			    	});		
	