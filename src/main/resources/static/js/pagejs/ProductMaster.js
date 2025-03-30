
		console.log("-------------------Welcome to product page---------");
		var delProdID = "";
		var editProdID = "";
		var tableData = $('#productList').DataTable();
		
		$(document).ready(function(){
			
			
			getProductList();
			
			changeUserState();
		});

//function add click
		$(document).on("click", "#addProduct", function(e){
	
					console.log("----------click on add button------------");
					$("#add_prd").modal("show");
					
					getCustomersList("#customerListadd","");
					
					callAddRemoveClassFunction($("#productPartNoAdd"));
					callAddRemoveClassFunction($("#productDescAdd"));
					callAddRemoveClassFunction($("#customerListadd"));
					callAddRemoveClassFunction($("#productHsCodeAdd"));
					
					$("#productErrAdd").empty();
						
		});
//function add click


//function add save
		$(document).on("click", "#saveProductAdd", function(e) {
					
					console.table("Check Product Type", $('#productTypeAdd').val());
	
					console.log("insert--saveProductAdd result===", $('#customerList').val());
	
					if(NotAllowedNullVal("#productErrAdd","Product Name",$('#productPartNoAdd')))
					//if(AllowedOnlyAlphabetsVal("#productErrAdd","Product Name",$('#productPartNoAdd')))
					if(NotAllowedNullVal("#productErrAdd","Product Description",$('#productDescAdd')))
					if(ValidationForSelectBox("#productErrAdd","Customer Name",$('#customerListadd')))
					if(NotAllowedNullVal("#productErrAdd","Category Code",$('#productHsCodeAdd')))
					if(ValidationForSelectBox("#productErrAdd","Product Type",$('#productTypeAdd')))	
					{
			
	
					var dataVal = {
				
					"product" 		: $("#productPartNoAdd").val(),
				    "catCode" 		: $("#productHsCodeAdd").val(),
				    "customerId" 	: $('#customerListadd').val(),
				    "desc"			: $("#productDescAdd").val(),
				    "productType"   : $('#productTypeAdd').val(),
				    "authKey"		:localStorage.getItem("authkey")
					};
		
		
					console.log("saveProductAdd===dataVal=== ",dataVal);
					$.ajax({
			
							   type: 'POST',
							   url: url+"insertProduct",  //from API add new data
							   data : JSON.stringify(dataVal),
							   processData: false,
							   contentType: "application/json",
		   
							   success: function(result) {
		   	
								console.log("insert--Information result==="+result);
								
								if(result.result==true){
									
									getProductList();
									$("#add_prd").modal("hide");
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}
								
				
							}
					});
	
					}
		});
//function add save


//function update data
		$(document).on("click", "#saveProductEdit", function(e){
	
					console.log("-----sordrEdit----------Pid----------",id);
	
					if(NotAllowedNullVal("#productErrEdit","Product Name",$('#productPartNoEdit')))
					//if(AllowedOnlyAlphabetsVal("#productErrEdit","Product Name",$('#productPartNoEdit')))
					if(NotAllowedNullVal("#productErrEdit","Description",$('#productDescEdit')))
					if(NotAllowedNullVal("#productErrEdit","Catagary Code",$('#productCatEdit')))
					{
	
					var dataVal = {
					"id":id,
					"product":$("#productPartNoEdit").val(),                              
					"desc":$("#productDescEdit").val(), 
					"catCode":$("#productCatEdit").val(), 
					"authKey":localStorage.getItem("authkey")
	    	   			}
					console.log("Update--Information saveProductEdit== ",dataVal);
		
					$.ajax({
			
							type: 'POST',
						    url: url+"updateProduct",  //from API update data
						    data : JSON.stringify(dataVal),
						    contentType: "application/json",
		    
						    success: function(result) {
		    	
						    console.log("Update--Information result==="+result);
						    
						    if(result.result==true){
								
						    	 getProductList();
									
								 $("#editPopupScreen").modal("hide"); 
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
						    
						   
				
						    }
					});
		
					}
		});
//function update data



//get Customer list
		function getCustomersList(CustomerID,CId){
		
				$('#customerListEdt').empty();
				
				
				$.get(url+"getCustomers", function( data ) { //from API list
		
						console.log("getCustomers===========data.data======",data);
				
						console.log("getCustomers===========data.result======",data.result);
						console.log("getCustomers==========CustomerID======",CustomerID);
				
						//var CtrObj = $.parseJSON(data.data);
						if ( CustomerID == "#customerListadd" ){
						
											$('#customerListadd').html('');
											$('#customerListadd').append('<option value=' + 0+ '>  - Select Customer - </option>');
										
										    $.each(data.result, function( index, value ){
											
											console.log("getCustomers===========data.CustomerID======",value.CustomerID);
											
											$('#customerListadd').append('<option value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
							
						    });
						}
						if( CustomerID == "#customerListEdt"){
			
				
											console.log("getCustomers==========data.data======",CId);
				
											$.each(data.result, function( index, value ){
					
											console.log("======this is res=CustomerID== ",CustomerID);
											console.log("======this is res=value.CustomerID== ", value.CustomerID);
											
											if(CId==value.CustomerID){
												
												$('#customerListEdt').append('<option selected value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
												
											}else{
												$('#customerListEdt').append('<option value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
											}
												
											
					
											});
						}
		

				});
	
		} //end of get Customer list


//get product list
		function getProductList(){

			var i = 0;
					console.log("------getProductList----------");
					
	
					$.get(url+"getProducts", function( data ) { //from API list
		
					
					console.log("--getProductList----data----------",data);
					console.log("--getProductList----data.result----------",data.result);
					console.log("--getProductList----data.result.Name----------",data.result[0].ProdId);
					
					tableData.destroy();
       
					$('#productList.tbody').empty();
		
					var editIcon = function ( data, type, row ) {
				 
			        if ( type === 'display' ) {
			            
			        return '<span class="fa fa-edit sordrEdit" Pid='+data.ProdId+'></span>';
			        
			        }
			        
			        return data;
					};
			    
					var deleteIcon = function ( data, type, row ) {
					
						
						
						console.log("prod res-data data data---",data);
						console.log("prod res-data data data---",data.IsDeleted);
						
					if ( type === 'display' ) { 
		            
						if(data.IsDeleted == 'Y'){
							
							return '<button type="button" class="btn btn-toggle state" data-toggle="button" aria-pressed="false" autocomplete="off" Pid='+data.ProdId+'>'
							+'<div class="handle"></div>'
							+'</button>';
							
						}
						if(data.IsDeleted == 'N'){
							return '<button type="button" class="btn btn-toggle active state" data-toggle="button" aria-pressed="false" autocomplete="off" Pid='+data.ProdId+'>'
							+'<div class="handle"></div>'
							+'</button>';
						}
						
					}
					i++;
					return data;
					};
			
					var table = $('#productList').DataTable( {
				
					dom: 'Blfrtip',   
					buttons: ['excel', 'print'],
						        
				 	 destroy: true,
    				 data: data.result,
    				 rowId: 'ProdId',
    				 "initComplete": function(settings, json) {
					 //   makeProgressHidden();
					  },
    				 
    				 columns: [
    				    /*{ "data": "ProdId" },*/
    				    { "data": "Name" },
    		            { "data": "CatCode" },
    		            { "data": "Desc" },
    		            { "data": "CustName" },
    		           /* { "data": "ProdUnitPrice" },*/
    		            { "data": editIcon },
    		            { "data": deleteIcon },
    		          //  { "data": assign },
    				 
    				 ],
    				 "columnDefs": 
					 [	
		               {
		                    "targets": [ 4 ],
		                    "orderable": false
		                },
		                {
		                    "targets": [ 5 ],
		                    "orderable": false
		                }
		            ],
    				 "order": [[0, 'desc']],
		    } );
			
			
		//}
	});
	}//get product list


		
		
//functio on edit click
		$(document).on("click", ".sordrEdit", function(){
			
					$("#editPopupScreen").modal("show");
			
					$("#customerListEdt").attr("disabled", true);
			
					
					
					console.log("-----sordrEdit----------Pid----------", $(this).parent().parent());
					console.log("-----sordrEdit----------Pid----------", $(this).parent().parent().attr("id"));
					
			
					$("#productErrEdit").empty();
					
					id = $(this).attr("Pid");
					console.log("-----sordrEdit----------Pid----------",id);
			
					$.ajax({

								type: 'get',
								url: url+"getProductDetail/"+id,  //from API on click of edit icon
								data : JSON.stringify(id),
								contentType: "application/json",
				
								success: function(result) {
									
								console.log("getProductDetail--Information result===",result);
								
								var CtrObj = $.parseJSON(result.data);
								console.log("getProductDetail--Information result=CtrObj==",CtrObj[0]);
								console.log("getProductDetail--Information result=CtrObj ==",CtrObj[0].Name);
								
								$("#productPartNoEdit").val(CtrObj[0].Name);
								$("#productDescEdit").val(CtrObj[0].Desc);
								$("#productCatEdit").val(CtrObj[0].CatCode);
								$("#productTypeEdt").val(CtrObj[0].ProductType);
								//$("#customerListedt").val(CtrObj[0].CustomerId);
								getCustomersList("#customerListEdt",CtrObj[0].CustomerId);
					
								}
				});
				
				
		}); 

//function on edit click

		

		//function for active/ inactive		
		function changeUserState(){
				
			 console.log("hiiiiiiiiiiiiiiiiiii------changeState---------------");
			 
			 $(document).on("click", ".state", function(e){
					 
					console.log("------------Pid--------",$(this).attr("Pid"));
				 
				      var isChecked = $(this).attr("aria-pressed");
				      console.log('isChecked: ' + isChecked); 
				      
				      var dataVal = {
		    		  			"id":$(this).attr("Pid"),
		    		  			"authKey":localStorage.getItem("authkey")
		   	    	   		}
				      
				      if(isChecked == "false") {
				    	  
				    	  console.log('hhhrhrhrhrhrhrhr---hhhrhrhrhrhrhrhr--: '); 
				    	  $.ajax({

						        type: 'PUT',
								url: url+"inactivateProduct",  //from API on click of edit icon
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
								url: url+"activateProduct",  //from API on click of edit icon
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
		
