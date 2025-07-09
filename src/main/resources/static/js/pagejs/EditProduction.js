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
			
			$("#addUnit").val(result.payload.unitname);
			$("#addWorkCenter").val(result.payload.workcentername);
			$("#prodDate").val(result.payload.proddate);
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

			
			
			//quality
			
			$("#searchT").val(result.payload.productivitysearching);
			$("#personnalT").val(result.payload.productivitypersonnal);
			$("#reworkT").val(result.payload.productivityrework);
			$("#totalProdQty").val(result.payload.productivityProductionqty);
			$("#totalPlanQty").val(result.payload.productivitystandardqty);
			$("#productivityper").val(result.payload.rejectionrejectionqty);
			
			$("#rejectQty").val(result.payload.rejectionrejectionqty);
			$("#qualityProduction").val(result.payload.rejectionokqty);
			
			$("#qualityPer").val(result.payload.rejectionper);
			$("#oeePer").val(result.payload.oeeper);
			
			
			for (i = 0; i < result.payload.prodPlanningDto.length; ++i) {
				
				var buttonDiv = "";
				
				/*if(result.payload.prodPlanningDto[i].isdeleted == 'Inactive' ){
				
					//if(i == 0){
						buttonDiv = '<a  class="edit-button" viewid="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'_Tbody">View </a> <a  class="delete-button rowdelete" deleteid="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'_Tbody">Delete</a>  ' ;
					//}
					
					var lodstId = jQuery.trim(result.payload.planningShiftWork[i].stationid);
					
					 console.log("====lodstId=======",lodstId,"====lodstIdEnd=======",lodstIdEnd)
					
					$('#planningBbody').append('<tr class="tr_clone  '+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'_Tbody " roCnt = "'+i+'"  id = "'+jQuery.trim(result.payload.planningShiftWork[i].id)+'" >'
						+'<td class="table_input"> '+ (lodstId != lodstIdEnd ? jQuery.trim(result.payload.planningShiftWork[i].stationname) : " ") + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'"  disabled >  </td>'
						//+'<td class="table_input"> '+  jQuery.trim(result.payload.planningShiftWork[i].stationname)   + ' <input type="hidden" id=addSelMachineId${'+i+'} value="'+jQuery.trim(result.payload.planningShiftWork[i].stationid)+'"  disabled >  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].itemname) + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].itemid)+'"  disabled > </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].setupname) + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].setupid)+'"  disabled >  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].setuptime) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].cycletime) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].plannedquantity) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].plannedmins) + '  </td>'
						+'<td class="table_input"> '+ jQuery.trim(result.payload.planningShiftWork[i].itemtimeutilised) + ' % <input type="hidden" id="additemtimeutilised'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].itemtimeutilised)+'"  disabled > </td>'
						+'<td class="table_input"> '+ (lodstId != lodstIdEnd ? jQuery.trim(result.payload.planningShiftWork[i].machinetimeutilised) +" %" : " " )  + ' <input type="hidden" id="addSelMachineId'+i+'" value="'+jQuery.trim(result.payload.planningShiftWork[i].machinetimeutilised)+'"  disabled >  </td>'
						+'<td class="table_input">'
	//					+'<a  class="edit-button" id=${id}>Edit</a>'
	 					+ (lodstId != lodstIdEnd ? buttonDiv : " ")+ '<input type="hidden" id="shiftworkid'+i+'" value="'+result.payload.planningShiftWork[i].id+'"  disabled >'
						+'</td>'
					  +'</tr>');
					  
					  var lodstIdEnd = jQuery.trim(result.payload.planningShiftWork[i].stationid);
				  
				  }*/
				  
				//  console.log("====lodstId=======",lodstId,"====lodstIdEnd=======",lodstIdEnd)
			}
			
		},
		error: function (error) {
	         console.log(error);
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
	     	}
	    },
	})
	
	//end get data for plan edit
	
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

});
