
		console.log("-------------------Welcome to project page------------------");
		var tableData = $('#purchaseOrderList').DataTable();
		var JobId;
	
		$(document).ready(function(){
			
			getList();
			
			
			
		});
		
		
//get  list
		function getList(){
				
					var prev="", curr="",  alldiv="", remain;
					var i = 0;
					
					$.get(url+"getPMsummary/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					var CtrObj = $.parseJSON(data.data);
					
					
					if (data.result == "success"){

						$.each( CtrObj, function( index, value ){
							
							
								{
								curr = value.RegionName;
								
								console.log(prev,"--test-",curr);
								
								
								var sidata = "sidata"+value.RegionName;
								
								if(prev==curr){
									console.log("append  "+value.Emp_Name);
									//console.log(curr,"--fourth-",prev);
									
									$("#"+sidata).append('<div class="panel-heading"  data-toggle="collapse" data-parent="#accordion" href="#collapse'+index+'">'+
											'<h4 class="panel-title"> <a>'+value.Emp_Name+'</a></h4></div><div id="collapse'+index+'" class="panel-collapse collapse">'+
											'<div class="panel-body"><div class="full-wd"><div class="wd33"><p>Assigned</p></div><div class="wd33"><p>WIP</p></div>'+
											'<div class="wd33"><p>Task to start</p></div></div><div class="full-wd">'+
											'<div class="wd33"><p data-target="#unassModal"  data-toggle="modal" class="pointer_cursor unassModal1" sival="'+value.SI+'" regval="'+value.RegionId+'">'+value.Unassigned+'</p></div>'+
											'<div class="wd33"><p data-target="#wipModal" data-toggle="modal" class="pointer_cursor wipModal1" sival="'+value.SI+'" regval="'+value.RegionId+'">'+value.WIP+'</p></div>'+
											'<div class="wd33"><p data-target="#taskStrtModal"  data-toggle="modal" class="pointer_cursor taskModal1" sival="'+value.SI+'" regval="'+value.RegionId+'">'+value.TaskTOStart+'</p></div></div></div></div></div></div>');
									
								}else
									{
									
									console.log("new  "+value.Emp_Name);
									
									
									alldiv = '<div class="col-md-4" id='+value.RegionName+'><div class="block-hdr"><h2>'+value.RegionName+'</h2></div><div class="block-cont-wrap"><div class="panel-group" id="accordion">'+
								    '<div class="panel panel-default" id = '+sidata+'><div class="panel-heading"  data-toggle="collapse" data-parent="#accordion" href="#collapse'+index+'">'+
								    '<h4 class="panel-title"><a>'+value.Emp_Name+'</a></h4></div><div id="collapse'+index+'" class="panel-collapse collapse"><div class="panel-body"><div class="full-wd">'+
									'<div class="wd33"><p>Assigned</p></div><div class="wd33"><p>WIP</p></div><div class="wd33"><p>Task to start</p></div></div><div class="full-wd">'+
									'<div class="wd33"><p data-target="#unassModal"  data-toggle="modal" class="pointer_cursor unassModal1" sival="'+value.SI+'" regval="'+value.RegionId+'">'+value.Unassigned+'</p></div>'+
									'<div class="wd33"><p data-target="#wipModal"  data-toggle="modal" class="pointer_cursor wipModal1" sival="'+value.SI+'" regval="'+value.RegionId+'">'+value.WIP+'</p></div>'+
									'<div class="wd33"><p data-target="#taskStrtModal"  data-toggle="modal" class="pointer_cursor taskModal1" sival="'+value.SI+'" regval="'+value.RegionId+'">'+value.TaskTOStart+'</p></div></div></div></div></div></div>';
								      
									
									
									if(i==2){
										
										$("#summaryData").append('<div class="row">'+alldiv+'</div>');
										
										i=0;
									}else{
										$("#summaryData").append(alldiv);
										
									}
									prev=curr;
								}
								
								
							}
							
									
							i++;
							
						});
					}else{
						
						$("#summaryData").append('<div class="row">No Data Found</div>');
					}
					
					
					tableData.destroy();
       
					$('#purchaseOrderList.tbody').empty();
		
					var editIcon = function ( data, type, row ) {
				 
						//console.log("--getProductList---here-------",data.id);
						
			        if ( type === 'display' ) {
			        	console.log("--getProductList---here--data.Remark-----",data.Remark);
			        	
			        	i = i + 1;
			        return '<td><input type="text" class="table-input-item" placeholder="EnterRemark" id = "remark'+i+'" value="'+data.Remark+'"><input type="button" placeholder="Enter your Remark" class="table-input-btn updateRemark" value="Update" JobId='+data.id+' cnt = '+i+'> </td>';
			        
			        }
			        
			        return data;
					};
			    
					
					var deleteIcon = function ( data, type, row ) {
					
					if ( type === 'display' ) {
		            
					return '  <td><input type="button" class="table-input-cl cancelRecord" value="Cancel" JobId='+data.id+'></td>';
		        
					}
					
					return data;
					};
					i++;
					var table = $('#purchaseOrderList').DataTable( {
				
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
$(document).on("click", ".wipModal1", function(e){
			
			console.log("--------click on wipModal sid--------",$(this).attr("sival"));
			console.log("--------click on wipModal regd--------",$(this).attr("regval"));
			
			var dataVal 	= {
					  "siId"	: $(this).attr("sival"),
					  "id"		:localStorage.getItem("userId"),
					  "regionId":$(this).attr("regval"),
					  "currentStatus":"16"
				 }
			
			$("#wipModal").modal("show");
			 
			getWIPDetails(dataVal,"#wipData");
			

		
});

$(document).on("click", ".unassModal1", function(e){
	
	console.log("--------click on wipModal sid--------",$(this).attr("sival"));
	console.log("--------click on wipModal regd--------",$(this).attr("regval"));
	
	var dataVal 	= {
			  "siId"	: $(this).attr("sival"),
			  "id"		:localStorage.getItem("userId"),
			  "regionId":$(this).attr("regval"),
			  "currentStatus":"3,4,7,9"
		 }
	
	$("#unassModal").modal("show");
	 
	getWIPDetails(dataVal,"#unassData");
	


});

$(document).on("click", ".taskModal1", function(e){
	
	console.log("--------click on wipModal sid--------",$(this).attr("sival"));
	console.log("--------click on wipModal regd--------",$(this).attr("regval"));
	
	var dataVal 	= {
			  "siId"	: $(this).attr("sival"),
			  "id"		:localStorage.getItem("userId"),
			  "regionId":$(this).attr("regval"),
			  "currentStatus":"5"
		 }
	
	$("#taskStrtModal").modal("show");
	 
	getWIPDetails(dataVal,"#taskStrtData");

});


function getWIPDetails(dataVal,div){
			
			
			$.ajax({

				type	: 'POST',
				url		: url+"getWIPDetails",  //from API on click of edit icon
				data 	: JSON.stringify(dataVal),
			    processData: false,
				contentType: "application/json; charset=utf-8",
				
			
				success: function(result) {
					
					console.log("============sordrEdit=============",result);
					
					console.log("-getWIPDetails result---",result);
					
					console.log("-getWIPDetails result---",result.data);
					
					
					var CtrObj = $.parseJSON(result.data);
					
					console.log("-getWIPDetails result-CtrObj--",CtrObj);
					
					$(div).empty();
					
					var i=0;
					$.each(CtrObj, function(key,val) {
						
							 $(div).append('<tr>'
									    +'<td >'+val.JobId +'</td>'
									    +' <td>'+val.TEname +'</td>'
									    +' <td>'+val.TEAssDate +'</td>'
									    /*+' <td>'+val.ProductName +'</td>'
									    +'<td>'+val.Stages +'</td>'
									    +'<td>'+val.VisitInc +'</td>'*/
									    +'</tr>');
							i++;
					});
					
								
					
					}
				
			});
			

			 console.log("-ClaimDataByInstId-----");
			
			 //commented by pallavi 28-5-19 as thought repeated code.
			 
			 	/*$.get(url+"getWIPDetails/"+localStorage.getItem("userId"), function( result ) {
						
					console.log("-getWIPDetails result---",result);
						
						console.log("-getWIPDetails result---",result.data);
						
						
						var CtrObj = $.parseJSON(result.data);
						
						console.log("-getWIPDetails result-CtrObj--",CtrObj);
						
						$('#wipData').empty();
						
						$.each(CtrObj, function(key,val) {
							
								 $('#wipData').append('<tr>'
										    +'<td >'+val.WIP +'</td>'
										    +' <td>'+val.Emp_Name +'</td>'
										    +' <td>'+val.RegionName +'</td>'
										    +' <td>'+val.ProductName +'</td>'
										    +'<td>'+val.Stages +'</td>'
										    +'<td>'+val.VisitInc +'</td>'
										    +'</tr>');
								 
					});
					
				});*/
}
		
