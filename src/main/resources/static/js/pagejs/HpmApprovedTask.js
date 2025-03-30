
		console.log("-------------------Welcome to project page------------------");
		var tableData = $('#approvaldataList').DataTable();
		var JobId;
	
		$(document).ready(function(){
			
			
			/*alert("testing again");*/
			
			// var siId = GetURLParameter('siId');
			 var dateFrom = GetURLParameter('dateFrom');
			 var dateTo = GetURLParameter('dateTo');
			 var User=GetURLParameter('User');
			 
			// console.log("siId----",siId);
			 console.log("dateFrom----",dateFrom);
			 console.log("dateTo----",dateTo);
			 
			
			 var dataVal = {
				  //   "siId"	  	:siId,
				     "dateFrom"	:dateFrom,
				     "dateTo"	:dateTo,
				     "authKey":User
			    	}	
			 
			 getList(dataVal);
			 
			
			
			
			
			//getList();
			
		});

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
//get  list
		function getList(dataVal){
	
	
			/*	alert("testing again111")
*/
			var i = 0;
					console.log("------approvaldataList----------");
	
			//	$.get(url+"getHPMApprovedTasks", function( data ) { //from API list
		
					 $.ajax({
							
							type: 'POST',
							url: url+"getHPMApprovedTasks",  //from API update data
							data : JSON.stringify(dataVal),
							contentType: "application/json",
				    
							success: function(data) {	
						
					
					console.log("--getProductList----data----------",data);
					console.log("--getProductList----data.result----------",data.result);
					//console.log("--getProductList----JobId----------",data.result[0].id);
					
					tableData.destroy();
       
					$('#approvaldataList.tbody').empty();
					
							//			$('#approvedTasksList.tbody').empty();

					
		
					var editIcon = function ( data, type, row ) {
				 
						//console.log("--getProductList---here-------",data.id);
						
			        if ( type === 'display' ) {
			            
			        	i = i + 1;
			        return '<td><input type="text" class="table-input-item" placeholder="EnterRemark" id = "remark'+i+'" value='+data.Remark+'><input type="button" class="table-input-btn updateRemark" value="Update" JobId='+data.id+' cnt = '+i+'> </td>';
			        
			        }
			        
			        return data;
					};
			    
					
					var deleteIcon = function ( data, type, row ) {
					
					if ( type === 'display' ) {
					
					return '<td><input type="button" class="table-input-btn updateRemark" id="approveStatusId" value="Approve" instId='+data.id+' cnt = '+i+'> </td>';
					       
					}
					
					return data;
					};
					i++;
				
				
				var table = $('#approvaldataList').DataTable( {
				
			//						var table = $('#approvedTasksList').DataTable( {

				
				
					dom: 'Blfrtip',   
					buttons: ['excel', 'print'],
				 	 destroy: true,
    				 data: data.result,
    				 "initComplete": function(settings, json) {
					  },
    				 
    				 columns: [
    				    { "data": "JobId" },
    				    { "data": "CustName" },
    				    { "data": "PM" },
    		            { "data": "SI_NAME" },
    		            { "data": "Name" },
    		            { "data": "RegionName" },
    		            { "data": "Site" },
    		            { "data": "Location" },
    		            { "data": "Status" },
    		          /*  { "data": "Stages" },*/
    		            /*{ "data": editIcon },*/
    		            { "data": "ActionDate" },
    				 
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
							}	
	});
	}
//get  list

		
		$(document).on("click", "#approveStatusId", function(e){

			
			console.log("--------click on approveStatusId--------");
		
			
			instId = $(this).attr("instId");
			console.log("--------click on update--instId------",instId);

			var dataVal = {
				
				"id": instId
		    	}
		
			console.log("----seekApproval----click on dataVal-------",dataVal);
		
			$.ajax({
			
			type: 'POST',
			url: url+"approvalStatusId",  //from API update data
			data : JSON.stringify(dataVal),
			processData: false,
			contentType: "application/json; charset=utf-8",
    
			success: function(result) {
    	
			console.log("Update--seekApproval result==="+result);
			
			getList();  

			}
		});
					
});
		
$(document).on("click", "#GetApprovedTask", function(e){
			
			
		/*	alert("calling hyperlink");*/
			
			console.log("--------click on GetApprovedTask-------");
			
				if(NotAllowedNullVal("#reportErr","From date ",$('#dateFrm')))
					if(NotAllowedNullVal("#reportErr","To date ",$('#dateTo'))){
			
			
						window.location.href = "GetApprovedTask?dateFrom="+$("#dateFrm").val()+"&dateTo="+$("#dateTo").val()+"&User="+localStorage.getItem("userId");
					}
			 
			});