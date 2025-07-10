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
				
					  
				var value1= result.payload.prodPlanningDto[i];
				
				console.log("===",value1.item);
				console.log("===!!!!!!!!",result.payload.prodPlanningDto[i].item);
				
					  $('#planProdTbody').append('<tr class="tr_clone" >'
	  						+'<td class="table_input"><input type="text" class="form-control width80 line txtItem "  id="itemId'+i+'" value="'+value1.item+'"   disabled> </td>'
	  						+'<td class="table_input"><input type="text" class="form-control width80 line txtSetup "  id="setupId'+i+'" value="'+value1.setup+'"   disabled></td>'
	  						+'<td class="table_input"><input type="text" class="form-control width80 line txtPlannedQty decimal"  id="plannedQty'+i+'" value="'+value1.qty_planned+'"   disabled></td>'
	  						+'<td class="table_input"><input type="text" class="form-control width80 line txtProducedQty decimal"  id="producedQty'+i+'" value ="'+value1.qty_produced+'"></td>'
	  						+'<td class="table_input"><input type="text" class="form-control width80 line txtRejectedQty decimal"   id="rejectedQty'+i+'" value="'+value1.qty_rejected+'"></td>'

	  					  +'</tr>');
					  							
			//	  }
				  
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
