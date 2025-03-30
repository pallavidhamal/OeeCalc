
		console.log("-------------------Welcome to project page------------------");
		var tableData = $('#pendingApprovalsTable').DataTable();
		var JobId, incID;
		var stageId;
		
		$(document).ready(function(){
			
			getList();
			
			
			
		});
	
		
		function getList(){
			
			var i = 0;
					console.log("------getProductList----------");
	
					$.get(url+"getPendingApproveList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					
					console.log("--getPendingApproveList----data----------",data);
					console.log("--getPendingApproveList----data.result----------",data.result);
					
					
					tableData.destroy();
       
					$('#getPendingApproveList.tbody').empty();
		
					var selectIcon = function ( data, type, row ) {
						i=i+1;
						//console.log("--iiiiiiiiiiiiii-----",i);
						
				        if ( type === 'display' ) {
				        	return ' <td><select class="form-control visitInc cust-select-style" id = "visitInc'+i+'"> '+
				        	' <option value="0">- Select -</option>'+ 
				        	' <option value="Visit">Visit</option>'+ 
				        	' <option value="Inc">Inc</option></select></td>';
				        }
				        return data;
					};
			    
					i++;
					var actionIcon = function ( data, type, row ) {
						
						stageId = data.StageId;
						console.log("--POLineId POLineId POLineId----",data.POLineId);
						//console.log("--Claim Claim Claim Claim----",data.Claim);
						
						var poreleasebtn = '<input type="button" class="table-input-btn2 poReleased my_cust_btn" value="PO Release" id="poReleased" >';
						
						if((data.POLineId == null)||(data.POLineId == "")){
							
							console.log(" POLineId is null");
							var poreleasebtn = '';
							
						}
						
						
					if(data.Claim== "R")    {
				    		
						var btn = '';
						var btn1 = '';
				    		
				    	}else{

				    		var btn = '<input type="button" class="table-input-btn2 Approve my_cust_btn" value="Approve" id="Approve" StageId='+data.StageId+' withVisit='+data.withVisit+' UA_Id='+data.UA_Id+'> ';
				    		var btn1 = '<input type="button" class="table-input-btn-reject Reject my_cust_btn" value="Reject" id ="Reject" withVisit='+data.withVisit+' UA_Id='+data.UA_Id+' data-toggle="modal" data-target="#add_remark"> ';
				    	}
						
					if ( type === 'display' ) {
						
					return '<td><input type="button" class="table-input-btn cust-btn-style my_cust_btn" value="Details" data-toggle="modal" data-target="#checkApprove" id="checkApproveclk" UA_Id='+data.UA_Id+' withVisit='+data.withVisit+' StageId='+data.StageId+'>' +poreleasebtn+' '+
					btn+ ' ' + btn1+ ''+
					' </td>';
		        
					}
					
					return data;
					};
					i++;
					tableData = $('#pendingApprovalsTable').DataTable( {
				
					dom: 'Blfrtip',   
					buttons: ['excel', 'print'],
				 	 destroy: true,
    				 data: data.result,
    				 rowId: 'id',
    				 "initComplete": function(settings, json) {
					  },
    				 
    				 columns: [
    					{ "data": "id" },
    				    { "data": "JobId" },
    				    { "data": "CustomerName" }, 
    		            { "data": "SI" },
    		            { "data": "Company" },
    		            { "data": "ProductName" },
    		            { "data": "Stages" },
    		            { "data": "Remark" },
    		            { "data": selectIcon },
    		            { "data": actionIcon },
    				 
    				 ],
    				 "columnDefs": 
					 [	
						{
			                   "targets": [ 0 ],
			                   "visible": false,
			                   "searchable": false
			             },
		               {
		                    "targets": [ 5 ],
		                    "orderable": false
		                },
		                {
		                    "targets": [ 6 ],
		                    "orderable": false
		                }
		            ],
    				 "order": [[0, 'desc']],
    				 
		    } );
			
	});
	}
//get  list

	
	
		$(document).on("click", "#checkApproveclk", function(e){
			
			$('#approvediv').empty();
			console.log("---UA_IdUA_IdUA_Id--------",$(this).attr("withVisit"));
			 console.log("-checkApproveclk-----Approve-----id-",tableData.row($(this).parent().parent()).id());
			
			 iID = tableData.row($(this).parent().parent()).id()
			 
			 
			ClaimDataByInstId(tableData.row($(this).parent().parent()).id());
			getStatusDatabyInstID(tableData.row($(this).parent().parent()).id());
			
		//	$('#approvediv').append('<button class="btn btn-block cust-btn" type="submit" id ="Approvebtn" iID='+iID+' StageId1='+$(this).attr("StageId")+' uid='+$(this).attr("UA_Id")+' withVisit='+$(this).attr("withVisit")+'>Approve</button>');
			

		
		});
		
		function ClaimDataByInstId(incId){
			

			 console.log("-ClaimDataByInstId-----Approve-----id-",incId);
			
			 	$.get(url+"showClaimDataByInstId/"+incId, function( result ) {
						
					console.log("-getClaimData result---",result);
						
						console.log("-getClaimData result---",result.data);
						
						
						var CtrObj = $.parseJSON(result.data);
						
						console.log("-claimdata result-CtrObj--",CtrObj);
						
						$('#claimdata').empty();
						
						$.each(CtrObj, function(key,val) {
							
								 $('#claimdata').append('<tr>'
										    +'<td >'+val.JobId +'</td>'
										    +' <td>'+val.CustomerName +'</td>'
										    +' <td>'+val.Site +'</td>'
										    +' <td>'+val.SI +'</td>'
										    +' <td>'+val.ProductName +'</td>'
										    +'<td>'+val.Stages +'</td>'
										    +'<td>'+val.VisitInc +'</td>'
										    +'</tr>');
								 
					});
					
				});
}

		
		function getStatusDatabyInstID(incId){
			

			 console.log("-getStatusDatabyInstID-----Approve-----id-",incId);
			
			 	$.get(url+"getStatusListbyInstId/"+incId, function( result ) {
						
					console.log("-statusdata result---",result);
						
						console.log("-statusdata result---",result.data);
						
						
						var CtrObj = $.parseJSON(result.data);
						
						console.log("-statusdata result-CtrObj--",CtrObj);
						
						$('#statusdata').empty();
						
						$.each(CtrObj, function(key,val) {
							
								 $('#statusdata').append('<tr>'
										    +'<td >'+val.TaskName +'</td>'
										    +' <td>'+val.TaskCompletionDate +'</td>'
										    +'</tr>');
								 
					});
					
				});
}
		
		$(document).on("click", "#Approvebtn", function(e){
			
			 
			 console.log("-stageId-",stageId);
			 
			 console.log("-stageId-stageIdstageIdstageId", $(this).attr("StageId1"));
			 
			 dataVal = {
						"incId"	:$(this).attr("iID"),
						"stageId": $(this).attr("StageId1"),
						"visitInc":$("input[name='status']:checked").val(),
						"authKey":localStorage.getItem("authkey"),
						"uA_Id" : $(this).attr("uid"),
						"withVisit" : $(this).attr("withVisit")
				    	}	
			 console.log("-Approvebtn--------",dataVal);
			 
			 insertApprove(dataVal)
			

		
		});
		
		
		
		$(document).on("click", ".Reject", function(e){
			
			incID = tableData.row($(this).parent().parent()).id();
			wid=$(this).attr("withVisit");
			uid=$(this).attr("UA_Id");
			
			console.log("-wid-----",wid);
			console.log("-uid----",uid);
			
			callAddRemoveClassFunction($("#pARejRemark"));
		
		});
		
		
		$(document).on("click", "#saveRejRemark", function(e){
			
			console.log("-Reject-----Reject--=Reject==",incID);
			console.log("-Reject-wid==",wid);
			console.log("-Reject----uid==",uid);
			
			 
			 dataVal = {
						"incId"	:incID,  
						"authKey":localStorage.getItem("authkey"),
						"remark" :$("#pARejRemark").val(),
						"uA_Id" : uid,
						"withVisit" : wid
						
				    	}	
			 console.log("-Reject-----dataVal--===",dataVal);
			 
			 $.ajax({
					
					type: 'POST',
					url: url+"saveRejectRemark",  //from API update data
					data : JSON.stringify(dataVal),
					processData: false,
					contentType: "application/json; charset=utf-8",
		   
					success: function(result) {
		    	
					console.log("Update--Information Approve===",result);
					
					if(result.result==true){
						
						getList();
						
						$("#add_remark").modal('hide');
						
					}else if(result.result==false){
						
						window.location.href = "sessionOut";
						
					}
					

					}
				});
		
		});

		$(document).on("click", ".Approve", function(e){
						
			var inc = tableData.row($(this).parent().parent()).id();
			
			var visitIncVal = $(this).parent().parent().find("select").val();
			
			console.log("-visitIncVal-===",visitIncVal);
				
			if(visitIncVal==0){
			
				alert("First Select Visti/inc ");
				
			}else{
				dataVal = {
						"incId"	   :inc,  
						"visitInc" : visitIncVal,
						"stageId"  : $(this).attr("StageId"),
						"authKey"  : localStorage.getItem("authkey"),
						"withVisit": $(this).attr("withVisit"),
						 "uA_Id"   : $(this).attr("UA_Id")
						
				    	}
				
			}
			
			
			 console.log("-Approve-----dataVal--===",dataVal);
		
			 insertApprove(dataVal);
			 
		
		});
		
		
		$(document).on("click", ".poReleased", function(e){
			
			var inc = tableData.row($(this).parent().parent()).id();
			
			
			console.log("-inc -===",inc);
		
				dataVal = {
						"incId"	   :inc
						
				    	}
				
			
			
			 console.log("-Approve-----dataVal--===",dataVal);
		

				 $.ajax({
						
						type: 'POSt',
						url: url+"releasePOQty",  //from API update data
						data : JSON.stringify(dataVal),
						processData: false,
						contentType: "application/json; charset=utf-8",
			   
						success: function(result) {
			    	
						console.log("Update--Information releasePOQty===",result);
						
						if(result.result==true){
							
							getList(); 
							$("#showmesgfrPO").modal('show');
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}

						}
					});
			 
		
		});
		 

		function insertApprove(dataVal){
			
			 $.ajax({
					
					type: 'POST',
					url: url+"insertIncClaimData",  //from API update data
					data : JSON.stringify(dataVal),
					processData: false,
					contentType: "application/json; charset=utf-8",
		   
					success: function(result) {
		    	
					console.log("Update--Information Approve===",result);
					
					if(result.result==true){
						
						$("#checkApprove").modal('hide');
						getList();
						
						
					}else if(result.result==false){
						
						window.location.href = "sessionOut";
						
					}
					

					}
				});
			
		}
