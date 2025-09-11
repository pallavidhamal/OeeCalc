			
			var delProdID = "";
			var editProdID = "";
			var tableData = $('#prodList').DataTable();
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

				const formattedToday = `${day}-${month}-${year}`;
				
				const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				let day1=1;
				
				const firstDayOfMonth1 = `01-${month}-${year}`;
				
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
					 getMachinesByWc(wsid);
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

			/*	$(document).on("change", "#addShift", function(e){
					getFilterPlanOverviewList();
				});*/
				
				
				$(document).on("change", "#addSelMachine", function(e){
					getFilterPlanOverviewList();
				});

			/*	$(document).on("change", "#addOperator", function(e){
					getFilterPlanOverviewList();
				});*/
				
				
					
			});
			
		/*	$(document).on("click", "#addProduction", function(e){
			
			window.location.href = "addProduction";	

			});
			
			
			$(document).on("click", ".edit-button", function(e){
				
				
				editId = $(this).attr('id');
				console.log("editId----",editId);
				window.location.href = "editProduction?prodid="+editId;

			});
			
	
			//click on add button
			$(document).on("click", "#purchaseAddAction", function(e){
				
				console.log(" click on purchase Add Action");
				
				
				
				getCustomersList("#customerListadd","0");
				
				getRegionList("#regList"+count,"");
				
				callAddRemoveClassFunction($("#ponumber"));
				callAddRemoveClassFunction($("#customerListadd"));
				callAddRemoveClassFunction($("#poDate"));
				callAddRemoveClassFunction($("#poEndDate"));

				 $('#myTbody').empty();
				 $('#poErrAdd').empty();
				 
				
		
			});*/
			
		
			
		
			
			
			//get purchase order list
			/*function getPOList(){  

				$.ajax({
						    type: 'GET',
						    url: server_url + "plan/allproduction",
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
					        $('#prodList.tbody').empty();

							console.log("------111----------");

							
							
					        //if(data.result == "success"){
								
					        var editIcon = function ( data, type, row ) 
					        {
							    if ( type === 'display' ) {
							           
							   	 	return '<span class="button" data-toggle="modal" data-target="#edit_po"> Edit </span>';
							    }
						       
						    	return data;
						    };
							console.log("------222----------");

					    
					    	tableData = $('#prodList').DataTable( {
						
					    			dom: 'Blfrtip',   
					    			buttons: ['excel', 'print'],
								 	 destroy: true,
				    				 data: data,
									 
									 "columnDefs": [{
									         "targets": "_all",
									         "defaultContent": ""
									     }],

									  columns: [
									{ "data": "proddate" },
								    { "data": "unitname" },
								    { "data": "workcentername" },
								    { "data": "shiftname" },
									{ "data": "operatorname" },
								    { "data": "stationname" },
									
								    { "data": "availabilityper" },
								    { "data": "productivityper" },
									{ "data": "rejectionper" },
									{ "data": "oeeper" },
									
									 { "data":  null,
							           render: function (data, type, row) {
							               var id = data.id;
							               var action = `<a  class="edit-button" id=${id}>View</a>`;
							               return action;
							           },
						             },
									
						            ],
						            "order": [[0, 'desc']],
					    			} );
									
									
									console.log("------333----------");
									
							}
					})
			}*/
	//get purchase order list

			
			//get Customer list
			function getCustomersList(Div,CId){
				
				console.log("getCustomers=====CId======",CId);
			
					$(Div).empty();
				
					$.get(url+"getCustomers", function( data ) { //from API list
						
						console.log("getCustomers=====data data ======",data.result);
			
							//var CtrObj = $.parseJSON(data.data);
							
							console.log("getCustomers=====CId======",CId);
							
							if(Div=='#customerListadd')	{
											
								$(Div).append('<option value=' + 0+ '>  - Select Customer - </option>');
												
								$.each(data.result, function( index, value ){
												
								$(Div).append('<option value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
								
							    });
							
							}	
							if( Div == "#customerListEdt"){
						
									$.each(data.result, function( index, value ){
													
									if(CId==value.CustomerID){
														
									$(Div).append('<option selected value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
														
									}else{
														
									$(Div).append('<option value="'+ value.CustomerID + '">'+ value.Cust_Name+' </option>');
									}
							
								});
								}
					});
		
			} //end of get Customer list
			
		
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
	
	function getUnitShifts()
	{
				
					console.log("=====getUnitShifts====unitid===",unitid)
					
					
						$.ajax({
						       type: "GET",
						       url: server_url + `shift/getShiftByUnit/`+unitid,
						       enctype: "application/json",
						       headers: authHeader,
						       processData: false,
						       contentType: false,
						       data: null,
						       success: function (response) {
									$("#addShift").empty();
								//	$("#editItem").empty();
								//	$(".addShift").append('<option value="0">  Select item </option>');
									
									
									shiftOptions='<option value="0">  Select Shift </option>';
									
									console.log("=====getUnitShifts=======",response)
									
									
								//	$("#editItem").append('<option value="0">  Select item </option>');

						           for (i = 0; i < response.payload.length; ++i) {
						            //   $(".addShift").append(`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`);
									
									
									shiftOptions=shiftOptions+`<option value="${response.payload[i].shiftid}">${response.payload[i].name}</option>`;
									   
									//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
									   
						           }
								   
								   $("#addShift").append(shiftOptions);
								   
						       },

						       error: function (error) {
						           /*console.log(error);
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
						     	}*/
						       },
						   });
			}
			

			function	getMachinesByWc(wsid)
				{
					
					
					$.ajax({
							       type: "GET",
							       url: server_url + `station/getStationByWc/`+wsid,
							       enctype: "application/json",
							       headers: authHeader,
							       processData: false,
							       contentType: false,
							       data: null,
							       success: function (response) {
										$("#addSelMachine").empty();
										//$("#editStation").empty();
										
										machinesOptions='<option value="0">  Select Station </option>';
									//	$("#editStation").append('<option value="0">  Select station </option>');
							           for (i = 0; i < response.payload.length; ++i) {
										
										
										machinesOptions=machinesOptions+`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`;
										
							           //   $(".addStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
										 //  $("#editStation").append(`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`);
							           }
									   
									   $("#addSelMachine").append(machinesOptions);
									   
							       },

							       error: function (error) {
							           /*console.log(error);
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
							     	}*/
							       },
							   });
				}			

				function getOpertors()
				{
					
					
					console.log("oper");
					$.ajax({
								       type: "GET",
								       url: server_url + `operator/allActive`,
								       enctype: "application/json",
								       headers: authHeader,
								       processData: false,
								       contentType: false,
								       data: null,
								       success: function (response) {
											$("#addOperator").empty();
										//	$("#editItem").empty();
											//$(".addItem").append('<option value="0">  Select item </option>');
											
											itemOptions='<option value="0">  Select Operator </option>';

											
										//	$("#editItem").append('<option value="0">  Select item </option>');

								           for (i = 0; i < response.payload.length; ++i) {
								             
											//  $(".addItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
											   
											itemOptions=itemOptions+`<option value="${response.payload[i].id}">${response.payload[i].name}</option>`;
											
											//   $("#editItem").append(`<option value="${response.payload[i].itemid}">${response.payload[i].itemdesc}</option>`);
								           }
										   
										   $("#addOperator").append(itemOptions);
										   
								       },

								       error: function (error) {
								           /*console.log(error);
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
								     	}*/
								       },
								   });
				}
				
				
				function getFilterPlanOverviewList(){  
					
					var dataVal = 
					{
						 unitid       	: $('#addUnit').val(),
						 workcenterid 	: $('#addWorkCenter').val(),
					//	 shiftid       	: $('#addShift').val(),
						 stationid 		: $('#addSelMachine').val(),
					//	 operatorid     : $('#addOperator').val(),						 
						 fromdate		: StringToDateDDMMYYYY_to_YYYYMMDD($('#prodDatefrm').val()),						 
						 todate			: StringToDateDDMMYYYY_to_YYYYMMDD($('#prodDateto').val()),
						 
					};
								
					console.log("-------------------Welcome to product getFilterProductionList---------",dataVal);
					$.ajax({
					    type: 'POST',
					    url: server_url + "production/getPlanVsActual",
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
			       		 $('#prodList.tbody').empty();

			    
			    	tableData = $('#planvsactualList').DataTable( {
				
			    			dom: 'Blfrtip',   
			    			buttons: ['excel', 'print'],
						 	 destroy: true,
		    				 data: data,
							 
							 "columnDefs": [{
							         "targets": "_all",
							         "defaultContent": ""
							     }],

							  columns: [
							{ "data": "proddate" ,
								render: function (data, type, row) {
					               	let formatted = moment(data).format("DD-MM-YYYY");
			              	 	return formatted; }
							},
						    { "data": "shiftname" },
						    { "data": "stationname" },
		    			    { "data": "prodPlanningDto",
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
						    
						    { "data": "achievement_per",
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
							},
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
						        drawSpecialRow(this, table);
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