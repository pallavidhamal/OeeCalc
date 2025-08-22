var delProdID = "";
var editProdID = "";
var tableData = $('#lossSummaryList').DataTable();
var editId;
var unitid;

$(document).ready(function(){
				
	getUnitList("add");	
	console.log("========dataTableData=======",dataTableData);
	
	
	const today = new Date();
	const year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
	
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	
	const formattedToday = `${year}-${month}-${day}`;
	
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	let day1=1;
	
	const firstDayOfMonth1 = `${year}-${month}-01`;
	
	console.log("firstDayOfMonth1-",firstDayOfMonth1);
	console.log("formattedToday-",formattedToday);
	
	
	$('#prodDatefrm').val(firstDayOfMonth1);		 
	$('#prodDateto').val(formattedToday);
				
	$('#addUnit').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	    unitid = this.value;
		getWorkCentreList("add");
		//getUnitShifts();	
		getLossSummaryList();
	});

	$('#addWorkCenter').on('change', function (e) {
		 var optionSelected = $("option:selected", this);
		 var wsid = this.value;
	//	 getMachinesByWc(wsid);
		 getLossSummaryList();
			
	});
	
	$(document).on("change", "#prodDatefrm", function(e){
			getLossSummaryList();
	});

	$(document).on("change", "#prodDateto", function(e){
					getLossSummaryList();
	});
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
			$("#"+divId+"Unit").append('<option value=' + 0+ '>  - Select Unit - </option>');
							
			$.each(response.payload, function( index, value ){
							
			$("#"+divId+"Unit").append('<option value="'+ value.id + '">'+ value.name+' </option>');
			
		    });
			
		}	
	});
	
}
	
	
	function getWorkCentreList(divId){
			
		$.ajax({
		    type: 'GET',
		    url: server_url + "workcenter/getWorkcenterByUnit/"+unitid,
		    enctype: 'application/json',
		    headers: authHeader,
		    processData: false,
		    contentType: false,
		    data: null,
		    success: function (response) {
		
				console.log("==========response=====",response)
				
						$("#"+divId+"WorkCenter").empty();			
						$("#"+divId+"WorkCenter").append('<option value=' + 0+ '>  - Select workcenter - </option>');
										
						$.each(response.payload, function( index, value ){
										
						$("#"+divId+"WorkCenter").append('<option value="'+ value.id + '">'+ value.name+' </option>');
						
					    });
					
				}	
			});
		
	}
	
	
				
				function getLossSummaryList(){  
					
					var dataVal = 
					{
						 unitid       	: $('#addUnit').val(),
						 workcenterid 	: $('#addWorkCenter').val(),
					//	 shiftid       	: $('#addShift').val(),
					//	 stationid 		: $('#addSelMachine').val(),
					//	 operatorid     : $('#addOperator').val(),						 
						 fromdate		: $('#prodDatefrm').val(),						 
						 todate			: $('#prodDateto').val(),
						 
					};
								
					console.log("-------------------Welcome to product getFilterProductionList---------",dataVal);
					$.ajax({
					    type: 'POST',
					    url: server_url + "production/getLossSummary",
					    enctype: 'application/json',
					    headers: authHeader,
					    processData: false,
					    contentType: "application/json; charset=utf-8",
					    data: JSON.stringify(dataVal),
						
						success: function (response) {		

						console.log("------response data----------",response);

						var data = response.payload;
						console.log("------losssummary data----------",data);
				//		console.log("------getPOList data.result----------",data.result);
					
						
						tableData.destroy();
			       		 $('#lossSummaryList.tbody').empty();

			    
			    		tableData = $('#lossSummaryList').DataTable( {
				
			    			dom: 'Blfrtip',   
			    			buttons: ['excel', 'print'],
						 	 destroy: true,
		    				 data: data,
							 
							 "columnDefs": [{
							         "targets": "_all",
							         "defaultContent": ""
							     }],

							  columns: [
							{ "data": "stationname" },
							{ "data": "totPlannedMins",
								render: function (data, type, row) {
					            	return data.toFixed(2);
				           		}, 
			           		},
						    { "data": "availabilityMachinebreakdown" },
							
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityMachinebreakdown / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
						    { "data": "availabilitySetupchange" },
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilitySetupchange / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
							
							
							{ "data": "availabilityNomaterial" },
							
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityNomaterial / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
							
							
						    { "data": "availabilityNolabour" },
							
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityNomaterial / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
							
						    { "data": "availabilityInpectiontime" },
							
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityInpectiontime / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
																				
							{ "data": "availabilityTooling" },
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityTooling / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
							
							
						    { "data": "availabilityDrawing" },
							
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityDrawing / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
							
						    { "data": "availabilityGuages" },
							
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityGuages / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
							
							{ "data": "availabilityOtherlosses" },
							
							{ "data":  null,
					           		render: function (data, type, row) {
					               	   var setupPer = (data.availabilityOtherlosses / data.totPlannedMins)*100 ;
						            	return setupPer.toFixed(2);
					           		},
					         },
							
							
							
							
				            ],
							
				            initComplete: function (settings, json) {
						      var table = settings.oInstance.api();
						      var api = this.api();
						      
						    /*  table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
						        drawSpecialRow(this, table);
						      } );*/
						    },
				            "order": [[0, 'desc']],
			    			} );
							console.log("------333----------");
						}
					})
				//		});
				}												
function drawSpecialRow(row, table) {
  var data = row.data();
  if(data.prodPlanningDto==null) return;
  
  var mansions = [];
  var flats = [];
  var num = data.prodPlanningDto.length;
  for(var i=0; i<num; i++) {
    var house = data.prodPlanningDto[i];
      mansions.push(house);
  }
  
    row.child( format(mansions, flats, true) ).show();
  
}

function format(mansions, flats, ignoreFirst) {
  var max = Math.max(mansions.length, flats.length);
  var res = "";
  var init;
  if(ignoreFirst) init=1;
  else init=0;
  for(var i=init; i<max; i++) {
    var mansion;
    if(i < mansions.length) {
      mansion = mansions[i];
    } else{
      mansion = null;
    }
    var flat;
    if(i < flats.length) {
      flat = flats[i];
    } else{
      flat = null;
    }
    res += formatSingle(mansion, flat);
  }
  return $(res).toArray();
}

function formatSingle ( mansion, flat ) {
  var itemnameStr="";
  var setupnameStr="";
  var planned_qtyNumber="";
  var produced_qtyNumber="";
  var rejected_qtyNumber="";
  if(mansion != null) {
    itemnameStr  = mansion.item;
    setupnameStr = mansion.setup;
    planned_qtyNumber  = mansion.qty_planned
    produced_qtyNumber = mansion.qty_produced
    rejected_qtyNumber = mansion.qty_rejected
  }
  
  return '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td>'+itemnameStr+'</td>'+
            '<td>'+setupnameStr+'</td>'+
            '<td>'+planned_qtyNumber+'</td>'+
            '<td>'+produced_qtyNumber+'</td>'+
            '<td></td>'+
            '<td>'+rejected_qtyNumber+'</td>'+
            '<td></td>'+
        '</tr>';
}			