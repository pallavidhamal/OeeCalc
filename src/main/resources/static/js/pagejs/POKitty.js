			
			var delProdID = "";
			var editProdID = "";
			var tableData = $('#poKittyList').DataTable();
			var poID;
			
			$(document).ready(function(){
				
					console.log("-------------------Welcome to PO Kity page-----------------");
			
					getPOKittyList();
					
			
			});
			
			var KittyRemark; 
			//get purchase order list
			function getPOKittyList(){  
					
					console.log("-------------------Welcome to product getPOList");
					
					$.get(url+"getPOKittyList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
					console.log("------getPOKittyList ---",data);
					
					console.log("-----getPOKittyList-------",data.result);
					
					
					tableData.destroy();
					
			        $('#poKittyList.tbody').empty();
					
			        var editIcon = function ( data, type, row ) 
			        {
			        		if ( type === 'display' ) {
				           
			        		return '<span class="fa fa-edit sordrEdit"></span>';
				        
				    }
				       
				    return data;
				    };
				    
				    var deleteIcon = function ( data, type, row ) 
				    {
				    	if(isNaN(data.KittyRemark)){
				    		
				    		var btn = "Update Remark"
				    			
				    	}else{

				    		var btn = "Add Remark"
				    		
				    	}
				    	
				    	
			        if ( type === 'display' ) {
			            
			        return '<td><input type="button" class="table-input-btn Update12" value="'+btn+'" Id="'+data.Id+'" remarkVal="'+data.KittyRemark+'"></td>';
			        }
			        
			        return data;
				    };
				
				    var table = $('#poKittyList').DataTable( {
					
				    			dom: 'Blfrtip',   
						        buttons: ['excel', 'print'],
							 	 destroy: true,
			    				 data: data.result,
			
			    				 rowId: 'PoId',
			    				 "initComplete": function(settings, json) {
								  },
								  
								  columns: [
		    				    { "data": "PO_Number" },
		    				    { "data": "LineId" },
		    				    { "data": "PO_Date" },
		    		            { "data": "CustName" },
		    		            { "data": "CatCode" },
		    		            { "data": "Name" },
		    		            { "data": "Description" },
		    		            { "data": "RegionName" },
		    		            { "data": "Balace_Qty" },
		    		            { "data": "KittyRemark" },
		    		            { "data": deleteIcon },
	    		         
		    		            ],
		    		            "columnDefs": 
		    		            	[	
		    		            		{
			                    "targets": [ 9 ],
			                    "orderable": false
		    		            		},
		    		            		{
			                    "targets": [ 10 ],
			                    "orderable": false
		    		            		}
		    		            		],
		    		            "order": [[0, 'desc']],
				    			} );
				
					});
			}
	//get purchase order list

			$(document).on("click", ".Update12", function(e){
				
				poID = $(this).attr("Id");
				remarkVal = $(this).attr("remarkVal");
				console.log("--------click on update--poID------",poID);
				console.log("--------click on update--remarkVal------",remarkVal);
				
				$("#kittyRemarkval").val(remarkVal);		
				
				/*if(isNaN(remarkVal)){
					
					console.log("--------click on here------");
					$(".kittyRemark").val("");
					
				}else{
					console.log("--------click on here-- here----");
					
					$(".kittyRemark").val(remarkVal);
				}*/
				
				$("#add_remark").modal('show');
			});
			
			
			$(document).on("click", "#kittyRemarkSave", function(e){

						console.log("--------click on kittyRemarkSave--------",$('#kittyRemarkval').val());
						
						console.log("--------click on update--poID------",poID);
						
						var dataVal = {
								"id" : poID,
					    		"kittyRemark":$('#kittyRemarkval').val(),
					    		"authKey":localStorage.getItem("authkey")
					    };
						
						
						$.ajax({
							
							type: 'POST',
							url: url+"updatePOremark",  //from API update data
							data : JSON.stringify(dataVal),
							processData: false,
							contentType: "application/json",
				    
							success: function(result) {
				    	
							console.log("Update--Information result==="+result);
							
							if(result.result==true){
								
								getPOKittyList();
								$("#add_remark").modal('hide');
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
							
							
							}
						});
						
			});
			