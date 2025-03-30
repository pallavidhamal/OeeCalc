//get  list

var	 apttxtvaln;
     
		$(document).ready(function(){			   
					var i = 0;
					$.get(url+"getAptTest", function( data ) { //from API list
					console.log("--getProductList----data----------",data);
					
					var delIcon = function ( data, type, row ) {
						 
				        if ( type === 'display' ) {
				            
				        return '<td>'
						+'<a href="" data-toggle="modal" data-target="#deletModal" TaskId='+data.TestId+'>'
						+'<span title="delete" class="glyphicon glyphicon-trash" id="delIconComment"></span>'
						+'</a>'
						+'</td>';
				        
				        }
				        
				        return data;
						};		
					var editIcon = function ( data, type, row ) {
						 
				        if ( type === 'display' ) {
				            
				        return '<td>'
						+'<a href="" data-toggle="modal" data-target="#edit_installation" TaskId='+data.TestId+'>'
						+'<span title="Edit" class="fa fa-edit" id="editIconComment"></span>'
						+'</a>'
						+'</td>';
				        
				        }
				        
				        return data;
						};
					
					var table = $('#AptTable').DataTable( {
				
					dom: 'Blfrtip',   
					buttons: ['excel', 'print'],
				 	 destroy: true,
    				 data: data.result,
    				 "autoWidth": false,
    				 columns: [
    				    { "data": "TestId" },
    				    { "data": "TaskName" },
    				    { "data": "Category" },
    				    { "data": "parameter" },
    				    { "data": "ParamType" },
    				    { "data": "Seq" },
    				    { "data": editIcon },
    				    { "data": delIcon }
    				    
    				    
    				 ],
    				 "columnDefs": [
    					    { "visible": false, "targets": 0 }
    					  ],
    				 "order": [[0, 'desc']],
		    } );
			
	});
					//function add click
					$(document).on("click", "#addnewAction", function(e){
						
						
						$('#taskList').empty();
						$('#catdrp').empty();
						$('#paramet').val('');
						$('#Ptypedrp').val('');
						$('#Tvaldrp').val('');
						$('#tstval').hide();
						
						
						
						
								console.log("----------click on add button------------");
								
								generateCustomersList("#customerListadd");
								
								generateProductList("#productList", "0");
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
						
								
							

								$.get(url+"getTasks/"+localStorage.getItem("userId"), function( data ) { //from API list
							
								console.log("------------getTasks--------------",data.result);
							
								
							
								$('#taskList').append('<option >---Select Task---</option>');
								$("#catdrp").append('<option>---Select Category---</option>');
								
								$.each(data.result, function( index, value ){
							
								//	console.log("regionListadd===========data.CustomerID======",value.RegionId);
								
								$('#taskList').append('<option value='+value.TaskId+'>'+value.TaskName +'</option>');
								$('#edittaskList').append('<option value='+value.TaskId+'>'+value.TaskName +'</option>');
								
							});
					});
			}
			
				
		
				
					
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
					var Taskdrp;
					
					
					//$('#taskList').on('change', function() {
						$('#taskList').change(taskfun);
						function taskfun(){
							$('#catdrp').empty();
							
						 Taskdrp = $('#taskList').val();
						
						//	 Taskdrp = $('#edittaskList').val();
							
					
						 
						
						if(Taskdrp== 7){
							$('#MIG').show();
							
						}else{
							
							$('#MIG').hide();
						}
						
						var dataval1 = {
								
								"TaskID"  : Taskdrp,
								"Task"  : Taskdrp,
								
								}	
					$.ajax({
						
						type: 'POST',
						url: url+"getTaskData",  //
						data : JSON.stringify(dataval1),
						processData: false,
						contentType: "application/json; charset=utf-8",
						success: function(data) {	
							
							
							
							$("#catdrp").append('<option>---Select Category---</option>');
							 $.each(data.result, function( index, value ){	
								 
							console.log(value.Category,"$$$$5555555$$$$$$$$$",data)	
							
							$("#catdrp").append('<option value='+value.Id+'>'+value.Category +'</option>');
														 });
							
						}
					
						} );
						
						}
					$('#Tvaldrp').on('change', function() {
						var Paramtypeval = $('#Ptypedrp').val();
						var testval = $('#Tvaldrp').val();
					
						if(Paramtypeval=="DD" && testval=="S"){
						  $('#DDtble').show();
						}else if(Paramtypeval=="AC" && testval=="S"){	
							 $('#DDtble').show();
							
						}else{
							$('#DDtble').hide();
						}
	
						
					});
					$('#Ptypedrp').on('change', function() {
						var Paramtypeval = $('#Ptypedrp').val();
						var testval = $('#Tvaldrp').val();
						if(Paramtypeval=="DD" || Paramtypeval=="AC"){
							 $('#tstval').show();
						}else{
							 $('#tstval').hide();
						}
						
						
						
						
						
						if(Paramtypeval=="DD" && testval=="S"){
						  $('#DDtble').show();
						}else if(Paramtypeval=="AC" && testval=="S"){	
							 $('#DDtble').show();
							
						}else{
							$('#DDtble').hide();
						}
					});
					
					

					
					$(document).on("click", "#addNoOfVisit", function(e){
						

						var divName =$(this).parent().parent().parent().find("tr").length;
						$('#NoOfVisitTbody').append('<tr>'+
								'<td></td>'+
								'<td><input type="text" class="form-control ddvaluetxt" name="productDescEdit" id="DDvalue'+divName+'" placeholder="Drop Down Value" autofocus="" required=""></td>'+
								'<td><button type="button" class="btn btn-primary delNoOfVisit" id="delNoOfVisit'+divName+'"><span class="fa fa-trash-o"></span></button></td>'+
								'</tr>');
																		
					});
					$(document).on("click", "#EditaddNoOfVisit", function(e){
						  var listID = $("#EditNoOfVisitTbody").find('tr');
							 
	  						var i="";
	  						for(i=0; i<listID.length ; i++){
	  							console.log(i,"!!!!!!!!!!!!!!!");
	  							
	  						}

					
						$('#EditNoOfVisitTbody').append('<tr>'+
								'<td></td>'+
								'<td><input type="text" class="form-control editddvaluetxt" name="productDescEdit" id="editDDvalue'+i+'"  placeholder="Drop Down Value" value=""></td>'+
								'<td><button type="button" class="btn btn-primary delNoOfVisit" id="delNoOfVisit'+i+'"><span class="fa fa-trash-o"></span></button></td>'+
								'</tr>');
																		
					});
					$(document).on("click", ".delNoOfVisit", function(){
						$(this).parent().parent().remove();
					});
			
					
					$(document).on("click", "#addPMdetails", function(e){
						
				
						var Taskdrp = $('#taskList').val();
						var catIdvalue = $('#catdrp').val();
						var parametertxt = $('#paramet').val();
						var ParamType = $('#Ptypedrp').val();
						var Tvaldrp = $('#Tvaldrp').val();
						var Migration = $('#Migration').val();
						
						
						 var dt1;
						 var dropdownval=[];
							$(".ddvaluetxt").each(function() {		  
								
								 dt1=$(this).val();
						    	dt1=dt1.trim();  	
						    	dropdownval.push(dt1);
						
							});
						
							var  DDVAl=dropdownval.join(",");
						
							
						
						var dataval = {
								
								"TaskID"    :   Taskdrp,
								"Task"      : 	Taskdrp,	
								"CatgId"    : 	catIdvalue,
								"Taskdrp"   : 	parametertxt,
								"ParamType" :   ParamType,
								"Tvaldrp"   : 	Tvaldrp,
								"DropDownVal" : DDVAl,
								"MIGType"   : Migration
								}	
						console.log(dataval,"$$$$$$");
					$.ajax({
						
						type: 'POST',
						url: url+"InsertAtpTaskData",  //
						data : JSON.stringify(dataval),
						processData: false,
						contentType: "application/json; charset=utf-8",
						success: function(data) {	
							 if(data.result==true){
									
							    	gettaskList();  
							    	
								}else if(data.result==false){
									
									window.location.href = "sessionOut";
								}			
							
						}

					
					});
					location.reload();
						
					});		
					var editit ;
					var tskid;
					var oldseqNo="";
					$(document).on("click", "#editIconComment", function(e){
						
						$('#EditNoOfVisitTbody').empty();
						
					
							gettaskList();
						
						
						  editit = $(this).parent().attr("taskid");
						  tskid =  $(this).parents("tr:first").find("td:nth-child(2)").text();
						  var listID = $("#EditNoOfVisitTbody").find('tr');
							 
  						var i="";
  						for(i=0; i<listID.length ; i++){
  							
  							
  						}
						  
						  $('#EditNoOfVisitTbody').append('<tr>'+
									'<td class="col-sm-4 td-col"><label>Testvalues (below values will appear in android application for this test ) :</label></td>'+
									'<td></td>'+
                                  /*  '<td class="col-sm-6 td-col">  <input type="text" class="form-control editddvaluetxt" name="productDescEdit" id="editDDvalue'+i+'"  value=""></td>'+*/
                                     ' <td class="td-col"><button type="button" class="btn btn-primary" id="EditaddNoOfVisit"><span class="fa fa-plus"></span></button></td>'+ 
									
									'</tr>');
						
						var dataval = {
								
								"editid"    :   editit,
								"edit"    :   editit,
								"taskId"   : tskid
								    }	
						
					$.ajax({
						
						type: 'POST',
						url: url+"updateatp",  //
						data : JSON.stringify(dataval),
						processData: false,
						contentType: "application/json; charset=utf-8",
						success: function(data) {	
								
							
							
							
							 $.each(data.result, function( index, value ){	
								
								
								// $("#edittaskList").append('<option value='+value.TaskId+'></option>');
									$('#editparamet').val(value.parameter);
									$('#editPtypedrp').val(value.ParamType);
									$('#editTvaldrp').val(value.TestType);
									$('#editsequence').val(value.Seq);
									oldseqNo = value.Seq;
									
									$('#edittaskList').val(value.TaskId);
									
									edittaskfun();
									$('#editcatdrp').val(value.TaskCategoryId);
									if(value.ParamType =="DD"  || value.ParamType=="AC"){
									
										$('#editTestvalue').show();
										$('#editTvaldrp').val(value.TestType);
									}
									else{
										$('#editTestvalue').hide();
										
									}
									if(value.TestValueType =="S"){
										
										$('#editDDtble').show();
									}
									else{
										
										$('#editDDtble').hide();
									}
									
									
								 
								 $.each(value.TestValue.result, function( index, value ){	
									 var listID = $("#EditNoOfVisitTbody").find('tr');
									 
			    						var i="";
			    						for(i=0; i<listID.length ; i++){
			    						
			    							
			    						}
									 
									$('#EditNoOfVisitTbody').append('<tr>'+
											'<td></td>'+
											'<td><input type="text" class="form-control editddvaluetxt" name="productDescEdit" id="editDDvalue'+i+'"  value="'+value+'"></td>'+
											'<td><button type="button" class="btn btn-primary delNoOfVisit" id="delNoOfVisit"><span class="fa fa-trash-o"></span></button></td>'+
											
											'</tr>');
						
								 });
								 if($('#editTvaldrp').val()=='S'){
									 $('#editDDtble').show();
								 }else{
									 $('#editDDtble').hide();	 
								 }
								 
							
							 });
							
						}
					
					} );
						
					});
					var delID="";
					$(document).on("click", "#delIconComment", function(e){
					delID = $(this).parent().attr("taskid");
					});
					$(document).on("click", "#deleteRecord", function(e){
						
						var dataval = {
								
								"DelId"    :   delID,
								    }	
						
					$.ajax({
						
						type: 'POST',
						url: url+"deleteRecord",  //
						data :JSON.stringify(dataval),
						processData: false,
						contentType: "application/json; charset=utf-8",
						success: function(data) {	
							 if(data.result==true){
									
							    	gettaskList();  
								}else if(data.result==false){
									
									window.location.href = "sessionOut";
									
								}			
						}
					
					});
						location.reload();
					});
					
					
			
					
					$("#editPtypedrp").on("change", function(e)	{
						var validation = $('#editPtypedrp').val();
						var validation2 = $('#editTvaldrp').val();
						if(validation =="DD"  || validation=="AC"){
							//$('#editTestvalue').val('');
							$('#editTestvalue').show();
							//$('#editDDtble').show();
						}
						else{
							$('#editTestvalue').hide();
							//$('#editDDtble').hide();
							}
						
						
						if(validation =="DD"  && validation2=="S"){
							
							$('#editDDtble').show();
						}else if(validation =="AC"  && validation2=="S"){
							
							$('#editDDtble').show();

						}else{
							
							$('#editDDtble').hide();
						}
						
						
					});
				
					
					
					
					
					
					
					
					
					$('#editTvaldrp').on("change", function() {
						
						var validation2 = $('#editTvaldrp').val();
						var editParamtypeval = $('#editPtypedrp').val();
						
					
						
						if(editParamtypeval=="DD" && validation2=="S"){
							$('#editDDtble').show();
							}else if(editParamtypeval=="AC" && validation2=="S"){	
								$('#editDDtble').show();
							}else{
								$('#editDDtble').hide();
							}
					});
					
					
					
					//$('#edittaskList').on('change', function() {
						$('#edittaskList').change(edittaskfun);
					    	function edittaskfun(){
					    		
					    		 $('#editcatdrp').empty();
					    		 Taskdrp = $('#edittaskList').val();
						
							if(Taskdrp== 7){
								$('#MIG').show();		
							}else{	
								$('#MIG').hide();
							}
							
							var dataval1 = {
									
									"TaskID"  : Taskdrp,
									"Task"  : Taskdrp,
									
									}	
						$.ajax({
							
							type: 'POST',
							url: url+"getTaskData",  //
							data : JSON.stringify(dataval1),
							processData: false,
							contentType: "application/json; charset=utf-8",
							success: function(data) {	
								
								 $.each(data.result, function( index, value ){	
									 
									
								
								$("#editcatdrp").append('<option value='+value.Id+'>'+value.Category +'</option>');
								
								 });
								
							}
						
						} );
						
					};
		
					
					
					function getreq(Taskdrp){
						
						
						var editseq = $('#editsequence').val();
						
						var dataval = {		
								"TaskID"    :   Taskdrp,
								"seqId"     :   editseq,
								}	
						console.log(dataval,"$$$$$$");
					$.ajax({
						
						type: 'POST',
						url: url+"updateSeq",  //
						data : JSON.stringify(dataval),
						processData: false,
						contentType: "application/json; charset=utf-8",
						success: function(result) {
	                      if(result==true && oldseqNo ==editseq){	
	                    	
	                    	 $('#SeqErr').hide();  
	                    	 $('#edit_installation').modal('hide');
	                    	 UpdateAtp();
	                     }
	                      else if(result == false){   
		                    	 $('#SeqErr').hide();  
		                    	 $('#edit_installation').modal('hide');
		                    	 UpdateAtp();
		                     } 
	                     else if(result==true){
	                    	 $('#edit_installation').modal('show');
	                    	 $('#SeqErr').show();
	                    	
	                      }
	                    
	                    
	                      
					}})
						
					
					};
					
					
					
					
					$(document).on("click", "#editaddPMdetails", function(e){
						getreq(Taskdrp);
					});	
					
					
					function UpdateAtp(){
						
					
						var editTaskID = $('#edittaskList').val();
						var editcatId = $('#editcatdrp').val();
						var editparametertxt = $('#editparamet').val();
						var editParamType = $('#editPtypedrp').val();
						var editTestval = $('#editTvaldrp').val();
					
						 
						 var editSeq = $('#editsequence').val();
						
						 var dt2;
						 var dropdownval=[];
							$(".editddvaluetxt").each(function() {		  
								
								 dt2=$(this).val();
						    	dt2=dt2.trim();  	
						    	dropdownval.push(dt2);
						
							});
	
							var  editDDVAl=dropdownval.join(",");

						var dataval = {
								
								"TaskID"   		 :   Taskdrp,
								"editTask"       : 	editTaskID,
								
								"editCatgId"    : 	editcatId,
								"editTaskdrp"   : 	editparametertxt,
								"editParamType" :   editParamType,
								"editTvaldrp"   : 	editTestval,	
								"editDropDownVal" : editDDVAl,
								"updateid"        : editit,
								"EditSeq"        : editSeq
								}	
						console.log(dataval,"$$$$$$");
					$.ajax({
						
						type: 'POST',
						url: url+"updateAtpTaskData",  //
						data : JSON.stringify(dataval),
						processData: false,
						contentType: "application/json; charset=utf-8",
						success: function(data) {				
							
						}

					
					});
					  
					location.reload();
						
					}
					
					
});