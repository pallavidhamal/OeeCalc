
		console.log("-------------------Welcome to project page------------------");
		var tableData = $('#purchaseOrderList').DataTable();
		var testtbl = $('#TestTbl').DataTable();
		var JobId,tname;
	
		$(document).ready(function(){
			
			getList();
			
			$("#customerListadd").on("change", function(e)		
					{		
						var customerId = $( "#customerListadd" ).val();
						
						console.log("----------click on change customerId------------",customerId);
						
//						$("#SelRegion").empty();
						
						generateProductList("#productList", customerId);
						
						
						
						
						if(customerId == 1){
							
		                	console.log("-----hrhrhr rrrrrr----===");
		                	$("#dateFrmadReleaseDtdv").empty();
							$("#rinfNamedv").empty();
							$("#planIddv").empty();
							$("#IRnumberdv").empty();
							$("#dateFrmad1Dtdv").empty();
							$("#SRnumberdv").empty();
							$("#Circlenamedv").empty();
		                	
							$("#dateFrmadReleaseDtdv").append(' <div class="col-sm-12 margin_top_15"><label for="" class="col-sm-4 control-label cust_label">Select Plan Release date: '+
									'</label><div class="col-sm-8 my_form"> <input type="date" class="form-control" id="dateFrmad"></div></div>');
									
							$("#rinfNamedv").append('<div class="col-sm-12 margin-top15"><label for="" class="col-sm-4 control-label cust_label">Enter Ring name : </label><div class="col-sm-8 my_form">'+
			             	'<input type="text" class="form-control" placeholder="Enter Ring name"  id= "rinfName"></div></div>  ');
							
							$("#planIddv").append('<div class="col-sm-12 margin-top15"><label for="" class="col-sm-4 control-label cust_label">Enter Plan Id :  </label><div class="col-sm-8 my_form">'+
			             	'<input type="text" class="form-control" placeholder="Enter Plan Id"  id= "planId"></div></div>  ');
							
							
							$("#IRnumberdv").append('<div class="col-sm-12 margin-top15"><label for="" class="col-sm-4 control-label cust_label">Enter IR number : </label><div class="col-sm-8 my_form">'+
						             	'<input type="text" class="form-control" placeholder="Enter IR number"  id= "IRnumber"></div></div>  ');
						    
							$("#dateFrmad1Dtdv").append(' <div class="col-sm-12 margin_top_15"><label for="" class="col-sm-4 control-label cust_label">Select RFI date: '+
							'</label><div class="col-sm-8 my_form"> <input type="date" class="form-control" id="dateFrmad1"></div></div>');
					
												   
							$("#SRnumberdv").append(' <div class="col-sm-12 margin-top15 "  ><label for="" class="col-sm-4 control-label cust_label">Enter SR number : </label><div class="col-sm-8 my_form">'+
						            '<input type="text" class="form-control" placeholder="Enter SR number"  id= "SRnumber"></div> </div>  ');
						    
							$("#Circlenamedv").append(' <div class="col-sm-12 margin-top15 " ><label for="" class="col-sm-4 control-label cust_label">Enter  Circle name : </label><div class="col-sm-8 my_form">'+
						            '<input type="text" class="form-control" placeholder="Enter  Circle Name"  id= "Circlename"></div> </div>  ');
				   
						}else{
							
							$("#dateFrmadReleaseDtdv").empty();
							$("#rinfNamedv").empty();
							$("#planIddv").empty();
							$("#IRnumberdv").empty();
							$("#dateFrmad1Dtdv").empty();
							$("#SRnumberdv").empty();
							$("#Circlenamedv").empty();
							
							
						}
						
						
					});
			
		
						
		});
				
		
		$(document).on("change", "#typeofMig", function(e){
			
			var selectedVal=$('#typeofMig option:selected').text();
			if((selectedVal=='Card Migration')||(selectedVal=='Shelf Migration'))
			{
				//alert($('#typeofMig option:selected').text());
				
				 $('#siteto').attr('readonly', true);
				 $('#locto').attr('readonly', true);
				
			    $("#siteto").val('NA');
				 $("#locto").val('NA');													
			}
			else
			{
				 $('#siteto').attr('readonly', false);
				 $('#locto').attr('readonly', false);
				
				 $("#siteto").val('');
				 $("#locto").val('');
			}
			
			
		});
		
		$(document).on("click", "#generatePdfAction", function(e){
					var dataVal;
			
					console.log("--------click on generatePdfAction-------");
					console.log("--------click on generatePdfAction-------",url);
					
					$.ajax({
						
						type: 'GET',
						url : url+"generatePdfAction",  //from API update data
						//data : JSON.stringify(dataVal),
						//contentType: "application/json",
			    
						success: function(result) {
			    	
						console.log("Update--Information cancelRecord==="+result);
						
						if(result.result==true){
							
							getList();  
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
						//$("#editPopupScreen").modal('hide');
						}
					});
			
		});
		
	
		
		
//function add click
		$(document).on("click", "#addnewAction", function(e){
	
					console.log("----------click on add button------------");
					
					generateCustomersList("#customerListadd");
					
					generateProductList("#productList", "0");
					
					generateSubContractorList();
					
					getregionList();
					
					gettaskList();
					
					callAddRemoveClassFunction($("#customerListadd"));
					callAddRemoveClassFunction($("#productListadd"));
					callAddRemoveClassFunction($("#subContractorListadd"));
					callAddRemoveClassFunction($("#taskListadd"));
					
					callAddRemoveClassFunction($("#qty"));
					callAddRemoveClassFunction($("#site"));
					callAddRemoveClassFunction($("#loc"));
					callAddRemoveClassFunction($("#regionList"));
					
					callAddRemoveClassFunction($("#siteto"));
					callAddRemoveClassFunction($("#locto"));
					
					callAddRemoveClassFunction($("#rinfName"));
					callAddRemoveClassFunction($("#planId"));
					
					callAddRemoveClassFunction($("#IRnumber"));
					callAddRemoveClassFunction($("#SRnumber"));
					callAddRemoveClassFunction($("#Circlename"));
					callAddRemoveClassFunction($("#dateFrmad"));
					callAddRemoveClassFunction($("#dateFrmad1"));
					
					
					$("#pmErrAdd").empty();
					
					$("#siteloc").empty();
						
		});
//function add click

		
		
		$('.remarkThis').each(function(){
            
			console.log("--------click on update---this----------",$(this).val());
			var remark = $(this).val();
			
			 dataVal = {
					"id"	:id,
			    	"remark":remark
			    	}
			
        });
		
		
		$(document).on("click", ".updateRemark", function(e){

			/*var yourVariable = '<%= Session["Login_Id"] %>';
			 * 
			alert("this",yourVariable);*/
			
					typeFlag = $(this).attr("typeFlag");
			
					console.log("--------click on typeFlag----typeFlag----",typeFlag);
					id = $(this).attr("JobId");
					console.log("--------click on update--JobId------",id);
					cnt = $(this).attr("cnt");
					console.log("Edited this task deatils :"+cnt);
					remarkid= "#remark"+cnt;
					console.log("Edited remarkid  :"+remarkid);
					
					var str = $(remarkid).val();
					console.log("--------click str---",str);
					
					
					if($.trim(str) != "")
					{
					
						var dataVal = {
							
							"id"		: id,
					    	"remark"	:$(remarkid).val(),
					    	"typeFlag"	:$(this).attr("typeFlag"),
					    	"recId"		:$(this).attr("recId"),
					    	"authKey"	:localStorage.getItem("authkey")
					    	}
					
					console.log("--------click on dataVal-------",dataVal);
					
					$.ajax({
						
						type: 'POST',
						url: url+"updateremark",  //from API update data
						data : JSON.stringify(dataVal),
						processData: false,
						contentType: "application/json; charset=utf-8",
			    
						success: function(result) {
			    	
						console.log("Update--Information result==="+result);
						console.log("Update--Information result.result==="+result.result);
						
						if(result.result==true){
							
							getList(); 
							$("#showmesg").modal('show');
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
						
						}
					});
					}
					else{
						alert("Remark is manadatory.");
					}
		});
		
		
		$(document).on("click", ".cancelRecord", function(e){
			
			id = $(this).attr("JobId");
			console.log("--------click on update--JobId------",id);
	
			
			
			
			callAddRemoveClassFunction($("#pARejRemark"));
		
		});
		
		$(document).on("click", ".deleteRecord", function(e){
			
			id = $(this).attr("JobId");
			console.log("--------click on update--JobId------",id);
	
			
			
			
		//	callAddRemoveClassFunction($("#pARejRemark"));
		
		});
		
//
	//delete record
		
		$(document).on("click", "#delRecBtn", function(e){
			var dataVal;
		
				 console.log("-------delete id job-------",id);
				
				 console.log("-pARejRemark=======", $("#RejRemark").val());
					
					remark = $("#RejRemark").val();
				console.log("--------remark remark remark------",remark);
				
			    dataVal = {
						    	"authKey":localStorage.getItem("authkey"),
						    	"id"	 :id,
						    	//"remark" : $("#RejRemark").val()
							//"action": 4,
							//"actionBy":1,
					    	}	
				 console.log("--------click on dataVal--------",dataVal);
				 
				$.ajax({
					
					type: 'POST',
					url: url+"deleteInstallation",  //from API update data
					data : JSON.stringify(dataVal),
					contentType: "application/json",
		    
					success: function(result) {
		    	
					console.log("Update--Information cancelRecord==="+result);
					
					if(result.result==true){
						
						getList();  
						$("#delete_rec").modal('hide');
						
					}else if(result.result==false){
						
						window.location.href = "sessionOut";
						
					}
					$("#delete_rec").modal('hide');
					}
			});
		
	});
		
		
		
		
		
		$(document).on("click", "#noDel", function(e){
		$("#delete_rec").modal('hide');
		});
//		
		
		
		$(document).on("click", "#saveRejRemark", function(e){
				var dataVal;
			
					 console.log("-------idididid-------",id);
					
					 console.log("-pARejRemark=======", $("#RejRemark").val());
						
						remark = $("#RejRemark").val();
					console.log("--------remark remark remark------",remark);
					
				    dataVal = {
							    	"authKey":localStorage.getItem("authkey"),
							    	"id"	 :id,
							    	"remark" : $("#RejRemark").val()
								//"action": 4,
								//"actionBy":1,
						    	}	
					 console.log("--------click on dataVal--------",dataVal);
					 
					$.ajax({
						
						type: 'POST',
						url: url+"cancelInstallation",  //from API update data
						data : JSON.stringify(dataVal),
						contentType: "application/json",
			    
						success: function(result) {
			    	
						console.log("Update--Information cancelRecord==="+result);
						
						if(result.result==true){
							
							getList();  
							$("#add_remark").modal('hide');
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
						$("#add_remark").modal('hide');
						}
				});
			
		});
		
		
		$(document).on("click", ".multiselect_checkbox", function(e){
			
			
			 console.log("------hello----===");
			 $("#pmErrAdd").empty();
			 $("#siteloc").empty();
				var ar=[];
				
				$('.multiselect_checkbox').each(function(){
		            if($(this).is(':checked'))
		            {
		                ar.push($(this).attr("para")); 
		                console.log("--------tname---ararararar---===",ar);
		                console.log("--------tname---ararararar--lenth-===",ar.length);
		                
		                
		                if(ar.length>1){
		                	
		                	//$("#siteloc").empty();
		                	
		                	if(ar.includes("Migration")){
		                		$("#pmErrAdd").append("Migration is an independent task");
		                		$("#siteloc").empty();
		                	}
		                	
		                }else{
		                	
		                	if(ar.includes("Migration")){
								
			                	console.log("-----hrhrhr-----===");
			                	
			                	
			                	
			                	console.log("-----hrhrhr-----===");
			                	$("#siteloc").append('<div class="col-sm-12 margin-top15">'+

			                	'<label for="" class="col-sm-4 control-label cust_label">Select Type of Migration : <span class="fa fa-asterisk"></span></label>'+
			                	                       '<div class="col-sm-8 my_form"> <select class="form-control" id="typeofMig"><option> Type of Migration </option><option value="Card Migration">Card Migration</option><option value="Shelf Migration">Shelf Migration</option><option value="SDH-DWDM Migration">SDH-DWDM Migration</option></select>'+
			                	                       '</div>'+

			                	'<label for="" class="col-sm-4 control-label cust_label">Site_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
			                	'<input type="text" class="form-control" placeholder="Enter the Site_To"  id= "siteto"></div></div><div class="col-sm-12 margin-top15">'+

			                	'<label for="" class="col-sm-4 control-label cust_label">Location_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
			                	                       '<input type="text" class="form-control" placeholder="Enter the Location_To"  id= "locto"> </div></div><div class="col-sm-12 margin-top15">'+
			                	           
    	                       '<label for="" class="col-sm-4 control-label cust_label">From Engineer : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
    	                       '<input type="text" class="form-control" placeholder="Engineer Name"  id= "fromEng"> </div></div><div class="col-sm-12 margin-top15">'+
    	                       
    	                       
    	                       '<label for="" class="col-sm-4 control-label cust_label">To Engineer : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
    	                       '<input type="text" class="form-control" placeholder="Engineer Name"  id= "toEng">'+
			                	                       
			                	'</div></div>');

			                	

								/*$("#siteloc").append('<div class="col-sm-12 margin-top15">'+
										
										'<label for="" class="col-sm-4 control-label cust_label">Select Type of Migration : <span class="fa fa-asterisk"></span></label>'+
			             	            '<div class="col-sm-8 my_form"> <select class="form-control" id="typeofMig"><option> Type of Migration </option><option value="Card Migration">Card Migration</option><option value="Shelf Migration">Shelf Migration</option><option value="SDH-DWDM Migration">SDH-DWDM Migration</option></select>'+
			             	            '</div>'+
										
										'<label for="" class="col-sm-4 control-label cust_label">Site_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+

								$("#siteloc").append('<div class="col-sm-12 margin-top15"><label for="" class="col-sm-4 control-label cust_label">Site_To : </label><div class="col-sm-8 my_form">'+

								$("#siteloc").append('<div class="col-sm-12 margin-top15"><label for="" class="col-sm-4 control-label cust_label">Site_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+

										'<input type="text" class="form-control" placeholder="Enter the Site_To"  id= "siteto"></div></div><div class="col-sm-12 margin-top15">'+

										
										'<label for="" class="col-sm-4 control-label cust_label">Location_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
			             	            '<input type="text" class="form-control" placeholder="Enter the Location_To"  id= "locto"></div>'+       
			             	            '</div>')+

										'<label for="" class="col-sm-4 control-label cust_label">Location_To : </label><div class="col-sm-8 my_form">'+
			             	            '<input type="text" class="form-control" placeholder="Enter the Location_To"  id= "locto"></div></div>')+

										'<label for="" class="col-sm-4 control-label cust_label">Location_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
			             	            '<input type="text" class="form-control" placeholder="Enter the Location_To"  id= "locto"></div></div>');*/

								
							}   
		                	//$("#pmErrAdd").append("Migration is an independent task")
		                	
		                	if(ar.includes("Channel Addition"))
		                	{
		                		$("#siteloc").append('<div class="col-sm-12 margin-top15">'+

					                	/*'<label for="" class="col-sm-4 control-label cust_label">Select Type of Migration : <span class="fa fa-asterisk"></span></label>'+
					                	                       '<div class="col-sm-8 my_form"> <select class="form-control" id="typeofMig"><option> Type of Migration </option><option value="Card Migration">Card Migration</option><option value="Shelf Migration">Shelf Migration</option><option value="SDH-DWDM Migration">SDH-DWDM Migration</option></select>'+
					                	                       '</div>'+*/

					                	'<label for="" class="col-sm-4 control-label cust_label">Site_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
					                	'<input type="text" class="form-control" placeholder="Enter the Site_To"  id= "siteto"></div></div><div class="col-sm-12 margin-top15">'+

					                	'<label for="" class="col-sm-4 control-label cust_label">Location_To : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
					                	                       '<input type="text" class="form-control" placeholder="Enter the Location_To"  id= "locto"></div></div><div class="col-sm-12 margin-top15">'+
					                	                       
					                	           
		    	                       '<label for="" class="col-sm-4 control-label cust_label">From Engineer : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
		    	                       '<input type="text" class="form-control" placeholder="Engineer Name"  id= "fromEng"> </div></div><div class="col-sm-12 margin-top15">'+
		    	                       
		    	                       
		    	                       '<label for="" class="col-sm-4 control-label cust_label">To Engineer : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
		    	                       '<input type="text" class="form-control" placeholder="Engineer Name"  id= "toEng">'+
					                	                       
					                	'</div></div>');
		                		
		                	}
		                	
		                	if(ar.includes("Manday Visit"))
		                	{
		                		$("#siteloc").append('<div class="col-sm-12 margin-top15">'+
		                				'<label for="" class="col-sm-4 control-label cust_label">Purpose : <span class="fa fa-asterisk"></span></label><div class="col-sm-8 my_form">'+
			    	                       '<input type="text" class="form-control" placeholder="Purpose"  id= "mvPurpose">'+
						                	                       
						                	'</div></div>');
		                	}
		                	
		                	
		                }
		                if(ar.length>1){
		                	if(ar.includes("CS-Survey")){
		                		
		                		 $("#pmErrAdd").empty();
		                		$("#pmErrAdd").append("CS-Survey is an independent task");
		                	}
		                }
		                if(ar.length>1){
		                	if(ar.includes("Channel Addition")){
		                		 $("#pmErrAdd").empty();
		                		$("#pmErrAdd").append("Channel Addition is an independent task");
		                	}
		                }
		                
		                if(ar.length>1){
		                	if(ar.includes("Manday Visit")){
		                		
		                		 $("#pmErrAdd").empty();
		                		$("#pmErrAdd").append("Manday Visit is an independent task");
		                	}
		                }
		                if(ar.length>1){
		                	if(ar.includes("De installation")){
		                		
		                		 $("#pmErrAdd").empty();
		                		$("#pmErrAdd").append("De installation is an independent task");
		                	}
		                }
		               
		                
		                
		               }   
		        });
				
				console.log("--------mId-ar---arar-===",ar);
					
			
		});
		

//function add save
		$(document).on("click", "#addPMdetails", function(e){
	
					console.log("--------click on addPMdetails--------===",localStorage.getItem("authkey"));
					console.log(" qty===",$('#qty').val());
					
					console.log(" typeofMig===",$('#typeofMig').val());
					
					
					
					var ar=[];
					$('.multiselect_checkbox').each(function(){
			            if($(this).is(':checked'))
			            {
			                ar.push({task:$(this).val()}); 
			                			                
			            }   
			        });
					console.log("--------mId-ar---arar-ee===",ar);
				//	console.log("--------mId-ar---arar-ee===",ar[0].task);
					

										

					console.log("--------mId-ar---arar-===",ar);
					

					//if(ar.includes("Migration")){
					/*if(ar[0].task==7){
						console.log("----Migration yes yes yes--------------------");
						
						if(NotAllowedNullVal("#pmErrAdd","Site to",$('#siteto')))
							if(NotAllowedNullVal("#pmErrAdd","Location to",$('#locto')))
							return true;
					}*/
					/*if( $('#siteloc').is(':empty') ) {
						console.log("----yes- empty==");
						//return true;
						
					}else{
						console.log("-----not  empty==");
						if(NotAllowedNullVal("#pmErrAdd","Site to",$('#siteto')))
							if(NotAllowedNullVal("#pmErrAdd","Location to",$('#locto')))
							return true;
							
							//if(NotAllowedNullVal("#pmErrAdd","Location to",$('#locto')))
							//	return true;
					}*/
					//return true;
					

					//console.log("--------mId-ar---arar-ar[0].task===",ar[0].task);
					
					if(ValidationForSelectBox("#pmErrAdd","Customer Name",$('#customerListadd')))
					if(ValidationForSelectBox("#pmErrAdd","Product Name",$('#productList')))
					if(ValidationForSelectBox("#pmErrAdd","Sub Contractor Name",$('#subContractorListadd')))
					if(NotAllowedNullVal("#pmErrAdd","Site",$('#site')))
					if(NotAllowedNullVal("#pmErrAdd","Location",$('#loc')))						
					if(ValidationForSelectBox("#pmErrAdd","Region Name",$('#regionList')))
					if(validationForCheckBoxInSelect("#pmErrAdd","Task "))
					if(validationForMigration("#pmErrAdd",ar))
					if(validationForManday("#pmErrAdd",ar))
					//if(validationForSiteAndLoc("#pmErrAdd",ar[0].task))
					//if(ar[0].task==7)
					{
			
	
						var dataVal = {
								
						//"jobId" 		: "JoB",
						"customerId" 	: $("#customerListadd").val(),
					    "productId" 	: $("#productList").val(),
					    "siId" 			: $('#subContractorListadd').val(),
					    "quantity"		: 1,
					    "site" 			: $("#site").val(),
					    "location" 		: $("#loc").val(),
					    "regionId" 	    : $('#regionList').val(),
					    "task"			: ar,
					    "authKey"		: localStorage.getItem("authkey"),
					    "site_To" 	    : $('#siteto').val(),
					    "location_To" 	: $('#locto').val(),
					    "type_of_Migration": $('#typeofMig').val(),
					    "fromEngineer"	:$('#fromEng').val(),
					    "toEngineer"	:$('#toEng').val(),
					    "ringname"		: $('#rinfName').val(),
					    "planId"		: $('#planId').val(),
					    "irNumber"		: $('#IRnumber').val(),
					    "srnumber"		: $('#SRnumber').val(),
					    "circlename"	: $('#Circlename').val(),
					    
					    "releaseDt"		: $('#dateFrmad').val(),
					    "rfiDt"		: $('#dateFrmad1').val(),
					    "purpose"		: $('#mvPurpose').val(),
					    
						};
			
					console.log("saveProductAdd===dataVal=== ",dataVal);
					
					$.ajax({
			
							   type: 'POST',
							   url: url+"insertInstallationtask",  //from API add new data
							   data : JSON.stringify(dataVal),
							   processData: false,
							   contentType: "application/json",
		   
							   success: function(result) {
		   	
								console.log("insert--Information result==="+result);
								
								console.log("insert-- PoFlag===",result.PoFlag);
								
								if(result.PoFlag==14){
									console.log("insert-- PoFlag=141414==");
									$("#showmesgfrPO").modal('show');
									getList();
								}
																
								if(result.result==true ){
									
									$("#new_installation").modal("hide");
									//$("#showmesgfrPO").modal('show');
									getList();
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}
								
				
							}
					});
	
					}
					//$("#pmErrAdd").append("Site To is mandatory");
		});
//function add save


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
	
		} //end of get Customer list


		
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
		

//get Sub Contractor List
		function generateSubContractorList(){
			
						console.log("-----generateSubContractorList--111----",localStorage.getItem("authkey"));
	
						$("#subContractorListadd").empty();
						
						$.get(url+"getSubContractorList/"+localStorage.getItem("userId"), function( data ) { //from API list
							
						console.log("---------------data.result----------",data.result);
						
						$('#subContractorListadd').append('<option value=' + 0+ '> -- Select Sub Contractor -- </option>');
						
						$.each(data.result, function(key,val) {
							
							console.log("-------------val.EmpId--------",val.Company);
								
						$("#subContractorListadd").append('<option value='+val.EmpId+'>'+val.Emp_Name+'-'+val.Company+'</option>');
						
								
						});
						
					});
					
			}
//end get Sub Contractor List
		
		
//get task list
		
		function gettaskList(){	
			
					console.log("-----gettaskList------");
			
			
					$.get(url+"getTasks/"+localStorage.getItem("userId"), function( data ) { //from API list
				
					console.log("------------getTasks--------------",data.result);
				
					$('#taskListadd').html('');
				
					//$('#taskListadd').append('<option value=' + 0+ '>  - Select Task - </option>');
		
					$.each(data.result, function( index, value ){
				
					//	console.log("regionListadd===========data.CustomerID======",value.RegionId);
				
					$('#taskListadd').append('<li> <input type="checkbox" value="'+ value.TaskId + '" class="multiselect_checkbox" name="multiselect" para="'+value.TaskName+'">'+ value.TaskName+'</li>');
						
				});
		});
}
//end of get task list
		
		
//get  list
		function getList(){
				
					//var authKey	= localStorage.getItem("userId");
					var i = 0;
					console.log("------getProductList--userId--------",localStorage.getItem("userId"));
	
					$.get(url+"getInstallationList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					
					console.log("--getProductList----data----------",data);
					console.log("--getProductList----data.result----------",data.result);
					console.log("--getProductList----data.result--JobId--------",data.JobId);
					
					console.log("------TE--------",data.TE);
					
					tableData.destroy();
					
       
					$('#purchaseOrderList.tbody').empty();
		
					var editIcon = function ( data, type, row ) {
				 
						//console.log("--getProductList---here-------",data.id);
						
			        if ( type === 'display' ) {
			        	console.log("--getProductList---here--data.Remark-----",data.Remark);
			        	//console.log("--getProductList---here--data.typeFlag-----",data.typeFlag);
			        	
			        	i = i + 1;
			        return '<td><input type="text" class="table-input-item" placeholder="Enter Remark" id = "remark'+i+'" value="'+data.Remark+'"><input type="button" placeholder="Enter your Remark" class="table-input-btn updateRemark" value="Update" recId='+data.recId+' typeFlag='+data.typeFlag+' JobId='+data.id+' cnt = '+i+'> </td>';
			        
			        }
			        
			        return data;
					};
			    
					
					
					
					
					var deleteIcon = function ( data, type, row ) {
					
						
						//console.log("--Status---here-------",data.Status);
						
						if(data.Status=="New")
						{
						var Delbtn='<input type="button" class="table-input-cl deleteRecord" data-toggle="modal" data-target="#delete_rec" value="Delete" JobId='+data.id+'> ';
						//data-target="#add_remark"
						}
						else
						{
							var Delbtn='';
						}	
						
						
					if ( type === 'display' ) {
		            
					return '  <td><input type="button" class="table-input-cl cancelRecord" data-toggle="modal" data-target="#add_remark" value="Cancel" JobId='+data.id+'>'+
					Delbtn +' '+ '</td>';
		        
					}
					
					return data;
					};
					i++;
					var table = $('#purchaseOrderList').DataTable( {
				
					dom: 'Blfrtip',   
					buttons: ['excel', 'print'],
				 	 destroy: true,
    				 data: data.result,
    				 "initComplete": function(settings, json) {
					  },
    				 
    				 columns: [
    				    { "data": "JobId" },
    				    { "data": "CustomerName" },
    		            { "data": "SI" },
    		            { "data": "Company" },
    		            { "data": "ProductName" },
    		            { "data": "Site" },
    		            { "data": "Location" },
    		            { "data": "TE" },
    		            { "data": "Status" },
    		            { "data": "Stages" },
    		            { "data": editIcon },
    		            { "data": deleteIcon },
    				 
    				 ],
    				 "columnDefs": 
					 [	
		              /* {
		                    "targets": [ 4 ],
		                    "orderable": false
		                },
		                {
		                    "targets": [ 5 ],
		                    "orderable": false
		                }*/
		            ],
    				 "order": [[0, 'desc']],
		    } );
			
	});
	}
//get  list



//get region list
		function getregionList(){
		
					//console.log("==========getregionList===id======",id);
			
					$('#regionList').empty();
					
					var id = localStorage.getItem("userId");
					
					$.ajax({

						type: 'GET',
						url: url+"getUserWiseRegion/"+id,  //from API on click of edit icon
						data : JSON.stringify(id),
						contentType: "application/json",
		
						success: function(result) {
							
						console.log("============regionListadd=============",result);
						var CtrObj = $.parseJSON(result.data);
						
						$("#regionList").append('<option value = 0>-- Select Region -- </option> ');
						
						
						$.each(CtrObj, function( index, value ){
							
							console.log("regionListadd=============",value.RegionId);
							
							$('#regionList').append('<option value="'+ value.RegionId + '">'+ value.RegionName+' </option>');
				    
							});
						}
					
						});
		}
		
//end of get region list
		
//excel upload code start
		$(document).on('change','.GroupFileClassMEx', function () {	
			if(flag==true){
				alert("Please try after some time");
				$('#import_excel').modal('hide');
			}else{
				$('#import_excel').modal('hide');
				$("#progressBar").show();
				readURLUP(this,"#fileGroupIdMEx");    
			}
			});
		
		function readURLUP(input,divId) {  
			
		//	$("#TestTbl").empty();
		//	$("#insertdatatbl").empty();
			
		  if (input.files && input.files[0]) {   
			    var reader = new FileReader();

			    var filename = $(divId).val();
			    
			    console.log("**********filename*********",filename);
			    
			    filename = filename.substring(filename.lastIndexOf('\\')+1);
			    
			    console.log("--------filename-----------:",filename);
			    var getonlyfileNme  = filename.substr(0, filename.lastIndexOf('.')).replace(/[\W_]+/g, '-').concat(".");
			    var getextension     = filename.substring(filename.lastIndexOf('.') + 1);
			    
			    
			    
			    var validateFileName = getonlyfileNme.concat(getextension);
			    
			    reader.onload = function(e) {
			     
			        $(divId).attr('src', e.target.result);
			        $(divId).attr('fname',validateFileName);
			      
			      
			      $(divId).text(filename);  
			      
			      abc(e.target.result,filename);
			     
			    }
			    reader.readAsDataURL(input.files[0]);    
			  } 
			  
			  
		}
		
		function abc(fileex,filename){
			testtbl.destroy();
			  var dataVal = {
			    	     filedata :fileex,
			    	     filename: filename,
			    	     userID:localStorage.getItem("userId")
							}
			  
		  $.ajax({
					type: 'POST',
				    url: "UploadFileIns",  //from API update data
				    data : {
				    	"data":JSON.stringify(dataVal),
				    	
				    },
			            success: function (data) {
			            	var CtrObj = $.parseJSON(data);
			            	$("#progressBar").hide();
			            	$('#dataview').modal('show');
			            	console.log(CtrObj.result2);
			            	console.log(CtrObj.result,"------------");
			            	var table = $('#insertdatatbl').DataTable( {
			    				
								dom: 'Blfrtip',   
								buttons: ['excel', 'print'],
							 	 destroy: true,
			    				 data: CtrObj.result,
			    				 
			    				 "initComplete": function(settings, json) {
								  },
			    				 
			    				 columns: [
			    				    { "data": "JobId" },
			    				    { "data": "CustomerId" },
			    		            { "data": "SI" },			    		           
			    		            { "data": "Quantity" },
			    		            { "data": "Site" },
			    		            { "data": "Location" },
			    		            { "data": "RegionId" },
			    		            { "data": "CurrentStage" },
			    		            { "data": "CurrentStatus" },
			    		            { "data": "POLineId" },
			    		            { "data": "Site_To" },
			    		            
			    				 
			    				 ],
			    				 "columnDefs": 
								 [	
									 {
							                "targets": [ 10 ],
							                "visible": false,
							                "searchable": false
							            },
							            {
							                "targets": [ 9 ],
							                "visible": false,
							                "searchable": false
							            },
							            {
							                "targets": [ 8 ],
							                "visible": false,
							                "searchable": false
							            },
							            {
							                "targets": [ 7 ],
							                "visible": false,
							                "searchable": false
							            },
					            ],
					           
					    } );
			            	
			            		var table2 = $('#TestTbl').DataTable( {
			    				
								dom: 'Blfrtip',   
								buttons: ['excel', 'print'],
							 	 destroy: true,
			    				 data: CtrObj.result2,
			    				 "initComplete": function(settings, json) {
								  },
			    				 
			    				 columns: [
			    					 { "data": "JobId" },
			    				    { "data": "CustomerIdIN" },
			    		            { "data": "SIIN" },			    		        
			    		            { "data": "QuantityIN" },
			    		            { "data": "SiteIN" },
			    		            { "data": "LocationIN" },
			    		            { "data": "RegionIdIN" },
			    		            { "data": "CurrentStageIN" },
			    		            { "data": "CurrentStatusIN" },
			    		            { "data": "POLineIdIN" },
			    		            { "data": "Site_ToIN" },
			    		         
			    				 
			    				 ],
			    				 "columnDefs": 
								 [	
									 {
							                "targets": [ 10 ],
							                "visible": false,
							                "searchable": false
							            },
							            {
							                "targets": [ 9 ],
							                "visible": false,
							                "searchable": false
							            },
							            {
							                "targets": [ 8 ],
							                "visible": false,
							                "searchable": false
							            },
							            {
							                "targets": [ 7 ],
							                "visible": false,
							                "searchable": false
							            },
					            ],
			    				
						
			            	});	
			            	
			            	
			            	
			            }
		  });
			 
		}
//excel upload code end
		
		
		var flag=false;
		$(document).on("click", "#bulkinstall", function()
				
				{		
			$('#fileGroupIdMEx').val('');
			 $.ajax({
					
					type: 'POST',
				    url: "CheckExcelStatusInst",  
				    data : "",
				    success: function(data) {
		
				    	console.log(data+"flag");
				    	
				    	var CtrObj = $.parseJSON(data);
				    	console.log(CtrObj);
				    	console.log(CtrObj.flag);
				    	flag=CtrObj.flag;
				    	}
			 		});	   
				});
		
		
