//get  list

var	 apttxtvaln;
     
		$(document).ready(function(){			   
					var i = 0;
					$.get(url+"getAptList", function( data ) { //from API list
					console.log("--getProductList----data----------",data);
					var table = $('#AptTable').DataTable( {
				
					dom: 'Blfrtip',   
					buttons: ['excel', 'print'],
				 	 destroy: true,
    				 data: data.result,
    				 "autoWidth": false,
    				 columns: [
    					 
    				    { "data": "CustName" },
    				    { "data": "Name" },
    		            { "data": "TaskName" },
    		            { "data": "Category" },
    		            { "data": "parameter" }
    		           
    				 
    				 ],
    				
    				 "order": [[0, 'desc']],
		    } );
			
	});
					//function add click
					$(document).on("click", "#addnewAction", function(e){
						
						        $('#TestTbl thead').hide(); // Empty the content inside thead
							    $('#TestTbl tbody').empty(); // Empty the content inside tbody
								$('#taskList').val('');
								console.log("----------click on add button------------");
								
								generateCustomersList("#customerListadd");
								
								generateProductList("#productList", "0");
					//			$('#taskList').empty();
								gettaskList();
						
									
					});
					
					//get product list according to customer wise		
					
					function generateProductList(divId, customerId){
						
								console.log("-------------generateProductList-------------",customerId);
								
								$("#productList").empty();
								
								$("#productList").append('<option value = 0>-- Select Product -- </option> ');
								
								if(customerId == 0){
							//$('#productListadd').append(' <option value = 0 >- Select Product----- -</option>');
						
								}else{
							
								$.get(url+"getCustWiseProductList/"+customerId, function( data ) { //from API list

								console.log("-----getProductList----------data.result----------",data.result);
								
								if ( divId == "#productList" ){
									
											$.each(data.result, function(key,val) {
										
											$("#productList").append('<option value='+val.ProductId+'>'+val.Name +'</option>');
										
										
									});
										
								}
							});
						}
								
					}
			//get product list according to customer wise			
					
					//get task list
					
					function gettaskList(){	
						
								console.log("-----gettaskList------");
								
								$("#taskList").empty();
								$("#taskList").append('<option value = 0>-- Select Task -- </option> ');	
								
								$.get(url+"getTasks/"+localStorage.getItem("userId"), function( data ) { //from API list
							
								console.log("------------getTasks--------------",data.result);
								
								$('#taskListadd').html('');
								
								$.each(data.result, function( index, value ){
							
								//	console.log("regionListadd===========data.CustomerID======",value.RegionId);
							    
								$('#taskList').append('<option value='+value.TaskId+'>'+value.TaskName +'</option>');
							});
					});
			}
			//end of get task list
					
					//$('#taskList').on('change' ,function() {
						$('#taskList').change(taskfun);
						
						
						function taskfun(){
							
						  $('#PModalErrNoData').hide();
						$('.Img').show();
					var custId = $('#customerListadd').val();
					var ProductId =   $('#productList').val();
					
					
				    $('#TestTbl tbody').empty(); // Empty the content inside tbody
					
					var tskId = $('#taskList').val();
						
						$('#TestTbl').show();
						
						
						var dataval = {
								"customerId" :	custId,
								"productId"  : ProductId,
								"taskId"     :	 tskId
								}

					
						
						$.ajax({
							
							type: 'POST',
							url: url+"AptTestList",  //from API update data
							data : JSON.stringify(dataval),
							processData: false,
							contentType: "application/json; charset=utf-8",
				    
							success: function(data) {
								$('.Img').hide();
						   console.log("--------------------",data);
						   $.each(data.result, function( index, value ){
							   console.log("--------*********------------",value);
							  if(data.result!=null){
								  
							  
								var listID =$("#TestTbl").find('tr');
								var i = "";								
							 	for(i=0; i<listID.length ; i++){
							   
							 	}
							 	var Rowbtn="";
								var hidnrow="";
							
							 	if(value.TestValueType=="P" && value.TestType =="S" || (value.ParamType =="DD")&&(value.ParamType =="AC")) 
							 		{
							 				Rowbtn =  '<td><button class="btn cust-btn btn-block AdddrpVal"  Tid="'+value.TestId+'"  id="'+i+'" type="button">Test</button></td>';
							 				hidnrow =  '<td style="display:none"><input type="hidden" class="form-control testvalue" id="hidnrow'+i+'" value="" ></td>'
							 			}
							 			else{
							 				Rowbtn =	'<td> </td>';
							 			}
							 	
							 	if(value.flag==true){
							 	var checkboxnew	='<td><input type="checkbox" class="case1" name="case1[]" id="'+i+'"  checked="true"/></td>'
							 	}else{
							  checkboxnew	='<td><input type="checkbox" class="case" name="case[]" id="'+i+'" /></td>'
							 	}
						   $('#TestTbl').append('<tr>'+
								   checkboxnew +
									'<td style="display:none" id="testId">'+value.TestId+'</td>'+
									//'<td>'+value.TaskName+'</td>'+
									'<td>'+value.Category+'</td>'+
									'<td>'+value.parameter+'</td>'+
									'<td>'+value.ParamType+'</td>'+
								    	hidnrow +
								    	Rowbtn + 
									'</tr>');
							  }else{
								  
								  $('#PModalErrNoData').show();
							  }
						   
						   
						   });
							}
					
						});
						
						};
					
					
					var checkid="";
					
					$(document).on("click", ".AdddrpVal", function(e){
						$('#NoOfVisitTbody').html('');
						 
				    	
						 var $chkbox =$(this).parents('tr:eq(0)').find('input[type="checkbox"]');
					       if( $chkbox.prop('checked')){		    	   
						    	 checkid = $(this).attr("id");
						    	 var testID =$(this).attr("Tid");
						    	
						    	 var ProductId =   $('#productList').val();
						    	
					       var dataval = {									
									"ProductId"  : ProductId,
									"testID"	 : testID
									}
					       
							$.ajax({
								
								type: 'POST',
								url: url+"AptTestListnew",  //from API update data
								data : JSON.stringify(dataval),
								processData: false,
								contentType: "application/json; charset=utf-8",
								success: function(data) {	
								var CtrObj = data.result;
								
								var testvalstr;
								var testValue=[];
								$('#NoOfVisitTbody').append('<tr>'+
										'<td></td>'+
										'<td></td>'+
										'<td><button type="button" class="btn btn-primary" id="addNoOfVisit"><span class="fa fa-plus"></span></button></td>'+	
								'</tr>');
									for(var i=0;i<=CtrObj.length;i++){
										if(CtrObj.length==0){											
								    		var divName =$(this).parent().parent().parent().find("tr").length;
											$('#NoOfVisitTbody').append('<tr>'+
													'<td></td>'+
													'<td><input type="text" class="form-control atpTxTval" id="atpTxTval'+divName+'"  value="" placeholder="Txt Data"></td>'+
													'<td><button type="button" class="btn btn-primary" id="addNoOfVisit"><span class="fa fa-plus"></span></button></td>'+	
											'</tr>');	
								    	
								    	}
								    	else{
								    		 var divName =$(this).parent().parent().parent().find("tr").length;
												$('#NoOfVisitTbody').append('<tr>'+
														'<td></td>'+
														'<td><input type="text" class="form-control atpTxTval" id="atpTxTval'+divName+'" placeholder="Txt Data" value="'+CtrObj[i].TestValue+'"></td>'+
														'<td><button type="button" class="btn btn-primary delNoOfVisit" id="delNoOfVisit'+divName+'"><span class="fa fa-trash-o"></span></button></td>'+
														'</tr>');
								    	}
										testValue.push(CtrObj[i].TestValue+",");
										
									}
									
									$('#hidnrow'+checkid).val(testValue);
									
									
								}	
							});
					       
					       /*ATPArray=[];
					      
					       $(".testvalue").each(function() {	
					       
								   
					    	
							    	
							    	
							    	
	
							    	ATPArray =dt3.split(",");
							    	
							    	for(var i=0;i<=ATPArray.length;i++){
										if(i==0){											
								    		var divName =$(this).parent().parent().parent().find("tr").length;
											$('#NoOfVisitTbody').append('<tr>'+
													'<td></td>'+
													'<td><input type="text" class="form-control atpTxTval" id="atpTxTval'+divName+'"  value="'+ATPArray[i]+'"placeholder="Txt Data"></td>'+
													'<td><button type="button" class="btn btn-primary" id="addNoOfVisit"><span class="fa fa-plus"></span></button></td>'+	
											'</tr>');	
								    	
								    	}
								    	else{
								    		 var divName =$(this).parent().parent().parent().find("tr").length;
												$('#NoOfVisitTbody').append('<tr>'+
														'<td></td>'+
														'<td><input type="text" class="form-control atpTxTval" id="atpTxTval'+divName+'" placeholder="Txt Data" value="'+ATPArray[i]+'"></td>'+
														'<td><button type="button" class="btn btn-primary delNoOfVisit" id="delNoOfVisit'+divName+'"><span class="fa fa-trash-o"></span></button></td>'+
														'</tr>');
								    	}
										
										
									}
							   
					       
					      });*/
					       
					       
					       
					       
						/*   $('#TestTbl').append('<tr>''<td style="display:none"><input type="hidden" class="form-control" id="hidnrow'+checkid+'" ></div></td>' '<tr>';*/
						
						
						// var hidnrow ="hidnrow"+checkid;
						$('#import_excel').show();
						e.preventDefault();
						
					       }else{
						    	  
					    	   $('#new_installation').show();
					    	   $('#PModalErrA').show();
					       }
					});

					$("#productList").on("change", function(e)		
							{		
						taskfun();
						
						
							});
					$(document).on("click", "#selectAll", function(e){
						var checkboxes = document.getElementsByTagName('input'), val = null;    
					     for (var i = 0; i < checkboxes.length; i++)
					     {
					         if (checkboxes[i].type == 'checkbox')
					         {
					             if (val === null) val = checkboxes[i].checked;
					             checkboxes[i].checked = val;
					            
					         }
					     }					
					});
					
					$(document).on("click", "#addNoOfVisit", function(e){

						var divName =$(this).parent().parent().parent().find("tr").length;
						$('#NoOfVisitTbody').append('<tr>'+
								'<td></td>'+
								'<td><input type="text" class="form-control atpTxTval" id="atpTxTval'+divName+'" placeholder="Txt Data"></td>'+
								'<td><button type="button" class="btn btn-primary delNoOfVisit" id="delNoOfVisit'+divName+'"><span class="fa fa-trash-o"></span></button></td>'+
								'</tr>');
																		
					});
					
					$(document).on("click", ".delNoOfVisit", function(){
						$(this).parent().parent().remove();
					});
					
					$(document).ready(function(){
						
						
						
						$("#customerListadd").on("change", function(e)		
								{		
							$('#PModalErr').hide();
				//			$('#TestTbl').html('');
									var customerId = $( "#customerListadd" ).val();
									
									console.log("----------click on change customerId------------",customerId);
									
//									$("#SelRegion").empty();
									
									generateProductList("#productList", customerId);
									
								});					
					});
					
					$(document).on("click", "#addPMdetails", function(e){
		
						
						var custId = $('#customerListadd').val();
						var ProductId = $('#productList').val();
						var tskId = $('#taskList').val();
						deleteExist(custId,ProductId);
						var testID =   $("#testId").val();
						var custlistV = $('#customerListadd').val();
						var prodV = $('#productList').val();
						var taskV = $('#taskList').val();
						
						if(custlistV == "0")
						{
							$('#PModalErr').show();
						return false;
						}
						if(prodV == "0")
						{
							$('#PModalErr').show();
						return false;
						}
						if(taskV=="0")
						{
							$('#PModalErr').show();
						return false;
						}
						 
						
						var checkedata;
						
						
						 var values = "";
						
						       $.each($("input[name='case[]']:checked"), function(index,value) {
						    	 
						    	   var data = $(this).parents('tr:eq(0)');
						    	  
						           if(index > 0)
						        	 
						            values += ",";
						           
						           values += $(data).find('td:eq(1)').text();           
						                    
						       });
      
						      checkedata  =    values;
						
						
						 var ATPtxtVal2=[];
						 var dt1;
						 var dt2=[];
						 var rowidarray;
							$(".testvalue").each(function() {		  
								
								 dt1=$(this).val();
						    	dt1=dt1.trim();  	
						    	
						    	if(dt1!="")
						    	ATPtxtVal2.push(dt1);
						    	
						        var $chkbox =$(this).parents('tr:eq(0)').find('input[type="checkbox"]');
						       if( $chkbox.prop('checked')){
						    	   var data = $(this).parents('tr:eq(0)');
							    	var  rowid = $(data).find('td:eq(1)').text();
							    	
							    	rowid=rowid.trim();  
							    	dt2.push(rowid);
							    	
						       }
						      
						       rowidarray=dt2.join(",");
						    	
						    	 
						    	
							});
							
					
						
							 apttxtvaln=ATPtxtVal2.join("#");
						
							
							 if(checkedata!= undefined && checkedata.length>0 ){
							
								var dataval = {
										"CustomerId" :	custId,
										"ProductId"  : ProductId,
										"taskId"     :	 tskId,
										"checkboxD"  : checkedata,
										"AptValue"   : apttxtvaln
										
										}
								console.log(dataval,"====");
							//	alert();
								$.ajax({
									
									type: 'POST',
									url: url+"AptDataInsert",  //from API update data
									data : JSON.stringify(dataval),
									processData: false,
									contentType: "application/json; charset=utf-8",
									success: function(data) {						
									}	
								});
							 }
								
						if(rowidarray!= undefined && rowidarray.length>0 ){
							 
							var dataval1 = {
									"ProductId"  : ProductId,
									"checkboxD"  : rowidarray,
									"AptValue"   : apttxtvaln,
									"testIdS"	 : testID
									}	
						$.ajax({
							
							type: 'POST',
							url: url+"DInsert",  //from API update data
							data : JSON.stringify(dataval1),
							processData: false,
							contentType: "application/json; charset=utf-8",
							success: function(data) {						
							}	
						});
						
						}	
						console.table(dataval1);
						
						
						
						 $('#new_installation').modal('hide');
						 location.reload();
						 console.log(dataval);					 
						 
					});
					
					function deleteExist(custId,ProductId){
						
						var  chkexistdata="";
						var  values = "";
						
						       $.each($("input[name='case1[]']"), function(index,value) {
						    	   if($(this). prop("checked") == false){
						    	   var data = $(this).parents('tr:eq(0)');
						    
						    	   console.log("TTTTdTTTT",data);
						         //  if(index > 0) {
						        	   
						        	   values += $(data).find('td:eq(1)').text();
						        	   values += ",";
						        	   console.table(values, "Hiiii");
						        	   console.log("TTTTTTTT",values);
						        	   chkexistdata  =values;
						        //   }
						    	  }
						    	 
						       });
						      
						   //    alert(chkexistdata);
						       
						      if(chkexistdata.length>0){
						    	
						     								
						    	  console.table("Checking",chkexistdata, custId, ProductId);
									var dataval1 = {
										
										"checkboxD"  : chkexistdata,
										"CustomerId" :	custId,
										"ProductId"  : ProductId,
										
										}	
									 console.log("TTTTTTTT",dataval1);
							$.ajax({
								
								type: 'POST',
								url: url+"DeleteExist",  //
								data : JSON.stringify(dataval1),
								processData: false,
								contentType: "application/json; charset=utf-8",
								success: function(data) {
									
								}	
							});
						      }else{
						    	  
						      }

						}
					
		
				
					/*<--Modal box save data-->*/
					var apttxtval="";
					$(document).on("click", ".SaveTestData", function(e){	
						var ATPtxtVal=[];
						$(".atpTxTval").each(function() {		  
							
							var dt=$(this).val();
					    	dt=dt.trim();
					    	ATPtxtVal.push(dt);
						});
						 apttxtval=ATPtxtVal.join(",");
						
						 
						 $('#hidnrow'+checkid).val(apttxtval);
							
						
							/* var aptarray = apttxtvaln.join(",");		
							 alert(aptarray);*/
						$('#import_excel').hide();
						$('.atpTxTval').val("");
						$('#NoOfVisitTbody').empty();
						$('.delNoOfVisit').remove();
						
						
					/*	var divName =$(this).parent().parent().parent().find("tr").length;
						$('#NoOfVisitTbody').append('<tr>'+
								'<td></td>'+
								'<td><input type="text" class="form-control atpTxTval" id="atpTxTval'+divName+'" placeholder="Txt Data"></td>'+
								'<td><button type="button" class="btn btn-primary" id="addNoOfVisit"><span class="fa fa-plus"></span></button></td>'+
								'</tr>');
						
						*/
						//e.preventDefault();
					});
					/*<--Modal box save data End-->*/
					
					//get Customer list
					function generateCustomersList(divId){
						
								//	console.log("=============generateCustomersList============",data.result);
					
									$('#customerListadd').empty();
							
									$.get(url+"getCustomers", function( data ) { //from API list
					
									console.log("getCustomers===========data.result======",data.result);
							
									//var CtrObj = $.parseJSON(data.result);
									
									if ( divId == "#customerListadd" ){
									
														$('#customerListadd').html('');
														$('#customerListadd').append('<option value=' + 0+ '>  -- Select Customer -- </option>');
												
													    $.each(data.result, function( index, value ){
														
														console.log("getCustomers===========data.CustomerID======",value.CustomerID);
														
														$('#customerListadd').append('<option value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
										
									    });
									}
							});
				
					} 		
					
					$(document).on("click", ".cls", function(e){	

						$('#import_excel').hide();
					
					});
					
					
					
					
					
});