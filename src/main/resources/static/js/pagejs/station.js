			
var delProdID = "";
var editProdID = "";
var editId ="";
var tableData = $('#stationList').DataTable();
var apiName="";
var editWcId="";

$(document).ready(function(){
	
		 if(role=="AA" || role=="MAU")
		 {
		 	apiName="all";
		 }
		 							
		 if(role=="PLU")
		 {
			var unitString = localStorage.getItem("set") ; 
									
				console.log("===========unitString============", unitString);
				
				 var unitArray = unitString.split("#")
				 unitid = unitArray[0];
				 
				  apiName="getStationByUnit/"+unitid;
		 }
	
	getStationList(apiName);
		
});
			
//click on add button
$(document).on("click", "#stationAddAction", function(e){
	
	console.log(" click on station Add Action");
	
	 $('#machintypeSel').empty();
	 $('#uomSel').empty();
	 $('#ponumber').empty();
	 
	 $('#addStationNumber').val('');
	 
	 getUnitList("add");
	 
	 getStationTypeList("add");
	 getUOMList("add");
	 
	 
	 if(role=="AA" || role=="MAU")
	 {
	 	apiName="getAllActive";
	 }
	 							
	 if(role=="PLU")
	 {
		
		
		var unitString = localStorage.getItem("set") ; 
							
		console.log("===========unitString============", unitString);
		
		 var unitArray = unitString.split("#")
		 unitid = unitArray[0];
		
		 apiName="getWorkcenterByUnit/"+unitid;
	 }
	 
	// getWorkCentreList("add",apiName);
	 
	 $("#add_station").modal("show");
});


$(document).on("change", "#addUnit", function(e){
	 
	   var optionSelected = $("option:selected", this);
	     unitid = this.value;
		// alert(unitid)
		apiName="getWorkcenterByUnit/"+unitid;
		getWorkCentreList("add",apiName);
		
		//getFilterPlanningList();
		
});	



$(document).on("click", ".edit-button", function(e){


		editId = $(this).attr('id');
		console.log("editId----",editId);

		//getUnitList("edit");
		
 		getStationTypeList("edit");
	 	getUOMList("edit");
	 	
		//
		if(role=="AA" || role=="MAU")
		 {
		 	//apiName="getAllActive";
		 }
		 							
		 if(role=="PLU")
		 {
			
			
			var unitString = localStorage.getItem("set") ; 
								
			console.log("===========unitString============", unitString);
			
			 var unitArray = unitString.split("#")
			 unitid = unitArray[0];
			
			// apiName="getWorkcenterByUnit/"+unitid;
		 }
		
		//
		
		

		$.ajax({
		    type: 'GET',
		    url: server_url + `station/get/${editId}`,
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: false,
		    data: null,
		    success: function (result) {
		
				console.log("------response ----------",result);
		
				var data = result.payload;
				console.log("------response data----------",data);

				editWcId=result.payload.workcenter.id;
				apiName="getWorkcenterByUnit/"+result.payload.unit.id;
				getWorkCentreList("edit",apiName);
				
								
				$('#editStationType').val(result.payload.stationtype.id);
				$('#editStationNumber').val(result.payload.name);
				$("#editUom").val(result.payload.uom.id);
			//	$("#editWorkCentre").val(result.payload.workcenter.id);
				$("#editUnit").val(result.payload.unit.name);
				
				
				
				$("#edit_station").modal("show");
		
			},
			error: function (error) {
	             console.log(error);
		   		 if (error.status == 401) {
			    	  window.location.href =  contextPath;
			      } else {
			    	if( error.responseJSON != undefined){
						errmssge=error.responseJSON.status;	
					
						if (error.responseJSON.status=="500"){
							console.log("in errr");
							 errorBlock("#error_block", error.responseJSON.message);
						}else{
						 	 errorBlock("#error_block", error.responseJSON.errors.message);
						}
					}
					else{
			   	  		console.log("Server Error! Please contact administrator");
			   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
			     	}
		     	}
	        },
		})
});

			
//get purchase order list
function getStationList(apiName){  

		console.log("-------------------Welcome to product getPOList");
	$.ajax({
		    type: 'GET',
		    url: server_url + "station/"+apiName,
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: false,
		    data: null,
		    success: function (response) {		


			console.log("------response data----------",response);


			var data = response.payload;
	
			console.log("------getPOList data----------",data);
	//		console.log("------getPOList data.result----------",data.result);
	//		
		
			tableData.destroy();
	        $('#stationList.tbody').empty();
			
	        //if(data.result == "success"){
				
	        var editIcon = function ( data, type, row ) 
	        {
			    if ( type === 'display' ) {
			           
			   	 	return '<span class="button" data-toggle="modal" data-target="#edit_po"> Edit </span>';
			        
			    }
		       
		    	return data;
		    };
	    
	    	tableData = $('#stationList').DataTable( {
		
	    			dom: 'Blfrtip',   
					buttons: [
						{extend : 'excel',
					exportOptions: {
					                columns: [0,1,2,3]
					            }	
							
							
						} ,
						
						 {extend : 'print'}],
					
					
				 	 destroy: true,
    				 data: data,

					  columns: [
					
					{ "data": "unit.name" },		
					{ "data": "workcenter.name" },					
					{ "data": "stationtype.name" },
				    { "data": "name" },
				    { "data": "uom.name" },
				    
				    { "data":  null,
			           render: function (data, type, row) {
			               var id = data.id;
			               var action = `<a  class="edit-button" id=${id}>Edit</a>
			                                   <a  class="delete-button" id=${id}>${data.isdeleted}</a> `;
			               return action;
			           },
		             },
					
		            ],
		            "order": [[0, 'desc']],
	    			} );
			}
	})
//		});
}
	//get purchase order list

			
//get StationType list
function getStationTypeList(divId){
		
	$.ajax({
	    type: 'GET',
	    url: server_url + "stationtype/allActive",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (response) {
	
			console.log("==========response=====",response)
			
				$("#"+divId+"StationType").empty();
				$("#"+divId+"StationType").append('<option value=' + 0+ '>  - Select Station Type - </option>');
								
				$.each(response.payload, function( index, value ){
								
				$("#"+divId+"StationType").append('<option value="'+ value.id + '">'+ value.name+' </option>');
				
			    });
				
			},
			error: function (error) {
	             console.log(error);
		   		 if (error.status == 401) {
			    	  window.location.href =  contextPath;
			      } else {
			    	if( error.responseJSON != undefined){
						errmssge=error.responseJSON.status;	
					
						if (error.responseJSON.status=="500"){
							console.log("in errr");
							 errorBlock("#error_block", error.responseJSON.message);
						}else{
						 	 errorBlock("#error_block", error.responseJSON.errors.message);
						}
					}
					else{
			   	  		console.log("Server Error! Please contact administrator");
			   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
			     	}
		     	}
	        },	
		});
	
} //end of get StationType list
			
			
//get StationType list
function getUOMList(divId){
		
	$.ajax({
	    type: 'GET',
	    url: server_url + "uom/allActive",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (response) {
	
			console.log("==========response=====",response)
			
					$("#"+divId+"Uom").empty();			
					$("#"+divId+"Uom").append('<option value=' + 0+ '>  - Select uom - </option>');
									
					$.each(response.payload, function( index, value ){
									
					$("#"+divId+"Uom").append('<option value="'+ value.id + '">'+ value.name+' </option>');
					
				    });
				
			},
			error: function (error) {
	             console.log(error);
		   		 if (error.status == 401) {
			    	  window.location.href =  contextPath;
			      } else {
			    	if( error.responseJSON != undefined){
						errmssge=error.responseJSON.status;	
					
						if (error.responseJSON.status=="500"){
							console.log("in errr");
							 errorBlock("#error_block", error.responseJSON.message);
						}else{
						 	 errorBlock("#error_block", error.responseJSON.errors.message);
						}
					}
					else{
			   	  		console.log("Server Error! Please contact administrator");
			   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
			     	}
		     	}
	        },	
		});
	
} //end of get StationType list			

//get StationType list
function getWorkCentreList(divId,apiName){
		
	
	
	$.ajax({
	    type: 'GET',
	    url: server_url + "workcenter/"+apiName,
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (response) {
	
			console.log("==========response=====",response)
			
					$("#"+divId+"WorkCentre").empty();			
					$("#"+divId+"WorkCentre").append('<option value=' + 0+ '>  - Select workcenter - </option>');
									
					$.each(response.payload, function( index, value )
					{
								
					if(value.id==editWcId)		
					{						
					$("#"+divId+"WorkCentre").append('<option selected value="'+ value.id + '">'+ value.name+'  ('+ value.unitDto.name +' ) </option>');
					}
					else
					{
						$("#"+divId+"WorkCentre").append('<option  value="'+ value.id + '">'+ value.name+'  ('+ value.unitDto.name +' ) </option>');

					}
					
					
				    });
				
			},
			error: function (error) {
	             console.log(error);
		   		 if (error.status == 401) {
			    	  window.location.href =  contextPath;
			      } else {
			    	if( error.responseJSON != undefined){
						errmssge=error.responseJSON.status;	
					
						if (error.responseJSON.status=="500"){
							console.log("in errr");
							 errorBlock("#error_block", error.responseJSON.message);
						}else{
						 	 errorBlock("#error_block", error.responseJSON.errors.message);
						}
					}
					else{
			   	  		console.log("Server Error! Please contact administrator");
			   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
			     	}
		     	}
	        },	
		});
	
} 

			

$(document).on("click", "#addStationData", function(e){

	if(SelectBoxNotAllowedNullVal($('#addUnit'),"Unit","#error_block"))
		if(SelectBoxNotAllowedNullVal($('#addWorkCentre'),"Workcenter","#error_block"))	
	 if(SelectBoxNotAllowedNullVal($('#addStationType'),"Station Type","#error_block"))
		 if(NotAllowedNullVal($('#addStationNumber'),"Station Number ","#error_block"))
			 if(SelectBoxNotAllowedNullVal($('#addUom'),"UOM ","#error_block"))
			 	if(SelectBoxNotAllowedNullVal($('#addWorkCentre')," Work Centre","#error_block")){
		 
		 var dataVal = {
		 
				 name				: $('#addStationNumber').val(),
				 stationtypeid 		: $('#addStationType').val(),
				 uomid				: $('#addUom').val(),
				 workcenterid		: $('#addWorkCentre').val(),
				 unitid		: 		$('#addUnit').val(),

			};
				 
			 
				 
		 	console.log("====data==dataVal===",dataVal);
				 
				 
				 $.ajax({
						
					   type: 'POST',
					   url: server_url+"station/add",  //from API add new data
					   data : JSON.stringify(dataVal),
			//		   processData: false,
					   headers: authHeader,
					   contentType: "application/json; charset=utf-8",
   
					   success: function(result) {
   	
						console.log("insert--Information result==="+result);
						
						if(result.status=="CREATED"){
							
							getStationList();
							
							$("#add_station").modal("hide");
						// $('#myTbody').empty();
							
						}
					},
				error: function (error) {
		             console.log(error);
			   		 if (error.status == 401) {
				    	  window.location.href =  contextPath;
				      } else {
				    	if( error.responseJSON != undefined){
							errmssge=error.responseJSON.status;	
						
							if (error.responseJSON.status=="500"){
								console.log("in errr");
								 errorBlock("#error_block", error.responseJSON.message);
							}else{
							 	 errorBlock("#error_block", error.responseJSON.errors.message);
							}
						}
						else{
				   	  		console.log("Server Error! Please contact administrator");
				   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
				     	}
			     	}
		        },
			});
		}
});



$(document).on("click", "#editStationData", function(e){

	if(SelectBoxNotAllowedNullVal($('#editWorkCentre'),"Workcenter","#error_block"))					
	 if(SelectBoxNotAllowedNullVal($('#editStationType'),"Station Type","#error_block"))
		 if(NotAllowedNullVal($('#editStationNumber'),"Station Number ","#error_block"))
			 if(SelectBoxNotAllowedNullVal($('#editUom'),"UOM ","#error_block"))
			 	if(SelectBoxNotAllowedNullVal($('#editWorkCentre')," Work Centre","#error_block")){
		 
		 var dataVal = {
			
				 stationid			: editId,
				 name				: $('#editStationNumber').val(),
				 stationtypeid 		: $('#editStationType').val(),
				 uomid				: $('#editUom').val(),
				 workcenterid		: $('#editWorkCentre').val(),

			};
				 
			 
				 
		 	console.log("====data==dataVal===",dataVal);
				 
				 
				 $.ajax({
						
					   type: 'PUT',
					   url: server_url+"station/edit",  //from API add new data
					   data : JSON.stringify(dataVal),
			//		   processData: false,
					   headers: authHeader,
					   contentType: "application/json; charset=utf-8",
   
					   success: function(result) {
   	
						console.log("update station--Information result==="+result.payload);
						console.log("update station--Information result==="+result.status);
						
						if(result.payload==true){
							
							
							getStationList();
							$("#edit_station").modal("hide");
							
							
						}
					},
				error: function (error) {
		             console.log(error);
			   		 if (error.status == 401) {
				    	  window.location.href =  contextPath;
				      } else {
				    	if( error.responseJSON != undefined){
							errmssge=error.responseJSON.status;	
						
							if (error.responseJSON.status=="500"){
								console.log("in errr");
								 errorBlock("#error_block", error.responseJSON.message);
							}else{
							 	 errorBlock("#error_block", error.responseJSON.errors.message);
							}
						}
						else{
				   	  		console.log("Server Error! Please contact administrator");
				   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
				     	}
			     	}
		        },
			});
		}
});



$(document).on("click", ".delete-button", function()
	{		 
		console.log("---del current row----------");
		  console.log("on delete====",$(this).attr("id"));
		  selid=$(this).attr("id");
		  swal({
		  text: "Are you sure, please confirm?",
		  buttons: [
		   'Cancel',
		    'Ok'

		  ],
		  }).then(function (isConfirm) {
		      if(isConfirm){
		      
				 $.ajax({
								
					   type: 'PUT',
					   url: server_url+"station/delete/"+selid,  //from API add new data
					   headers: authHeader,
					   processData: false,
					   contentType: "application/json; charset=utf-8",

					   success: function(result) {
							console.log("delete result==="+result);
							
							if(result.payload==true){
								getStationList();
								
							}
					   },
					error: function (error) {
			             console.log(error);
				   		 if (error.status == 401) {
					    	  window.location.href =  contextPath;
					      } else {
					    	if( error.responseJSON != undefined){
								errmssge=error.responseJSON.status;	
							
								if (error.responseJSON.status=="500"){
									console.log("in errr");
									 errorBlock("#error_block", error.responseJSON.message);
								}else{
								 	 errorBlock("#error_block", error.responseJSON.errors.message);
								}
							}
							else{
					   	  		console.log("Server Error! Please contact administrator");
					   	  		errorBlock("#error_block", "Server Error! Please contact administrator");
					     	}
				     	}
			        },
				});
		  }
		  })
		   
	});	
	
	
	function getUnitList(divId){
			
		$.ajax({
		    type: 'GET',
		    url: server_url + "unit/getActive",
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: false,
		    data: null,
		    success: function (response) {
		
			console.log("==========response=====",response)
			
				$("#"+divId+"Unit").empty();			
				$("#"+divId+"Unit").append('<option value=' +0+ '>  - All Unit - </option>');
								
				$.each(response.payload, function( index, value ){
								
				$("#"+divId+"Unit").append('<option value="'+ value.id + '">'+ value.name+' </option>');
				
			    });
			}	
		});
	}