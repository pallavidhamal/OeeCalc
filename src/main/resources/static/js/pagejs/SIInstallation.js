
		console.log("-------------------Welcome to project page------------------");
		var tableData = $('#taskStatusTable').DataTable();
		var JobId;
				
		$(document).ready(function(){
			
			getList();

			
		});
		
		
//get  list
		function getList(){
	
			//$('#progressBar').show();
			$('#progressBarFull').show();
			var i = 0;
	
			$.get(url+"getSiInstallationList/"+localStorage.getItem("userId"), function( data ) { //from API list

					console.log("--get task statussss----data----------",data);
					console.log("--get task status----data.result----------",data.result);
					
					tableData.destroy();
       
					$('#taskStatusTable.tbody').empty();
		
				    
					
					i++;
					
					console.log("========data=======",data);

					tableData = $('#taskStatusTable').DataTable( {
				
					dom: 'Blfrtip',   
					buttons: ['excel', 'print'],
				 	 destroy: true,
    				 data: $.parseJSON(data.data),
    				 rowId:"id",
    				 "initComplete": function(settings, json) {
					  },
    				 
    				 columns: [
    					// { "data": "id"},
    					 { "data": function ( data, type, row ) {
							
								var downDiv = "";
							
							console.log("========data==data=====",data);
							
							
							// all action done by only owner SI  
								if(data.SI_Id == localStorage.getItem("userId")){
									if((data.StatusId == 1)||(data.StatusId == 13)||(data.StatusId == 17)){
										downDiv = '<td><input type="button" class="btn btn-primary rounded-pill px-3 accept" value="Accept"  incid='+data.IncId+'  > ' +
										 ' <input type="button" class="btn btn-danger rounded-pill px-3 reject" value="Reject"  incid='+data.IncId+'  >  </td>';
									}
									
									if((data.StatusId == 2)||(data.StatusId == 10)){
										downDiv = '<td><input type="button" class="btn btn-secondary rounded-pill px-3 assignTE" value="Assign TE"  incid='+data.IncId+'  > ' +
										 ' <input type="button" class="btn btn-warning rounded-pill px-3 updateTask" value="Update Task"  incid='+data.IncId+'  JobId='+data.JobId+'  >  </td>';
									}
									
									if((data.StatusId == 5)||(data.StatusId == 16)){
										downDiv = '<td><input type="button" class="btn btn-secondary rounded-pill px-3 assignTE" value="ReAssign TE"  incid='+data.IncId+'  > </td>' ;
										  
									}
								}
								
								return downDiv;
							 }
						 },
				    	{ "data": "JobId" },
			    	 	{ "data": "CustName" },
				    	{ "data": "Product" },
    		            { "data": "Site" },
    		            { "data": "Location" },
    		            { "data": "SI" },
    		            { "data": "TE" },
    		            { "data": "Status" },
    		            { "data": "Stages" },
    		         /*   { "data": "ProductName" },
    		            { "data": "Site" },
    		            { "data": "RegionName" },
    		            { "data": "Purpose" },
    		            { "data": "Status" },
    		            { "data": "Stages" },  
    		            { "data": "AllocDt" },
    		            { "data": "CompleteDt" },  */
    				 ],
    				 
    				 "columnDefs": 
    					 [	
							/* {
					           'targets': 0,
					            'checkboxes': {
					               'selectRow': true
					            },
    						 	'createdCell':  function (td, cellData, data, row, col){
	    							
	    							 if((data.POLineId != null)&&(data.POLineId != "")){
	
	    				            	   console.log("----hrhrhrhrhrhr-----", this.api().cell(td).checkboxes);
	    			                   this.api().cell(td).checkboxes.disable();
	    			             	}
    						 	}
					         },*/
					         {
							    "targets": '_all',
							    "defaultContent": ""
							}
    		            ],
    		     /*       
    		            'deferRender': true,
    		            'select': 'multi',
    		            'select': {
    		                'style': 'multi'
    		             },
    				 "columnDefs": 
					 [	
		               {
		                    "targets": [ 7 ],
		                    "orderable": false
		                },
		                {
		                    "targets": [ 8 ],
		                    "orderable": false
		                }
		            ],*/
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
		
		
		
		
//get  list
 var instId;
		$(document).on("click", ".Update12", function(e){
			
			console.log("-----Update12------",tableData.row($(this).parent().parent()).id());
			instId = tableData.row($(this).parent().parent()).id();
			generateSubContractorList();
			
			gettaskList();
			
			$("#add_remark").modal('show');
		});
		
		//get Sub Contractor List
		function generateSubContractorList(){
			
						console.log("-----generateSubContractorList------");
	
						$("#subContractorListadd").empty();
						
						$.get(url+"getSubContractorList/"+localStorage.getItem("userId"), function( data ) { //from API list
							
						console.log("-----getProductList----------data.result----------",data.result);
						
						$('#subContractorListadd').append('<option value=' + 0+ '> - Select Sub Contractor - </option>');
						
						$.each(data.result, function(key,val) {
								
						$("#subContractorListadd").append('<option value='+val.EmpId+'>'+val.Emp_Name +'</option>');
								
						});
						
					});
					
			}
//end get Sub Contractor List
		
		
		//get task list
				
				function gettaskList(){	
					var arr=[];
							console.log("-----gettaskList------",instId);
					
							
							$.get(url+"getTaskFrmAction/"+instId, function( data ) { //from API list
								
								//console.log("------------getTaskFrmAction--------------",data.result);
							
							//	$('#taskListadd').html('');
							
								$.each(data.result, function( index, value ){
							
								//	console.log("value.TaskId======",value.TaskId);
							//arr
									arr.push(value.TaskId);
								//$('#taskListadd').append('<li> <input type="checkbox" value="'+ value.TaskId + '" class="multiselect_checkbox" name="multiselect" para="'+value.TaskName+'">'+ value.TaskName+'</li>');
									console.log("-------arr------------",arr);
							});
					});
							
							$.get(url+"getTasks/"+localStorage.getItem("userId"), function( data ) { //from API list
						
							console.log("------------getTasks--------------",data.result);
							console.log("---arr arr arr--------------",arr);
							$('#taskListadd').html('');
						
							$.each(data.result, function( index, value ){
						
								console.log("regionListadd===========data.CustomerID======",value.TaskId);
								
								if(arr.includes(value.TaskId)){
									
									$('#taskListadd').append('<li> <input type="checkbox" value="'+ value.TaskId + '" class="multiselect_checkbox" name="multiselect" para="'+value.TaskName+'" disabled>'+ value.TaskName+'</li>');
								
								}else{
									
									$('#taskListadd').append('<li> <input type="checkbox" value="'+ value.TaskId + '" class="multiselect_checkbox" name="multiselect" para="'+value.TaskName+'">'+ value.TaskName+'</li>');
								}
						});
				});
		}
		//end of get task list

				$(document).on("click", "#saveReopenJob", function(e){
					
					console.log("-----Update12---id-instId--",instId);
					
					console.log("-----Update12--subContractorListadd----",$('#subContractorListadd').val());
					
					var ar=[];
					$('.multiselect_checkbox').each(function(){
			            if($(this).is(':checked'))
			            {
			                ar.push({task:$(this).val()}); 
			                			                
			            }   
			        });
					
					console.log("-------task id---arar-===",ar);
					
					var dataVal = {
							
							"instid" 			: instId,
						    "siId" 				: $('#subContractorListadd').val(),
						    "task1"				: ar,
						    "authKey"			:localStorage.getItem("authkey")
							
							};
				
						console.log("saveReopenJob===dataVal=== ",dataVal);
						
						$.ajax({
							
							   type: 'POST',
							   url: url+"saveReopenJob",  //from API add new data
							   data : JSON.stringify(dataVal),
							   processData: false,
							   contentType: "application/json",
		   
							   success: function(result) {
		   	
								console.log("insert--Information result==="+result);
								
								
								if(result.result==true){
									
									getList();
									$("#add_remark").modal("hide");
									
								}else if(result.result==false){
									
								//	window.location.href = "sessionOut";
									
								}
								
				
							}
					});
					
					
				});
				

$(document).on("click", "#assignPObtn", function(e) {
	
	var table = $('#taskStatusTable').DataTable();
	var data = table.rows().data();
//	console.log( 'The table has ' + data.length);
//	console.log( 'Data', data );   
	    
	rows_selected = table.column(0).checkboxes.selected();
	instId = rows_selected.join(",");
	console.log("Size" + instId.length);
	
	if(instId.includes(",")) {
		console.table("Multi Check True");
		$("#alertMultiSelectJob").modal('show');
	}
	
	if(instId == "") {
		console.table("Checkbox not selected", instId);
        $("#alertJob").modal('show');
    }
	
	if(!instId.includes(",") && !(instId == "")) {
		console.table("Single Checkbox Selected");
		$("#updateModal").modal('show');
	}

});
				
				
		
$(document).on("click", "#findPOList", function(e) {

	var table = $('#taskStatusTable').DataTable();
	var data = table.rows().data();
	console.log( 'The table has ' + data.length);
	console.log( 'Data', data );   
	    
	rows_selected = table.column(0).checkboxes.selected();
	instId = rows_selected.join("");
	
	var PoNum = $("#poNumber").val();
	console.log("-findPOList---",PoNum);
	console.table("---Inst ID :-- " + instId)
	console.log("hiii check",url+"findPoListByNo/"+PoNum+"/"+instId);
	$.get(url+"findPoListByNo/"+PoNum+"/"+instId, function(result) {
					
		console.log("-findPOList result---",result);
		console.log("-findPOList result---",result.data);
					
		var CtrObj = $.parseJSON(result.data);
					
		console.log("-findPOList result-CtrObj--",CtrObj);
		console.table("Check Result Size :- ", CtrObj.length);
		
		$('#myPoTbody').empty();
		
		if(CtrObj.length == 0) {
			console.table("Result is 0");
			console.table("Table Start");
			
			var checkVal = "Not a Valid PO";
			
			$('#myPoTbody').append('<tr>'
				+'<td colspan="5" align="center">'+checkVal+'</td>'
				+'</tr>'
			);
			console.table("Table created");
			
		}
		
		var i = 0;
		var checked="";
					
		$.each(CtrObj, function(key,val) {
			
			console.table("Hiiii");
			chpoId = val.Id;
			
			$('#myPoTbody').append('<tr>'
					+'<td class="txt-center"><input type="radio"  poId = "'+val.Id+'" value = "'+val.Id+'" name="gender" ></td>'
					+' <td>'+val.PO_Number +'</td>'
					+' <td>'+val.LineId +'</td>'
					+' <td>'+val.RegionName +'</td>'
					+'<td>'+val.PO_Qty +'</td>'
					+'</tr>'
			);					
		});
	});
});
		
var chpoId, instId1, rows_selected;

$(document).on("click", ".update", function(e) {
			
			instId = $(this).attr("instId");
			console.table("Check ID :--- " , instId);
			instId1 = instId;
		//	console.log("--------click instId------",instId);
			
		//	$("#updateModal").modal('show');
			
			$("#poNumber").val('');
			$('#myPoTbody').empty();
			
			
			 var table = $('#taskStatusTable').DataTable();
			    
			    var data = table.rows().data();
			     
		//	    console.log( 'The table has ' + data.length);
			//    console.log( 'Data', data );   
			    
			    rows_selected = table.column(0).checkboxes.selected();
			    
		//	    console.log( 'The table has ------------------------------- ' ,rows_selected);
			    
			//    console.log( 'The table has hrhr ------------------------------- ' ,rows_selected.join(","));
			
			
});
		
		
		
		$(document).on("click", "#updatePoJob", function(e) {
			console.log( 'The table has hrhr ------------------------------- ' ,rows_selected.join(","));
			
			 var table = $('#taskStatusTable').DataTable();
			    
			    var data = table.rows().data();
			     
			    console.log( 'The table has ' + data.length);
			    console.log( 'Data', data );   
			    
			    rows_selected = table.column(0).checkboxes.selected();
			    
			    console.log( 'The table has ------------------------------- ' ,rows_selected);
			    
			   console.log( 'The table has ------------------------------- ' ,rows_selected.join(","));
			
				var checkTab = $("input[name='gender']:checked").val();
				console.table("Check ID :-- ", checkTab);
				
				if(checkTab == undefined) {
					$("#alertPOJob").modal('show');
				}
			
			
			var favorite = [];
            /*$.each($("input[name='sport']:checked"), function(){    
            	
            	console.log("-this--",$(this).val());
            	
                favorite.push($(this).val());
            });*/
            // "instid"	: favorite.join(", "),
          //  alert("My favourite sports are: " + favorite.join(", "));
			if(checkTab != undefined) {
				console.table("Tab is present");
	            var dataVal = {
						"instid" : rows_selected.join(","),
			    		"pOLineId": $("input[name='gender']:checked").val(),
			    		"authKey":localStorage.getItem("authkey")
			    };
			}
			console.log("-findPOList dataValdataValdataValdataValj--",dataVal);
			
			$.ajax({
				
				type: 'POST',
				url: url+"assignPo",  //from API update data
				data : JSON.stringify(dataVal),
				processData: false,
				contentType: "application/json; charset=utf-8",
	    
				success: function(result) {
	    	
				console.log("Update--Information result==="+result);
				
				if(result.result==true){
					
					$("#updateModal").modal('hide');
					
					getList(); 
					
				}else if(result.result==false){
					
					window.location.href = "sessionOut";
					
				}
				
				
				
				}
			});
			
		});
		
		
$(document).on("click", ".accept", function(e) {
			
			instId = $(this).attr("incid");
			console.table("Check ID :---accept--- " , instId);
			console.table("Check ID :---accept--- " , 2);
			localStorage.getItem("userId")
	
	
	
		swal({
			text: "Do You Want To Accept the Request?",
			buttons: [
			 'NO',
			  'YES'
			
			],
			}).then(function (isConfirm) {
			    if(isConfirm){
	
			
						var dataVal = {
							
							"incId" 	: instId,
						    "action" 	: 2,
						    "actionBy"	: localStorage.getItem("userId"),
							
						};
				
						console.log("saveReopenJob===dataVal=== ",dataVal);
						takeAcceptRejectAction(dataVal);

	
		}
	})	
});

$(document).on("click", ".reject", function(e) {
			
	instId = $(this).attr("incid");
	
	$("#taskRejectTextare").val('');
	
	$("#taskRejectModal").modal('show');
	
	/*
		swal({
			text: "Do You Want To Accept the Request?",
			buttons: [
			 'NO',
			  'YES'
			],
			}).then(function (isConfirm) {
			    if(isConfirm){
						var dataVal = {
							
							"incId" 	: instId,
						    "action" 	: 3,
						    "actionBy"	: localStorage.getItem("userId"),
							
						};
				
						console.log("saveReopenJob===dataVal=== ",dataVal);
						
						takeAcceptRejectAction(dataVal);
		}
	})	*/
});


$(document).on("click", "#taskRejectAdd", function(e) {
			
		console.table("Check ID :---accept--- " , instId);
	
		console.table("Check ID :---taskRejectTextare--- " , $("#taskRejectTextare").val());
			
		var dataVal = {
			
			"incId" 	: instId,
		    "action" 	: 3,
		    "actionBy"	: localStorage.getItem("userId"),
		    "remark"	: $("#taskRejectTextare").val(),
			
		};

		console.log("saveReopenJob===dataVal=== ",dataVal);
		
		takeAcceptRejectAction(dataVal);
	
});



$(document).on("click", ".assignTE", function(e) {
	
		instId = $(this).attr("incid");
	
		var dataVal = {
			
			"si_Id" 	: localStorage.getItem("userId"),
			
		};
	
	
		$.ajax({
							
		   type: 'POST',
		   url: url+"getTEList",  //from API add new data
		   data : JSON.stringify(dataVal),
		   processData: false,
		   contentType: "application/json",
   
			   success: function(result) {
	
	console.log("insert--Information result===",result);
	
				var CtrObj = $.parseJSON(result.data);
	
				console.log("insert--Information result===",CtrObj);
				
				$("#assignTEList").empty()
				$("#assignTEList").append('<option value=0 >- Select Task Engineer-</option>');
				
				$.each(CtrObj, function(key,val) {
								
					console.log("insert--Information result===",val.TEId);
								
					$("#assignTEList").append('<option value='+val.TEId+'>'+val.TEName +'</option>');
						
				});
					
			}
		});
	
	
	
	$("#assignTEModal").modal('show');
});

$(document).on("click", ".updateTask", function(e) {
	
	
		instId = $(this).attr("incid");
		$("#jobName").empty();
		$("#jobName").append($(this).attr("JobId"));
		$("#updateTaskRemark").val("")
		
		var dataVal = {
			 
		};
	
		$.ajax({
							
		   type: 'POST',
		   url: url+"getReasonList",  //from API add new data
		   data : JSON.stringify(dataVal),
		   processData: false,
		   contentType: "application/json",
   
			   success: function(result) {
	
	console.log("insert--Information result===",result);
	
				var CtrObj = $.parseJSON(result.data);
	
				console.log("insert--Information result===",CtrObj);
				$("#reasonList").empty()
				$("#reasonList").append('<option value=0 >- Select Reason -</option>');
				
				$.each(CtrObj, function(key,val) {
								
					console.log("insert--Information result===",val.id);
								
					$("#reasonList").append('<option value='+val.id+'>'+val.reason_name +'</option>');
						
				});
					
			}
		});
	
	
	$("#updateTaskModal").modal('show');
});


$(document).on("click", "#saveAssignTE", function(e) {
	
	
			var dataVal = {
			
			"incId" 	: instId,
		    "action" 	: 5,
		    "actionBy"	: localStorage.getItem("userId"),
			"teId" 		: $("#assignTEList option:selected").val(),
		};

		console.log("saveAssignTE===dataVal=== ",dataVal);
		
		takeAcceptRejectAction(dataVal);
	
	
	$("#assignTEModal").modal('hide');
});

$(document).on("click", "#saveUpdateContinueTask", function(e) {
	// $("#updateTaskModal").modal('hide');
	
	console.log("saveUpdateContinueTask===reasonList=== ",$("#reasonList option:selected").text());
	console.log("saveUpdateContinueTask===taskRejectTextare=== ",$("#updateTaskRemark").val());
	
		var dataVal = {
			
			"incId" 	: instId,
		    "actionBy"	: localStorage.getItem("userId"),
			"remark"	: $("#updateTaskRemark").val(),
			"action" 	: 6,
			"reason"	: $("#reasonList option:selected").text()
		};
		
	console.log("saveUpdateContinueTask===dataVal=== ",dataVal);
	
	takeUpdateAction(dataVal);
	
});

$(document).on("click", "#saveUpdateCheckoutTask", function(e) {
	// $("#updateTaskModal").modal('hide');
	
		console.log("saveUpdateContinueTask===reasonList=== ",$("#reasonList option:selected").text());
	console.log("saveUpdateContinueTask===taskRejectTextare=== ",$("#updateTaskRemark").val());
	
		var dataVal = {
			
			"incId" 	: instId,
		    "actionBy"	: localStorage.getItem("userId"),
			"remark"	: $("#updateTaskRemark").val(),
			"action" 	: 7,
			"reason"	: $("#reasonList option:selected").text()
		};
		
	console.log("saveUpdateContinueTask===dataVal=== ",dataVal);
	
	takeUpdateAction(dataVal);
});



function takeAcceptRejectAction(dataVal){
	
	$.ajax({
					
	   type: 'POST',
	   url: url+"takeIncAction",  //from API add new data
	   data : JSON.stringify(dataVal),
	   processData: false,
	   contentType: "application/json",
   
	   success: function(result) {

			console.log("insert--Information result==="+result);
			
			
			if(result==true){
				
				getList();
				// $("#add_remark").modal("hide");
				$("#taskRejectModal").modal('hide');
				
				
			}else if(result==false){
				
			//	window.location.href = "sessionOut";
				
			}
		}
	});
	
}

function takeUpdateAction(dataVal){
	
	$.ajax({
					
	   type: 'POST',
	   url: url+"SIUpdateTaskWithoutfile",  //from API add new data
	   data : JSON.stringify(dataVal),
	   processData: false,
	   contentType: "application/json",
   
	   success: function(result) {

			console.log("insert--Information result===",result);
			
			
			if(result.result=="success"){
				
				getList();
				$("#updateTaskModal").modal('hide');
				//$("#taskRejectModal").modal('hide');
				
				
			}else if(result==false){
				
			//	window.location.href = "sessionOut";
				
			}
		}
	});
	
}	