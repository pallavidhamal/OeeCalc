var tableData = $('#planningList').DataTable();
		
$(document).ready(function(){
	
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
		 
		 getFilterPlanningList();
	 
	 }
	 else{
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
			
function getFilterPlanningList(){  
	
	var dataVal = 
	{
		 fromdate		: StringToDateDDMMYYYY_to_YYYYMMDD($('#planCalender').val()),
		 todate			: StringToDateDDMMYYYY_to_YYYYMMDD($('#planCalender1').val()),
		 unitid       	: $('#selUnit').val(),
	};
				
	$.ajax({
	    type: 'POST',
	    url: server_url + "planning/getTotalPlanningReport",
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
			buttons: ['excel', 'print'],
		 	destroy: true,
			data: data,
	
			columns: [
				
				{ "data": "unitname" },
				{ "data": "workcentername" },
				{ "data": "setupname" },
				{ "data": "stationname" },
				{ "data": "itemname" },
				{ "data": "from_date",
					render: function (data, type, row) {
		               	if (type === 'sort' || type === 'type') {
			                    return data;
		                }
      	 			return moment(new Date(data).toString()).format('DD-MM-YYYY');
	                }
				 },
			    { "data": "to_date"  ,
					render: function (data, type, row) {
		               	if (type === 'sort' || type === 'type') {
			                    return data;
		                }
      	 			return moment(new Date(data).toString()).format('DD-MM-YYYY');
	                }
				 },
				{ "data": "time_per_shift" },
			    { "data": "cycletime" },
				{ "data": "itemtimeutilised" },
				{ "data": "machinetimeutilised" },
				{ "data": "plannedmins" },
			    { "data": "plannedquantity" },
				{ "data": "setuptime" },
			
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