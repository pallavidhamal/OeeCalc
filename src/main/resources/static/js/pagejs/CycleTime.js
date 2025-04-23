			
			var delProdID = "";
			var editProdID = "";
			var tableData = $('#cycleTimeList').DataTable();
		
			$(document).ready(function(){
				
				console.log("-------------------Welcome to authHeader",authHeader);

			//	getCycleTimeList();
				
				getAllItems();
				getAllMachines();
				getAllUoms;
				
				
			});
			
		/*	$(document).on("click", "#purchaseAddAction", function(e){
			
			window.location.href = "addpurchaseorder";	

			});*/
		
			function getCycleTimeList(){  

				
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
								
						        //if(data.result == "success"){
									
						        var editIcon = function ( data, type, row ) 
						        {
							    if ( type === 'display' ) {
							           
							    return '<span class="fa fa-edit sordrEdit" data-toggle="modal" data-target="#edit_item"></span>';
							        
							    }
							       
							    return data;
							    };
							    
							    var deleteIcon = function ( data, type, row ) 
							    {
						        if ( type === 'display' ) {
						            
						        return '<span class="fa fa-trash sordrDelete" ></span>';
						        }
						        
						        return data;
							    };
							
							    tableData = $('#itemList').DataTable( {
								
							    			dom: 'Blfrtip',   
							    			buttons: ['excel', 'print'],
										 	 destroy: true,
						    				 data: data,
						
											  columns: [
												
					    				    { "data": "itemcode" },
											{ "data": "itemdesc" },
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
			
			
			
			
			
			
			
			
			
			
			
			
	
	
	$("#customerListEdt").change(function(){
		
		
		generateProdList('#prodListEdt'+count, $("#customerListEdt").val(),"");
		
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
		           for (i = 0; i < response.payload.length; ++i) {
		               $("#selItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
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
				       url: server_url + `station/all`,
				       enctype: "application/json",
				       headers: authHeader,
				       processData: false,
				       contentType: false,
				       data: null,
				       success: function (response) {
				           for (i = 0; i < response.payload.length; ++i) {
				               $("#selStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
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
						       url: server_url + `station/all`,
						       enctype: "application/json",
						       headers: authHeader,
						       processData: false,
						       contentType: false,
						       data: null,
						       success: function (response) {
						           for (i = 0; i < response.payload.length; ++i) {
						               $("#selStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
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
					


	
	