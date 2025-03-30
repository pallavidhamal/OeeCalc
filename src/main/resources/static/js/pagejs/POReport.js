
		console.log("-------------------Welcome to project page------------------");
		//var tableData = $('#purchaseOrderList').DataTable();
		var JobId;
	
		$(document).ready(function(){
			
			getPOList();
			
			getClosedPOList();
			
			
			
		});
		
		
//get  list
		function getPOList(){
				
					var prev="", curr="" , alldiv="", remain;
					
					$.get(url+"getPOReportData/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					console.log("--getPOReportData----data---",data);
						
					var CtrObj = $.parseJSON(data.data);
					
					console.log("--getPOReportData----CtrObj-11--",CtrObj);
					
					if (data.result == "success"){

						$.each( CtrObj, function( index, value ){
							
							//console.log("--getPOReportData----RegionName---",value.RegionName);
							//console.log("--getPMsummary----RegionId---",value.RegionId);
								{
								curr = value.RegionName;
								if(curr==prev){
																
										$("#poData"+value.RegionId).append(' <thead><tr><td>'+value.PO_Number+'</td><td>'+value.LineId+'</td><td>'+value.PO_Date+'</td><td>'+value.CustName+'</td><td>'+value.Name+'</td><td>'+value.RegionName+'</td>'+
								    		'<td>'+value.CatalogId+'</td><td>'+value.Description+'</td><td>'+value.Balace_Qty+'</td><td>'+value.Completed+'</td><td>'+value.Pending+'</td><td>'+value.WIP+'</td><td>'+value.NotYetstarted+'</td></tr>   </thead>');
								
								}else{
									
									console.log("--else value.RegionName 111-",value.RegionName);
									var poc = "poData"+value.RegionId;
									console.log("--else value.RegionName-poc 111",poc);
									
									console.log("--else value.RegionName-",value.RegionName);
									    $("#poReportData").append('<div class="panel panel-default"><div class="panel-heading pointer_cursor"  data-toggle="collapse" data-parent="#accordion" href="#collapse'+index+'">'+
								    		'<h4 class="panel-title"><a>'+value.RegionName+'</a></h4></div>'+
								    		'<div id="collapse'+index+'" class="panel-collapse collapse"><div class="panel-body">'+
								    		'<table class="table table-bordered table-striped table-hover table-responsive" id="'+poc+'" ><thead><tr class="orange"><th>PO Number</th><th>Line Id</th>'+
						                    '<th>PO date</th><th>Customer</th><th>Product</th><th>RegionName</th><th>Catalog code</th><th>Decription</th><th>Balance Qty.</th><th>Completed</th><th>Pending</th>'+
								    		'<th>WIP</th><th>Not Yet Started</th></tr><tr><td>'+value.PO_Number+'</td><td>'+value.LineId+'</td><td>'+value.PO_Date+'</td><td>'+value.CustName+'</td><td>'+value.Name+'</td><td>'+value.RegionName+'</td>'+
								    		'<td>'+value.CatalogId+'</td><td>'+value.Description+'</td><td>'+value.Balace_Qty+'</td><td>'+value.Completed+'</td><td>'+value.Pending+'</td><td>'+value.WIP+'</td><td>'+value.NotYetstarted+'</td></tr>   </thead><tbody></tbody ></table></div></div></div>');
						     
									    
								}
							}
							prev=curr;
						});
						
					}else{
						
					$("#poReportData").append('<div class="row">No Data Found</div>');
					}
					
	});
	}
		
		function getClosedPOList(){
			
			var prev="", curr="" , alldiv="", remain;
			var i = 1;
			$.get(url+"getClosedPOReportData/"+localStorage.getItem("userId"), function( data ) { //from API list

			console.log("--getClosedPOReportData----data---",data);
				
			var CtrObj = $.parseJSON(data.data);
			
			console.log("--getClosedPOReportData----CtrObj---",CtrObj);
			
			if (data.result == "success"){

				$.each( CtrObj, function( index1, value ){
					
					//console.log("--getPOReportData----RegionName---",value.RegionName);
					//console.log("--getPMsummary----RegionId---",value.RegionId);
						{
						curr = value.RegionName;
						if(curr==prev){
														
								$("#poData"+value.RegionId).append(' <thead><tr><td>'+value.PO_Number+'</td><td>'+value.LineId+'</td><td>'+value.PO_Date+'</td><td>'+value.CustName+'</td><td>'+value.Name+'</td><td>'+value.RegionName+'</td>'+
						    		'<td>'+value.CatalogId+'</td><td>'+value.Description+'</td><td>'+value.Balace_Qty+'</td><td>'+value.Pending+'</td><td>'+value.Completed+'</td><td>'+value.WIP+'</td><td>'+value.NotYetstarted+'</td></tr> </thead>');
						
						}else{
							
							console.log("--else value.RegionName-",value.RegionName);
							var poc = "poData"+value.RegionId;
							console.log("--else value.RegionName-poc",poc);
							
							console.log("--else value.RegionName-----",value.RegionName);
							  
							$("#closedpoReportData").append(' <div class="panel-heading pointer_cursor"  data-toggle="collapse" data-parent="#accordion1" href="#collapse'+i+'2">'+
						    		'<h4 class="panel-title"><a>'+value.RegionName+'</a></h4></div>'+
						    		'<div id="collapse'+i+'2" class="panel-collapse collapse "><div class="panel-body"><div class="col-md-12"><table class="table table-striped table-responsive table-bordered" id="'+poc+'">'+
									'<thead><tr><th>PO Number</th><th>Line Id</th><th>PO date</th><th>Customer</th><th>Product</th><th>RegionName</th><th>Catalog code</th><th>Decription</th><th>Balance Qty.</th>'+
									'<th>Completed</th><th>Pending</th><th>WIP</th><th>Not Yet Started</th></thead><tr><tbody><tr><td>'+value.PO_Number+'</td><td>'+value.LineId+'</td><td>'+value.PO_Date+'</td><td>'+value.CustName+'</td><td>'+value.Name+'</td><td>'+value.RegionName+'</td>'+
						    		'<td>'+value.CatalogId+'</td><td>'+value.Description+'</td><td>'+value.Balace_Qty+'</td><td>'+value.Completed+'</td><td>'+value.Pending+'</td><td>'+value.WIP+'</td><td>'+value.NotYetstarted+'</td></tr></tbody></table></div></div></div>'  );
									
							      
							    
						}
					}
					prev=curr; i++;
				});
				
			}else{
				
			$("#closedpoReportData").append('<div class="row">No Data Found</div>');
			}
			
});
}
		

		
