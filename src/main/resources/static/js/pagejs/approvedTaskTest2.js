
		var tableData = $('#approvedTasksList').DataTable();
	
		$(document).ready(function(){
			
			 generateSubContractorListApr();
						
			 var siId = GetURLParameter('siId');
			 var dateFrom = GetURLParameter('dateFrom');
			 var dateTo = GetURLParameter('dateTo');
			 
			 
			 console.log("siId----",siId);
			 console.log("dateFrom----",dateFrom);
			 console.log("dateTo----",dateTo);
			 
			
			 
			 var userID = localStorage.getItem('userId');
			 var userRole = localStorage.getItem('role');
			 console.log("User ID :-- ", userID);
			
		/*	 var dataVal = {
				     "siId"	  	: siId,
				     "dateFrom"	: dateFrom,
				     "dateTo"	: dateTo,
				     "userID"   : userID,
				     "userRole" : userRole
			    	}	*/
			    	
			    		var dataVal = {
		"customer":"ALL",
		"siCompanyName":"ALL",
		"region":"ALL",
		"dateCategory":"By Installation Date",
		"startDate":"2022-01-01",
		"endDate":"2022-01-31",
	}
			 
			 getlist(dataVal);
			 
			 
		});
				
		
		
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    console.log("sParam"+sParam);
    flag=false;

    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        console.log("sParameterName"+sParameterName);
        
        
        if (sParameterName[0] == sParam)
        {
        	flag=true;
            return decodeURIComponent(sParameterName[1]);
        }
    }
    
    if(flag==false)
    	return 0;
    
}
		
function generateSubContractorListApr(){
			
			console.log("-----subContractorListapr--111----",localStorage.getItem("authkey"));

			$("#subContractorListapr").empty();
			
			$.get(url+"getSICompanyList/"+localStorage.getItem("userId"), function( data ) { //from API list
				
			console.log("---------------data.result----------",data.result);
			
			$('#subContractorListapr').append('<option value=' + 0+ '> ALL  </option>');
			
			
			$.each(data.result, function(key,val) {
				
			console.log("-------------val.Company--------",val.Company);
			
			$("#subContractorListapr").append('<option value='+val.Id+'>'+val.Company+'</option>');
			
					
			});
			
		});
		
		}





$(document).on("click", "#approveTaskSubmit", function(e){
	
	alert("11");
			console.log("--------click on approveTaskSubmit-------",$("#subContractorListapr").val());
			
		//	if(ValidationForSelectBox("#reportErr","SI Name ",$('#subContractorListapr')))
				if(NotAllowedNullVal("#reportErr","From date ",$('#dateFrm')))
					if(NotAllowedNullVal("#reportErr","To date ",$('#dateTo'))){
				
				window.location.href = "ApprovedTasksReport?siId="+$("#subContractorListapr").val()+"&dateFrom="+$("#dateFrm").val()+"&dateTo="+$("#dateTo").val();
			//	window.location.href = "PendingApprovals?siId="+$("#subContractorListapr").val()+"&dateFrom="+$("#dateFrm").val()+"&dateTo="+$("#dateTo").val();
			}
			
			
			 
			 
			/*
			 
			 window.location.href = "ApprovedTasks?siId;
			*/ 
			 
});

const selectExportColumn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 35, 36, 37, 38];


function getlist(dataVal){

				 
			 console.log("--getlist---------",dataVal);
			
			 $.ajax({
				
				type: 'POST',
				url: url+"getQualityReportByDateRange",  //from API update data
				data : JSON.stringify(dataVal),
				contentType: "application/json",
	    
				success: function(data) {
	    	
				console.log("getApprovedTasksReport=data==",data);
				
				
				console.log("-- getApprovedTasksReport=data.result==",data.result);
				
			//	console.log("-- getApprovedTasksReport=data.resultJobIdJobIdJobIdJobId==",data.JobId);
				
			
				tableData.destroy();
			       
				$('#approvedTasksList.tbody').empty();
	

				///
				var actionIcon = function ( data, type, row ) {
					
					console.log("--herehere----ididid----------",data.id);
			
					
					var test=data.id;
					
					console.log(test);
					
				//if ( type === 'display' ) {
			//	
				return '  <td><input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" value="View Details" data-toggle="modal" '+
				' data-target="#showdetails" id="showdetailsbtn" idval="'+data.JobId+'"></td>';
//server
					
				//}
				return data;
				};
				///
				
				
				
				
				
						
				tableData = $('#approvedTasksList').DataTable( {
							
							 dom: 'Blfrtip',   
							// buttons: [ 'excel', 'print'],
							
							
							buttons: [
					{
						extend: 'excelHtml5',
		                exportOptions: {
		                    columns: selectExportColumn,
		                },
		                customize: function( xlsx ) {
		                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
		     
		                    $('row c', sheet).each( function () {
		                    	
		                        // if cell starts with http
		                        if ( $('is t', this).text().indexOf("http") === 0 ) {
		                            // (2.) change the type to `str` which is a formula
		                            $(this).attr('t', 'str');
		                            //append the formula
		                            $(this).append('<f>' + 'HYPERLINK("'+$('is t', this).text()+'","'+$('is t', this).text()+'")'+ '</f>');
		                            //remove the inlineStr
		                            $('is', this).remove();
		                            // (3.) underline
		                            $(this).attr('s', '4');
		                        }
		                    });
		                }
		                
					}
				],
							
							
							
							
						 	 destroy: true,
		    				 data: data.result,
		    				 "initComplete": function(settings, json) {
							  },
		    				 
		    				 columns: [
		    				   { "data": "JobId", orderable: true},
				    { "data": "CreatedDate" },
				    { "data": "Site_Name" },
				    { "data": "Company" },
				    { "data": "Customer_Name" },
				    { "data": "Region" },// New Added
				    { "data": null, 
				    	render:function(data,type,row) {
		            		var circleName = data.Region;
		            		return circleName.substring(2);
		            	} 
				    }, // New Added
		    		           { "data": "Site_Type" },
		            { "data": "rack_Type" },
		            { "data": "Outdoor_Cabinet_make" },
		            
		             { "data": null,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo1;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		data.Photo1 = modifiedUrl;
		            		console.table("Data check", data.Photo1);
		            		var action ='<a class="btn01" href='+data.Photo1+' target="_blank">Photo1</a>';
		            		return action;
		            	}     
		            },
		            { "data": null,
		            	render:function(data,type,row){	
		            		var checkUrl = data.Photo2;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		data.Photo2 = modifiedUrl;
		            		console.table("Data check", data.Photo2);
		            		var action ='<a class="btn01" href='+data.Photo2+' target="_blank">Photo2</a>';
		            		return action;
		            	}     
		            },
		            { "data": null,
		            	render:function(data,type,row){	
		            		var checkUrl = data.Photo3;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		data.Photo3 = modifiedUrl;
		            		console.table("Data check", data.Photo3);
		            		var action ='<a class="btn01" href='+data.Photo3+' target="_blank">Photo3</a>';
		            		return action;
		            	}     
		            },
		            { "data": null,
		            	render:function(data,type,row) {	
		            		var checkUrl = data.Photo4;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		data.Photo4 = modifiedUrl;
		            		console.table("Data check", data.Photo4);
		            		var action ='<a class="btn01" href='+data.Photo4+' target="_blank">Photo4</a>';
		            		return action;
		            	}     
		            },
		            // Hidden Fields with File Path
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo1;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		return modifiedUrl;
		            	}   
		            },
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo2;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		return modifiedUrl;
		            	}   
		            },
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo3;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		return modifiedUrl;
		            	}   
		            },
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo4;
		            		console.table("checkURL :--- " + checkUrl);
		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
		            		return modifiedUrl;
		            	}   
		            },
		            
		    		            { "data": actionIcon },
		    		            
		    		            
		    		            
		    		            
		    		            
		    				 
		    				 ],
		    				 "columnDefs": 
							 [	
				            /*   {
				                    "targets": [ 5 ],
				                    "orderable": false
				                },
				                {
				                    "targets": [ 6 ],
				                    "orderable": false
				                }*/
				            ],
		    				 "order": [[0, 'desc']],
				    } );
						
						
						
	   // });
				
				
				}
			});
	
}





$(document).on("click", "#showdetailsbtn", function(e){
	
	var id = tableData.row($(this).parent().parent()).id();
	
	console.log("-id id id --", $(this).attr("idval"));
	
	
	$.get(url+"getAppJobDetails/"+$(this).attr("idval"), function( data1 ) {
		
		console.log("-showdetailsbtn result---",data1);
			
			console.log("-showdetailsbtn result---",data1.result);
			var flag=false;
			
			//var CtrObj = $.parseJSON(data1.result);
			
			
			$('#completeJobata').empty();
			
			$.each(data1.result, function(key,val) {
				console.log("-showdetailsbtn val.TaskName---",val.ActionDate);
				
					 $('#completeJobata').append('<tr>'
							    +'<td >'+val.ActionDate +'</td>'
							    +' <td>'+val.Remark +'</td>'
							    +'</tr>');
					 flag=true;
				});
		
			if(flag==false)
				 $('#completeJobata').append('<tr>'
						    +'<td colspan="2" >No data found</td>'
						    +'</tr>');
			
	});

});












//get  list
		function getList(){
				
					//var authKey	= localStorage.getItem("userId");
					var i = 0;
					console.log("------approvedTasksList--userId--------",localStorage.getItem("userId"));
	
					$.get(url+"getInstallationList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					
					console.log("--getProductList----data----------",data);
					console.log("--getProductList----data.result----------",data.result);
					
					tableData.destroy();
       
					$('#purchaseOrderList.tbody').empty();
		
					var editIcon = function ( data, type, row ) {
				 
						//console.log("--getProductList---here-------",data.id);
						
			        if ( type === 'display' ) {
			        	//console.log("--getProductList---here--data.Remark-----",data.Remark);
			        	//console.log("--getProductList---here--data.typeFlag-----",data.typeFlag);
			        	
			        	i = i + 1;
			        return '<td><input type="text" class="table-input-item" placeholder="Enter Remark" id = "remark'+i+'" value="'+data.Remark+'"><input type="button" placeholder="Enter your Remark" class="table-input-btn updateRemark" value="Update" recId='+data.recId+' typeFlag='+data.typeFlag+' JobId='+data.id+' cnt = '+i+'> </td>';
			        
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
				
					dom: 'Blfrtip',   
					buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
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
