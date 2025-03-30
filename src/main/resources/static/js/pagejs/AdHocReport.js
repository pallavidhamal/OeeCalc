
		var tableData = $('#adHocReportList').DataTable();
		var tableData2 = $('#adHocReportList2').DataTable();
		var tableData3 = $('#adHocReportList3').DataTable();
	
		$(document).ready(function(){
			
			generateAdhocCustomerList();
			generateProductList("0");
						
			 var cId = GetURLParameter('custId');
			 var pId = GetURLParameter('prodId');
			 var dateFrom = GetURLParameter('dateFrom');
			 var dateTo = GetURLParameter('dateTo');
			 
			 
			 console.log("cId----",cId);
			 console.log("dateFrom----",dateFrom);
			 console.log("dateTo----",dateTo);
			 
			
			 var dataVal = {
				     "customerId"	  	:cId,
				     "productId"	  	:pId,
				     "dateFrom"	:dateFrom,
				     "dateTo"	:dateTo
				 
			    	}	
			 
			 console.log("dataVal----",dataVal);
			 
			 getlist(dataVal);
			 
			 getlist1(dataVal);
			 
			 getlist2(dataVal);
			 
			 
			 
			 
			 $("#custList").on("change", function(e)		
			{		
							var customerId = $( "#custList" ).val();
							console.log("----------click on change customerId------------",customerId);
							generateProductList(customerId);
							
			});
			 
			 
			 
			 
		});
				
		
		function generateAdhocCustomerList(){
			

			$('#custList').empty();
			
			$.get(url+"getCustomers", function( data ) { //from API list
				
			console.log("---------------data.result----------",data.result);
			
			$('#custList').append('<option value=' + 0+ '> -- Select Customer Name -- </option>');
			
				
				$.each(data.result, function(key,val) {
					
					console.log("-------------val.EmpId--------",val.CustomerID);
					
					console.log("-------------val.EmpId--------",val.Cust_Name);
						
				$("#custList").append('<option value='+val.CustomerID+'>'+val.Cust_Name+'</option>');
				
						
				});
						
		});
		
}

		
		function generateProductList(customerId){
					
					console.log("-----generateProductList--111----");

					$("#prodList").empty();
					
					//$.get(url+"getProducts", function( data ) { //from API list
					
					
					$.get(url+"getCustWiseProductList/"+customerId, function( data ) { //from API list
						
						console.log("--getProductList----data----------",data);
						console.log("--getProductList----data.result----------",data.result);
						console.log("--getProductList----data.result.Name----------",data.result[0].ProdId);
					console.log("---------------data.result----------",data.result);
					
					$('#prodList').append('<option value=' + 0+ '> ALL  </option>');
					
					
					$.each(data.result, function(key,val) {
						
					console.log("-------------val.Name--------",val.Name);
					
					$("#prodList").append('<option value='+val.ProductId+'>'+val.Name+'</option>');
					
							
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



$(document).on("click", "#AdHocReportSubmit", function(e){
	
	
			console.log("--------click on custList-------",$("#custList").val());
			console.log("--------click on #prodList-------",$("#prodList").val());
			console.log("--------click on #dateFrm-------",$("#dateFrmad").val());
			console.log("--------click on #dateTo-------",$("#dateToad").val());
			
			
			if(ValidationForSelectBox("#reportErr2","Customer Name ",$('#custList')))
//				if(ValidationForSelectBox("#reportErr2","Product Name ",$('#prodList')))
				if(NotAllowedNullVal("#reportErr2","From date ",$('#dateFrmad')))
					if(NotAllowedNullVal("#reportErr2","To date ",$('#dateToad'))){
				
				//window.location.href = "AdHocReport?custId="+$("#custList").val()+"&prodId="+$("#prodList").val()+"&dateFrom="+$("#dateFrm").val()+"&dateTo="+$("#dateTo").val();
				//window.location.href = "AdHocReport?custId="+$("#custList").val()+"&prodId="+$("#prodList").val()+"&dateFrom="+$("#dateFrmad").val()+"&dateTo="+$("#dateToad").val();
				
				window.location.href = "AdHocReport?custId="+$("#custList").val()+"&prodId="+$("#prodList").val()+"&dateFrom="+$("#dateFrmad").val()+"&dateTo="+$("#dateToad").val();
				
			}
			
			
			 
			 
			/*
			 
			 window.location.href = "ApprovedTasks?siId;
			*/ 
			 
});

function getlist(dataVal){

				 
		
	
			dataVal.strMode = 'ATP';
			 console.log("--getlist---------",dataVal);
				
				
			
			 $.ajax({
				
				type: 'POST',
				url: url+"getAdHocReport",  //from API update data
				data : JSON.stringify(dataVal),
				contentType: "application/json",
	    
				success: function(data) {
	    	
				console.log("getAdHocReport=data==",data);
				
				
			//	console.log("-- getAdHocReport=data.result==",data.result);--
				
				//console.log("-- getAdHocReport=data.resultJobIdJobIdJobIdJobId==",data.result[0].JobId);
				
			
				tableData.destroy();
			       
				$('#adHocReportList.tbody').empty();
	
				var actionIcon = function ( data, type, row ) {
					
				/*	console.log("--herehere----ididid----------",data.id); 
					
					console.log("--herehere----TaskId----------",data.TaskId);
					
					console.log("--herehere----CustomerName----------",data.CustomerName);
					
					console.log("--herehere----ProductName----------",data.ProductName);
					*/
					
					var test=data.id;
					var res = parseInt(test)-parseInt(1);
					
				//	console.log(test);
					
					var downDiv = "";
					
					if(data.status_id == 15){
						downDiv = '<a data-auto-download href="../ProApp/GeneratePDF/ATP'+res+'.pdf" class="table-input-btn cust-btn-style complete_job_cust_btn" download>Download ATP </a>' +
						'<input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" id="generatePdfAction"  value="Create ATP" idval="'+data.id+'" CustomerName="'+data.CustomerName+'" ProductName="'+data.ProductName+'" >';
					}
					
				if ( type === 'display' ) {
				
				return ' <td><input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" value="View Details" data-toggle="modal" data-target="#showdetails" id="showdetailsbtn" incid='+data.id+' TaskId='+data.TaskId+'> '+
				downDiv + '</td>';
				
//server
			
				
				
				}
				return data;
				};
						
						
				tableData = $('#adHocReportList').DataTable( {
							
							 dom: 'Blfrtip',   
							 buttons: [ 'excel', 'print'],
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
		    		            
		    		            	{ "data": "region_name" },
		    		            
		    		            { "data": "Site" },
		    		            { "data": "Location" },
		    		            { "data": "Stages" },
		    		            
			    		        	{ "data": "pm_name" },
			    		        	{ "data": "si_Company" },
			    		        	{ "data": "si_co_ordinator" },
			    		        	{ "data": "status_name" },
			    		        	
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


function getlist1(dataVal){

	dataVal.strMode = 'UPDATE';
	 console.log("--getlist1---------",dataVal);
	
	 $.ajax({
		
		type: 'POST',
		url: url+"getAdHocReport",  //from API update data
		data : JSON.stringify(dataVal),
		contentType: "application/json",

		success: function(data) {
	
	//	console.log("getAdHocReport=data1==",data);
		
		
	//	console.log("-- getAdHocReport=data.result1==",data.result);
		
		//console.log("-- getAdHocReport=data.resultJobIdJobIdJobIdJobId==",data.result[0].JobId);
		
	
		tableData2.destroy();
	       
		$('#adHocReportList2.tbody').empty();

		var actionIcon = function ( data, type, row ) {
			
			console.log("--herehere----ididid----------",data.id); 
			
			console.log("--herehere----TaskId----------",data.TaskId);
			
			console.log("--herehere----CustomerName----------",data.CustomerName);
			
			console.log("--herehere----ProductName----------",data.ProductName);
			
			
			var test=data.id;
			
			console.log(test);
			
		if ( type === 'display' ) {
		
		return '  <td><input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" value="View Details" data-toggle="modal" data-target="#showdetails2" id="showdetailsbtn2" incid2='+data.id+' TaskId2='+data.TaskId+' </td>';
			
		}
		return data;
		};
				
				
		tableData2 = $('#adHocReportList2').DataTable( {
					
					 dom: 'Blfrtip',   
					 buttons: [ 'excel', 'print'],
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
   		            { "data": "Site" },
		            { "data": "Location" },
   		            { "data": "Stages" },
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

function getlist2(dataVal){

	dataVal.strMode = 'WIRE';
	 console.log("--getlist22---------",dataVal);
	
	 $.ajax({
		
		type: 'POST',
		url: url+"getAdHocReport",  //from API update data
		data : JSON.stringify(dataVal),
		contentType: "application/json",

		success: function(data) {
	
		console.log("getAdHocReport=data1==",data);
		
		
		console.log("-- getAdHocReport=data.result1==",data.result);
		
		//console.log("-- getAdHocReport=data.resultJobIdJobIdJobIdJobId==",data.result[0].JobId);
		
	
		tableData3.destroy();
	       
		$('#adHocReportList3.tbody').empty();

		var actionIcon = function ( data, type, row ) {
			
			console.log("--herehere----ididid----------",data.id); 
			
			console.log("--herehere----TaskId----------",data.TaskId);
			
			console.log("--herehere----CustomerName----------",data.CustomerName);
			
			console.log("--herehere----ProductName----------",data.ProductName);
			
			
			var test=data.id;
			
			console.log(test);
			
		if ( type === 'display' ) {
		
		return '  <td><input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" value="View Details" data-toggle="modal" data-target="#showdetails3" id="showdetailsbtn3" incid3='+data.id+' TaskId3='+data.TaskId+' </td>';
			
		}
		return data;
		};
				
				
		tableData3 = $('#adHocReportList3').DataTable( {
					
					 dom: 'Blfrtip',   
					 buttons: [ 'excel', 'print'],
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
  		            { "data": "Site" },
		            { "data": "Location" },
  		            { "data": "Stages" },
  		            { "data": "WireLength"},
  		            
  		       //     { "data": actionIcon },
  		           
  				 
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
				
				
				
//});
		
		
		}
	});

}

$(document).on("click", "#showdetailsbtn", function(e){
		
			console.log("--------click on showdetailsbtn-------");
			
			
			var incid=$(this).attr("incid");
			
			var TaskId= $(this).attr("TaskId");
			
			 var dataVal = {
				     "id"	  	:incid,
				     "taskId"	  	:TaskId,
				     "strMode":"ATP"
			    	}	
			 console.log("dataVal----",dataVal);
		
			
			$.ajax({
				
				type: 'POST',
				url : url+"getJobdetailsImg",  //from API update data
				data : JSON.stringify(dataVal),
				//data : {pdfid,ProductName,CustomerName},
				contentType: "application/json",
	    
				success: function(result) {
	    	
				console.log("Update--Information cancelRecord===",result);
				console.log("Update--Information cancelRecord===",result.result);
				
				
				$('#imgJobata').empty();
				
				$.each(result.result, function(key,val) {
					console.log("-showdetailsbtn parameter---",val.parameter);
					console.log("-showdetailsbtn TestValue---",val.TestValue); //C:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps/ATPPhoto/387_2019.04.30.12.14.27_57.jpg
					var str = val.TestValue;

					console.log("-str  str  str ---",str);


					//var str1 = str.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 
				//	9.0/webapps", "http://101.53.136.239:4443");
//						var str1 = str.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", "http://101.53.136.239");

					//var str1 = str.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", "https://proapp.co.in");

					var str1 = str.replace(app_global_path,app_global_url)

					//str1=val.TestValue;
					
					
					console.log("-str  str  str str str1---",str1);
					console.log("-str  str  str str str1 val.TestValue---",str );

					console.log("-showdetailsbtn TestValue--Photo 1-",val.TestValue);
					
					 $('#imgJobata').append('<thead><tr class="orange"><th>'+val.parameter+'<img id="myImg" src="'+str1+'"  style="width:20%;max-width:50px"></th></tr></thead>');

					
					/*if(val.parameter=='Photo 1'){
						
						console.log("-showdetailsbtn TestValue--Photo 1-",val.TestValue);
						
						 $('#imgJobata').append('<thead><tr class="orange"><th>Photo 1  <img id="myImg" src="'+str1+'"  style="width:20%;max-width:50px"></th></tr></thead>');
						
            									
					}else if(val.parameter=='Photo 2'){
						console.log("-showdetailsbtn TestValue--Photo 2-",val.TestValue);
						
						 $('#imgJobata').append('<thead><tr class="orange"><th>Photo 2  <img id="myImg" src="'+str1+'" style="width:20%;max-width:50px"></th></tr></thead>');
					}
					else if(val.parameter=='Photo 3'){
						console.log("-showdetailsbtn TestValue--Photo 2-",val.TestValue);
						
						 $('#imgJobata').append('<thead><tr class="orange"><th>Photo 3  <img id="myImg" src="'+str1+'" style="width:20%;max-width:50px"></th></tr></thead>');
					}
					else if(val.parameter=='Photo 4'){
						console.log("-showdetailsbtn TestValue--Photo 2-",val.TestValue);
						
						 $('#imgJobata').append('<thead><tr class="orange"><th>Photo 4  <img id="myImg" src="'+str1+'" style="width:20%;max-width:50px"></th></tr></thead>');
					}
					else if(val.parameter=='Photo 5'){
						console.log("-showdetailsbtn TestValue--Photo 2-",val.TestValue);
						
						 $('#imgJobata').append('<thead><tr class="orange"><th>Photo 5  <img id="myImg" src="'+str1+'" style="width:20%;max-width:50px"></th></tr></thead>');
					}
					else if(val.parameter=='Photo 6'){
						console.log("-showdetailsbtn TestValue--Photo 2-",val.TestValue);
						
						 $('#imgJobata').append('<thead><tr class="orange"><th>Photo 6 <img id="myImg" src="'+str1+'" style="width:20%;max-width:50px"></th></tr></thead>');
					}
					
					else if(val.parameter=='wire used in (meter)'){
						console.log("-showdetailsbtn TestValue--wire used in (meter)-",val.TestValue);
						
						 $('#imgJobata').append('<thead><tr class="orange"><td >Power Cable Lenght : "'+val.TestValue+'"</td></th></thead>');
					}*/
					
					
					
					
					
					
					
					
					/*else {
						console.log("no data available-");
						
						 $('#imgJobata').append('<thead><tr class="orange"><th>no data available  <img id="myImg" alt="Snow" style="width:20%;max-width:50px"></th></tr></thead>');
					}*/
										
						 
					});
				
				//$('#imgJobata').append('<thead><tr class="orange"><th>no data available  <img id="myImg"  style="width:20%;max-width:50px"></th></tr></thead>');
				
				}
			});
	
});


$(document).on("click", "#showdetailsbtn2", function(e){
	
	console.log("--------click on showdetailsbtn2-------");
	var incid=$(this).attr("incid2");
	var TaskId= $(this).attr("TaskId2");
	
	 var dataVal = {
		     "id"	  	:incid,
		     "taskId"	  	:TaskId,
		     "strMode":"UPDATE"
	    	}	
	 console.log("dataVal----",dataVal);
	
	$.ajax({
		type: 'POST',
		url : url+"getJobdetailsImg",  //from API update data
		data : JSON.stringify(dataVal),
		contentType: "application/json",
		success: function(result) {
	
		console.log("Update--Information cancelRecord===",result);
		console.log("Update--Information cancelRecord===",result.result);
		
		$('#imgJobata2').empty();
		
		$.each(result.result, function(key,val) {
			console.log("-showdetailsbtn2 parameter---",val.parameter);
			console.log("-showdetailsbtn2 TestValue---",val.TestValue); //C:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps/ATPPhoto/387_2019.04.30.12.14.27_57.jpg
			var str = val.TestValue;

			console.log("-str  str  str ---",str);

			var str1=str;
			//str1 = str1.replace("C:\\\\Program Files\\\\Apache Software Foundation\\\\Tomcat 9.0/webapps", "http://101.53.136.239:4443");
			//str1 = str1.replace("C:\\\\Program Files\\\\Apache Software Foundation\\\\Tomcat 9.0/webapps", "http://101.53.136.239");
		//	str1 = str1.replace("C:\\\\Program Files\\\\Apache Software Foundation\\\\Tomcat 9.0/webapps", "https://proapp.co.in");
			
			 str1 = str1.replace(app_global_path1,app_global_url)


			console.log("-str  str  str str str1---",str1);
			console.log("-str  str  str str str1 val.TestValue---",str );
			
			console.log("-showdetailsbtn2 TestValue--Photo 1-",val.TestValue);
			
			 $('#imgJobata2').append('<thead><tr class="orange"><th>'+val.parameter+'<img id="myImg2" src="'+str1+'"  style="width:20%;max-width:50px"></th></tr></thead>');
				 
			});
		
		//$('#imgJobata').append('<thead><tr class="orange"><th>no data available  <img id="myImg"  style="width:20%;max-width:50px"></th></tr></thead>');
		
		}
	});

});

$(document).on("click", "#generatePdfAction", function(e){
	
	
	$('#progressBar').show();
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
				$('#progressBar').hide();
				
				if(result.result==true){
					
					getList();  
					
				}else if(result.result==false){
					
					window.location.href = "sessionOut";
					
				}
				//$("#editPopupScreen").modal('hide');
				}
			});
	
});

$(document).on("click", "#showdetailsbtn3", function(e){
	
	console.log("--------click on showdetailsbtn3-------");
	var incid=$(this).attr("incid3");
	var TaskId= $(this).attr("TaskId3");
	
	 var dataVal = {
		     "id"	  	:incid,
		     "taskId"	  	:TaskId,
		     "strMode":"WIRE"
	    	}	
	 console.log("dataVal----",dataVal);
	
	$.ajax({
		type: 'POST',
		url : url+"getJobdetailsImg",  //from API update data
		data : JSON.stringify(dataVal),
		contentType: "application/json",
		success: function(result) {
	
		console.log("Update--Information cancelRecord===",result);
		console.log("Update--Information cancelRecord===",result.result);
		
		$('#imgJobata3').empty();
		
		$.each(result.result, function(key,val) {
			console.log("-showdetailsbtn3 parameter---",val.parameter);
			console.log("-showdetailsbtn3 TestValue---",val.TestValue); //C:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps/ATPPhoto/387_2019.04.30.12.14.27_57.jpg
			var str = val.TestValue;

			console.log("-str  str  str ---",str);

		//	var str1 = str.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", "http://101.53.136.239:4443");
		//str1 = str1.replace("C:\\\\Program Files\\\\Apache Software Foundation\\\\Tomcat 9.0/webapps", "http://101.53.136.239");
	//	str1 = str1.replace("C:\\\\Program Files\\\\Apache Software Foundation\\\\Tomcat 9.0/webapps", "https://proapp.co.in");
		
		var str1 = str.replace(app_global_path,app_global_url)

			console.log("-str  str  str str str1---",str1);
			console.log("-str  str  str str str1 val.TestValue---",str );
			
			console.log("-showdetailsbtn3 TestValue--Photo 1-",val.TestValue);
			
			// $('#imgJobata3').append('<thead><tr class="orange"><th>'+val.parameter+'<img id="myImg3" src="'+str1+'"  style="width:20%;max-width:50px"></th></tr></thead>');
			 $('#imgJobata3').append('<thead><tr class="orange"><th>'+val.parameter+ '--'+str1+'</th></tr></thead>');
				 
			});
		
		//$('#imgJobata').append('<thead><tr class="orange"><th>no data available  <img id="myImg"  style="width:20%;max-width:50px"></th></tr></thead>');
		
		}
	});

});

/*$(document).on("click", "#showdetailsbtn", function(e){
	
	var id = tableData.row($(this).parent().parent()).id();
	
	console.log("-id id id --", $(this).attr("idval"));
	
	
	$.get(url+"getCompleteJobDetails/"+$(this).attr("idval")"", function( data1 ) {
		
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

});*/
