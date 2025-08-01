			
			var delProdID = "";
			var editProdID = "";
			var tableData = $('#wcOeeList').DataTable();
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
					getFilterPlanOverviewList();
					
					
				});
			
				$('#addWorkCenter').on('change', function (e) {
					   
					 var optionSelected = $("option:selected", this);
					 var wsid = this.value;
					// getMachinesByWc(wsid);
					 getFilterPlanOverviewList();
						
				});
				
				//getOpertors();
				
			//	getPOList();
				
				


				$(document).on("change", "#prodDatefrm", function(e){
						getFilterPlanOverviewList();
				});

				$(document).on("change", "#prodDateto", function(e){
								getFilterPlanOverviewList();
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
	
				
				function getFilterPlanOverviewList(){  
					
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
					    url: server_url + "production/getWorkcenterOee",
					    enctype: 'application/json',
					    headers: authHeader,
					    processData: false,
					    contentType: "application/json; charset=utf-8",
					    data: JSON.stringify(dataVal),
						
						success: function (response) {		

						console.log("------response data----------",response);

						var data = response.payload;
						console.log("------getPOList data----------",data);
				//		console.log("------getPOList data.result----------",data.result);
						
						tableData.destroy();
			       		 $('#wcOeeList.tbody').empty();
			    
			    	tableData = $('#wcOeeList').DataTable( {
				
			    			dom: 'Blfrtip',   
			    			buttons: ['excel', 'print'],
						 	 destroy: true,
		    				 data: data,
							 
							 "columnDefs": [{
							         "targets": "_all",
							         "defaultContent": ""
							     }],

							  columns: [
							 	{ "data": "workcenterentity" },
								{ "data": "stationEntity" },
							    { "data": "shiftEntity" },
							    { "data": "totalQuantity" },
		    			   /* { "data": "prodPlanningDto",
							    "render": function ( data, type, row, meta ) {
					              if(data==null) return "";
					              for(var i=0, num=data.length; i<num; i++) {
					                var house = data[i];
					                
					                
					                  return house.item;
					              }
					               return "";
				               }
						    },
		    			    { "data": "prodPlanningDto",
							    "render": function ( data, type, row, meta ) {
					              if(data==null) return "";
					              for(var i=0, num=data.length; i<num; i++) {
					                var house = data[i];
					                
					                
					                  return house.setup;
					              }
					               return "";
				               }
						    },
						    
						    { "data": "prodPlanningDto",
							    "render": function ( data, type, row, meta ) {
					              if(data==null) return "";
					              for(var i=0, num=data.length; i<num; i++) {
					                var house = data[i];
					                
					                  return house.qty_planned;
					              }
					               return "";
				               }
						    },
		    			    { "data": "prodPlanningDto",
							    "render": function ( data, type, row, meta ) {
					              if(data==null) return "";
					              for(var i=0, num=data.length; i<num; i++) {
					                var house = data[i];
					                
					                
					                  return house.qty_produced;
					              }
					               return "";
				               }
						    },
						    
						    { "data": "productivityper",
						    	"render": function ( data, type, row, meta ) {
					                
					                  return "<b>"+data+" % <b>";
			                   }	
						    },
		    			    { "data": "prodPlanningDto",
							    "render": function ( data, type, row, meta ) {
					              if(data==null) return "";
					              for(var i=0, num=data.length; i<num; i++) {
					                var house = data[i];
					                
					                  return house.qty_rejected;
					              }
					               return "";
				               }
						    },
							{ "data": "rejectionper", 
								"render": function ( data, type, row, meta ) {
					                
					                  return "<b>"+data+" % <b>";
			                   }
							},*/
						/*	 { "data":  null,
					           render: function (data, type, row) {
					               var id = data.id;
					               var action = `<a  class="edit-button" id=${id}>View</a>`;
					               return action;
					           },
				             },*/
							
				            ],
				            initComplete: function (settings, json) {
						      var table = settings.oInstance.api();
						      var api = this.api();
						      
						      table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
						     //   drawSpecialRow(this, table);
						      } );
							  
							  
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