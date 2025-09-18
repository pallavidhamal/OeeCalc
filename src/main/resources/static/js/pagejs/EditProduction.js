var unitid="";
var machinesOptions;
var itemOptions;
var shiftOptions;

var editId;
var editWsId;
var shiftid;
var count=1;
var stationid="";
var itemid="";
var rowcount="";

var addstationid="";
var additemid="";
var addrowcount="";
var flag;
var deleteItem = [];
var deleteStationItem = [];
var deleteViewItem = [];

$(document).ready(function(){
	
	//get data for plan edit
	editId = GetURLParameter('prodid');
	console.log("EditID"+editId);
	
	$.ajax({
	    type: 'GET',
	    url: server_url + `production/get/${editId}`,
	    enctype: 'application/json',
	    headers: authHeader,
	    processData: false,
	    contentType: false,
	    data: null,
	    success: function (result) {

			console.log("------response data----------",result.payload);
			unitid = result.payload.unitid;
			editWsId = result.payload.workcenterid;
			shiftid = result.payload.shiftid;
			
			$("#prodDate").val(DateformatedYYYYMMDD_to_DDMMYYYY(result.payload.proddate));
			$("#addUnit").val(result.payload.unitname);
			$("#addWorkCenter").val(result.payload.workcentername);
			$("#addShift").val(result.payload.shiftname);
			$("#addStation").val(result.payload.stationname);
			$("#addOperator").val(result.payload.operatorname);
			//availability
			
			$("#lunchT").val(result.payload.availabilitylunchtime);
			$("#teaT").val(result.payload.availabilityteatime);
			$("#reviewT").val(result.payload.availabilityreviewtime);
			$("#inspecT").val(result.payload.availabilityinpectiontime);
			$("#machineBrkT").val(result.payload.availabilitymachinebreakdown);
			
			$("#setupT").val(result.payload.availabilitysetupchange);
			$("#noMatT").val(result.payload.availabilitynomaterial);
			$("#noLabT").val(result.payload.availabilitynolabour);
			$("#waitInspecT").val(result.payload.availabilityinspection);
			$("#noToolT").val(result.payload.availabilitytooling);
			$("#noDrawT").val(result.payload.availabilitydrawing);
			$("#noGaugT").val(result.payload.availabilityguages);
			
			$("#anyLossT").val(result.payload.availabilityotherlosses);
			$("#Overtime").val(result.payload.availabilityovertime);
			$("#totaltime").val(result.payload.availabilitytotaltime);
			$("#Stdlosses").val(result.payload.availabilitystdloss);
			$("#Spllosses").val(result.payload.availabilityspecloss);
			$("#Totallosses").val(result.payload.availabilitytotloss);
			$("#availableT").val(result.payload.availabilitytime);
			$("#availabilityPer").val(result.payload.availabilityper);

			//Productivity
			$("#searchT").val(result.payload.productivitysearching);
			$("#personnalT").val(result.payload.productivitypersonnal);
			$("#reworkT").val(result.payload.productivityrework);
			
			$("#availabletimeVal").val(result.payload.productivity_Production_availabletime_qty);
			$("#totalUtilisedTime").val(result.payload.productivity_total_utilised_time); 
			$("#productivityper").val(result.payload.productivityper); 

			// Quality
			$("#totalplannedVal").val(result.payload.total_planned); //
			$("#achievementPer").val(result.payload.achievement_per); // 
			$("#rejectionPer").val(result.payload.rejectionper); //
			
			$("#rejectQty").val(result.payload.rejectionrejectionqty);
			$("#qualityProduction").val(result.payload.rejectionokqty);
			$("#qualityPer").val(result.payload.quality_per);
			$("#lossesReason").val(result.payload.lossesreason);
			$("#oeePer").val(result.payload.oeeper);
			
			
			for (i = 0; i < result.payload.prodPlanningDto.length; ++i) {
				var value1= result.payload.prodPlanningDto[i];
				  $('#planProdTbody').append('<tr class="tr_clone" >'
						+'<td class="table_input"> '+value1.item+' </td>'
						+'<td class="table_input"> '+value1.setup+' </td>'
						+'<td class="table_input"> '+value1.qty_planned+' </td>'
						+'<td class="table_input"> '+value1.qty_produced+' </td>'
						+'<td class="table_input"> '+value1.qty_rejected+' </td>'
				  +'</tr>');
			}
		},
       error: function (error) {
           ajaxerrormsg(error);
       }
	})
	
	//end get data for plan edit
	
	function GetURLParameter(sParam){
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++){
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam){
	            return decodeURIComponent(sParameterName[1]);
	        }
	    }
	}
});
