var tableData = $('#planningList').DataTable();
		
$(document).ready(function()
{
  	const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    const formattedToday = `${day}-${month}-${year}`;
				
	const firstDayOfMonth1 = `01-${month}-${year}`;
	
    $('#planCalender').val(firstDayOfMonth1);
	$('#planCalender1').val(formattedToday);
			
	var unitString = localStorage.getItem("set") ; 
	var unitArray = unitString.split("#")
	unitid = unitArray[0];
	
	if(unitid!="")
	{	
		 $("#selUnit").empty();
		 $("#selUnit").append('<option value="'+ unitArray[0] + '">'+ unitArray[1]+' </option>');
		 $("#selUnit").prop("disabled", true);
	 
		 getWorkCentreList("sel");
		 getFilterPlanningList();
	 
	 }else{
		getUnitList("sel");
	 }	
});

		
$(document).on("change", "#selUnit", function(e){
    var optionSelected = $("option:selected", this);
    unitid = this.value;
	getFilterPlanningList();
});			

$(document).on("change", "#planCalender", function(e){
	getFilterPlanningList();
});

$(document).on("change", "#planCalender1", function(e){
	getFilterPlanningList();
});

$(document).on("change", "#txtTimePerShift", function(e){
	getFilterPlanningList();
});
			
function getFilterPlanningList(){  
	
	var dataVal = 
	{
		 fromdate		: StringToDateDDMMYYYY_to_YYYYMMDD($('#planCalender').val()),
		 todate			: StringToDateDDMMYYYY_to_YYYYMMDD($('#planCalender1').val()),
		 unitid       	: $('#selUnit').val(),
	};
			
	$.ajax({
	    type: 'POST',
	    url: server_url + "production/getTotalProdReport",
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: "application/json; charset=utf-8",
	    data: JSON.stringify(dataVal),
		
		success: function (response) {		

		var data = response.payload;
	
		tableData.destroy();
        $('#planningList.tbody').empty();
		
        var editIcon = function ( data, type, row ) 
        {
		    if ( type === 'display' ) {
		   	 	return '<span class="button" data-toggle="modal" data-target="#edit_po"> Edit </span>';
		    }
	    	return data;
	    };
	    
	    tableData = $('#planningList').DataTable( {
			dom: 'Blfrtip',   
			buttons: [
			    {
			      extend: 'excelHtml5',
			      text: 'Export to Excel',
			      title: null,  // disable default page title
			      exportOptions: {
			        columns: ':visible'
			      },
			      customize: function (xlsx) {
			        var sheet = xlsx.xl.worksheets['sheet1.xml'];
			
			        // --- Step 1: push down existing rows ---
			        var downrows = 1;
			        $('row', sheet).each(function () {
			          var r = parseInt($(this).attr('r'));
			          $(this).attr('r', r + downrows);
			        });
			        $('row c', sheet).each(function () {
			          var r = $(this).attr('r');
			          var row = parseInt(r.replace(/[A-Z]/g, ""));
			          $(this).attr('r', r.replace(row, (row + downrows)));
			        });
			
			        // --- Step 2: read first header row (with colspan) from HTML ---
			        var headerRow = $('#planningList thead tr').first();
			        var excelHeader = '<row r="1">';
			        var mergeXml = '';
			        var colIndex = 0; // Excel column index (A=1, B=2, ...)
			
			        headerRow.find('th').each(function () {
			          var colspan = parseInt($(this).attr('colspan') || 1);
			          var text = $(this).text().trim();
			
			          if (text) {
			            // Convert column index to Excel letter (A,B,...AA,AB...)
			            function colLetter(n) {
			              var s = "", t;
			              while (n > 0) {
			                t = (n - 1) % 26;
			                s = String.fromCharCode(65 + t) + s;
			                n = Math.floor((n - t) / 26);
			              }
			              return s;
			            }
			
			            var startCol = colLetter(colIndex);
			            var endCol = colLetter(colIndex + colspan - 1);
			
			            // add header cell
			            excelHeader +=
			              '<c t="inlineStr" r="' + startCol + '1"><is><t>' + text + '</t></is></c>';
			
			            // add merge if colspan > 1
			            if (colspan > 1) {
			              mergeXml += '<mergeCell ref="' + startCol + '1:' + endCol + '1"/>';
			            }
			          }
			          colIndex += colspan;
			        });
			
			        excelHeader += '</row>';
			
			        // --- Step 3: inject dynamic header into sheet ---
			        sheet.childNodes[0].childNodes[1].innerHTML =
			          excelHeader + sheet.childNodes[0].childNodes[1].innerHTML;
			
			        // --- Step 4: inject mergeCells dynamically ---
			        var mergeCells = sheet.getElementsByTagName('mergeCells')[0];
			        if (!mergeCells) {
			          mergeCells = sheet.createElement('mergeCells');
			          sheet.childNodes[0].appendChild(mergeCells);
			        }
			        mergeCells.innerHTML = mergeXml;
			        mergeCells.setAttribute('count', (mergeXml.match(/mergeCell/g) || []).length);
			      }
			    }
			  ],
		  //    'csvHtml5',
		  //     'pdfHtml5'
		  //  ],
		 	destroy: true,
			data: data,
//			responsive: false,
	
			columns: [
				{ "data": "proddate" ,
					render: function (data, type, row) {
		               	if (type === 'sort' || type === 'type') {
		                    return data;
		                }
          	 		return moment(new Date(data).toString()).format('DD-MM-YYYY');
	               }
				},
				{ "data": "unitname" },
			    { "data": "wcname" },
				{ "data": "shiftname" },
				{ "data": "stationname" }, // <th> Station</th>
				{ "data": "operatorname" }, // <th> Operator</th>
				
				{ "data": "availability_per" },
				{ "data": "productivity_per" },
				{ "data": "quality_per" },
				{ "data": "achievement_per" },
				{ "data": "rejection_per" },
				{ "data": "oee_per" },
				
				{ "data": "availability_lunchtime" },
				{ "data": "availability_teatime" },
				{ "data": "availability_reviewtime" },
				{ "data": "availability_inpectiontime" },
				{ "data": "availability_machinebreakdown" },
				
				{ "data": "availability_setupchange" },
				{ "data": "availability_nomaterial" },
				{ "data": "availability_nolabour" },
				{ "data": "availability_inspection" },
				{ "data": "availability_tooling" },
				{ "data": "availability_drawing" },
				{ "data": "availability_guages" },
				
				{ "data": "availability_otherlosses" },
				{ "data": "availability_overtime" },
				{ "data": "availability_totaltime" },
				{ "data": "availability_stdloss" },
				{ "data": "availability_specloss" },
				{ "data": "availability_totloss" },
				{ "data": "availability_time" },
				
				
				{ "data": "productivity_searching" },
				{ "data": "productivity_personnal" },
				{ "data": "productivity_rework" },
				{ "data": "productivity_production_availabletime_qty" }, //<th> Available Time</th>
				{ "data": "productivity_total_utilised_time" },
				
				
				{ "data": "total_planned" },
				{ "data": "rejection_rejection_qty" },
				{ "data": "rejection_ok_qty" },
			
            ],
            "order": [[0, 'desc']],
			} );
		}
	})
}
			
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