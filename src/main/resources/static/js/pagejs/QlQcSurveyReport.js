
		var tableData = $('#completeJoblist').DataTable();
	
		$(document).ready(function(){
			
			console.log("-----aaaaaaaaaaaaaaaaaa--111");
			
			generateCustomerList();
			
			 var dateFrom = GetURLParameter('dateFrom');
			 var dateTo = GetURLParameter('dateTo');
			 var custId = GetURLParameter('custId');

			 
			 console.log("dateFrom----",dateFrom);
			 console.log("dateTo----",dateTo);
			 
			
			 var dataVal = {
				     "dateFrom"	:dateFrom,
				     "dateTo"	:dateTo,
				     "customerId":custId
			    	}	
			
			 getlist(dataVal);
			
			 
		});
		
		
		
		function generateCustomerList(){
			

			$('#custListQc').empty();
			
			$.get(url+"getCustomers", function( data ) { //from API list
				
			console.log("---------------data.result----------",data.result);
			
			$('#custListQc').append('<option value=' + 0+ '> -- Select Customer Name -- </option>');
			
				
				$.each(data.result, function(key,val) {
					
					console.log("-------------val.EmpId--------",val.CustomerID);
					
					console.log("-------------val.EmpId--------",val.Cust_Name);
						
				$("#custListQc").append('<option value='+val.CustomerID+'>'+val.Cust_Name+'</option>');
				
						
				});
						
		});
		
}
		
		
		function GetURLParameter(sParam)
		{
		    var sPageURL = window.location.search.substring(1);
		    var sURLVariables = sPageURL.split('&');
		    for (var i = 0; i < sURLVariables.length; i++)
		    {
		        var sParameterName = sURLVariables[i].split('=');
		        if (sParameterName[0] == sParam)
		        {
		            return decodeURIComponent(sParameterName[1]);
		        }
		    }
		}
	
		function getlist(dataVal){
			
				var i = 0;
					console.log("------completeJoblist----------");
	
					
					 $.ajax({
							
							type: 'POST',
							url: url+"getQcReport",  //from API update data
							data : JSON.stringify(dataVal),
							contentType: "application/json",
				    
							success: function(data) {
					
								
								console.log("--herehere----ididid----------",data);
								console.log("--herehere----ididid----------",data.result);


								console.log("--herehere----ididid----------",data.result.filepath);
								
								
								$.each(data.result, function(key,val) {
									
								console.log("-------------val.EmpId--------",val.filepath);

								$("#SurveyTr").append('<a data-auto-download href="../ProApp/QcSurvey/'+val.filepath+'" class="table-input-btn cust-btn-style complete_job_cust_btn" download>Download Report </a>');

								
							//	<a data-auto-download="" href="../ProApp/GeneratePDF/ATP100.pdf" class="table-input-btn cust-btn-style complete_job_cust_btn" download="">Download APT </a>
								
							//	$("#SurveyTr").append('<a data-auto-download="" href="../ProApp/QcSurvey/"'+val.filepath+' class="table-input-btn cust-btn-style complete_job_cust_btn" id="QcRepDownload" download="">Download QCSurvey Report </a>');
							    
							//    console.log("file download"+)	
										
								});
								
					/*
					tableData.destroy();
       
					$('#completeJoblist.tbody').empty();
		
						
					var actionIcon = function ( data, type, row ) {
					
						console.log("--herehere----ididid----------",data.filepath);
						
						console.log("--herehere----CustomerName----------",data.filepath);
						
						console.log("--herehere----ProductName----------",data.filepath);
						
						
						var test=data.id;
						
						console.log(test);
						
					if ( type === 'display' ) {
					
					return '  <td><input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" value="View Details" data-toggle="modal" '+
					' data-target="#showdetails" id="showdetailsbtn" idval="'+data.id+'">'+
					'<a data-auto-download href="../ProApp/GeneratePDF/ATP'+test+'.pdf" class="table-input-btn cust-btn-style complete_job_cust_btn" download>Download APT </a>'+
					'<input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" id="generatePdfAction"  value="Create ATP" idval="'+data.id+'" CustomerName="'+data.CustomerName+'" ProductName="'+data.ProductName+'" ></td>';
					
					
						
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
		    				    { "data": "PO_Number" },
		    				    { "data": "LineId" },
		    				    { "data": "CustomerName" },
		    		            { "data": "ProductName" },
		    		            { "data": "SI" },
		    		            { "data": "Company" },
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
			                    "targets": [ 8 ],
			                    "orderable": false
			                },
			                {
			                    "targets": [ 9 ],
			                    "orderable": false
			                }
			            ],
	    				 "order": [[0, 'desc']],
			    } );   */
							
			}
	});
	}
		
		
		
		$("#myHref").on('click', function() {
			  alert("inside onclick");
			  href = "file:///C:/PDFGenerate/NPT.pdf";
			});
		
		
		
		$(document).on("click", "#QcSurveySubmit", function(e){
			
			
			console.log("--------click on QcSurveySubmit-------");
			
				if(NotAllowedNullVal("#reportErrQc","From date ",$('#dateFrmQc')))
					if(NotAllowedNullVal("#reportErrQc","To date ",$('#dateToQc'))){
			
			
						window.location.href = "QlQcSurvey?dateFrom="+$("#dateFrmQc").val()+"&dateTo="+$("#dateToQc").val()+"&custId="+$("#custListQc").val();
					}
			 
			});
		
		
		
		
		
		$(document).on("click", "#generatePdfAction", function(e){
			var dataVal;
			
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

