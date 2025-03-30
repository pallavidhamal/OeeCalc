	    var i = 0;	
		console.log("---Region page---");
		var tableData = $('#taskMasterTable').DataTable();
		
	   $(document).ready(function() 
    		{
	
    				gettaskList(); //get task list
		
    				changeState(); //function call for active/ inactive
		
    		});
		
    	
		function gettaskList(){			
			
					$.get( url+"getTasks/"+localStorage.getItem("userId"), function( data ) { //from API list
						
					console.log("getTask res----",data);
					
					tableData.destroy();
					
					$('#taskMasterTable.tbody').empty();
					
					var editIcon = function ( data, type, row ) {
						 
				        if ( type === 'display' ) {
				            
				        return '<td>'
						+'<a href="" data-toggle="modal" TaskId='+data.TaskId+'>'
						+'<span title="Edit" class="fa fa-edit" id="editIconComment"></span>'
						+'</a>'
						+'</td>';
				        
				        }
				        
				        return data;
						};
						
						var stateIcon = function ( data, type, row ) {
							i=i+1;
							
							console.log("getTask res-data data data---",data);
							console.log("getTask res-data data data---",data.IsDeleted);
							
						if ( type === 'display' ) { 
			            
							if(data.IsDeleted == 'Y'){
								
								return '<button type="button" class="btn btn-toggle state" data-toggle="button" aria-pressed="false" autocomplete="off" TaskId='+data.TaskId+' chk = "1">'
								+'<div class="handle"></div>'
								+'</button>';
							}
							if(data.IsDeleted == 'N'){
								return '<button type="button" class="btn btn-toggle active state" data-toggle="button" aria-pressed="false" autocomplete="off" TaskId='+data.TaskId+' chk = "0">'
								+'<div class="handle"></div>'
								+'</button>';
							}
							
						}
						
						return data;
						};
						var table = $('#taskMasterTable').DataTable( {
							
							dom: 'Blfrtip',   
							buttons: ['excel', 'print'],
						 	 destroy: true,
							 data: data.result,
							 "initComplete": function(settings, json) {
							 //   makeProgressHidden();
							  },
							 
							  columns: [
								    { "data": "TaskName" },
								    { "data": editIcon },
						            { "data": stateIcon },
								 ],
								 "columnDefs": 
								 [	
					               {
					                    "targets": [ 1 ],
					                    "orderable": false
					                },
					                {
					                    "targets": [ 1 ],
					                    "orderable": false
					                }
					            ],
								 "order": [[0, 'desc']],

						    } );
						
		/*			$.each(data.result, function(key,val) {
						
					console.log("getAllRegionList_regionInfo res data----",data.result);
						
					$('#regionListData').append('<tr><td>'+val.TaskName+'</td>'							
													+'<td>'
													+'<a href="" data-toggle="modal" TaskId='+val.TaskId+'>'
													+'<span title="Edit" class="fa fa-edit" id="editIconComment"></span>'
													+'</a>'
													+'</td>'
													+'<td>'
													+'<div class="toggle-group">'
													+'<input type="checkbox" class="switch-new-class state" name="on-off-switch" id="on-off-switch'+i+'" checked="" tabindex="1" TaskId='+val.TaskId+'>'
													+'<label for="on-off-switch'+i+'">'
													+'</label>'
													+'<div class="onoffswitch pull-right" aria-hidden="true">'
													+'<div class="onoffswitch-label">'
													+'<div class="onoffswitch-inner"></div>'
													+'<div class="onoffswitch-switch"></div>'
													+'</div>'
													+'</div>'
													+'</div>'
													+'</td>'
													+' <td><label class="switch">'
													+'<input class="switch-input" type="checkbox" TaskId='+val.TaskId+'>'
													+'	<span class="switch-label" data-on="InActive" data-off="Active"></span>'
													+'	<span class="switch-handle"></span>'
													+'	</label></td>'
													<a href="" data-toggle="modal" data-target="#deletePopupScreen" title="Delete"><span class="fa fa-trash" id=""></span></a></td>'
													+'</tr>');	
						
						i++;
					
				});*/
			});//function for get all currency list
		}
		

	

// click on edit modal
		$(document).on("click", "#editIconComment", function(e){
					
					console.log("Edited this Region deatils :");
							
					TaskId = $(this).parent().attr("TaskId");
					console.log("Edited this task deatils :"+TaskId);
					
					$.ajax({
				
								type: 'get',
								url:  url+"getTaskDetail/"+TaskId,  //from API on click of edit icon
								data : JSON.stringify(TaskId),
								contentType: "application/json",
						
								success: function(result) {
									
								console.log("TaskId--Information result===",result);
									
								var CtrObj = $.parseJSON(result.data);
								console.log("--Information result=CtrObj==",CtrObj[0]);
								console.log("--Information result=CtrObj TaskName==",CtrObj[0].TaskName);
									
								$("#tasknameedit").val(CtrObj[0].TaskName);
									
								}
								});
					
					 callEditRemoveClassFunction($("#tasknameedit"));
					 
					 $("#editErr").empty();
					 $("#editPopupScreen").modal('show');
			 
		});//function	
		

//on click edit

		$(document).on("click", "#EditRegMaster", function(e){
		  	
					console.log("11111---"+TaskId);
		
					if(NotAllowedNullVal("#editErr","Task Name",$('#tasknameedit')))
					{
					   
					var dataVal = {
							
					"id": TaskId,
			    	"task":$("#tasknameedit").val(),
			    	"authKey":localStorage.getItem("authkey")
			    	}
					console.log("Update--Information dataVal Edit == ",dataVal);
				
					$.ajax({
					
							type: 'PUT',
							url: url+"updateTask/",  //from API update data
							//url: 'http://192.168.0.218:8080/Eci/updateTask',  //from API update data
							data : JSON.stringify(dataVal),
							contentType: "application/json",
				    
							success: function(result) {
				    	
							console.log("Update--Information result==="+result);
							 if(result.result==true){
									
							    	gettaskList();  
							    	$("#editPopupScreen").modal('hide');
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}							
				    }
				});
				
			 }
		});
		
		
//add modal
		$(document).on("click", "#taskAction", function(e){
		//$("#taskAction").bind("click",function(){
			
				console.log("------click on add -------");
					
				callAddRemoveClassFunction($("#tasknameadd"));
				$("#addErr").empty();
			
		});	


//onclick add
		$(document).on("click", "#Addtaskdata", function(e){
		//$("#Addtaskdata").bind("click",function() {
			//alert("hiii");

				console.log("TaskIdName  ",$("#tasknameadd").val());
				
				if(NotAllowedNullVal("#addErr","TaskId Name",$('#tasknameadd')))
				{
				
				var dataVal = {
				
			    "task":$("#tasknameadd").val(),
			    "authKey":localStorage.getItem("authkey")
						    	 }
					
				console.log("v====== ",dataVal);
					
				$.ajax({
						
						type: 'POST',
						//url: 'http://192.168.0.218:8080/Eci/insertTask',  //from API add new data
					    url: url+"insertTask",  //from API add new data
					    data : JSON.stringify(dataVal),
					    contentType: "application/json",
					    
					    success: function(result) {
					    	
						console.log("insert--Information result==="+result);
						
					    if(result.result==true){
							
					    	gettaskList();  
					    	
							$("#add_task").modal("hide");
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
					    
						
						
					    }
				
				});
				}
							
		});
		
		



//function for active/ inactive		
function changeState(){
		
	 console.log("hiiiiiiiiiiiiiiiiiii------changeState---------------");
	 
	 $(document).on("click", ".state", function(e){
			 
		 	  TaskId = $(this).attr("TaskId");
			  console.log("Edited this task deatils------ :"+TaskId);
		 
		      //var isChecked = $(this).is(':checked');
		      
		      var isChecked = $(this).attr("aria-pressed");
		      
		      
		     // alert($(this).attr("aria-pressed"))
		      console.log('isChecked-val-------: ',isChecked); 
		      
		      
		      var dataVal = {
		  		    
				      "id":TaskId,
				      "authKey":localStorage.getItem("authkey")
				   	   }
		      console.log('isChecked---hhhrhrhrhrhrhrhr-dataVal-: ',dataVal); 
		      
		      if(isChecked == "false") {
		    	  
		    	  console.log('false---hhhrhrhrhrhrhrhr--: '); 
		    	  $.ajax({

				        type: 'PUT',
						url: url+"inactivateTask",  //from API on click of edit icon
						data : JSON.stringify(dataVal),
						contentType: "application/json",

						success: function(result) {
							
						console.log("inactivateRegion--Information result===",result);
						
						console.log("inactivateRegion--Information result=.result.result.result==",result.result);
						
						/*if(result.result==true){
							
							gettaskList();
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}*/
						}
					});
		      }
		      if(isChecked ==  "true") {
		    	  
		    	  console.log('true---hhhrhrhrhrhrhrhr-hhhrhrhrhrhrhrhr-: '); 
		    	  $.ajax({

				        type: 'PUT',
						url: url+"activateTask",  //from API on click of edit icon
						data : JSON.stringify(dataVal),
						contentType: "application/json",

						success: function(result) {
							
						console.log("activateTask result===",result);
						
						console.log("activateTask result.result==",result.result);
						
						/*if(result.result==true){
							
							gettaskList();
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}*/
						}
					});
		      }
		      
	 		 });
				    
}
//function for active/ inactive			
