
var tableData = $('#approvedTasksList').DataTable();
	
var gvtid;	
var gactivitid	;
var gissuesid 	;
var gvStatusid 	;
var custname = "";	
	
	$(document).ready(function(){

	var now = new Date();
	 
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	
	var  todayFrm= now.getFullYear()+"-"+(month)+"-"+(day) ;
	var todayTo = now.getFullYear()+"-"+(month)+"-01" ;
	
	
	console.log("======today=======",todayFrm)
	console.log("======today=======",todayTo)
	
	
	$('#dateFrm').val(todayFrm);
	$('#dateTo').val(todayTo);


		
		 getlist($('#dateTo').val(),$('#dateFrm').val());
		 
	});
		
var app_global_path="E:\\Tomcat 10/webapps";
var app_global_url="http://proapp.rbbn.com"
var app_global_path1="E:\\Tomcat 10/webapps";		
		

function getlist(dateFrm,dateTo){
	
	

if(NotAllowedNullVal("#reportErr","From date ",$('#dateFrm')))
		if(NotAllowedNullVal("#reportErr","To date ",$('#dateTo'))){

$('#progressBarFull').show();

	

		 $.get(url+"getInOutTasks/"+localStorage.getItem("userId")+"/"+dateTo+"/"+dateFrm, function( data ) {
		
			tableData.destroy();
		       
			$('#approvedTasksList.tbody').empty();
	
			var actionIcon = function ( data, type, row ) {
				
				var test=data.id;
				var csname=data.CustomerName;
				console.log("======data=======",data)
				console.log("======data.VisitAction=======",data.VisitAction)
				
				
																	
								
				
				if(data.VisitAction == "New" ) {
					
					if((localStorage.getItem("role")=="PM")&&(data.TimeOut!=null)){
						/*return '<td> <input type="button" class="btn btn-primary btn-block Open" value="Open" ua_id="'+test+'" >'
							+ '<input type="button" class="btn btn-success btn-block Accept" value="Accept"  ua_id="'+test+'" >'
							+ '<input type="button" class="btn btn-danger btn-block Reject" value="Reject"  ua_id="'+test+'" >'
							+'</td>';
							*/
						return '<td> <input type="button" class="btn btn-success btn-block Accept" value="Accept"  ua_id="'+test+'" >'
							+ '<input type="button" class="btn btn-danger btn-block Reject" value="Reject"  ua_id="'+test+'" >'
							+'<input type="button" class="btn btn-success btn-block Reopen" value="Reopen"  ua_id="'+test+'" >'
							+'</td>';		
						}			
				}else{
					//if(data.VisitAction == "Open") {
					//	return '<td> <span class="label label-primary">'+data.VisitAction+'</span> </td>';
					//}
					if(data.VisitAction == "Accept"){ 
						return '<td> <span class="text-dark">'+data.VisitAction+'ed</span> </td>';
					}if(data.VisitAction == "Reject") {
						return '<td> <span class="text-dark">'+data.VisitAction+'ed</span> </td>';
					}if(data.VisitAction == "Reopen") {
					
						if(localStorage.getItem("role")=="PM"){
							return '<td> <span class="text-dark">'+data.VisitAction+'ed</span> </td>';
						}
						if(localStorage.getItem("role")=="SI Co-Ordinator"){
							return `<td> <input type="button" class="btn btn-secondary rounded-pill px-3 editReopen" value="Edit"  ua_id="${test}" cs_name="${csname}" >  </td>`;						
						}
					}
					
				}
			///
			};
		
		$('#progressBarFull').hide();			
					
			tableData = $('#approvedTasksList').DataTable( {
						
				 dom: 'Blfrtip',   
				 buttons: [ 
					//'excel', 
					'print'
				 ,{
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,19,20,21,23,25,26,27,28,29,30,31,32,33,34]
                    }
                }],
			 	 destroy: true,
				 scrollX: true,
				scrollY: true,
			//   scrollCollapse: true,
	            width: '100%',
				 data: data.result,
				 "initComplete": function(settings, json) {
				  },
				 
				 columns: [
						 { "data": "JobId" },		// 	<th>JOBID</th>
						 { "data": "Site" },		//	 <th>Site ID </th>
						 { "data": "Location" },		//	<th>Location </th>
					 	 { "data": "ProductName" }, //  <th>ProductName</th>
						 { "data": "CustomerName" },		//	<th>CustomerName </th>
						 { "data": "pm_name" },		//	<th>PM_name </th>
	
						 { "data": "Plan_Id" }, //	<th>Plan_Id </th>
						 { "data": "Ring_name" }, //	<th>Ring_name </th>						 
					 	 { "data": "Release_Date" },	// <th>Plan_Release_Date	</th>
					 	 { "data": "region" }, //<th>region	</th>
					 	 { "data": "company" }, // <th>company	</th>
					 	 { "data": "TE_Name" }, //<th>TE Name	</th>
					 	 { "data": "CreatedDate", 
							 	 	 render: function (data, type, row) {
		          			return moment(new Date(data).toString()).format('DD-MM-YYYY HH:mm:ss');
		        		}
					 	 }, // <th>CreatedDate	</th>
					 	 { "data": "date", 
							 	 	 render: function (data, type, row) {
		          			return moment(new Date(data).toString()).format('DD-MM-YYYY');
		        		} }, // <th>date </th>
						 { "data": "TimeIn", 
							 	 	 render: function (data, type, row) {
		          			return moment(new Date(data).toString()).format('DD-MM-YYYY HH:mm:ss');
		        		} },	// <th>TimeIn	</th>
						 { "data": "InRemark" },	// <th>InRemark </th>
						 { "data": null,					// <th>PhotoIN	</th>
						 	render:function(data,type,row) {	
			            		var checkUrl = data.PhotoIN;
			            		console.table("checkURL :--- " + checkUrl);
			            		if(checkUrl == null){
										return "";
									}else{
		//		            		var modifiedUrl = checkUrl.replace("D:\\project\\git project\\spring_boot\\ECI\\ECI-API_10/webapps", 
		//		            				"https://proapp.co.in");
				            		var modifiedUrl = checkUrl.replace(app_global_path,app_global_url);		
				            				
				            		data.PhotoIN = modifiedUrl;
				            		console.table("Data check", data.PhotoIN);
				            		//var action ='<a class="btn01" href='+data.Photo4+' target="_blank">Photo4</a>';
				            		
				            		var indexstr=checkUrl.indexOf("UploadPhoto");
									console.log("p2222222222-" ,indexstr);
									var path="https://proapp.rbbn.com/"+ checkUrl.substr(indexstr);
				            		console.log("path-" ,path);		
				            		
				            		//var action ='<a class="btn01" href='+data.Photo2+' target="_blank">Photo4</a>';
				            		var action ='<a class="btn01" href='+path+' target="_blank">PhotoIN</a>';
				            		
				            		return action;
			            		}
		            		}  
						 },
						  { "data": null,		//  <th>Photo_IN</th>
				            	render:function(data,type,row) {
				            		var checkUrl = data.PhotoIN;
				            		
				            		if(checkUrl == null){
										return "";
									}else{
					            		console.table("checkURL :--- " + checkUrl);
			/*		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
					            				"https://proapp.co.in");
			*/		            	//	var modifiedUrl = checkUrl.replace(app_global_path,app_global_url);		
					            	//	return modifiedUrl;
					            		
					            		var indexstr=checkUrl.indexOf("UploadPhoto");
										var path="https://proapp.rbbn.com/"+ checkUrl.substr(indexstr);
										return path;
				            		
				            		}
				            	}   
				            },
				            { "data": null,		// <th>InLocation</th>
						 	render:function(data,type,row) {	
			            		var checkUrl = data.InLocation;
			            		if(checkUrl == null){
									return "";
								}else{
				            		var action ='<a class="btn01" href='+checkUrl+' target="_blank">InLocation</a>';
				            		
				            		return action;
		            			}  
		            		}
						 },	
						 { "data": null, 	//  <th>In_Location</th>
						 	render:function(data,type,row) {	
			            		var checkUrl = data.InLocation;
			            		if(checkUrl == null){
									return "";
								}else{
				            		return checkUrl;
		            			}  
		            		}
						 },
						 
						 { "data": "TimeOut", 
							 	 	 render: function (data, type, row) {
		          						if(data==null) 
										{ 
											return "" 
										} 
										else
		          						{ return moment(new Date(data).toString()).format('DD-MM-YYYY HH:mm:ss');  
		          						}
		        			
		        			}
		        		 },	 // <th>TimeOut	</th>
					 	 { "data": "OutRemark" },	 // <th>OutRemark	</th>
					 	 { "data": null, 			// 					<th>PhotoOut</th>
							 	render:function(data,type,row) {	
				            		var checkUrl = data.PhotoOut;
				            		if(checkUrl == null){
										return "";
									}else{
					            		console.table("checkURL :--- " + checkUrl);
		//			            		var modifiedUrl = checkUrl.replace("D:\\project\\git project\\spring_boot\\ECI\\ECI-API_10/webapps", 
		//			            				"https://proapp.co.in");
					            		var modifiedUrl = checkUrl.replace(app_global_path,app_global_url);		
					            				
					            		data.PhotoOut = modifiedUrl;
					            		console.table("Data check", data.PhotoOut);
					            		//var action ='<a class="btn01" href='+data.Photo4+' target="_blank">Photo4</a>';
					            		
					            		var indexstr=checkUrl.indexOf("UploadPhoto");
										console.log("p2222222222-" ,indexstr);
										var path="https://proapp.rbbn.com/"+ checkUrl.substr(indexstr);
					            		console.log("path-" ,path);		
					            		
					            		//var action ='<a class="btn01" href='+data.Photo2+' target="_blank">Photo4</a>';
					            		var action ='<a class="btn01" href='+path+' target="_blank">PhotoOut</a>';
					            		
					            		return action;
			            			}  
			            		}
						 	},
						  { "data": null,					// 	<th>Photo_Out</th>
				            	render:function(data,type,row) {
				            		var checkUrl = data.PhotoOut;
				            		if(checkUrl == null){
										return "";
									}else{
					            		console.table("checkURL :--- " + checkUrl);
			/*		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
					            				"https://proapp.co.in");
			*/		            	//	var modifiedUrl = checkUrl.replace(app_global_path,app_global_url);		
					            	//	return modifiedUrl;
					            		
					            		var indexstr=checkUrl.indexOf("UploadPhoto");
										var path="https://proapp.rbbn.com/"+ checkUrl.substr(indexstr);
										return path;
				            		
				            		}
				            	}   
				            },
						 
						 { "data": null,	// <th>OutLocation</th>
				 			render:function(data,type,row) {	
			            		var checkUrl = data.OutLocation;
			            		if(checkUrl == null){
									return "";
								}else{
				            		var action ='<a class="btn01" href='+checkUrl+' target="_blank">OutLocation</a>';
				            		
				            		return action;
		            			}  
		            		}
						 },
						 { "data": null,	// 	<th>Out_Location</th>
				 			render:function(data,type,row) {	
			            		var checkUrl = data.OutLocation;
			            		if(checkUrl == null){
									return "";
								}else{
				            		return checkUrl;
		            			}  
		            		}
						 },
						 
						 { "data": "Visit" },	 // <th>Visit Type	</th>
					 	 { "data": "Activity" },  // <th>Activity	</th>	
					 	 { "data": "Issue" },	// <th>Issue	</th>
						 { "data": "activity_status" }, // <th>Activity Status</th>	
						 { "data": "VisitCount" },	// <th>VisitCount	</th>
						 { "data": "jobid_Status" }, // <th>JOBID Status </th>
					 	 { "data": "Stages" }, //	<th>JOBID Stage </th>	
					 	 { "data": "jobcompletiondate" },	// <th>jobcompletiondate	</th>
						 
                 /*    { "data": null ,	
				 			render:function(data,type,row) {	
			            		var checkUrl = data.region;
			            		if(checkUrl == null){
									return "";
								}else{
									 var myArray = checkUrl.split("-");
									 var word = myArray[1];
									
				            		return word;
		            			}  
		            		} 
                     
                     },  // <th>Circle_Name</th>
                     */
                     { "data": actionIcon }, // <th>Action</th>
		            
				
				 ],
				 "columnDefs": [{
				    "targets": '_all',
				    "defaultContent": ""
					},
					//hide the second & fourth column
			       { 'visible': false, 'targets': [4,5,6,7,8 ,12,13,17,19,23,25,32] }
				
				],
				 "order": [[0, 'desc']],
	    } );
	});
	}
}


$(document).on("click", ".Open", function(e){
	
	var id = $(this).attr("ua_id");
	
	console.log("-id id id --", id);
	
	swal({
	text: "Do You Want To Open the Tasks?",
	buttons: [
	 'NO',
	  'YES'
	
	],
	}).then(function (isConfirm) {
	    if(isConfirm){
				
			updateVisitAction(id,"Open");
	
		}
	})
	
});

$(document).on("click", ".Accept", function(e){
	
	var id = $(this).attr("ua_id");
	
	console.log("-id id id --", id);
	
	swal({
	text: "Do You Want To Accept This Visit?",
	buttons: [
	 'NO',
	  'YES'
	
	],
	}).then(function (isConfirm) {
		    if(isConfirm){
				
			updateVisitAction(id,"Accept");
	
		}
	})
	
});

$(document).on("click", ".Reject", function(e){
	
	var id = $(this).attr("ua_id");
	
	console.log("-id id id --", id);
	
	swal({
		text: "Do You Want To Reject This Visit?",
		buttons: [
		 'NO',
		  'YES'
		
		],
	}).then(function (isConfirm) {
		    if(isConfirm){
				
			updateVisitAction(id,"Reject");
	
		}
	})
	
});

$(document).on("click", ".Reopen", function(e){
	
	var id = $(this).attr("ua_id");
	
	console.log("-id id id --", id);
	
	swal({
		text: "Do You Want To Reopen This Visit?",
		buttons: [
		 'NO',
		  'YES'
		
		],
	}).then(function (isConfirm) {
		    if(isConfirm){
				
			updateVisitAction(id,"Reopen");
	
		}
	})
	
});


$(document).on("click", ".editReopen", function(e){
	
	/*	instId = $(this).attr("incid");
	
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
	
	*/
	
	 custname = $(this).attr("cs_name");
	var checkInid = $(this).attr("ua_id");
	
	console.log("-id id id --", checkInid);
	
	$.get(url+"getVisitDetail/"+checkInid, function( data ) {
		
		console.log("-getVisitDetail result---",data);
		console.log("-getVisitDetail result---",data.data);
		console.log("-getVisitDetail result---",$.parseJSON(data.data));
		var datar = $.parseJSON(data.data);
		console.log("-getVisitDetail result---",datar[0].Activity);
		
		
		var visitid 	= datar[0].Visit ;
		 gactivitid	= datar[0].Activity ;
		 gissuesid 	= datar[0].Issue ;
		 gvStatusid 	= datar[0].Status ;
		
			getUserTaskList("getVisitTypes","#visitTypes",visitid);
		
		
			
		/*	
			setTimeout(
				  function() 
				  {
				    console.log("======getActivitiesByVisit========",visitid,"====",activitid,"====",gvtid);
			getUserTaskList("getActivitiesByVisit","#activities",visitid,activitid);
			getUserTaskList("getIssuesByVisit","#issues",visitid,issuesid);
			getUserTaskList("getVisitStatusByVisit","#visitStatus",visitid,vStatusid);
				    
				    
				    
				  }, 800);
			*/
	});
	
	$("#checkInid").val(checkInid);
	
	$("#reOpenEditModal").modal('show');
});


function updateVisitAction(checkInid,visitAction){
	
	$.get(url+"updateVisitAction/"+checkInid+"/"+visitAction, function( data ) {
		
		console.log("-showdetailsbtn result---",data);
			getlist($('#dateTo').val(),$('#dateFrm').val());
	});
}


$(document).on("change", "#dateFrm", function(e){
	
	console.log("-id id id -dateFrm---");
	
	getlist($('#dateTo').val(),$('#dateFrm').val());
	
});

$(document).on("change", "#dateTo", function(e){
	
	console.log("-id id id -dateTo---");
	
	getlist($('#dateTo').val(),$('#dateFrm').val());
		
});


$(document).on("change", "#visitTypes", function(e){
	
	console.log("-id id id -dateTo---");
	
	var  visitid = $("#visitTypes").val();
	
	
			getUserTaskList("getActivitiesByVisit","#activities",visitid,"");
			getUserTaskList("getIssuesByVisit","#issues",visitid,"");
			getUserTaskList("getVisitStatusByVisit","#visitStatus",visitid,"");
		
});


function getUserTaskList(actionUrl,divName,visitid,TaskId){
	
	var dataVal = {
			
			"id" 	: $('#visitTypes option:selected').attr('vtid'),
			
		};
	
	console.log("getUserTaskList======dataVal===",dataVal)
	
		$.ajax({
		   type: 'POST',
		   url: url+actionUrl,  //from API add new data
		   data : JSON.stringify(dataVal),
		   processData: false,
		   contentType: "application/json",
   
			   success: function(result) {
	
	
				var CtrObj = $.parseJSON(result.data);
	
				console.log("=============="+divName+"===="+visitid+"========"+TaskId+"====",CtrObj);
				
				$(divName).empty()
				$(divName).append('<option value=0 >- Select Task Engineer-</option>');
				
				$.each(CtrObj, function(key,val) {
						
					if(actionUrl == "getVisitTypes"){
						
						if(custname == "Bharti Airtel" ){
							
							if(val.cust_name == 1){
								$(divName).append(`<option value="${val.visit_type}" vtid=${val.id} >${val.visit_type}</option>`);	
								console.log("======="+custname+"========"+divName+"============"+actionUrl);
							}
							
						}else{
							$(divName).append(`<option value="${val.visit_type}" vtid=${val.id} >${val.visit_type}</option>`);	
							console.log("=============="+divName+"============"+actionUrl);
						}
						
						
					}			
					if(actionUrl == "getVisitStatusByVisit"){
						$(divName).append(`<option value="${val.status}">${val.status}</option>`);
						console.log("=============="+divName+"============"+actionUrl);	
					}			
					if(actionUrl == "getIssuesByVisit"){
						$(divName).append(`<option value="${val.issue}">${val.issue}</option>`);
						console.log("=============="+divName+"============"+actionUrl);	
					}			
					if(actionUrl == "getActivitiesByVisit"){
						$(divName).append(`<option value="${val.activity}">${val.activity}</option>`);
						console.log("=============="+divName+"============"+actionUrl);	
					}			
						
				});
				if(actionUrl == "getVisitTypes"){
					$(divName).val(visitid);
					
					console.log("=====selected=========",$('#visitTypes option:selected').attr('vtid'));
					
					gvtid = $('#visitTypes option:selected').attr('vtid');
					
					getUserTaskList("getActivitiesByVisit","#activities",visitid,gactivitid);
					getUserTaskList("getIssuesByVisit","#issues",visitid,gissuesid);
					getUserTaskList("getVisitStatusByVisit","#visitStatus",visitid,gvStatusid);
					
				}
				if(actionUrl == "getVisitStatusByVisit"){
					$(divName).val(TaskId);	
				}			
				if(actionUrl == "getIssuesByVisit"){
					$(divName).val(TaskId);	
				}			
				if(actionUrl == "getActivitiesByVisit"){
					$(divName).val(TaskId);	
				}	
					
			}
		});
}


$(document).on("click", "#siUpdateTask", function(e){
	
	console.log("=====selected=========",$('#visitTypes option:selected').attr('vtid'));
	
	console.log("=====selected==activities=======",$('#activities').val());
	
	if(NotAllowedNullVal("#pmErrAdd","Visit Types ",$('#visitTypes')))
	if(ValidationForSelectBox("#pmErrAdd","Visit Types",$('#visitTypes')))
	if(NotAllowedNullVal("#pmErrAdd","Activities ",$('#activities')))
	if(ValidationForSelectBox("#pmErrAdd","Activities",$('#activities')))
	if(NotAllowedNullVal("#pmErrAdd","Issues",$('#issues')))
	if(ValidationForSelectBox("#pmErrAdd","Issues",$('#issues')))
	if(NotAllowedNullVal("#pmErrAdd","Visit Status",$('#visitStatus')))
	if(ValidationForSelectBox("#pmErrAdd","Visit Status",$('#visitStatus'))){
	
	var dataVal = {
			
			"activity":$("#activities option:selected").text(),
			"visit":$("#visitTypes option:selected").text(),
			"issue":$("#issues option:selected").text(),
			"status":$("#visitStatus option:selected").text(),
			"id":$("#checkInid").val()
		};
		
		console.log(dataVal);
	
		$.ajax({
		   type: 'POST',
		   url: url+"updateReopenVisit",  //from API add new data
		   data : JSON.stringify(dataVal),
		   processData: false,
		   contentType: "application/json",
   
			   success: function(result) {
	
				$("#reOpenEditModal").modal('hide');
				getlist($('#dateTo').val(),$('#dateFrm').val());
			}
		});
	}
});
