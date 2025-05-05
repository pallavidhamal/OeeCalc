			
var delProdID = "";
var editProdID = "";
var tableData = $('#purchaseOrderList').DataTable();

$(document).ready(function(){
	
	getStationList();
		
});
			
//click on add button
$(document).on("click", "#purchaseAddAction", function(e){
	
	console.log(" click on purchase Add Action");
	
	 $('#machintypeSel').empty();
	 $('#uomSel').empty();
	 $('#ponumber').empty();
	 
	 getStationTypeList("add");
	 getUOMList("add");
	 getWorkCentreList("add");
	 
	 $("#add_po").modal("show");
});


$(document).on("click", ".edit-button", function(e){


		var editId = $(this).attr('id');
		console.log("editId----",editId);

 		getStationTypeList("edit");
	 	getUOMList("edit");
	 	getWorkCentreList("edit");

		$("#edit_po").modal("show");


		$.ajax({
		    type: 'GET',
		    url: server_url + `station/get/${editId}`,
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: false,
		    data: null,
		    success: function (response) {
		
				console.log("------response ----------",response);
		
				var data = response.payload;
		
				console.log("------response data----------",data);
		
			}
		})
});


$(document).on("click", "#editPurchaseData", function(e){


 		getStationTypeList("edit");
	 	getUOMList("edit");
	 	getWorkCentreList("edit");

$("#edit_po").modal("show");

	 if(ValidationForSelectBox("#poErrAdd","Station Type",$('#addStationType')))
		 if(NotAllowedNullVal("#poErrAdd","Station Number ",$('#addStationNumber')))
			 if(ValidationForSelectBox("#poErrAdd","UOM ",$('#addUom')))
				{
		 
		 var dataVal = {
		 
				 name				: $('#addStationNumber').val(),
				 stationtypeid 		: $('#addStationType').val(),
				 uomid				: $('#addUom').val(),
				 workcenterid		: $('#addWorkCentre').val(),

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
							
							$("#add_po").modal("hide");
						// $('#myTbody').empty();
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
					}
			});
		}
});

	
			
//get purchase order list
function getStationList(){  

		console.log("-------------------Welcome to product getPOList");
	$.ajax({
		    type: 'GET',
		    url: server_url + "station/allActive",
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
        $('#purchaseOrderList.tbody').empty();
		
        //if(data.result == "success"){
			
        var editIcon = function ( data, type, row ) 
        {
		    if ( type === 'display' ) {
		           
		   	 	return '<span class="button" data-toggle="modal" data-target="#edit_po"> Edit </span>';
		        
		    }
	       
	    	return data;
	    };
	    
	    tableData = $('#purchaseOrderList').DataTable( {
		
	    			dom: 'Blfrtip',   
	    			buttons: ['excel', 'print'],
				 	 destroy: true,
    				 data: data,

					  columns: [
					{ "data": "stationtype" },
				    { "data": "name" },
				    { "data": "uom" },
				    { "data": "workcenter" },
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
				
			}	
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
				
			}	
		});
	
} //end of get StationType list			

//get StationType list
function getWorkCentreList(divId){
		
	$.ajax({
	    type: 'GET',
	    url: server_url + "workcenter/getAllActive",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (response) {
	
			console.log("==========response=====",response)
			
					$("#"+divId+"WorkCentre").empty();			
					$("#"+divId+"WorkCentre").append('<option value=' + 0+ '>  - Select workcenter - </option>');
									
					$.each(response.payload, function( index, value ){
									
					$("#"+divId+"WorkCentre").append('<option value="'+ value.id + '">'+ value.name+' </option>');
					
				    });
				
			}	
		});
	
} 

			

$(document).on("click", "#addPurchaseData", function(e){


	 if(ValidationForSelectBox("#poErrAdd","Station Type",$('#addStationType')))
		 if(NotAllowedNullVal("#poErrAdd","Station Number ",$('#addStationNumber')))
			 if(ValidationForSelectBox("#poErrAdd","UOM ",$('#addUom')))
				{
		 
		 var dataVal = {
		 
				 name				: $('#addStationNumber').val(),
				 stationtypeid 		: $('#addStationType').val(),
				 uomid				: $('#addUom').val(),
				 workcenterid		: $('#addWorkCentre').val(),

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
							
							$("#add_po").modal("hide");
						// $('#myTbody').empty();
							
						}else if(result.result==false){
							
							window.location.href = "sessionOut";
							
						}
					}
			});
		}
});



$(document).on("click", ".delete-button", function () {

var deleteId = $(this).attr('id');
console.log("deleteId"+deleteId);

swal({
text: "Are you sure, please confirm?",
buttons: [
 'Cancel',
  'Ok'

],
}).then(function (isConfirm) {
    if(isConfirm){
    
        $.ajax({
            
   	 	});	
	}
})
});
	