			
			var delProdID = "";
			var editProdID = "";
			var tableData = $('#purchaseOrderList').DataTable();
		
			$(document).ready(function(){
				
				console.log("========dataTableData=======",planningTableData);
				
			//	alert("HII");
				
				getPOList();
				
			/*	function download(file)
				{
					console.log(" hehehrhehrhehrhe");
					
				 window.location=file;
				}
				
					console.log("-------------------Welcome to product page-----------------");
					
					getPOList();
					
					count = 0;
					$('.table_add_link').on('click',function(){
						
						console.log("-------------table_add_link----this---------",$("#myTbody").find('tr').length);
						
						count = $("#myTbody").find('tr').length;
						
					      $('#myTbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
								    +'<td class="table_input"><input type="text" class="form-control width80 line" id="line'+count+'"></td>'
								    +' <td class="table_input">'
								    +' <select class="form-control width120 prodListadd" id="prodList'+count+'">'
								    +' <option>Select Product -</option> </select>'
								    +'</td>'
								    +' <td class="table_input">'
								    +'<select class="form-control width120 catCodeListadd" id="catCodeList'+count+'">'
								    +'<option>Select Category -</option></select>'
								    +' </td>'
								    +'<td class="table_input display_block">'
								    +' <select class="form-control width120 descListadd" id="descList'+count+'">'
								    +'<option>Select Description-</option></select>'
								    +'</td>'
								    +' <td class="table_input">'
								    +'<select class="form-control width120 regListadd" id="regList'+count+'">'
								    +'<option>- Select Region -</option>'
								    +'</select>'
								    +'</td>'
								    +'<td class="table_input"><input type="text qtyList" id="poQty'+count+'" class="form-control width80 qtyListadd"></td>'
								    +'<td class="table_input"><a href="#" class="deleteRow"><i class="fa fa-minus"></i></a></td>'
								    +'</tr>');
					      
					      generateProdList('#prodList'+count, $("#customerListadd").val(),"");
					      generatecatCodeListCustWise('#catCodeList'+count, $("#customerListadd").val(),"");
						  generateDescListCustWise('#descList'+count, $("#customerListadd").val(),"");
					      
						  getRegionList("#regList"+count,"");
					      
					         $('.deleteRow').on('click',function(){
					       $(this).closest('tr').remove();
					      });
					   
					
					});
					
					//on change of customer get product list
					$("#customerListadd").change(function(){
						
						console.log("on change of cust id======",$("#customerListadd").val());
						
						var rowlength=$(".line" ).length
						
						for(count=0;count<rowlength;count++)
						{
						generateProdList('#prodList'+count, $("#customerListadd").val(),"");						
						generatecatCodeListCustWise('#catCodeList'+count, $("#customerListadd").val(),"");
						generateDescListCustWise('#descList'+count, $("#customerListadd").val(),"");
						}
						
						
					});	
					
					$("#customerListEdt").change(function(){
						
						console.log("on change of cust id======",$("#customerListEdt").val());
						
						generateProdList('#prodListEdt'+count, $("#customerListEdt").val(),"");
						
					});	*/
				
					
			});
			
			$(document).on("click", "#planningAddAction", function(e){
			
			window.location.href = "addPlanning";	

			});
	
			//click on add button
			$(document).on("click", "#purchaseAddAction", function(e){
				
				console.log(" click on purchase Add Action");
				
				
				
				getCustomersList("#customerListadd","0");
				
				getRegionList("#regList"+count,"");
				
				callAddRemoveClassFunction($("#ponumber"));
				callAddRemoveClassFunction($("#customerListadd"));
				callAddRemoveClassFunction($("#poDate"));
				callAddRemoveClassFunction($("#poEndDate"));

				 $('#myTbody').empty();
				 $('#poErrAdd').empty();
				 
				
		
			});
			
			$(document).on("change", ".prodListadd", function(e){
				
				console.log("on change prodListadd====",$(this).parent().parent().attr("roCnt"));
				
				
				var count = $(this).parent().parent().attr("roCnt")
				
				
				console.log("prodList pid pid====",$('#prodList'+count).val());
				
				console.log("on change of prod List add===");
				
				console.log("on change of prod List add==prd name=",$('#prodList'+count).val());
				
				
				generateDescList("#descList"+count,$('#prodList'+count).val(),$('#prodList'+count).val());
				
				generateCategoryList("#catCodeList"+count,$('#prodList'+count).val(),$('#prodList'+count).val());
				
			});	
			
			
			function generateDescList(divId, pid , prodId){
				
				
				 console.log("################### generateDescList=====",divId);
				 console.log("################### generateDescList==prodId===",prodId);
					
						var dataVal = {
								"id" : pid,
								//"name":pName,
								"authKey":localStorage.getItem("authkey")
						
						}
						
						console.log("dataVal====== ",dataVal);
						$.ajax({
							
							type: 'POST',
						    url: url+"getProdWiseCatagory",  //from API update data
						    data : JSON.stringify(dataVal),
						    contentType: "application/json",

						    success: function(data) {
						
						    console.log("-----generateDescList----------data----------",data);
							
							$(divId).empty();
							
							$(divId).append('<option value="0">  Select Description </option>');
							
							$.each(data.result, function(key,val) {
								
								
								if(prodId==val.ProductId){
									
									$(divId).append('<option selected value='+val.ProductId+'>'+val.Description +'</option>');
								}
								else{
									$(divId).append('<option value='+val.ProductId+'>'+val.Description +'</option>');
								}
								
							});
									
							$(divId).val(prodId);
							}
						});
						
					}
			
			function generateCategoryList(divId, pid,prodId){
				
				console.log("---------generateCategoryList--divId---",divId);
				console.log("---------generateCategoryList--prodid---",prodId);
				
				
				var dataVal = {
						"id" : pid,
						//"name":pName,
						"authKey":localStorage.getItem("authkey")
				
				}
				$.ajax({
					
					type: 'POST',
				    url: url+"getProdWiseCatagory",  //from API update data
				    data : JSON.stringify(dataVal),
				    contentType: "application/json",

				    success: function(data) {
				
				    console.log("-----generateCategoryList----------data----------",data);
					
					$(divId).empty();
					$(divId).append('<option value="0">  Select Category </option>');
					
							$.each(data.result, function(key,val) {
								
								if(prodId==val.ProductId){
									
									$(divId).append('<option selected value='+val.ProductId+'>'+val.CatCode +'</option>');
								}
								else{
									$(divId).append('<option value='+val.ProductId+'>'+val.CatCode +'</option>');
								}
								
							
							});
					}
				});
				
			}
			
			//get purchase order list
			function getPOList(){  

					console.log("-------------------Welcome to product getPOList");
			//		$.get(url+"getPOList", function( data ) { //from API list
		
					var data = planningTableData;
		
					console.log("------getPOList data----------",data);
			//		console.log("------getPOList data.result----------",data.result);
			//		
				
					tableData.destroy();
			        $('#purchaseOrderList.tbody').empty();
					
			        //if(data.result == "success"){
						
			        var editIcon = function ( data, type, row ) 
			        {
				    if ( type === 'display' ) {
				           
				    return '<span class="fa fa-edit sordrEdit" data-toggle="modal" data-target="#edit_po"></span>';
				        
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
				
				    tableData = $('#purchaseOrderList').DataTable( {
					
				    			dom: 'Blfrtip',   
				    			buttons: ['excel', 'print'],
							 	 destroy: true,
			    				 data: data,
			
								  columns: [
								{ "data": "date" },
		    				    { "data": "machine" },
		    				    { "data": "shift" },
		    		            { "data": "itemcode" },
		    		            { "data": "setup" },
		    		            { "data": "cycletime" },
		    		            { "data": "plannedqty" },{ "data": "plannedmins" },
		    		            { "data": "utilised" },
	    		         
		    		            ],
		    		           // "order": [[0, 'desc']],
				    			} );
				
				
			//		});
			}
	//get purchase order list

			
			//get Customer list
			function getCustomersList(Div,CId){
				
				console.log("getCustomers=====CId======",CId);
			
					$(Div).empty();
				
					$.get(url+"getCustomers", function( data ) { //from API list
						
						console.log("getCustomers=====data data ======",data.result);
			
							//var CtrObj = $.parseJSON(data.data);
							
							console.log("getCustomers=====CId======",CId);
							
							if(Div=='#customerListadd')	{
											
								$(Div).append('<option value=' + 0+ '>  - Select Customer - </option>');
												
								$.each(data.result, function( index, value ){
												
								$(Div).append('<option value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
								
							    });
							
							}	
							if( Div == "#customerListEdt"){
						
									$.each(data.result, function( index, value ){
													
									if(CId==value.CustomerID){
														
									$(Div).append('<option selected value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
														
									}else{
														
									$(Div).append('<option value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
									}
							
								});
								}
					});
		
			} //end of get Customer list
			
			
			function generateProdList(divid,customerId,prodId){
				
				console.log("-----generateProdList------",divid);
				console.log("-----generateProdList cid------",customerId);
				console.log("-----generateProdList prodId------",prodId);

				
				$.get(url+"getCustWiseProductList/"+customerId, function( data ) { //from API list
					
					console.log("---------------data----------",data);
					console.log("---------------data.result----------",data.result);
					
					$(divid).empty();
						
					$(divid).append('<option value="0">  Select Product </option>');
						
					$.each(data.result, function(key,val) {
						
						if(prodId==val.ProductId){
							
							$(divid).append('<option selected value='+val.ProductId+'>'+val.Name +'</option>');
						}
						else{
							
							$(divid).append('<option value='+val.ProductId+'>'+val.Name +'</option>');
							}
					});
					
					// generateDescList("#descListEdt"+cm,"#prodListEdt"+cm,prodId);
				});
			}
			
			
	
function generateDescListCustWise(divid,customerId,prodId){
				
				console.log("-----generateProdList------",divid);
				console.log("-----generateProdList cid------",customerId);
				console.log("-----generateProdList prodId------",prodId);

				
				$.get(url+"getCustWiseProductList/"+customerId, function( data ) { //from API list
					
					console.log("---------------data----------",data);
					console.log("---------------data.result----------",data.result);
					
					$(divid).empty();
						
					$(divid).append('<option value="0">  Select Description </option>');
						
					$.each(data.result, function(key,val) {
						
						if(prodId==val.ProductId){
							
							$(divid).append('<option selected value='+val.ProductId+'>'+val.Description +'</option>');
						}
						else{
							
							$(divid).append('<option value='+val.ProductId+'>'+val.Description +'</option>');
							}
					});
					
					// generateDescList("#descListEdt"+cm,"#prodListEdt"+cm,prodId);
				});
			}

function generatecatCodeListCustWise(divid,customerId,prodId){
	
	console.log("-----generateProdList------",divid);
	console.log("-----generateProdList cid------",customerId);
	console.log("-----generateProdList prodId------",prodId);

	
	$.get(url+"getCustWiseProductList/"+customerId, function( data ) { //from API list
		
		console.log("---------------data----------",data);
		console.log("---------------data.result----------",data.result);
		
		$(divid).empty();
			
		$(divid).append('<option value="0">  Select Catlog Code </option>');
			
		$.each(data.result, function(key,val) {
			
			if(prodId==val.ProductId){
				
				$(divid).append('<option selected value='+val.ProductId+'>'+val.CatCode +'</option>');
			}
			else{
				
				$(divid).append('<option value='+val.ProductId+'>'+val.CatCode +'</option>');
				}
		});
		
		// generateDescList("#descListEdt"+cm,"#prodListEdt"+cm,prodId);
	});
}

			
	//get Region list
			function getRegionList(divid,regId){
				
				console.log("-----getRegions--divid-----",divid);
				
				
				$.get(url+"getRegions", function( data ) { //from API list
					
							console.log("-----getRegions----------data.result----------",data.result);
					
							$(divid).empty();
						
							$(divid).append('<option value="0">  Select Region </option>');
							
								
							$.each(data.result, function(key,val) {
								
								if(regId==val.RegionId){
								
									$(divid).append('<option selected value='+val.RegionId+'>'+val.RegionName +'</option>');	
								}
								else{
									$(divid).append('<option value='+val.RegionId+'>'+val.RegionName +'</option>');
								}
								});
							
				});
			}
			
	

			$(document).on("click", "#addPurchaseData", function(e){
	
				var myarray=[];
				
				 var i =  0 ;
				 $("#myTbody").find('tr').each(function (){
		 
					 var lineData  = {
							 

							 lineid 		: $("#myTbody").find('tr').eq(i).find('td').eq(0).find('input').val(),
							 ProductId 		: $("#myTbody").find('tr').eq(i).find('td').eq(1).find('select').val(),
							 description	: $("#myTbody").find('tr').eq(i).find('td').eq(2).find('select option:selected').text(),
							 catlog 		: $("#myTbody").find('tr').eq(i).find('td').eq(3).find('select option:selected').text(),
							 RegionId		: $("#myTbody").find('tr').eq(i).find('td').eq(4).find('select').val(),
							 POQty			: $("#myTbody").find('tr').eq(i).find('td').eq(5).find('input').val(),
							 Balace_Qty		: $("#myTbody").find('tr').eq(i).find('td').eq(5).find('input').val()
					};
		 
					 i++;
					 myarray.push(lineData);
					 
					 console.log("====myarray======",myarray);
				
				 });	 
				 console.log("====linelinelinelinelinelineline======","#line"+i);
				 
				 if(NotAllowedNullVal("#poErrAdd","PO Name ",$('#ponumber')))
					 if(ValidationForSelectBox("#poErrAdd","Customer Name ",$('#customerListadd')))
						 if(NotAllowedNullVal("#poErrAdd","PO Date ",$('#poDate')))
							 if(NotAllowedNullVal("#poErrAdd","PO End Date ",$('#poEndDate')))
								 if(validateLineId("#poErrAdd"))
									 if(validateProduct())
									 if(validateRegion())
									 if(validatePOQty())
								 //if(NotAllowedNullVal("#poErrAdd","Line ",$("#line"+i)))
						/*if(checkLength("#usrErrAdd","User Name ",$('#userName')))
						//if(AllowedOnlyAlphabetsVal("#usrErrAdd","User Name ",$('#userName')))
						if(NotAllowedNullVal("#usrErrAdd","Address ",$('#addr')))
						if(NotAllowedNullVal("#usrErrAdd","Phone Number ",$('#phNumber')))
						if(PhoneNoValidation("#usrErrAdd","Phone Number ",$('#phNumber')))
						if(NotAllowedNullVal("#usrErrAdd","Email ID ",$('#userEmail')))
						if(EmailValidation("#usrErrAdd","Email ID",$('#userEmail')))
						if(ValidationForSelectBox("#usrErrAdd","Select Type ",$('#typeListad')))
						
							if(validationForCheckBoxInSelect("#usrErrAdd","Region "))*/
							{
					 
					 var dataVal = {
					 
							 PO_NO			: $('#ponumber').val(),
							 Customer 		: $('#customerListadd').val(),
							 PODate			: $('#poDate').val(),
							 POEDate		: $('#poEndDate').val(),
							 authKey		: localStorage.getItem("authkey"),
							 lineData       : myarray

						};
					 
				 
					 
					 console.log("====data==dataVal===",dataVal);
					 
					 
					 $.ajax({
							
						   type: 'POST',
						   url: url+"insertPO",  //from API add new data
						   data : JSON.stringify(dataVal),
						   processData: false,
						   contentType: "application/json; charset=utf-8",
	   
						   success: function(result) {
	   	
							console.log("insert--Information result==="+result);
							
							if(result.result==true){
								
								getPOList();
								
								$("#add_po").modal("hide");
							// $('#myTbody').empty();
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
							
							
			
						   }
				});
			}
});
			
			
			
			function validateLineId(errorDiv){  
				var flag =false;
				
				
				if($(".line").length>0)
				{
				 $(".line").each(function() {
					
					 if(NotAllowedNullVal(errorDiv,"LineId",$(this)))
				     {
				    	 console.log("inside line id-------");
				    	flag=true; 
				     }
					 else
						{
						 flag=false;
						 return flag;
						}
				 });
				 return flag;
				}
				else
				{
					console.log("pallll");
					$(errorDiv).empty();
					$(errorDiv).append("Add at least one line ID");
					/*removeSuccessClass(value);
					addErrorClass(value);*/
					return false;
				}
			}			
			
			function validateEdtLineId(errorDiv){  
				var flag =false;
				
				
				if($(".lineEdt").length>0)
				{
				 $(".lineEdt").each(function() {
					
					 if(NotAllowedNullVal(errorDiv,"LineId",$(this)))
				     {
				    	 console.log("inside line id-------");
				    	flag=true; 
				     }
					 else
						{
						 flag=false;
						 return flag;
						}
				 });
				 return flag;
				}
				else
				{
					console.log("pallll");
					$(errorDiv).empty();
					$(errorDiv).append("Add at least one line ID");
					/*removeSuccessClass(value);
					addErrorClass(value);*/
					return false;
				}
			}	
			
			
			function validatePOQty(){

				var flag =false;
				
				if($(".qtyListadd").length>0)
				{
				 $(".qtyListadd").each(function() {
					
					 //if(NotAllowedNullVal("#poErrAdd","PO Qty",$(this)))
					 if(AllowedOnlyNumber("#poErrAdd","PO Qty",$(this)))
				     {
				    	 console.log("qty------");
				    	flag=true; 
				     }
					 else
						{
						 flag=false;
						 return flag;
						}
				 });
				 return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
				
			}
			
			function validateBalPOQty(){

				var flag =false;
				
				if($(".balQtyedit").length>0)
				{
				 $(".balQtyedit").each(function() {
					
					 //if(NotAllowedNullVal("#poErrAdd","PO Qty",$(this)))
					 if(AllowedOnlyNumber("#poErredt","Bal PO Qty",$(this)))
				     {
				    	 console.log("qty------");
				    	flag=true; 
				     }
					 else
						{
						 flag=false;
						 return flag;
						}
				 });
				 return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
				
			}
			
			
			function validateEdtPOQty(){

				var flag =false;
				
				if($(".qtyList").length>0)
				{
				 $(".qtyList").each(function() {
					
					 //if(NotAllowedNullVal("#poErrAdd","PO Qty",$(this)))
					 if(AllowedOnlyNumber("#poErredt","PO Qty",$(this)))
				     {
				    	 console.log("qty- correct-----");
				    	flag=true; 
				     }
					 else
						{
						 console.log("qty- wrong-----");
						 flag=false;
						 return flag;
						}
				 });
				 return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
				
			}
			
			
			function validateProduct(){  
				var flag =false;
				
				if($(".prodListadd" ).length>0)
				{
				 $(".prodListadd").each(function() {
					
					 if(ValidationForSelectBox("#poErrAdd","Product",$(this)))
				     {
				    	 console.log("Product-------");
				    	flag=true; 
				     }
					 else
						{
						 flag=false;
						 return flag;
						}
				 });
				 return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
			}
			
			function validateEdtProduct(){  
				var flag =false;
				
				if($(".prodList" ).length>0)
				{
				 $(".prodList").each(function() {
					
					 if(ValidationForSelectBox("#poErredt","Product",$(this)))
				     {
				    	 console.log("Product-------");
				    	flag=true; 
				     }
					 else
						{
						 flag=false;
						 return flag;
						}
				 });
				 return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
			}
			
			
			function validateRegion(){  
				var flag =false;
				
				if($(".regListadd" ).length>0)
				{
				 $(".regListadd").each(function() {
					
					 if(ValidationForSelectBox("#poErrAdd","Region",$(this)))
				     {
				    	 console.log("region-------");
				    	flag=true; 
				     }
					 else
					 {
						 flag=false;
						 return flag;
					 }
				 });
				 return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
			}
			
			function validateEdtRegion(){  
				var flag =false;
				
				if($(".regList" ).length>0)
				{
				 $(".regList").each(function() {
					
					 if(ValidationForSelectBox("#poErredt","Region",$(this)))
				     {
				    	 console.log("region-------");
				    	flag=true; 
				     }
					 else
					 {
						 flag=false;
						 return flag;
					 }
				 });
				 return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
			}
			
			
			
			
			$(document).on("click", ".sordrEdit", function(){
				
				 $('#poErredt').empty();
				$("#edit_po").show();
				
				
				$("#customerListEdt").attr("disabled", true);
				$("#ponumberEdt").attr("disabled", true);
				
				var dataVal = {
						
						po_Number	: tableData.row($(this).parent().parent()).id(),
						"authKey":localStorage.getItem("authkey")
						
				};
				console.log("-----sordrEdit----------dataVal----------",dataVal);
				
				//var iTemp=0;
				
				$.ajax({

					type: 'POST',
					url: url+"getPODetail",  //from API on click of edit icon
					data : JSON.stringify(dataVal),
					contentType: "application/json",
	
					success: function(result) {
						$('#myTbodyEdt').empty();
						
					console.log("============sordrEdit=============",result);
					
					var CtrObj = $.parseJSON(result.data);
					
					$.each(CtrObj, function( index, value ){
						
						
						console.log("============index==",index);
						
						console.log("============index==",value);
						
						
					if(index==0)
					{
						
						var PO_Date= CtrObj[0].PO_Date.split(" ");
						
						var PO_EndDate= CtrObj[0].PO_EndDate.split(" ");
						
						getCustomersList("#customerListEdt",CtrObj[0].CustomerId);
						
						$("#ponumberEdt").val(CtrObj[0].PO_Number);
						
						$("#poDateEdt").val(PO_Date[0]);
						
						$("#poEndDateEdt").val(PO_EndDate[0]);
						
					
					}
									
					var count = index;
					
					$('#myTbodyEdt').append('<tr class="tr_clone" roCnt = "'+count+'">'
							 +'<td class="table_input" style="display:none;"><input type="hidden" class="form-control width80 line" value="'+value.PoId+'" >'
						    +'<td class="table_input"><input type="text" class="form-control width80 lineEdt" id="lineEdt'+count+'"></td>'
						    +' <td class="table_input">'
						    +' <select class="form-control width120 prodList" id="prodListEdt'+count+'">'
						    +' <option>Select Product -</option> </select>'
						    +'</td>'
						    +' <td class="table_input">'
						    +'<select class="form-control width120 catCodeList" id="catCodeListEdt'+count+'">'
						    +'<option>Select Category -</option></select>'
						    +' </td>'
						    +'<td class="table_input display_block">'
						    +' <select class="form-control width120 descList" id="descListEdt'+count+'">'
						    +'<option>Select Description-</option></select>'
						    +'</td>'
						    +' <td class="table_input">'
						    +'<select class="form-control width120 regList" id="regListEdt'+count+'">'
						    +'<option>- Select Region -</option>'
						    +'</select>'
						    +'</td>'
						    +'<td class="table_input"><input type="text qtyList" id="poQtyEdt'+count+'" class="form-control width80 qtyList"></td>'
						    +'<td class="table_input"><input type="text balList" id="balQtyEdt'+count+'" class="form-control width80 balQtyedit"></td>'

						    +'<td class="table_input"><a href="#" class="deleteRow" value="'+value.PoId+'"><i class="fa fa-minus"></i></a></td>'
						    +'</tr>');
					console.log("============line++++++==","#line"+index);
					console.log("=======value.LineId+++++++++++=",value.LineId);
					
					 generateProdList('#prodListEdt'+index, value.CustomerId,value.ProductId,index);
					
					 generateDescList("#descListEdt"+count,value.ProductId,value.ProductId);
					 
					 generateCategoryList("#catCodeListEdt"+count,value.ProductId,value.ProductId);
					 
					 getRegionList("#regListEdt"+count,value.RegionId);
					 
					 $("#lineEdt"+index).val(value.LineId);
						
					 $("#poQtyEdt"+index).val(value.PO_Qty);
					 $("#balQtyEdt"+index).val(value.Bal_Qty);

						 
					 $("#customerListEdt").change(function(){
							
							console.log("on change of customerListEdt=====",$("#customerListEdt").val());
							
							generateProdList('#prodListEdt'+index, $("#customerListEdt").val(),"");
							
						});	
						
					
					//iTemp++;
					});
					
					}
				
					});
				
		    	});
			

		$(document).on("change", ".prodList", function(){		
			
			
			 console.log("on change prodList====",$(this).parent().parent().attr("rocnt"));
			 
			 
			 var count = $(this).parent().parent().attr("rocnt")
			 
			 console.log("on change of################### customerListEdt=====",$( "#prodListEdt"+count+" option:selected" ).text());
			 
			 console.log("on change of##################### customerListEdt=====",$( "#prodListEdt"+count).val());
			 			 
			 generateDescList("#descListEdt"+count,$('#prodListEdt'+count).val(),$( "#prodListEdt"+count).val());
				
			 generateCategoryList("#catCodeListEdt"+count,$('#prodListEdt'+count).val(),$( "#prodListEdt"+count).val());
				
				
		});	
					
			
			
	count = 0;
	$(document).on("click", ".table_add_linkEdt", function(e){
		
		count = $("#myTbodyEdt").find('tr').length;
		
	      $('#myTbodyEdt').append('<tr class="tr_clone" roCnt = "'+count+'">'
	    		  +'<td class="table_input" style="display:none;"><input type="hidden" class="form-control width80 line" >'
				   
	    		  +'<td class="table_input"><input type="text" class="form-control width80 lineEdt" id="lineEdt'+count+'"></td>'
				    +' <td class="table_input">'
				    
				    +' <select class="form-control width120 prodList" id="prodListEdt'+count+'">'
				    +' <option>Select Product -</option> </select>'
				    +'</td>'
				    +' <td class="table_input">'
				    +'<select class="form-control width120 catCodeList" id="catCodeListEdt'+count+'">'
				    +'<option>Select Category -</option></select>'
				    +' </td>'
				    +'<td class="table_input display_block">'
				    +' <select class="form-control width120 descList" id="descListEdt'+count+'">'
				    +'<option>Select Description-</option></select>'
				    +'</td>'
				    +' <td class="table_input">'
				    +'<select class="form-control width120 regList" id="regListEdt'+count+'">'
				    +'<option>- Select Region -</option>'
				    +'</select>'
				    +'</td>'
				    +'<td class="table_input"><input type="text qtyList" id="poQtyEdt'+count+'" class="form-control width80 qtyList"></td>'
				    +'<td class="table_input"><input type="text balList" id="balQtyEdt'+count+'" class="form-control width80 balQtyedit"></td>'
				    
				    
				    +'<td class="table_input"><a href="#" class="deleteRow"><i class="fa fa-minus"></i></a></td>'
				    +'</tr>');
	      
	      	generateProdList('#prodListEdt'+count, $("#customerListEdt").val(),"");
	      
	       getRegionList("#regListEdt"+count,"");
	      
	     
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

//--------------------------------------------------------------PO_EXCEL----------------------------------START	

	$(document).on('change','.GroupFileClassMEx', function () {	
		if(flag==true){
			alert("Please try after some time");
			$('#import_excel').modal('hide');
		}else{
			$('#import_excel').modal('hide');
			$("#progressBar").show();
			readURLUP(this,count,"#fileGroupIdMEx");    
		}
		  
		});
	function readURLUP(input,count,divId) {  
		//$("#TestTbl").empty();
		//$("#insertdatatbl").empty();
		
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
	
	function abc(xyz,filename){
		  var dataVal = {
		    	     filedata :xyz,
		    	     filename: filename
						}
		  
	  $.ajax({
				type: 'POST',
			    url: "UploadFileex",  //from API update data
			    data : {
			    	"data":JSON.stringify(dataVal),
			    	
			    },
		            success: function (data) {
		             	
		             	$("#progressBar").hide();
		            	$('#dataview').modal('show');
		            	
		            	var CtrObj = $.parseJSON(data);	
		            	console.log(CtrObj.result,"ttttttttt");
		            	var table = $('#insertdatatbl').DataTable( {
		    				
							dom: 'Blfrtip',   
							buttons: ['excel', 'print'],
						 	 destroy: true,
		    				 data: CtrObj.result,
		    				 
		    				 "initComplete": function(settings, json) {
							  },
		    				 
		    				 columns: [
		    				    { "data": "PO_Number" },
		    				    { "data": "PO_Date" },
		    		            { "data": "PO_EndDate" },
		    		            { "data": "CustomerId" },
		    		            { "data": "LineId" },
		    		            { "data": "CatalogId" },
		    		            { "data": "Description" },
		    		            { "data": "ProductId" },
		    		            { "data": "RegionId" },
		    		            { "data": "PO_Qty" },
		    		            { "data": "Balace_Qty" },
		    		            { "data": "Status" },
		    		            
		    				 
		    				 ],
		    				 "columnDefs": 
							 [	
				              
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
		    				    { "data": "PO_NumberIN" },
		    				    { "data": "PO_DateIN" },
		    		            { "data": "PO_EndDateIN" },
		    		            { "data": "CustomerIdIN" },
		    		            { "data": "LineIdIN" },
		    		            { "data": "CatalogIdIN" },
		    		            { "data": "DescriptionIN" },
		    		            { "data": "ProductIdIN" },
		    		            { "data": "RegionIdIN" },
		    		            { "data": "PO_QtyIN" },
		    		            { "data": "Balace_QtyIN" },
		    		            { "data": "StatusIN" },
		    		         
		    				 
		    				 ],
		    				 "columnDefs": 
							 [	
				              
				            ],
		    				
					
		            	});	
		            /*	$.each( CtrObj.result, function( index, value ){
		            	console.log(value.PO_Number);
		            	$('#TestTbl').append('<tr>'+		
								'<td class="tdcls">'+value.PO_Number+'</td>'+
								'<td class="tdcls">'+value.PO_Date+'</td>'+
								'<td class="tdcls" >'+value.PO_EndDate+'</td>'+
								'<td class="tdcls" >'+value.CustomerId+'</td>'+
								'<td class="tdcls" >'+value.LineId+'</td>'+
								'<td class="tdcls" >'+value.CatalogId+'</td>'+
								'<td class="tdcls" >'+value.Description+'</td>'+
								'<td class="tdcls" >'+value.ProductId+'</td>'+
								'<td class="tdcls" >'+value.RegionId+'</td>'+
								'<td class="tdcls" >'+value.PO_Qty+'</td>'+
								'<td class="tdcls" >'+value.Balace_Qty+'</td>'+
								'<td class="tdcls" >'+value.Status+'</td>'+						
								'</tr>');
		            	});
		            	$.each( CtrObj.result2, function( index, value ){
		            	$('#insertdatatbl').append('<tr>'+		
								'<td class="tdcl">'+value.PO_NumberIN+'</td>'+
								'<td class="tdcl">'+value.PO_DateIN+'</td>'+
								'<td class="tdcl" >'+value.PO_EndDateIN+'</td>'+
								'<td class="tdcl" >'+value.CustomerIdIN+'</td>'+
								'<td class="tdcl" >'+value.LineIdIN+'</td>'+
								'<td class="tdcl" >'+value.CatalogIdIN+'</td>'+
								'<td class="tdcl" >'+value.DescriptionIN+'</td>'+
								'<td class="tdcl" >'+value.ProductIdIN+'</td>'+
								'<td class="tdcl" >'+value.RegionIdIN+'</td>'+
								'<td class="tdcl" >'+value.PO_QtyIN+'</td>'+
								'<td class="tdcl" >'+value.Balace_QtyIN+'</td>'+
								'<td class="tdcl" >'+value.StatusIN+'</td>'+						
								'</tr>');
		            	});*/
		            }
		  });
		  
		
	}
		  
//-------------------------------------------------------------------------------------------check excel currenty uploading status
	var flag=false;
	$(document).on("change", "#fileGroupIdMEx", function() {		
		
		var formData = new FormData();
    	var fileInput = $('#fileGroupIdMEx')[0].files[0];

	    // Check if a file is selected
	    if (fileInput) {
	        formData.append('bulkExcelFile', fileInput);
	
	        $.ajax({
	            type: 'POST',
	            url: url + "importBulkExcel",
	            data: formData,
	            contentType: false,
	            processData: false,
	            success: function (data) {
	                console.table(data);
					$('#progressBar').hide();
					$('#dataview').modal('show');
					
					console.table("Excel PO Rem :----- ", data.result);
	               	console.table("Excel PO ID :----- ", data.result2);
					
					getExcelPOSavedList(data.result2);
					
					getExcelPORemainingList(data.result);
	               	
	               	
	               	
	            },
	            error: function (error) {
	                console.error("Error uploading file:", error);
	            }
	        });
	    } else {
	        console.log("No file selected");
	    }
		
	});
	
	
	// Get Excel PO Saved List Function
	function getExcelPOSavedList(data) {
		
		$('#TestTbl').DataTable({
				dom: 'Blfrtip',   
				buttons: ['excel', 'print'],
				destroy: true,
		    	data: data,
		    	"initComplete": function(settings, json) {
				
				},
		    	columns: [
		    		{ "data"	: 	"PO_NumberIN" },
		    		{ "data"	: 	"PO_DateIN" },
		    		{ "data"	: 	"PO_EndDateIN" },
		    		{ "data"	: 	"CustomerIdIN" },
		    		{ "data"	: 	"LineIdIN" },
		    		{ "data"	: 	"CatalogIdIN" },
		    		{ "data"	: 	"DescriptionIN" },
		    		{ "data"	: 	"ProductIdIN" },
		    		{ "data"	: 	"RegionIdIN" },
		    		{ "data"	: 	"PO_QtyIN" },
		    		{ "data"	: 	"Balace_QtyIN" },
		    		{ "data"	: 	"StatusIN" },
		    	],
		    	"columnDefs":[	
				              
				],
		});
		
	}
	
	
		// Get Excel PO Saved List Function
	function getExcelPORemainingList(data) {
		
		$('#insertdatatbl').DataTable({
				dom: 'Blfrtip',   
				buttons: ['excel', 'print'],
				destroy: true,
		    	data: data,
		    	"initComplete": function(settings, json) {
				
				},
		    	columns: [
		    		{ "data"	: 	"PO_Number" },
		    		{ "data"	: 	"PO_Date" },
		    		{ "data"	: 	"PO_EndDate" },
		    		{ "data"	: 	"CustomerId" },
		    		{ "data"	: 	"LineId" },
		    		{ "data"	: 	"CatalogId" },
		    		{ "data"	: 	"Description" },
		    		{ "data"	: 	"ProductId" },
		    		{ "data"	: 	"RegionId" },
		    		{ "data"	: 	"PO_Qty" },
		    		{ "data"	: 	"Balace_Qty" },
		    		{ "data"	: 	"Status" },
		    	],
		    	"columnDefs":[	
				              
				],
		});
		
	}
	
	$(document).on("click", "#savePurchaseData", function(e){
		
				var poDel="";
		
		if(temp!=null && temp!= "" &&  temp!= undefined){
			
			poDel = temp.replace(/,\s*$/, "");
		}
		
		
		
		
		
		var myarray=[];
		
		var LineID ,Product, Description, Region, PQty;
		
		 var i =  0 ;
		 
		 if(validateEdtLineId("#poErredt"))
			 if(validateEdtProduct())
			 if(validateEdtRegion())
			 if(validateEdtPOQty())
			if(validateBalPOQty())
		 {
		 
		 $("#myTbodyEdt").find('tr').each(function (){
			
			 PO_Id			=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(0).find('input').val();
			 LineID			=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(1).find('input').val();
			 Product		=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(2).find('select').val();
			 Description	=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(3).find('select option:selected').text();
			 Catlog			=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(4).find('select option:selected').text();
			 Region			=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(5).find('select').val();
			 PQty			=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(6).find('input').val();
			 BQty			=  $("#myTbodyEdt").find('tr').eq(i).find('td').eq(7).find('input').val();
			 
			 console.log("------dataVal----LineID---		",LineID);
			 console.log("------dataVal----Product---		",Product);
			 console.log("------dataVal----Description---	",Description);
			 console.log("------dataVal----Catlog---		",Catlog);
			 console.log("------dataVal----Region---		",Region);
			 console.log("------dataVal----PQty---			",PQty);
			 console.log("------dataVal----BQty---			",BQty);
			 i++; 
 
			 var lineData = {
		 
					 PO_Id			: PO_Id,
					 lineid 		: LineID,
					 ProductId 		: Product,
					 description	: Description,
					 catlog 		: Catlog,
					 RegionId		: Region,
					 POQty			: PQty,
					 BalQty			:BQty
			
			};
 
			 myarray.push(lineData);
			 
			 console.log("====myarray==update====",myarray);
			 
			 
			     
			 
			 var dataVal = {
			 
					 PO_NO			: $('#ponumberEdt').val(),
					 Customer 		: $('#customerListEdt').val(),
					 PODate			: $('#poDateEdt').val(),
					 POEDate		: $('#poEndDateEdt').val(),
					 PoDeleted   	: poDel,
					 authKey		:localStorage.getItem("authkey"),
					 userId		    :localStorage.getItem("userId"),
					 lineData       : myarray

				};
			 console.log("====data==dataVal=update==",dataVal);
	
			 $.ajax({
		
						type: 'POST',
					    url: url+"updatePO",  //from API update data
					    data : JSON.stringify(dataVal),
					    contentType: "application/json",
	    
					    success: function(result) {
	    	
					    console.log("Update--Information result=datadata=="+result);
					    
					    if(result.result==true){
							
							getPOList();
							
							$("#edit_po").modal("hide");
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
					    }
				});
			 
			 
		 });		
		 
		 }//validation
	});
	
	