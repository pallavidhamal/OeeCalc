var tableData = $('#regionMasterTable').DataTable();
$(document).ready(function() 
		{
		
		
		console.log("---Region page---");
		var i = 0;
		var regionId ="";
		getRegionList();
		
		
		
//function for get all region list					
	function getRegionList(){
		
		$.get(url+"getRegions", function( data ) { //from API list
			
			console.log("getAllRegionList_regionInfo res----",data);
			
			tableData.destroy();
			
			$('#regionMasterTable.tbody').empty();
			
			var editIcon = function ( data, type, row ) {
				 
		        if ( type === 'display' ) {
		            
		        return '<td>'
				+'<a href="" data-toggle="modal" RegionId='+data.RegionId+'>'
				+'<span title="Edit" class="fa fa-edit" id="editIconComment"></span>'
				+'</a>'
				+'</td>'
		        }
		        
		        return data;
				};
				
				var stateIcon = function ( data, type, row ) {
					i=i+1;
				if ( type === 'display' ) {
					console.log("reg res-data data data---",data);
					console.log("reg res-data data data---",data.IsDeleted);
					
					if(data.IsDeleted == 'Y'){
						
						return '<button type="button" class="btn btn-toggle state" data-toggle="button" aria-pressed="false" autocomplete="off" RegionId='+data.RegionId+'>'
						+'<div class="handle"></div>'
						+'</button>';
						
					}
					if(data.IsDeleted == 'N'){
						return '<button type="button" class="btn btn-toggle active state" data-toggle="button" aria-pressed="false" autocomplete="off" RegionId='+data.RegionId+'>'
						+'<div class="handle"></div>'
						+'</button>';
					}
					
				
				}
				
				return data;
				};
				var table = $('#regionMasterTable').DataTable( {
					
					 dom: 'Blfrtip',   
					 buttons: ['excel', 'print'],
				 	 destroy: true,
					 data: data.result,
					 "initComplete": function(settings, json) {
					 //   makeProgressHidden();
					  },
					 
					  columns: [
						    { "data": "RegionName" },
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
			
			
			/*$.each(data.result, function(key,val) {
		
			console.log("getAllRegionList_regionInfo res data----",data.result);
			
			regionId = val.RegionId;
			
			$('#regionListData').append('<tr><td>'+val.RegionName+'</td>'							
										+'<td>'
										+'<a href="" data-toggle="modal" RegionId='+val.RegionId+'>'
										+'<span title="Edit" class="fa fa-edit" id="editIconComment"></span>'
										+'</a>'
										+'</td>'
										+'<td>'
										+'<div class="toggle-group">'
										+'<input type="checkbox" class="switch-new-class state" name="on-off-switch" id="on-off-switch'+i+'" checked="" tabindex="1" RegionId='+val.RegionId+'>'
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
										+'</tr>');	
		i++;
		});*/

		});
	}	
				
//function for get all region list
	
	changeState(); //function call for active/ inactive
	


//function on click add modal
		$("#regionAddAction").bind("click",function(){
				
				console.log("add button clicked.");
			
				callAddRemoveClassFunction($("#regionnameadd"));
				callAddRemoveClassFunction($("#regiondesadd"));
			 
				$("#addErr").empty();
		
		});	
//function on click add modal	


		
// click on edit modal
		$(document).on("click", "#editIconComment", function(e){
			
				console.log("Edited this Region deatils :");
				
				RegionId = $(this).parent().attr("RegionId");
				console.log("Edited this RegionId deatils :"+RegionId);
		
		
				$.ajax({

						type: 'get',
						url: url+"getRegionDetail/"+RegionId,  //from API on click of edit icon
						data : JSON.stringify(RegionId),
						contentType: "application/json",
				
						success: function(result) {
							
						console.log("getRegionDetail--Information result===",result);
					
						var CtrObj = $.parseJSON(result.data);
						console.log("getRegionDetail--Information result=CtrObj==",CtrObj[0]);
						console.log("getRegionDetail--Information result=CtrObj RegionName==",CtrObj[0].RegionName);
						
						$("#regionnameedit").val(CtrObj[0].RegionName);
						
					}
				});
		
				callEditRemoveClassFunction($("#regionnameedit"));
		 
				$("#editErr").empty();
				$("#editPopupScreen").modal('show');
		 
		});
//function on edit modal
	

		
//function save data
		$("#AddregionMaster").bind("click",function() {

						console.log("RegionName",$("#regionnameadd").val());
						
						if(NotAllowedNullVal("#addErr","Region Name",$('#regionnameadd')))
						//if(AllowedOnlyAlphabetsVal("#addErr","Region Name",$('#regionnameadd')))
						{
						var dataVal = {
							   
						"region":$("#regionnameadd").val(),
						"authKey":localStorage.getItem("authkey")
					     }
						
						console.log("v====== ",dataVal);
						
						$.ajax({
						
								type: 'POST',
							    url: url+"insertRegion",  //from API add new data
							    data : JSON.stringify(dataVal),
							    contentType: "application/json",
							    
							    success: function(result) {
							    	
								console.log("insert--Information result==="+result);
								
								if(result.result==true){
									
									window.location.href = "RegionMaster";	 
									
								}else if(result.result==false){
									
									window.location.href = "sessionOut";
									
								}
								
							    }
						});
						}
								
		});
//function save data	
	


//function update data

	$(document).on("click", "#EditRegMaster", function(e){
	
			console.log("Update--Information");

			if(NotAllowedNullVal("#editErr","Region Name",$('#regionnameedit')))
			//if(AllowedOnlyAlphabetsVal("#editErr","Region Name",$('#regionnameedit')))
				{
			   
				var dataVal = {
					
				"id": RegionId,
			    "region":$("#regionnameedit").val(),
			    "authKey":localStorage.getItem("authkey")
			   }
				
			   console.log("Update--Information dataVal Edit == ",dataVal);
		
				$.ajax({
			
						type: 'PUT',
					    url: url+"updateRegion",  //from API update data
					    data : JSON.stringify(dataVal),
					    contentType: "application/json",
					    
					    success: function(result) {
			    	
						console.log("Update--Information result==="+result);
						
						if(result.result==true){
							
							window.location.href = "RegionMaster";	 
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
				
				    }
					});
		
				}
	});
//function update data





//function for active/ inactive		
	function changeState(){
			
		$(document).on("click", ".state", function(e){
				 
				  console.log("hiiiiiii region-----------",$(this).attr("RegionId"));
			      var isChecked = $(this).attr("aria-pressed");
			      console.log('isChecked inctive: ' + isChecked); 
			      
			      var dataVal = {
	    		  			"id":$(this).attr("RegionId"),
	    		  			"authKey":localStorage.getItem("authkey")
	   	    	   		}
			      
			      if(isChecked == "false") {
			    	  
			    	  console.log('hhhrhrhrhrhrhrhr---hhhrhrhrhrhrhrhr--: '); 
			    	  $.ajax({

					        type: 'PUT',
							url: url+"inactivateRegion",  //from API on click of edit icon
							data : JSON.stringify(dataVal),
							contentType: "application/json",

							success: function(result) {
								
							console.log("inactivateRegion--Information result===",result);
							
							}
						});
			      }
			      if(isChecked == "true") {
			    	  
			    	  console.log('hhhrhrhrhrhrhrhr---hhhrhrhrhrhrhrhr-hhhrhrhrhrhrhrhr-: '); 
			    	  $.ajax({

					        type: 'PUT',
							url: url+"activateRegion",  //from API on click of edit icon
							data : JSON.stringify(dataVal),
							contentType: "application/json",

							success: function(result) {
								
							console.log("activateTask result===",result);
							
							}
						});
			      }
			      
			    });
	}
//function for active/ inactive			
		
}); //end document ready


