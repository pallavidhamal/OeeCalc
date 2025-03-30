
		console.log("-------------------Welcome to Unassigned Page------------------");
		
		var tableData = $('#unassignedTable1').DataTable();
		var tableData1 = $('#approvaltbl').DataTable();
		
		var JobId, inscId;
		
		 var chkVal;
		
		$(document).ready(function(){
			
			getInsReassignList();
			
			getInsApprovalList();

		
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
		
		
//get  list
		function getInsReassignList(){
	
			var i = 0;
					console.log("------get unassigned list----------");
	
					$.get(url+"getInsToReassignList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					//	$('#unassignedTable1').DataTable().$('.dt-checkboxes').prop('disabled', true);
					console.log("--unassigned list----data----------",data);
					console.log("--unassigned list----data.result-thithis---------",data.result);
					
					console.log("--unassigned list----data.result-thithis---------",data.id);
					
					tableData.destroy();
       
					$('#unassignedTable1.tbody').empty();
		
			/*		var editIcon = function ( data, type, row ) {
				 
			        if ( type === 'display' ) {
			        	
			        inscId = data.id;
			        	
			       // return '<td class="sorting_1 text-center"><input type="checkbox" class="messageCheckbox" value = '+data.id+'></td>'; name="sport"
			        	 return '<td class="sorting_1 text-center"><input type="checkbox" name="sport" class="dt-checkboxes checkVal" value = '+data.id+' idinc = '+data.id+'></td>';

			        }
			        
			        return data;
					};
			    */
					
					
					var deleteIcon = function ( data, type, row ) {
					
					console.log("--unassigned list---Remark Remark Remark---------",data.Remark); 
					if ( type === 'display' ) {
						
						i = i + 1;
					//return ' <td><input type="text" class="table-input-item"><input type="button" class="table-input-btn updateRemark" value="Update"></td>';
					return '<td><input type="text" class="table-input-item" placeholder="Enter Remark" id = "remark'+i+'" value="'+data.Remark+'">'
						+'<input type="button" class="table-input-btn updateRemark" value="Update" JobId='+data.id+' cnt = '+i+'  recId="'+data.recId+'" typeFlag="'+data.typeFlag+'"> </td>';
				       
					}
					return data;
					};
					i++;
					var table = $('#unassignedTable1').DataTable( {
						"pageLength": 5,
						dom: 'Blfrtip',   
						buttons: ['excel', 'print'],
				 	 destroy: true,
				 	 rowId:"id",
    				 data: data.result,
    				 
    				 "initComplete": function(settings, json) {
					  },
    				 
    				 columns: [
    					{ "data": "id"},
    					{ "data": "JobId" },
    				    { "data": "CustomerName" },
    		            { "data": "ProductName" },
    		            { "data": "Stages" },
    		            { "data": "Site" },
    		            { "data": deleteIcon },
    				 
    				 ],
    				 "columnDefs": 
					 [	
						 {
					           'targets': 0,
					            'checkboxes': {
					               'selectRow': true
					            },
					         }
						
		            ],
		           'select': {
		                'style': 'multi'
		             },
    				"order": [[1, 'desc']],
		    } );
			
	});
	}
//get  list


		
		function getInsApprovalList(){
			
			var i = 0;
					console.log("------get getInsApprovalList list----------");
	
					$.get(url+"getInsApprovalList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					
					console.log("--unassigned list----data----------",data);
					console.log("--unassigned list----data.result----------",data.result);

					tableData1.destroy();
       
					$('#approvaltbl.tbody').empty();
		
					/*var editIcon = function ( data, type, row ) {
				 
			        if ( type === 'display' ) {
			        	
			        inscId = data.id;
			        	
			       // return '<td class="sorting_1 text-center"><input type="checkbox" class="messageCheckbox" value = '+data.id+'></td>';
			        
			        	 return '<td class="sorting_12"><input type="checkbox" class="dt-checkboxes" name="approv" value = '+data.id+'></td>';

			        }
			        
			        return data;
					};*/
				//	$('#approvaltbl').DataTable().$('.dt-checkboxes').prop('disabled', true);
					
					var table = $('#approvaltbl').DataTable( {
						"pageLength": 5,
						dom: 'Blfrtip',   
						buttons: [ 'csv', 'excel', 'print'], 
						destroy: true,
						rowId:"id",
						data: data.result,
    				 "initComplete": function(settings, json) {
					  },
    				 
    				 columns: [
    					 { "data": "id"},
    					 /*{ "data": editIcon },*/
    					 { "data": "JobId" },
    				    { "data": "CustomerName" },
    		            { "data": "ProductName" },
    		           // { "data": "Stages" },
    		            { "data": "Site" },
    		           // { "data": deleteIcon },
    				 
    				 ],
    				 "columnDefs": 
					 [	
						 {
				            'targets': 0,
				            'checkboxes': {
				               'selectRow': true
				            }
				         }
		            ],
		            'select': {
		                'style': 'multi'
		             },
		             'order': [[1, 'asc']]
		    } );
			
	});
	}
		

		
		
//get  list
	/*	
$(document).on("click", "#unassignedTable1", function(e){
			
		//	idinc=$(this).attr("idinc");
			
			$('input[type="checkbox"]').click(function(){
	            if($(this).is(":checked")){
	            	
	            	 console.log("-----rows_selected--hrhrh- this-",$(this).val());
	                alert("Checkbox is checked.");
	                
	                favorite.push($(this).val());
	                
	                console.log("-----rows_selected--join-",favorite.join(", "));
	                
	                //("#hidenval").val("12");
	            }
	            else if($(this).is(":not(:checked)")){
	                alert("Checkbox is unchecked.");
	            }
	        });
		
		});*/
/*		
$("#unassignedTable1").find("input[type='checkbox']").each(function(){
	
    if ($(this).prop('checked')==true){ 
        //do something
    	 alert("Checkbox is checked ");
    	 console.log("-----rows_selected--hrhrh- this-",$(this).val());
    	 favorite.push($(this).val());
    	 console.log("-favorite-----",favorite.join(", "));
    }
    
});
*/
		var rows_selected;	
		$(document).on("click", "#assignClick", function(){
			
			generateSubContractorList();
			
		    var table = $('#unassignedTable1').DataTable();
		    
		    var data = table.rows().data();
		     
		    console.log( 'The table has ' + data.length + ' records' );
		    console.log( 'Data', data );   
		    
		    rows_selected = table.column(0).checkboxes.selected();
		    
		    console.log( 'The table has ------------------------------- ' ,rows_selected);
		    
		    console.log( 'The table has ------------------------------- ' ,rows_selected.join(","));
		   
		    
		});
		
		
		
		$(document).on("click", "#assignSI", function(e){
			 
			 console.log( 'The table has ------------------------------- ' ,rows_selected);

			 var selectedSI = $('#subContractorListadd').val();
			
				 dataVal = {
					 
					"instid"	:rows_selected.join(","),
			    	"siId"	    :selectedSI,
			    	"authKey"   :localStorage.getItem("authkey")
			    	
			 }
				 console.log( 'The table has ----dataVal--------------------------- ' ,dataVal);
			 $.ajax({
					
					type: 'POST',
					url: url+"updateReassignSI",  //from API update data
					data : JSON.stringify(dataVal),
					processData: false,
					contentType: "application/json; charset=utf-8",
		    
					success: function(result) {
		    	
					//console.log("Update--updateReassignSI result==="+result);
					if(result.result==true){
						
						$("#assign").modal('hide');
						getInsReassignList();  
						
					}else if(result.result==false){
						
						window.location.href = "sessionOut";
						
					}
					
					
					
					}
				});
			 
			
		});
		
	
		
		$('.remarkThis').each(function(){
            
			
			 
			
        });
		
		
		$(document).on("click", ".updateRemark", function(e){

			
					console.log("--------click on update--------");
					
					id = $(this).attr("JobId");
					console.log("--------click on update--JobId------",id);
					cnt = $(this).attr("cnt");
					
					console.log("Edited this task deatils :"+cnt);
					remarkid= "#remark"+cnt;
					
					console.log("Edited remarkid  :"+remarkid);
					
					var str = $(remarkid).val();
					console.log("--remark val------click str---",str);
					
					
					if($.trim(str) != "")
					{
					
						var dataVal = {
							
							"id"		: id,
					    	"remark"    :$(remarkid).val().trim(),
					    	"typeFlag"	:$(this).attr("typeFlag"),
					    	"recId"		:$(this).attr("recId"),
					    	"authKey"   :localStorage.getItem("authkey")
					    	}
					
					console.log("--------click on dataVal-------",dataVal);
						
						
					$.ajax({
						
						type: 'POST',
						url: url+"updateReassignremark",  //from API update data
						data : JSON.stringify(dataVal),
						processData: false,
						contentType: "application/json; charset=utf-8",
			    
						success: function(result) {
			    	
						console.log("Update--Information result===",result);
						
						if(result.result==true){
							
							getInsReassignList(); 
							$("#showmesg").modal('show');
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
						}
					});
					}else{
						alert("Remark is manadatory.");
					}
		});
		
		
		
		
		$(document).on("click", "#seekApproval", function(e){

			
			 var table1 = $('#approvaltbl').DataTable();
			    
			    var data = table1.rows().data();
			     
			    console.log( 'The table has ' + data.length + ' records' );
			    console.log( 'Data', data );   
			    
			    console.log( 'table1.column(0)----------------------------- ' ,table1.column(0).checkboxes.selected());
			    
			    var rows_selected1 = table1.column(0).checkboxes.selected();
			    
			    console.log( 'The table has 1111------------------------------- ' ,rows_selected1);
			    
			    console.log( 'The table has 11------------------------------- ' ,rows_selected1.join(","));
			
			
						console.log("--------click on seekApproval--------");
					
					 	var dataVal = {
							
							"instid": rows_selected1.join(","),
							"authKey":localStorage.getItem("authkey")
					    	}
					
						console.log("----seekApproval----click on dataVal-------",dataVal);
					
						$.ajax({
						
						type: 'POST',
						url: url+"seekApproval",  //from API update data
						data : JSON.stringify(dataVal),
						processData: false,
						contentType: "application/json; charset=utf-8",
			    
						success: function(result) {
			    	
						console.log("Update--seekApproval result==="+result);
						
						
						
						if(result.result==true){
							
							getInsApprovalList();  
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}

						}
					});
								
		});
		

