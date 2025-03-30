
var i = 0;
var CustomerID ="";
var tableData = $('#custMasterTable').DataTable();

$(document).ready(function() 
			{

					
					
					getCustomersList(); //function call for get customer list

					changeState(); //function call for active/ inactive
					
//function Add modal
	$("#customerAddAction").bind("click",function(){
					
				console.log("customer add button clicked .");	
				emptyAllFieldofAdd();
				$("#addErr").empty();
										
	});	
//function Add modal	

	
//function on click Edit modal
	$(document).on("click", "#editIconComment", function(e){
				
				console.log("Edited this CustomerID deatils :");
				
				CustomerID = $(this).parent().attr("CustomerID");
				
				$.ajax({

						type: 'GET',
						url: url+"getCustomerDetail/"+CustomerID,  //from API on click of edit icon
						data : JSON.stringify(CustomerID),
						contentType: "application/json",
	
						success: function(result) {
						
						console.log("getCustomerDetail--Information result===",result);
						var CtrObj = $.parseJSON(result.data);
						console.log("getRegionDetail--Information result=CtrObj==",CtrObj[0]);
						console.log("getRegionDetail--Information result=CtrObj RegionName==",CtrObj[0].CustName);
						
						$("#nameedit").val(CtrObj[0].CustName);
						
						}
					});
				
				callEditRemoveClassFunction($("#nameedit"));
				
				$("#editErr").empty();
				
				$("#editPopupScreen").modal('show');
				 
	});
//function on click Edit modal

//function update data
	$(document).on("click", "#EditCustomer", function(e){
			  		
					console.log("current CustomerID---"+CustomerID);

					if(NotAllowedNullVal("#editErr","Customer Name",$('#nameedit')))
					//	if(AllowedOnlyAlphabetsVal("#editErr","Customer Name",$('#nameedit')))
					{
					
					var dataVal = { 
			    	
					"customerId":CustomerID,
			    	"customerName":$("#nameedit").val(),
			    	"authKey":localStorage.getItem("authkey")
			    					}
					$.ajax({
						
							type: 'PUT',
						    url: url+"updateCustomer",  //from API add new data
						    data : JSON.stringify(dataVal),
						    contentType: "application/json",
						    
						    success: function(result) {
						    	
							console.log("update--Customer result==="+result);
							
							if(result.result==true){
								
								getCustomersList();
								$("#editPopupScreen").modal('hide');
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
							
						    }
					});
			     
		   }
	});
//function update data
	

	function emptyAllFieldofAdd(){
	
					callAddRemoveClassFunction($('#nameadd'));
					callAddRemoveClassFunction($('#placeadd'));
					
							
					$('#addErr').empty();	
	}
	
	
//function Add click
		$("#AddCustomerMaster").bind("click",function() {
	
					if(NotAllowedNullVal("#addErr","Customer Name",$('#nameadd')))
					//if(AllowedOnlyAlphabetsVal("#addErr","Customer Name",$('#nameadd')))
					{
					
					var dataVal = {
		    		
					"customerName":$("#nameadd").val(),
					"authKey":localStorage.getItem("authkey")
					}	
					
					console.log("AddCustomerMaster==========dataVal=====",dataVal);
			
					$.ajax({
				
							type: 'POST',
						    url: url+"insertCustomer",  //from API add new data
						    data : JSON.stringify(dataVal),
						    contentType: "application/json",
						    
						    success: function(result) {
						    	
							console.log("insert--insertCustomer result==="+result);
							
							console.log("insert--insertCustomer result==="+result.result);
							console.log("insert--insertCustomer result=message=="+result.message);
							
							if(result.result==true){
								
								getCustomersList();
								$("#add_customer").modal('hide');
								
							}else if(result.result==false){
								
								
								console.log("insert--insertCustomer result=message=="+result.message);
								
								window.location.href = "sessionOut";
								
							}
							
					
						    }
					});
			
					}
									
				});
			});
//function Add click	


//get getUsers List
function getCustomersList(){

	var i = 0;
	console.log("------getCustomers----------");
	
	$.get(url+"getCustomers", function( data ) { //from API list

	
	console.log("--getCustomers----data----------",data);
	console.log("--getCustomers----data.result----------",data.result);
	
	tableData.destroy();

	$('#custMasterTable.tbody').empty();

	
	var editIcon = function ( data, type, row ) {
		 
        if ( type === 'display' ) {
            
        return '<td>'
		+'<a href="" data-toggle="modal" CustomerID='+data.CustomerID+'>'
		+'<span title="Edit" class="fa fa-edit" id="editIconComment"></span>'
		+'</a>'
		+'</td>';
        
        }
        
        return data;
		};
	

	var stateIcon = function ( data, type, row ) {
		i=i+1;
		
		console.log("prod res-data data data---",data);
		console.log("prod res-data data data---",data.IsDeleted);
		
	if ( type === 'display' ) {
   	    
		if(data.IsDeleted == 'Y'){
			
			return '<button type="button" class="btn btn-toggle state" data-toggle="button" aria-pressed="false" autocomplete="off"  CustomerID='+data.CustomerID+'>'
			+'<div class="handle"></div>'
			+'</button>';
			
		}
		if(data.IsDeleted == 'N'){
			return '<button type="button" class="btn btn-toggle active state" data-toggle="button" aria-pressed="false" autocomplete="off"  CustomerID='+data.CustomerID+'>'
			+'<div class="handle"></div>'
			+'</button>';
		}	
		
		
	}
	return data;
	};
	
	

	var table = $('#custMasterTable').DataTable( {

	dom: 'Blfrtip',   
	buttons: ['excel', 'print'],
 	 destroy: true,
	 data: data.result,
	 rowId: 'EmpId',
	 "initComplete": function(settings, json) {
	 //   makeProgressHidden();
	  },
	 
	  columns: [
		  	{ "data": "Cust_Name" },
		    { "data": editIcon },
		    { "data": stateIcon },
		 
		 ],
		 "columnDefs": 
		 [	
           {
                "targets": [ 1 ],
                "orderable": false
            },
            {
                "targets": [ 1 ],
                "orderable": false
            }
        ],
		 "order": [[0, 'desc']],

    } );
	

});
}//get user list



//function for get all customer list
//	function getCustomersList(){
				
/*		$.get(url+"getCustomers", function( data ) { 
				tableData.destroy();
				
				$('#custMasterTable.tbody').empty();
				
				var editIcon = function ( data, type, row ) {
					 
			        if ( type === 'display' ) {
			            
			        return '<td>'
					+'<a href="" data-toggle="modal" TaskId='+data.CustomerID+'>'
					+'<span title="Edit" class="fa fa-edit" id="editIconComment"></span>'
					+'</a>'
					+'</td>';
			        
			        }
			        
			        return data;
					};
					
					var stateIcon = function ( data, type, row ) {
						i=i+1;
						
						
						console.log("cust res-data data data---",data);
						console.log("cust res-data data data---",data.IsDeleted);
						
					if ( type === 'display' ) {
		           	    
						if(data.IsDeleted == 'Y'){
							
							return '<button type="button" class="btn btn-toggle state" data-toggle="button" aria-pressed="false" autocomplete="off" CustomerIDthis='+data.CustomerID+'>'
							+'<div class="handle"></div>'
							+'</button>';
							
						}
						if(data.IsDeleted == 'N'){
							return '<button type="button" class="btn btn-toggle active state" data-toggle="button" aria-pressed="false" autocomplete="off"  CustomerIDthis='+data.CustomerID+'>'
							+'<div class="handle"></div>'
							+'</button>';
						}	
						
						
					}
					
					return data;
					};
					var table = $('#custMasterTable').DataTable( {
						
						dom: 'Blfrtip',   
						buttons: ['excel', 'print'],
					 	 destroy: true,
						 data: data.result,
						 "initComplete": function(settings, json) {
						 //   makeProgressHidden();
						  },
						 
						  columns: [
							    { "data": "Cust_Name" },
							    { "data": editIcon },
					            { "data": stateIcon },
							 ],
							 "columnDefs": 
							 [	
				               {
				                    "targets": [ 1 ],
				                    "orderable": false
				                },
				                {
				                    "targets": [ 1 ],
				                    "orderable": false
				                }
				            ],
							 "order": [[0, 'desc']],

					    } );
		});*/
		/*		$('#customerListData').empty();
				
				$.get(url+"getCustomers", function( data ) { //from API list
				
				console.log("getCustomers===========data=======",data);
				console.log("getCustomers===========data=data======",data.data);
					
				var CtrObj = $.parseJSON(data.data);
					
				$.each(CtrObj, function(key,val) {
				
				CustomerID = val.CustomerID;
					
				$('#customerListData').append('<tr><td>'+val.Cust_Name+'</td>'							
													+'<td>'
													+'<a href="" data-toggle="modal" CustomerID='+val.CustomerID+'>'
													+'<span title="Edit" class="fa fa-edit editIconComment"></span>'
													+'</a>'
													+'</td>'
													+' <td><label class="switch">'
													+'<input class="switch-input" type="checkbox" />'
													+'<span class="switch-label" data-on="Active" data-off="Inactive"></span>'
													+'<span class="switch-handle"></span>'
													+' <div class="slider round">'
													+'<span class="on text-left" id="togOn" [style.display]="onDemandSettingsParam.LoginScreenParam.Login == 1 ? "block" : "none"">Show</span> <span class="off text-left" id="togOff" [style.display]="onDemandSettingsParam.LoginScreenParam.Login == 0 ? "block" : "none"">Hide</span> '
													+' </div>'
													+'</label></td>'
													+'</tr>');	
				});
				});*/
	//}
//function for get all customer list


	
	//function for active/ inactive		
	function changeState(){
			
		 $(document).on("click", ".state", function(e){
				 
				  console.log("hiiiiiiiiiiiiiiiiiii-1111111------------",$(this).attr("CustomerID"));
			      var isChecked = $(this).attr("aria-pressed");
			      console.log('isChecked state: ' + isChecked); 
			      
			       
			      var dataVal = {
			    
			      "customerId":$(this).attr("CustomerID"),
			      "authKey":localStorage.getItem("authkey")
			      
			   	   } 
			   	   if(isChecked == "false") {
			    	  
			    	  console.log('hhhrhrhrhrhrhrhr---hhhrhrhrhrhrhrhr--: '); 
			    	  $.ajax({

					        type: 'PUT',
							url: url+"inactivateCustomer",  //from API on click of edit icon
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
							url: url+"activateCustomer",  //from API on click of edit icon
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

