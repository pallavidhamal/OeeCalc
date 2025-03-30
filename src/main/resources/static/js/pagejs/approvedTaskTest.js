$(document).on("click","#QualityReportSubmit", function(e) {
	console.log("---- On Click of Quality Report Submit ------");
	
	if(NotAllowedNullVal("#qualityReportError","Customer ",$('#customerListQR')))
		if(NotAllowedNullVal("#qualityReportError","SI Company ",$('#vendorSICompanyListQR')))
			if(NotAllowedNullVal("#qualityReportError","Region ",$('#regionListQR')))
				if(NotAllowedNullVal("#qualityReportError","Region ",$('#regionListQR')))
					if(NotAllowedNullVal("#qualityReportError","From date ",$('#startDateReport')))
						if(NotAllowedNullVal("#qualityReportError","To date ",$('#endDateReport'))) {
							console.log("Hiii Check :---- ",$("#startDateReport").val(), $("#endDateReport").val());
							window.location.href = "QualityReport?siCompanyName="+$("#vendorSICompanyListQR").val()+
							"&customerName="+$("#customerListQR").val()+ "&regionName="+$("#regionListQR").val()+
							"&dateFrom="+$("#startDateReport").val()+"&dateTo="+$("#endDateReport").val() +
							"&filterDateCategory="+$("#categoryListQR").val();
						}

});

var tableData = $('#qualityReportList').DataTable();
var userId = null;

var siCompanyName = null;
var customerName = null;
var regionName = null;

// var buttonCommon = null;

// Document Ready Function
$(document).ready(function() {
	
	/*var startDate = GetURLParameter('dateFrom');
	var endDate = GetURLParameter('dateTo');
	
	var customerVal = GetURLParameter('customerName');
	var regionVal = GetURLParameter('regionName');
	var siCompanyVal = GetURLParameter('siCompanyName');
	
	var dateCategory = GetURLParameter('filterDateCategory');
	
	userId = localStorage.getItem("userId");
	
	console.table("Start Date :- " + startDate);
	console.table("End Date :- " + endDate);*/
	
	var dataValue = {
		"customer":"ALL",
		"siCompanyName":"ALL",
		"region":"ALL",
		"dateCategory":"By Installation Date",
		"startDate":"2022-01-01",
		"endDate":"2022-01-31",
	}

	getQualityReportList(dataValue);
	
	callAddRemoveClassFunction($("#customerListQR"));
	
	// Customer Functions
/*	getAllCustomersList();
//	customerOnChange();
	
	// SI Company Functions
	getAllSICompanyList();
	siCompanyOnChange();
	
	// Region Functions
	getAllRegionList();
	regionOnChange();*/
	
});

const monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];

// Get URL Parameters
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}

// Customer On Change Value Function
function customerOnChange() {
	$("#customerListQR").on("change", function(e) {
		var customerId = $( "#customerListQR" ).val();
		console.table("On Change CustomerID" + customerId);
		
		$(".customerListQR_select").val('').trigger("chosen:updated");
		
	});
}

// SI Company On Change Value Function
function siCompanyOnChange() {
	$("#vendorSICompanyListQR").on("change", function(e) {
		var siCompanyId = $( "#vendorSICompanyListQR" ).val();
		console.table("On Change SI Company ID" + siCompanyId);
		siCompanyName = $("#vendorSICompanyListQR :selected").text();
	});
}

// Region List On Change Value Function
function regionOnChange() {
	$("#regionListQR").on("change", function(e) {
		var regionId = $( "#regionListQR" ).val();
		console.table("On Change Region ID " + regionId);
		regionName = $("#regionListQR :selected").text();
	});
}

// Get Customers List Dropdown Value -- API Call 
function getAllCustomersList() {
	
	$('#customerListQR').empty();
	
	$.ajax({
		type: 'GET',
		url:  url + "getCustomers",
		success: function(data) {
			if(data.result == null || data.result == "") {
				return "";
			}
			
			$('#customerListQR').append('<option value=' + 0+ ' > -- Select Customer Name -- </option>');
			$('#customerListQR').append('<option value=' + "ALL"+ '> ALL  </option>');
			
			$.each(data.result, function(key,val) {
				$("#customerListQR").append('<option value="'+val.Cust_Name+'">'+val.Cust_Name+'</option>');
				console.table("Customer ID :--" + val.CustomerID);
				console.table("Customer Name :--" + val.Cust_Name);
				
				customerName = val.Cust_Name;
				console.table("Customer Name Check Var :-- " + customerName);
			});
			
			$(".customerListQR_select").chosen();
		}
	});
}

// Get SI Company List (Vendor List ) -- API Call
function getAllSICompanyList() {
	$('#vendorSICompanyListQR').empty();
	
	$.ajax({
		type: 'GET',
		url:  url + "getSICompany/"+ userId,
		success: function(data) {
			if(data.result == null || data.result == "") {
				return "";
			}
			
			$('#vendorSICompanyListQR').append('<option value=' + 0 + '> -- Select SI Company -- </option>');
			$('#vendorSICompanyListQR').append('<option value=' + "ALL" + '> ALL  </option>');
			$.each(data.result, function(key,val) {
				$("#vendorSICompanyListQR").append('<option value="'+val.TaskName+'">'+val.TaskName+'</option>');
				console.table("SI Company ID :--" + val.TaskId);
				console.table("SI Company Name :--" + val.TaskName);
				
				siCompanyName = val.TaskName;
			});
			$(".vendorSICompanyListQR_select").chosen();
		}
	});
}


// Get All Region List -- API Call
function getAllRegionList() {
	$('#regionListQR').empty();
	
	$.ajax({
		type: 'GET',
		url:  url + "getAllRegionsList",
		success: function(data) {
			if(data.result == null || data.result == "") {
				return "";
			}
			$('#regionListQR').append('<option value=' + 0 +'> -- Select Region -- </option>');
			$('#regionListQR').append('<option value=' + "ALL" +'> ALL  </option>');
		
			$.each(data.result, function(key,val) {
				$('#regionListQR').append('<option value="'+val.RegionName+'">'+val.RegionName+'</option>');
				console.table("Region ID :--" + val.RegionId);
				console.table("Region Name :--" + val.RegionName);
				
				regionName = val.RegionName;
			});
			
			$(".regionListQR_select").chosen();

		}
	});
}

const selectExportColumn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 35, 36, 37, 38];
var circle= "";
// Get Quality Report Data Table API
function getQualityReportList(dataValue){
	
	//alert("here",dataValue);
	
	var i = 0;
	console.log("------Quality Report List----------");
	
	$.ajax({	
		type: 'POST',
		url: url+"getQualityReportByDateRange",  //from API update data
		data : JSON.stringify(dataValue),
		contentType: "application/json",
		success: function(data) {
			if(data.result == null || data.result == "") {
				return "";
			}
		tableData.destroy();
			alert("datais------",data);
			$('#qualityReportList.tbody').empty();
			var actionIcon = function ( data, type, row ) {
				var test=data.id;
				var res = parseInt(test)-parseInt(1);	
				if ( type === 'display' ) {
					return '  <td><input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" value="View Details" data-toggle="modal" '+
					' data-target="#showdetails" id="showdetailsbtn" idval="'+data.id+'">'+
					'<a data-auto-download href="../ProApp/GeneratePDF/ATP'+res+'.pdf" class="table-input-btn cust-btn-style complete_job_cust_btn" download>Download ATP </a>'+
					'<input type="button" class="table-input-btn cust-btn-style complete_job_cust_btn" id="generatePdfAction"  value="Create ATP" idval="'+data.id+'" CustomerName="'+data.CustomerName+'" ProductName="'+data.ProductName+'" ></td>';	
				}
				return data;
			};
			
			i++;
			tableData = $('#qualityReportList').DataTable({
				//ordering:true,
				 scrollX: true,
				scrollY: true,
			//   scrollCollapse: true,
				
	            width: '100%',
	            "columnDefs": 
				 [	 
	               {
	                    "targets": [ 7 ],
	                    "orderable": false
	                },
	                {
	                    "targets": [ 8 ],
	                    "orderable": false
	                }
	            ],
	            "order": [[0, 'desc']],
				dom: 'Blfrtip',   
				"initComplete": function(settings, json) {
				   //   $('.dataTables_scrollBody thead tr').css({ display: 'none' }); 
			    },
			/*	buttons: [
					{
						extend: 'excelHtml5',
		                exportOptions: {
		                    columns: selectExportColumn,
		                },
		                customize: function( xlsx ) {
		                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
		     
		                    $('row c', sheet).each( function () {
		                    	
		                        // if cell starts with http
		                        if ( $('is t', this).text().indexOf("http") === 0 ) {
		                            // (2.) change the type to `str` which is a formula
		                            $(this).attr('t', 'str');
		                            //append the formula
		                            $(this).append('<f>' + 'HYPERLINK("'+$('is t', this).text()+'","'+$('is t', this).text()+'")'+ '</f>');
		                            //remove the inlineStr
		                            $('is', this).remove();
		                            // (3.) underline
		                            $(this).attr('s', '4');
		                        }
		                    });
		                }
		                
					}
				],*/
				
				destroy: true,
				data: data.result,
				columns: [
					{ "data": "JobId", orderable: true},
				    { "data": "CreatedDate" },
				    { "data": "Site_Name" },
				    { "data": "Company" },
				    { "data": "Customer_Name" },
				    { "data": "Region" },// New Added
				    { "data": null, 
				    	render:function(data,type,row) {
		            		var circleName = data.Region;
		            		return circleName.substring(2);
		            	} 
				    }, // New Added
		            { "data": "Site_Type" },
		            { "data": "rack_Type" },
		            { "data": "Outdoor_Cabinet_make" },
		           /* { "data": "Total_power_watss" }, // Total Power Handling - Added JOB ID 
		            { "data": "Air_Condition" },
		            { "data": "ProductName" }, 
		            { "data": "Insta_Date" },
		            { "data": "Insta_Month_Col" }, // Insta Month
		            { "data": "Other_Eci_Equipments" }, // Other ECI Equipments - Other_Eqpts
		            { "data": "Other_Installed_Equipments" }, // Other Installed Equipments same as Other ECI Equipments
		            { "data": "NE_Name" },
		            { "data": "Ambient_temp" },
		            { "data": "Humidity" }, 
		            { "data": "Site_Hygeine" },
		            { "data": "Dust" },
		            { "data": "Water_Seepage" },
		            { "data": "Mux_Grounding" },
		            { "data": "MCB_A" },
		            { "data": "MCB_B" },
		            { "data": "Power_length" },
		            { "data": "Power_Cable" }, 
		            { "data": "Battery_Strength" }, 
		            { "data": "Empty_slot_Filter_plate" }, //Ensuring dummy plates installation for empty slots
		            { "data": "Air_Filter" },*/
		            { "data": null,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo1;
		            		console.table("checkURL :--- " + checkUrl);
		            		/*var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");*/
		            				
		            					 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)
		
		            				
		            		data.Photo1 = modifiedUrl;
		            		console.table("Data check", data.Photo1);
		            		var action ='<a class="btn01" href='+data.Photo1+' target="_blank">Photo1</a>';
		            		return action;
		            	}     
		            },
		            { "data": null,
		            	render:function(data,type,row){	
		            		var checkUrl = data.Photo2;
		            		console.table("checkURL :--- " + checkUrl);
/*		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
*/		            				
		            					 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)
		            				
		            				
		            		data.Photo2 = modifiedUrl;
		            		console.table("Data check", data.Photo2);
		            		var action ='<a class="btn01" href='+data.Photo2+' target="_blank">Photo2</a>';
		            		return action;
		            	}     
		            },
		            { "data": null,
		            	render:function(data,type,row){	
		            		var checkUrl = data.Photo3;
		            		console.table("checkURL :--- " + checkUrl);
		            		/*var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");*/
		            				
            					 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)
		
		            				
		            				
		            		data.Photo3 = modifiedUrl;
		            		console.table("Data check", data.Photo3);
		            		var action ='<a class="btn01" href='+data.Photo3+' target="_blank">Photo3</a>';
		            		return action;
		            	}     
		            },
		            { "data": null,
		            	render:function(data,type,row) {	
		            		var checkUrl = data.Photo4;
		            		console.table("checkURL :--- " + checkUrl);
/*		            		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");
*/		            				
           					 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)
		
		            		data.Photo4 = modifiedUrl;
		            		console.table("Data check", data.Photo4);
		            		var action ='<a class="btn01" href='+data.Photo4+' target="_blank">Photo4</a>';
		            		return action;
		            	}     
		            },
		            // Hidden Fields with File Path
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo1;
		            		console.table("checkURL :--- " + checkUrl);
		            		/*var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");*/
		            		            					 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)
		
		            				
		            		return modifiedUrl;
		            	}   
		            },
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo2;
		            		console.table("checkURL :--- " + checkUrl);
		            		/*var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");*/
						 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)

		            		return modifiedUrl;
		            	}   
		            },
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo3;
		            		console.table("checkURL :--- " + checkUrl);
		            /*		var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");*/
            					 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)
		            				
		            		return modifiedUrl;
		            	}   
		            },
		            { "data": null,
		            	'visible' : false,
		            	render:function(data,type,row) {
		            		var checkUrl = data.Photo4;
		            		console.table("checkURL :--- " + checkUrl);
		            		/*var modifiedUrl = checkUrl.replace("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0/webapps", 
		            				"https://proapp.co.in");*/
            					 var modifiedUrl = checkUrl.replace(app_global_path,app_global_url)
		            				
		            		return modifiedUrl;
		            	}   
		            },
		            
				 ],
			});	

		}
	});
}