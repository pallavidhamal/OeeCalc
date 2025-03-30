
		var tableData = $('#completeJoblist').DataTable();
	
		$(document).ready(function(){
			
			console.log("-----aaaaaaaaaaaaaaaaaa--111");
			 getlist();
			
			 
		});
	
		function getlist(){
			
				var i = 0;
					console.log("------completeJoblist----------");
					$('#progressBarFull').show();
	
					$.get(url+"getCustHReportList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					console.log("--getCustHReportList----data----------",data);
					console.log("--getCustHReportList----data.result----------",data.result);
					
					
					tableData.destroy();
       
					$('#completeJoblist.tbody').empty();
		
						
					var actionIcon = function ( data, type, row ) {
					
					//	console.log("--getCustHReportList---------",data.id);

										
						var test=data.id;
			    		
					    var res = parseInt(test)-parseInt(1);
					if ( type === 'display' ) {
						
					return '  <td><input type="button" class="table-input-btn cust-btn-style" value="View Details" data-toggle="modal" data-target="#showdetails" id="showdetailsbtn" idval="'+data.id+'">'+
					'<input type="button" class="table-input-btn cust-btn-style custom_style_btn" id="generatePdfAction" value="Create ATP" idval="'+data.id+'"  CustomerName="'+data.CustomerName+'" ProductName="'+data.ProductName+'">'+
		    		'<a data-auto-download href="../ProApp/GeneratePDF/ATP'+res+'.pdf" class="table-input-btn cust-btn-style custom_style_btn action-a" download>Download ATP </a></td>';						

					
//					'<input type="button" class="table-input-btn cust-btn-style" value="Download ATP" ></td>';
						
					}
					return data;
					};
					i++;
					tableData = $('#completeJoblist').DataTable( {
						
						 dom: 'Blfrtip',   
						 buttons: ['excel','print'],
					 	 destroy: true,
	    				 data: data.result,
	    				 "initComplete": function(settings, json) {
						  },
	    				 
						  columns: [
		    				    { "data": "JobId" },
		    				    { "data": "CustomerName" },
		    		            { "data": "ProductName" },
		    		         /*   { "data": "SI" },*/
		    		            { "data": "Region" },
		    		            { "data": "Site" },
		    		            { "data": "Location" },
		    		            { "data": "Stages" },
		    		            { "data": "Remark" },
		    		            { "data": "Status" },
		    		            { "data": actionIcon },
		    				 
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
					
					$('#progressBarFull').hide();
			
	});
					
					
	}
		
		
		
$(document).on("click", "#generatePdfAction", function(e){
			
			
			var dataVal;
			$('#progressBarFull').show();

					console.log("--------click on generatePdfAction-------");
					console.log("--------click on generatePdfAction-------",url);
					var id = tableData.row($(this).parent().parent()).id();
					
					var pdfid=$(this).attr("idval");
					
					var ProductName= $(this).attr("ProductName");
					
					var CustomerName= $(this).attr("CustomerName");
					
					
					console.log(pdfid);
					console.log(ProductName);
					console.log(CustomerName);
				
					
					$.ajax({
						
						type: 'GET',
						url : url+"generatePdfAction",  //from API update data
						//data : JSON.stringify(dataVal),
						data : {pdfid,ProductName,CustomerName},
						//contentType: "application/json",
			    
						success: function(result) {
			    	
						console.log("Update--Information cancelRecord==="+result);
						$('#progressBarFull').hide();

						if(result.result==true){
							
							getList();  
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
						//$("#editPopupScreen").modal('hide');
						}
					});
			
		});		
		
		
		
		
		
		
		
	/*	

function getlist(){

				 
			 console.log("--getlist---------");
			$.get(url+"getcompletejobReport/", function( data1 ) { 
				
				console.log("completeJobSubmit=data==",data1);
				
				
				console.log("-- completeJobSubmit=data.result==",data1.result);
				
				tableData.destroy();
			       
				$('#completeJoblist.tbody').empty();
	
				
				var details = function ( data1, type, row ) {
					
					console.log("-- completeJobSubmit=idididid==",data1.id);
					
					if ( type === 'display' ) {
		            
					return '  <td><input type="button" class="table-input-btn cust-btn-style" value="Details" data-toggle="modal" data-target="#showdetails" id="showdetailsbtn" ></td>';
					
					}
					return details;
				};
				
				tableData = $('#completeJoblist').DataTable( {
							
							 dom: 'Blfrtip',   
							 buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
						 	 destroy: true,
		    				 data: data1.result,
		    				 "initComplete": function(settings, json) {
							  },
		    				 
							  columns: [
			    				    { "data": "JobId" },
			    				    { "data": "CustomerName" },
			    		            { "data": "ProductName" },
			    		            { "data": "SI" },
			    		            { "data": "Company" },
			    		            { "data": "Site" },
			    		            { "data": "Location" },
			    		            { "data": "Stages" },
			    		            { "data": "Remark" },
			    		            { "data": "Status" },
			    		            { "data": details },
			    				 
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
	
}
*/
$(document).on("click", "#showdetailsbtn", function(e){
	
	var id = tableData.row($(this).parent().parent()).id();
	
	console.log("-id id id --", $(this).attr("idval"));
	
	
	$.get(url+"getCompleteJobDetails/"+$(this).attr("idval"), function( data1 ) {
		
		console.log("-showdetailsbtn result---",data1);
			
			console.log("-showdetailsbtn result---",data1.result);
			
			
			//var CtrObj = $.parseJSON(data1.result);
			
			
			$('#completeJobata').empty();
			
			$.each(data1.result, function(key,val) {
				console.log("-showdetailsbtn val.TaskName---",val.TaskName);
				
					 $('#completeJobata').append('<tr>'
							    +'<td >'+val.TaskName +'</td>'
							    +' <td>'+val.TaskCompletionDate +'</td>'
							    +'</tr>');
					 
		});
		
	});

});

