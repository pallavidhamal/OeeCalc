			
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
			   		var lastValue = null;
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
							 	{ "data": "workcenterentity" 
							 	/*,"render": function ( data, type, row, meta ) {
						              if (last !== data) {
								          var count = api
								            .column(0, { page: 'current' })
								            .data()
								            .filter(val => val === group).length;
								
								          $(rows).eq(i).find('td:first').attr('rowspan', count);
								          last = group;
								        } else {
								          $(rows).eq(i).find('td:first').remove();
								        }
					               }*/
							 	},
								{ "data": "stationEntity" },
							    { "data": "shiftEntity" },
							    { "data": "totalQuantity",
						    	  "render": function ( data, type, row, meta ) {
									return data.toFixed(2)+ " %";
								   }
					            },
				            ],
				            rowCallback: function (row, data) {
					            const colIndex = 0; // index of the column you want to group
					            const currentValue = $('td:eq(' + colIndex + ')', row).text();
					
					            if (currentValue === lastValue) {
					                $('td:eq(' + colIndex + ')', row).text(''); // blank duplicate
					            } else {
					                lastValue = currentValue; // update last value
					            }
					        },
				            "order": [[0, 'desc']],
			    			} );
							console.log("------333----------");
						}
					})
				//		});
				}												
		