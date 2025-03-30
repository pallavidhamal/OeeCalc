
			console.log("-------------------Welcome to product page---------");
			var delProdID = "";
			var editProdID = "";
			var tableData = $('#userMasterList').DataTable();
			var roleid;
	
      $(function() {
        $('.chosen-select').chosen();
      });
			
			var ar=[];
			$(document).ready(function(){
			
					getUsersList();
					
					changeUserState();
										
					$("#typeListEdt").on("change", function(e)		
							{		
								console.log("-------hello------");
								
								var selectBox = document.getElementById("typeListEdt");
							    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
							   
							    console.log("----------click on type changeFuncEdt is SI---------",selectedValue);
								
							    changeFuncEdt(selectedValue)
							    
							});
			});

//function add click
			$(document).on("click", "#addUser", function(e){
	
					console.log("----------click on add button------------");
					
					

					console.log("-------on doc arr here-----",ar);
					ar = [];
					console.log("-------on doc arr here- here----",ar);
					console.log("-------on doc arr here- here----",ar.lenght);
					if(ar.lenght!=0){

						ar = [];
					}
					console.log("-------on doc arr here- here after----",ar);

					console.log("----------click on add button------------");
					//console.log("++++++++++++++reg arrar ++++++++++++ ",ar);
					
					$("#add_user").modal("show");
					
					selectType('#typeListad', "");
					
					getregionList("#regionListadd",""); //get region list
				
					$("#usrErrAdd").empty();
					callAddRemoveClassFunction($("#userName"));
					callAddRemoveClassFunction($("#addr"));
					callAddRemoveClassFunction($("#phNumber"));
					callAddRemoveClassFunction($("#userEmail"));
					callAddRemoveClassFunction($("#typeListadd"));
					callAddRemoveClassFunction($("#roleListadd"));
					callAddRemoveClassFunction($("#siCompanylist"));
					callAddRemoveClassFunction($("#regionListadd"));
					callAddRemoveClassFunction($("#custName")); 
					
					$("#custNameDiv").empty();
					$("#siDiv").empty();
			});
//function add click

			
			
//get select type list
			function selectType(divId, id){
			
				console.log("==========selectType==========",id);
				
					$(divId).empty();
					
					$.get(url+"selectType", function( data ) { //from API list
						
						console.log("selectType===========data.result======",data.result);
							
							if ( divId == "#typeListad" ){
							 
												   $(divId).append('<option value=0>  --- Select Role Type --- </option>');
										
													$.each(data.result, function( index, value ){
												
													console.log("regionListadd===========data.RoleType======",value.RoleType);
												
													$(divId).append('<option value="'+ value.Id + '">'+ value.RoleType+' </option>');		
							    });
							}
							
							if ( divId == "#typeListEdt" ){
								
								$.each(data.result, function( index, value ){
								 
									if(id==value.Id){
									 
										console.log("roleListadd===========data.CustomerID===ID===",id);
										
										$(divId).append("<option selected  value='"+ value.Id + "' >"+value.RoleType+ "</option>");	
																							
									 }else{
										 $(divId).append('<option value="'+ value.Id + '">'+ value.RoleType+' </option>');
								}
						
					    });
					}
							
					});
		
			} //end of get select type
			
			

			function changeFunc(){
		
				console.log("----------click on changeFunc-----------",$("#typeListad").val());

				getRoleList('#roleListad',$("#typeListad").val(),"");
					    
			   // alert(selectedValue);
			    if($("#typeListad").val() == 1){
			    	console.log("----------click on type this is SI---------");
			    	$("#regHide").show();
			    	$('#siDiv').append('<div class="col-sm-12 margin-top15" >'
			    		   +'<label class="col-sm-3 control-label cust_label">SI Company Name: <span class="fa fa-asterisk"></span></label>'
				           +' <div class="col-sm-9 my_form">'
				           +' <select class="form-control" name="siCompanylist" id="siCompanylist">'
				           +' <option>  -- Select SI Company -- </option> '
				           +' </div></div>');	
			    	
			    	getsiCompanyList("#siCompanylist", "")
			    	
			    }else{
			    	
			    	$("#siDiv").empty();
			    }
			    
			    if($("#typeListad").val() == 3){
			    	
			    	$("#regHide").show();
			    	
			    	$('#custNameDiv').append('<div class="col-sm-12 margin-top15">'
				    		   +'<label for="" class="col-sm-3 control-label cust_label">Select Customer Name : <span class="fa fa-asterisk"></span></label>'
					           +'  <div class="col-sm-9 my_form">'
					           +'  <select class="form-control" id = "subContractorListadd">'
					           +' </select></div></div>');	
			    				    	
			    	generateSubContractorList("#subContractorListadd", "")
			    	//$("#regHide").empty();
			    	
			    }else{
			    	
			    	$("#custNameDiv").empty();
			    }
			    
			    
			    }
			
			
			
			function getRoleList(div,selectedValue,sid){
				
				 $(div).empty();
				
				console.log("===selectedValue==========",selectedValue);
				console.log("===selectedValue====sid======",sid);
			
				$.ajax({

				type: 'GET',
				url: url+"getTypeWiseRole/"+selectedValue,  //from API on click of edit icon
				data : JSON.stringify(selectedValue),
				contentType: "application/json",

				success: function(result) {
					
				console.log("============sordrEdit===selectedValue==========",result);
				$(div).append('<option value=' + 0+ '>  - Select Role -- </option>');
				
				var CtrObj = $.parseJSON(result.data);
				if(div == '#roleListad' ){
					
					console.log("getProductDetail--selectedValue==",CtrObj);
					
					   $.each(CtrObj, function( index, value ){
						   
						   console.log("getProductDetail--===selectedValue======CtrObj==",CtrObj);
						   console.log("getProductDetail--===selectedValue======value==",value.Role);
						   
						   $(div).append('<option value="'+ value.Id + '">'+ value.Role+' </option>');
						   
					   });
					
					}
				if( div == "#roleListEdt"){
					
					 $.each(CtrObj, function( index, value ){
						
						 if(sid==value.Id){
						 
							console.log("roleListadd===========data.CustomerID==value.Id====",value.Id);
							console.log("roleListadd===========data.CustomerID===ID===",id);
							$(div).append("<option selected  value='"+ value.Id + "' >"+value.Role+ "</option>");	
																				
						 }else{
							 $(div).append('<option value="'+ value.Id + '">'+ value.Role+' </option>');
						 }
					 });
					}									
				}
			});
			
			}
			
			
		
			
			
//function add save
				$(document).on("click", "#addUserdetails", function(e){
			
					console.log("saveProductAdd===dataVal=== ",dataVal);
							
					ar = [];
							
							$('.multiselect_checkbox').each(function(){
								
								console.log("+++++++++++++is checked +++++++++++ ",$(this).is(':checked'));
								
					            if($(this).is(':checked'))
					            {
					            	console.log("++++++++++++this val +++++++++++ ",$(this).val());
					            	
					                ar.push({region_Id:$(this).val()}); 
					            }   
					            
					        });
							console.log("++++++++++++++reg arrar ++++++++++++ ",ar);
							
							
							
							var regdata = JSON.stringify(ar);
							
							console.log("++++++++++++++regdata +++++++++++ ",regdata);
			
							
							
							console.log("+++++++++++++regdata++++++++++ ",regdata);
							
							console.log("--------roleListadd--------",$('#roleListad').val());
							
							console.log("--------typeListad--------",$("#typeListad").val());

							if(NotAllowedNullVal("#usrErrAdd","User Name ",$('#userName')))
							if(checkLength("#usrErrAdd","User Name ",$('#userName')))
							if(NotAllowedNullVal("#usrErrAdd","Address ",$('#addr')))
							if(NotAllowedNullVal("#usrErrAdd","Phone Number ",$('#phNumber')))
							if(PhoneNoValidation("#usrErrAdd","Phone Number ",$('#phNumber')))
							if(NotAllowedNullVal("#usrErrAdd","Email ID ",$('#userEmail')))
							if(EmailValidation("#usrErrAdd","Email ID",$('#userEmail')))
							if(ValidationForSelectBox("#usrErrAdd","Select Type ",$('#typeListad')))
							if(ValidationForSelectBox("#usrErrAdd","Role Name ",$('#roleListad')))
							if(validationForCheckBoxInSelect("#usrErrAdd","Region ")) 
							if(validationSIandCust("#usrErrAdd",$('#typeListad')))	
							{
			
							var dataVal = {
						
							"name" 		: $('#userName').val(),
							"address"	: $('#addr').val(),
						    "contact" 	: $('#phNumber').val(),
						    "email" 	: $('#userEmail').val(),
						    "roletype"	: $('#typeListad').val(),
						    "role"		: $('#roleListad').val(),
						    "sCompany"	: $('#siCompanylist').val(),
						    "authKey"   : localStorage.getItem("authkey"),
						    "reg" 		: ar,
						    "customerName" : $('#subContractorListadd').val(),
						    
							};
				
							console.log("saveProductAdd===dataVal=== ",dataVal);
							
							$.ajax({
					
									   type: 'POST',
									   url: url+"insertUser",  //from API add new data
									   data : JSON.stringify(dataVal),
									   processData: false,
									   contentType: "application/json; charset=utf-8",
				   
									   success: function(result) {
				   	
										console.log("insert--Information result==="+result);
										console.log("insert--Information result.msg==="+result.message);
										console.log("insert--Information result.result==="+result.result);
										
										if(result.result==true){
											
											getUsersList();
											$("#add_user").modal("hide");
											
										}else if(result.result==false){
											
											if(result.message=="UnAuthorised")
											{
											window.location.href = "sessionOut";
											}
											else if(result.message=="DupPhone")
											{
												 $("#usrErrAdd").empty();
												 $("#usrErrAdd").append("User with this Mobile number alreday exists");
											}
											else if(result.message=="UserExists")
											{
												 $("#usrErrAdd").empty();
												 $("#usrErrAdd").append("User name-mobile combination alreday exists");
											}
											
										}
										
						
									   }
							});
			
							}
				});
		//function add save
		
				
				
				
		
		//get region list
		function getregionList(RegionId, regid){
		
			console.log("==========regionListadd==========",regid);
			
				$('#regionListadd').empty();
				$('#regionListEdt').empty();
				
				$.get( url+"getRegions", function( data ) { //from API list
						console.log("regionListadd===========data.result======",data.result);
				
						if ( RegionId == "#regionListadd" ){
						
											$.each(data.result, function( index, value ){
												
											
											console.log("regionListadd===========data.CustomerID======",value.RegionId);
											$('#regionListadd').append('<li> <input type="checkbox" value="'+ value.RegionId + '" class="multiselect_checkbox" name="multiselect">'+ value.RegionName+'</li>');
													
						    });
						     
						}
						if ( RegionId == "#regionListEdt" ){
							$('#regionListEdt').empty();
							$.each(data.result, function( index, value ){
						    	
						    	var arr = regid.split(",");
						    	//console.log("regionListadd=====arrlength======",arr.length);
						    	//console.log("regionListadd=====regid======",regid);
								//console.log("regionListadd=====value.RegionId======",value.RegionId);
								if(arr.includes(value.RegionId)){
									//$(this).is(':checked')
									
									$('#regionListEdt').append('<li> <input type="checkbox" value="'+ value.RegionId + '" class="multiselect_checkbox" checked>'+ value.RegionName+'</li>');
									//document.getElementById("checkVal").checked = true;
						    		
						    	}else{
						    		
						    		$('#regionListEdt').append('<li> <input type="checkbox" value="'+ value.RegionId + '" class="multiselect_checkbox">'+ value.RegionName+'</li>');
						    	}
				    });
				}
				});
	
		} //end of get region list
		
		
				
				
				


//function update data
		$(document).on("click", "#updateUserdetails", function(e){
	
			console.log("-----sordrEdit----------EmpId----update------",id);
			
			console.log("-----sordrEdit----------userNameEdt----------",$('#userNameEdt').val());
			console.log("-----sordrEdit----------addrEdt--------------",$('#addrEdt').val());
			console.log("-----sordrEdit----------phNumberEdt----------",$('#phNumberEdt').val());
			console.log("-----sordrEdit----------userEmailEdt--------------",$('#userEmailEdt').val());
			
			console.log("-----sordrEdit----------typeListEdt----------",$('#typeListEdt').val());
			console.log("-----sordrEdit----------roleListEdt----------",$('#roleListEdt').val());
			console.log("-----sordrEdit----------siCompanylistEdt----------",$('#siCompanylistEdt').val());
			
			var ar=[];
			$('.multiselect_checkbox').each(function(){
	            if($(this).is(':checked'))
	            {
	                ar.push({region_Id:$(this).val()}); 
	            }        
	        });
			console.log("JSON.stringify(ar) regdata ===",ar);
			
				if(NotAllowedNullVal("#usrErrEdt","User Name ",$('#userNameEdt')))
				if(checkLength("#usrErrEdt","User Name ",$('#userNameEdt')))
				//if(AllowedOnlyAlphabetsVal("#usrErrEdt","User Name ",$('#userNameEdt')))
				if(NotAllowedNullVal("#usrErrEdt","Address ",$('#addrEdt')))
				if(NotAllowedNullVal("#usrErrEdt","Phone Number ",$('#phNumberEdt')))
				if(PhoneNoValidation("#usrErrAdd","Phone Number ",$('#phNumberEdt')))
				if(NotAllowedNullVal("#usrErrEdt","Email ",$('#userEmailEdt')))
				if(EmailValidation("#usrErrEdt","Email ",$('#userEmailEdt')))
				if(ValidationForSelectBox("#usrErrEdt","Select Type ",$('#typeListEdt')))
				if(ValidationForSelectBox("#usrErrEdt","Role Name ",$('#roleListEdt')))
				if(validationForCheckBoxInSelect("#usrErrEdt","Region "))
				if(validationSIandCustEdt("#usrErrEdt",$('#typeListEdt')))	
				{
	
					var dataVal = {
													
							"id":id,
							"name":$('#userNameEdt').val(),
							"address":$('#addrEdt').val(),
							"email":$('#userEmailEdt').val(),
							"contact":$('#phNumberEdt').val(),
							"roletype":$('#typeListEdt').val(),
							"role":$('#roleListEdt').val(),
							"sCompany":$('#siCompanylistEdt').val(),
							"authKey":localStorage.getItem("authkey"),
							"reg":ar,
							"customerName" 		: $('#subContractorListedt').val(),

	    	   			}
					console.log("Update--Information saveProductEdit== ",dataVal);
		
					$.ajax({
			
							type: 'POST',
						    url: url+"updateUser",  //from API update data
						    data : JSON.stringify(dataVal),
						    contentType: "application/json",
		    
						    success: function(result) {
		    	
						    console.log("Update--Information result==="+result);
						    
						    if(result.result==true){
								
								getUsersList();
								$("#editPopupScreen").modal("hide"); 
								
							}else if(result.result==false){
								
								if(result.message=="UnAuthorised")
								{
								window.location.href = "sessionOut";
								}
								else if(result.message=="UserExists")
								{
									 $("#usrErrEdt").empty();
									 $("#usrErrEdt").append("User name-mobile combination alreday exists");
								}
								else if(result.message=="DupPhone")
								{
									$("#usrErrEdt").empty();
									$("#usrErrEdt").append("User with this Mobile number alreday exists");	
								}
							}
						   			
						    }
					});
		
					}
		});
//function update data



		
//functio on edit click
		$(document).on("click", ".sordrEdit", function(){
			
		
			$('.multiselect_checkbox').each(function(){
	            if($(this).is(':checked'))
	            {
	            	 $(this).removeAttr('checked');
	            }        
	        });
			
			
					//$("#siDiv1").empty();
					$("#editPopupScreen").modal("show");
					console.log("-----sordrEdit----------EmpId---onclick-------");
					
					id = $(this).attr("EmpId");
					console.log("-----sordrEdit----------EmpId----here------",id);
			
					$.ajax({

								type: 'GET',
								url: url+"getUserDetail/"+id,  //from API on click of edit icon
								data : JSON.stringify(id),
								contentType: "application/json",
				
								success: function(result) {
									
								console.log("============sordrEdit=============",result);
								
								var CtrObj = $.parseJSON(result.data);
								
								console.log("sordrEdit=============",CtrObj[0]);
								console.log("getProductDetail--SICompany======================== ==",CtrObj[0].Customer_Name);
								
								$("#userNameEdt").val(CtrObj[0].Emp_Name);
								$("#addrEdt").val(CtrObj[0].Emp_Address);
								$("#phNumberEdt").val(CtrObj[0].Emp_Contact);
								$("#userEmailEdt").val(CtrObj[0].Emp_Email);
								
								selectType('#typeListEdt',CtrObj[0].RoleType);
								
								changeFuncEdt(CtrObj[0].RoleType,CtrObj[0].SICompany, CtrObj[0].Customer_Name);
								
								getRoleList("#roleListEdt",CtrObj[0].RoleType,CtrObj[0].Role );
								
								console.log("edit click CtrObj[0].RegionStr"+ CtrObj[0].RegionStr)
								
								getregionList("#regionListEdt", CtrObj[0].RegionStr);
								
								
								
								}
				});
					
				
				
		}); 

		//get si company list
		function getsiCompanyList(divid, sid){
		
			console.log("==========getsiCompanyList=sid=========",sid);
			
				$('#siCompanylist').empty();
				$('#siCompanylistEdt').empty();
				
				$('#siCompanylist').append('<option value=0>Select SI Company </option>');
				
				$.get(url+"getSiCompanyList", function( data ) { //from API list
					
					console.log("getsiCompanyList===========data.result======",data.result);
				
						if ( divid == "#siCompanylist" ){
						
								$.each(data.result, function( index, value ){
											
								$('#siCompanylist').append('<option value="'+ value.Id +'">'+ value.Company+'</option>');
											
													
						    });
						}
						
						if ( divid == "#siCompanylistEdt" ){
							
							$.each(data.result, function( index, value ){
								console.log("regionListadd========value.Id====si==",value.Id);
								console.log("regionListadd===========data.CustomerID======",value.Company);
								
								if(sid==value.Id){
											
									$('#siCompanylistEdt').append('<option selected value="'+ value.Id +'">'+ value.Company+'</option>');
									
								 }else{
									 
									 $('#siCompanylistEdt').append('<option value="'+ value.Id +'">'+ value.Company+'</option>');
								 
								 }
								
									
							});
						}
						
				});
	
		} //end of si company list
		
		function generateSubContractorList(divid, cid){
			

			$(divid).empty();
			
			$.get(url+"getCustomers", function( data ) { //from API list
				
			console.log("---------------data.result----------",data.result);
			
			$('#subContractorListadd').append('<option value=' + 0+ '> -- Select Customer Name -- </option>');
			
			if ( divid == "#subContractorListadd" ){
				
				$.each(data.result, function(key,val) {
					
					console.log("-------------val.EmpId--------",val.CustomerID);
					
					console.log("-------------val.EmpId--------",val.Cust_Name);
						
				$("#subContractorListadd").append('<option value='+val.CustomerID+'>'+val.Cust_Name+'</option>');
				
						
				});
			}
			if ( divid == "#subContractorListedt" ){
				
				$.each(data.result, function( index, value ){
					
					console.log("regionListadd========value.Id====cust==",value.CustomerID);
					console.log("regionListadd===========data.CustomerID======",value.Cust_Name);
					
					if(cid==value.CustomerID){
								
						$('#subContractorListedt').append('<option selected value="'+ value.CustomerID +'">'+value.Cust_Name+'</option>');
						
					 }else{
						 
						 $('#subContractorListedt').append('<option value="'+ value.CustomerID +'">'+value.Cust_Name+'</option>');
					 
					 }
					
						
				});
			}
			
		});
		
}

		
				
		function changeFuncEdt(sid, siCompany, Customer_Name){
	
			console.log("role type==",sid);
			console.log("===siCompany======= ==",siCompany);
			
			console.log("Customer_Name======= ==",Customer_Name);
			
			$("#siDiv1").empty(); 
			$("#custNameDivEdt").empty(); 
			
		    if(sid == 1){
		    
		    	$('#siDiv1').append('<div class="col-sm-12 margin-top15" >'
		    		   +'<label class="col-sm-4 control-label cust_label">SI Company Name: <span class="fa fa-asterisk"></span></label>'
			           +' <div class="col-sm-8 my_form">'
			           +' <select class="form-control" name="siCompanylistEdt" id="siCompanylistEdt">'
			           +' <option>  -- Select SI Company -- </option> '
			           +' </div></div>');	
		    	
		    	getsiCompanyList("#siCompanylistEdt",siCompany)
		    	
		    	
		    }else{
		    	
		    	$("#siDiv1").empty();
		    }
		    if(sid == 3){
		    //	$("#regHideEdt").hide(); subContractorListadd
		    	
		    	/*$('#custNameDivEdt').append('<div class="col-sm-12 margin-top15" >'
			    		   +'<label class="col-sm-4 control-label cust_label">Cutomer Name: </label>'
				           +' <div class="col-sm-8 my_form">'
				           +'  <input type="text" class="form-control" id="custNameEdt" placeholder="Enter the Name of Customer">'
				           +' </div></div>');	
		    	$("#custNameEdt").val(Customer_Name);*/
		    	$('#custNameDivEdt').append('<div class="col-sm-12 margin-top15">'
			    		   +'<label for="" class="col-sm-4 control-label cust_label">Select Customer Name : <span class="fa fa-asterisk"></span></label>'
				           +'  <div class="col-sm-8 my_form">'
				           +'  <select class="form-control" id = "subContractorListedt">'
				           +' </select></div></div>');	
		    				    	
		    	generateSubContractorList("#subContractorListedt", Customer_Name)
		    	
		    	
		    }else{
		    	
		    	$("#custNameDivEdt").empty();
		    }
		    getRoleList('#roleListEdt',sid,"");
	   }
		
		
		
		
		
//function on edit click

		
		$(document).on("click", ".resetPswd", function(){
			
			console.log("-----resetPswd-1111111111111--------", $(this).parent().parent().attr("id"));
			id = $(this).parent().parent().attr("id");
			//id = $(this).attr("EmpId");
			
			 console.log("------------EmpId--------",id);
			 
			 var dataVal 	= {
				  "id": id,
				  "authKey":localStorage.getItem("authkey")
			 }
			
			$.ajax({

						type	: 'POST',
						url		: url+"resetPassword",  //from API on click of edit icon
						data 	: JSON.stringify(dataVal),
					    processData: false,
						contentType: "application/json; charset=utf-8",
						
						success: function(result) {
							
						console.log("============sordrEdit=============",result);
						
						getUsersList();
						
						$("#showmesgusr").modal('show');
						
						}
		});
			
		
		
}); 

		//get getUsers List
		function getUsersList(){

			var i = 0;
			console.log("------getProductList----------");
			
			$.get(url+"getUsers", function( data ) { //from API list

			
			console.log("--getProductList----data----------",data);
			console.log("--getProductList----data.result----------",data.result);
			//console.log("--getProductList----data.result.Name----------",data.result[0].EmpId);
			
			tableData.destroy();

			$('#userMasterList.tbody').empty();

			var editIcon = function ( data, type, row ) {
		 
	        if ( type === 'display' ) {
	            
	        return '<span class="fa fa-edit sordrEdit" EmpId='+data.EmpId+'></span>';
	        
	        }
	        
	        return data;
			};
	    
			var deleteIcon = function ( data, type, row ) {
				i=i+1;
				
				console.log("prod res-data data data---",data);
				console.log("prod res-data data data---",data.IsDeleted);
				
			if ( type === 'display' ) {
           	    
				if(data.IsDeleted == 'Y'){
					
					return '<button type="button" class="btn btn-toggle state" data-toggle="button" aria-pressed="false" autocomplete="off"  EmpId='+data.EmpId+'>'
					+'<div class="handle"></div>'
					+'</button>';
					
				}
				if(data.IsDeleted == 'N'){
					return '<button type="button" class="btn btn-toggle active state" data-toggle="button" aria-pressed="false" autocomplete="off"  EmpId='+data.EmpId+'>'
					+'<div class="handle"></div>'
					+'</button>';
				}	
				
				
			}
			return data;
			};
			
			var resetIcon = function ( data, type, row ) {
				 
		        if ( type === 'display' ) {
		            
		        return '<td><button class="btn theme_btn4 resetPswd" id="" EmpId='+data.EmpId+'>Reset Password</button></td>';
		        
		        }
		        
		        return data;
				};
			
	
			var table = $('#userMasterList').DataTable( {
		
			dom: 'Blfrtip',   
			buttons: ['excel', 'print'],
		 	 destroy: true,
			 data: data.result,
			 rowId: 'EmpId',
			 "initComplete": function(settings, json) {
			 //   makeProgressHidden();
			  },
			 
			  columns: [
				    { "data": "Emp_Name" },
				    { "data": "Emp_Address" },
				    { "data": "Emp_Contact" },
		            { "data": "Emp_Email" },
		            { "data": "Emp_Region" },
		            { "data": "RoleType" },
		            { "data": "RoleName" },
		            { "data": "Company" },
		            { "data": "UserName" },
		            { "data": editIcon },
		            { "data": deleteIcon },
		            { "data": resetIcon }
				 
				 ],
				 "columnDefs": 
				 [	
	               {
	                    "targets": [ 6 ],
	                    "orderable": false
	                },
	                {
	                    "targets": [ 7 ],
	                    "orderable": false
	                }
	            ],
				 "order": [[0, 'desc']],

		    } );
			
		
	});
	}//get user list

		
		
		//function for active/ inactive		
		function changeUserState(){
				
			 $(document).on("click", ".state", function(e){
					 
					
				 	console.log("------------EmpId--------",$(this).attr("EmpId"));
				 
				      var isChecked = $(this).attr("aria-pressed");
				      console.log('isChecked: ' + isChecked); 
				      
				      var dataVal = {
		    		  			"id":$(this).attr("EmpId"),
		    		  			"authKey":localStorage.getItem("authkey")
		   	    	   		}
				 	   if(isChecked == "false") {
					    	  
					    	  console.log('hhhrhrhrhrhrhrhr---hhhrhrhrhrhrhrhr--: '); 
					    	  $.ajax({

							        type: 'PUT',
									url: url+"inactivateUser",  //from API on click of edit icon
									data : JSON.stringify(dataVal),
									contentType: "application/json",

									success: function(result) {
										
									console.log("inactivateRegion--Information result===",result);
									
									}
								});
					      }
				      if(isChecked == "true") {
				    	  
				    	  console.log('hhhrhrhrhrhrhrhr---hhhrhrhrhrhrhrhr-hhhrhrhrhrhrhrhr-: '); 
				    	  $.ajax({

						        type: 'PUT',
								url: url+"activateUser",  //from API on click of edit icon
								data : JSON.stringify(dataVal),
								contentType: "application/json",

								success: function(result) {
									
								console.log("activateTask result===",result);
								
								}
							});
				      	}
				        
				
			 		 });
		}
	//function for active/ inactive			

		
