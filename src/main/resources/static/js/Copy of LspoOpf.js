var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var temp = now.getDate() - 1;
var today = (day) + "-" + (month) + "-" + now.getFullYear()+"."+now.getHours()+"."+now.getMinutes()+"."+now.getSeconds();
var LSPOFilePath = "";
var OPFFilePath	= "";

var orderID= getParameterByName('tempOrdNo'); 

$(document).on("click", "#openLSPO", function(){

	console.log("------LSPOModal--------------");
	
	
	
	$.ajax({
		url  : "getLSPOItemList_invoice?"+new Date().getTime(),
		type : 'POST',
    	data : {
			//"ActFlag":"F"
    		"orderID":getParameterByName('tempOrdNo')
	     },
//		cache: false,
		success : function(res) {
			var CtrObj = $.parseJSON(res);
			
			
			console.log(CtrObj);
			$('#LSPOListData').empty();
			$("#localVendor").empty();
			
			//$('#SelPayTerms').append('<option value=' + 0+ '>  Select Payment term </option>');
			
			if (CtrObj.Soresult == "success"){
				$.each( CtrObj.Sodata, function( index, value ){
					
					$("#LSPOListData").append('<tr class="txtMult" ><td><input id="LSPOLVal'+value.PayId+'" name="LSPOLVal" type="checkbox" value='+value.PayId+'></td> ' +
											'<td>'+(index+1)+'</td><td>'+value.PayDesc+'</td>' +
											'<td><div class="form-group"><input type="number" id="Qty'+index+'" class="form-control Qty" min="0" placeholder="Qty" ></div></td> ' + 
							//				'<td>'+value.PayAmt+'</td>
											'<td><div class="form-group"><input type="number" id="PayAmount'+index+'" class="form-control PayAmount" min="0" placeholder="Amount"></div></td> ' + 
											'<td><div class="form-group"><input type="number" id="GstPercent'+index+'" class="form-control GstPercent"  min="1" placeholder="GST Percent"></div></td> ' + 						
											'<td><span class="multTotal">0.00</span></td></tr>');
				});
			}
			
//			$("#localVendor").append('<option value="0">  Select Vendor </option>');
			if (CtrObj.Lcresult == "success"){
				$.each( CtrObj.Lcdata, function( index, value ){
					
					$("#localVendor").append('<option value="'+value.LcId+'"> '+value.LcName+' </option>');
				});
			}
			
			$(".txtMult input").keyup(multInputs);
		}
	});
	$("#LSPOModal").modal("show");
	
	

});



function multInputs() {
	
	
	console.log("---multInputs--multInputs--------");
	
    var mult = 0;
    // for each row:
    $("tr.txtMult").each(function () {
        // get the values from this row:
        var $val1 = $('.Qty', this).val();
        var $val2 = $('.PayAmount', this).val();
        var $val3 = $('.GstPercent', this).val();
        
        	$val3 = ($val3/100);
    
        	console.log("---multInputs--$val3--------",$val3);
        	
        var $total = (($val1 * 1) * ($val2 * 1));
        
        $total	=	($val3 *  $total);
        
        var $GrTotal = ((($val1 * 1) * ($val2 * 1)) + $total)
        
        
        $('.multTotal',this).text(($GrTotal).toFixed(2));
//          mult += $total;
    });
//    $("#grandTotal").text(mult);
}






/*function TotalEachLspoPrice(myval)
{
	var totReimb=0;
	$(".txtPrRemAmt").each(function() 
	{		  				
		var amt=Number($(this).val().trim())||0;
	}
}*/





/*$(document).on("change", ".Qty", function(){
	console.log("-----Text1 change!--------");
});

$(document).on("input", ".Qty", function(){
	console.log("-----Text1 input!--------");
});
*/


$(document).on("click", "#forLSPOinvoice", function(){
	
	$("#ErrLSPO").empty();
	$("#LSPOInvoiceTbody").empty();
	
	 var checkboxes = document.querySelectorAll('input[name="LSPOLVal"]:checked'), values = [];
	
	if(NotAllowedNullVal("#ErrLSPO","Delivery Type",$('#deliveryType')))
		if(NotAllowedNullVal("#ErrLSPO","Payment Terms",$('#paymentTerms')))
		if(NotAllowedNullVal("#ErrLSPO","Warranty",$('#warranty')))
			if(NotAllowedNullVal("#ErrLSPO","Transportation ",$('#transportation')))
				if(NotAllowedNullVal("#ErrLSPO","Delivery At",$('#deliveryAt')))
					if(NotAllowedNullVal("#ErrLSPO","Please Raise Invoice On",$('#raiseInvoiceOn')))
	 					if(checkboxes.length!=0){
	
	
	 console.log("-------------checkboxes----------------",checkboxes);
	 console.log("-------------checkboxes.length----------------",checkboxes.length);
	 var i=1;
 	Array.prototype.forEach.call(checkboxes, function(el) {

 		var value = [];
 		
 		// get row 
 		var $tab = $("#"+el.id).parent().parent().find('td'); 
 	
 		console.log("-------------$tab----------------",$tab);
 		console.log("-------------$tab----------------",$tab.eq(3).find("input"));
 		console.log("-------------$tab----------------",$tab.eq(3).find("input").attr("id"));
 		console.log("-------------$tab----------------",$tab.eq(4).find("input").attr("id"));
 		console.log("-------------$tab----------------",$tab.eq(5).find("input").attr("id"));
 		
 		if(NotAllowedNullVal("#ErrLSPO","Item Qty",$('#'+$tab.eq(3).find("input").attr("id"))))
 			if(NotAllowedNullVal("#ErrLSPO","Delivery Type",$('#'+$tab.eq(4).find("input").attr("id"))))
 					if(NotAllowedNullVal("#ErrLSPO","Delivery Type",$('#'+$tab.eq(5).find("input").attr("id")))){
 		
		 		value.push(el.value);
		 		value.push($tab.eq(3).find("input").val());
		 		value.push($tab.eq(4).find("input").val());
		 		value.push($tab.eq(5).find("input").val());
 		
 			values.push(value);
    	
    	//$("#LSPOInvoiceTbody").append('<tr><td>'+$tab.eq(1).text()+'</td><td>'+$tab.eq(2).text()+'</td><td>'+$tab.eq(3).find("input").val()+'</td><td>'+$tab.eq(4).find("input").val()+'</td><td>'+$tab.eq(5).text()+'</td></tr>');
    //	$("#LSPOInvoiceTbody").append('<tr><td>'+i+'</td><td>'+$tab.eq(2).text()+'</td><td>'+$tab.eq(3).find("input").val()+'</td><td>'+$tab.eq(4).find("input").val()+'</td><td>'+$tab.eq(5).text()+'</td></tr>');
    	
 		}
    i++;
 	});
 	
 	console.log("-------------localVendor----------------",$("#localVendor").val());
 	
 	
 	
	console.log("-------------values----------------",values);

		if(values.length == checkboxes.length){
//		if(NotAllowedNullVal("#ErrLSPO","GST Amount",$("#GSTPer")))

		
		
				var data = { 
				 		
			 			lcID 			: $.trim($("#localVendor").val()),
			 			orderIDV		: orderID,
			 			ItemList 		: values,
			 			//GSTPer 			: $.trim($("#GSTPer").val()),
			 			deliveryType 	: $.trim($("#deliveryType").val()),
			 			paymentTerms 	: $.trim($("#paymentTerms").val()),
			 			warranty		: $.trim($("#warranty").val()),
			 			transportation 	: $.trim($("#transportation").val()),
			 			deliveryAt		: $.trim($("#deliveryAt").val()),
			 			remarksLSPOV	: $.trim($("#RemarksLSPO").val()),
			 			raiseInvoiceOn 	: $.trim($("#raiseInvoiceOn").val())
			 			
			 	};
		
				$.ajax({
					url  : "getLSPOInfoA_invoice?"+new Date().getTime(),
					type : 'POST',
			    	data : {
			    		"dataVal" : JSON.stringify(data)
				     },
					success : function(res) {
						var CtrObj = $.parseJSON(res);
						
						
						console.log(CtrObj);
						
						console.log(CtrObj.lcFilePath);
						LSPOFilePath = CtrObj.lcFilePath;
						
						if (CtrObj.lcInforesult == "success"){
							
/*							$.each( CtrObj.lcInfodata, function( index, value ){
								
								$("#lcNameText").text(value.LcName);
								$("#lcPlaceText").text(value.LcPlace);
								$("#lcContDetlText").text(value.LcContDetl);
							});
							*/
							$("#LSPOModal").modal("hide");
							
							window.location.href = "downloadLSPO?LSPOFilePath="+LSPOFilePath;
							
							allLspoOpfList();
							
						}else{
							
							$("#ErrLSPO").append("Please Contact to Administrator, There is some problem to generate LSPO");
						}
					}
				});
				
/*	
		console.log("-------------",$("#GSTPer").val());
		console.log("-------------",$("#deliveryType").val());
		console.log("-------------",$("#paymentTerms").val());
		console.log("-------------",$("#warranty").val());
		console.log("-------------",$("#transportation").val());
		console.log("-------------",$("#deliveryAt").val());
		console.log("-------------",$("#raiseInvoiceOn").val());
		
		
		
		var months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

		var PurchaseOrderDate = now.getDate()+" "+months[now.getMonth()]+", "+now.getFullYear();
		
		console.log("-------------PurchaseOrderDate----------------",PurchaseOrderDate);
		
		$("#purchaseOrderDateText").text(now.getDate()+" "+months[now.getMonth()]+", "+now.getFullYear());
		
		$("#deliveryTypeText").text($("#deliveryType").val());
		$("#paymentText").text($("#paymentTerms").val());
		$("#warrantyText").text($("#warranty").val());
		$("#transportationText").text($("#transportation").val());
		$("#deliveryText").text($("#deliveryAt").val());
		$("#invoiceOnText").text($("#raiseInvoiceOn").val());
		
		
		
		$("#selLSPODataButton").hide();
		$("#LSPOinvoiceButton").show();
		$("#selLSPOData").hide();
		$("#LSPOinvoice").show();
	*/
	
	}
	}else{
		
		console.log("-------plz-----Select  Item----------------");
		
		$("#ErrLSPO").append("Please Select Item list ");
	}
});
		

$(document).on("click", "#savePDF", function(){

	/*console.log("-------------LSPOFilePath Item----------------",LSPOFilePath);
	window.location.href = LSPOFilePath;
	*/
	//var href = $('.downloadLink').attr('href');
	
	
	 window.location.href = "downloadLSPO?LSPOFilePath="+LSPOFilePath;
	
});



$(document).on("click", "#forOPFinvoice", function(){

	
	$("#ErrOPF").empty();
	
	 
	
	
	 console.log("------------RemarksOPF----------------",$.trim($("#RemarksOPF").val()));
	 
	
 	var data = { 
 			orderIDV				: orderID,
 			shipmentToV 			: $.trim($("#shipmentTo").val()),
 			modeOfDispatchV 		: $.trim($("#modeOfDispatch").val()),
 			specialInstructionsV 	: $.trim($("#specialInstructions").val()),
 			freightV 				: $.trim($("#freight").val()),
 			insuranceV				: $.trim($("#insurance").val()),
 			remarksOPFV				: $.trim($("#RemarksOPF").val())
 			
 	};
 	
 	if(NotAllowedNullVal("#ErrOPF","Shipment To",$("#shipmentTo")))
 		if(NotAllowedNullVal("#ErrOPF","Mode Of Dispatch",$("#modeOfDispatch")))
 			if(NotAllowedNullVal("#ErrOPF","Special Instructions",$("#specialInstructions")))
 				if(NotAllowedNullVal("#ErrOPF","Insurance",$("#insurance"))){
			$.ajax({
				url  : "getOPFInfo_invoice?"+new Date().getTime(),
				type : 'POST',
		    	data : {
		    		
		    		"dataVal" : JSON.stringify(data)
		    		
		    	},
				success : function(res) {
					var CtrObj = $.parseJSON(res);
					
					
					console.log(CtrObj);
					
					console.log(CtrObj.lcOPFFilePath);
					OPFFilePath = CtrObj.lcOPFFilePath;
					
					if (CtrObj.lcInforesult == "success"){
						
						/*$.each( CtrObj.lcInfodata, function( index, value ){
							
							$("#lcNameText").text(value.LcName);
							$("#lcPlaceText").text(value.LcPlace);
							$("#lcContDetlText").text(value.LcContDetl);
						});*/
						
						
						window.location.href = "downloadOPF?OPFFilePath="+OPFFilePath;
						
						
						allLspoOpfList();
						
						$("#OPFModal").modal("hide");
					}
					
					
					if (CtrObj.lcInforesult == "error"){
						
						$("#ErrOPF").append("Please Contact to Administrator, There is some problem to generate OPF");
						
					}
				}
			});
		 	
			
			
			
 		}
	/*
	$("#selOPFInButton").hide();
	$("#selOPFOutButton").show();
	$("#selOPFInData").hide();
	$("#selOPFOutData").show();
*/
});

$(document).on("click", "#forFPOinvoice", function(){

	
	$("#ErrOPF").empty();
	 console.log("------------RemarksOPF----------------",$.trim($("#RemarksOPF").val()));
	 
 	var data = { 
 			orderIDV				: orderID,
 			FPOshipmentTermsV 		: $.trim($("#FPOshipmentTerms").val()),
 			FPOPaymentTermsV 		: $.trim($("#FPOPaymentTerms").val()),
 			FPOPortOfDischargeV 	: $.trim($("#FPOPortOfDischarge").val()),
 			FPOModeFoShipmentV 		: $.trim($("#FPOModeFoShipment").val()),
 			FPOItemsV 				: $.trim($("#FPOItems").val()),
 			FPOPackingV				: $.trim($("#FPOPacking").val()),
 			FPOInstallationV		: $.trim($("#FPOInstallation").val()),
 			FPOInsuranceV			: $.trim($("#FPOInsurance").val()),
 			FPODeliveryTermsV		: $.trim($("#FPODeliveryTerms").val()),
 			FPORemarksV				: $.trim($("#FPORemarks").val()),
 			FPOWarranty				: $.trim($("#FPOWarranty").val())
 			
 	};
 	
 	
 	
 	if(NotAllowedNullVal("#ErrFpo","Shipment Terms ",$("#FPOshipmentTerms")))
 		if(NotAllowedNullVal("#ErrFpo","Port Of Discharge",$("#FPOPortOfDischarge")))
 			if(NotAllowedNullVal("#ErrFpo","Mode Fo Shipment",$("#FPOModeFoShipment")))
 				if(NotAllowedNullVal("#ErrFpo","Items ",$("#FPOItems")))
 					if(NotAllowedNullVal("#ErrFpo","Packing ",$("#FPOPacking")))
 						if(ValidationForSelectBox("#ErrFpo","Installation ",$("#FPOInstallation")))
 							if(ValidationForSelectBox("#ErrFpo","Insurance ",$("#FPOInsurance")))
 								if(NotAllowedNullVal("#ErrFpo","Delivery Terms",$("#FPODeliveryTerms")))
 									if(NotAllowedNullVal("#ErrFpo","Payment Terms",$("#FPOPaymentTerms"))){

			$.ajax({
				url  : "getFPOInfo_invoice?"+new Date().getTime(),
				type : 'POST',
		    	data : {
		    		"dataVal" : JSON.stringify(data)
		    	},
				success : function(res) {
					var CtrObj = $.parseJSON(res);
					
					console.log(CtrObj);
					
					console.log(CtrObj.lcOPFFilePath);
					OPFFilePath = CtrObj.lcOPFFilePath;
					
					if (CtrObj.lcInforesult == "success"){
						
						$.each( CtrObj.lcInfodata, function( index, value ){
							
							$("#lcNameText").text(value.LcName);
							$("#lcPlaceText").text(value.LcPlace);
							$("#lcContDetlText").text(value.LcContDetl);
						});
						
						window.location.href = "downloadFPO?FPOFilePath="+OPFFilePath;
						
						allLspoOpfList();
						
						$("#FPOModal").modal("hide");
					}
					
					if (CtrObj.lcInforesult == "error"){
						
						$("#ErrOPF").append("Please Contact to Administrator, There is some problem to generate OPF");
						
					}
				}
			});
 	}
});











$(document).on("click", "#forCIFinvoice", function(){

	$("#ErrCIF").empty();
	
 	var data = { 
 			orderIDV				: orderID,
 	};
 	
	$.ajax({
		url  : "getCIFInfo_invoice?"+new Date().getTime(),
		type : 'POST',
    	data : {
    		
    		"dataVal" : JSON.stringify(data)
    		
    	},
		success : function(res) {
			var CtrObj = $.parseJSON(res);
			
			
			console.log(CtrObj);
			
			console.log(CtrObj.lcCIFFilePath);
			CIFFilePath = CtrObj.lcCIFFilePath;
			
			if (CtrObj.lcInforesult == "success"){
				
				window.location.href = "downloadCIF?CIFFilePath="+CIFFilePath;
				
//				allLspoOpfList();
				
//				$("#CIFModal").modal("hide");
			}
			
			
			if (CtrObj.lcInforesult == "error"){
				
				$("#ErrCIF").append("Please Contact to Administrator, There is some problem to generate CIF");
				
			}
		}
	});
		 	
});

$(document).on("click", "#serCIFinvoice", function(){
	
		var data = { 
 			orderIDV		: orderID
 		};
 	
 		console.log("-----data----",data);
 		
	$.ajax({
		url  : "getVisitDates_invoice?"+new Date().getTime(),
		type : 'POST',
    	data : {
    		
    		"dataVal" : JSON.stringify(data)
    		
    	},
		success : function(res) {
			var CtrObj = $.parseJSON(res);
			
			
			console.log(CtrObj);
			$("#visitDatesList").empty();
			$("#GSTNo").empty();
			$.each( CtrObj.PayVal, function( index, value ){
				
				$("#visitDatesList").append('<div class="col-sm-4"><input type="checkbox" name="visitDates" value="'+value.PayID+'"> '+value.PayDate+' </div>'); 
			});
			
			$.each( CtrObj.GstList.GstList, function( index, value ){
				
				$("#GSTNo").append('<option value="'+value.GST_ID+'"> '+value.GST_No+' ( '+value.Location+' ) </option>'); 
			});
			
			
			$("#SerCIFInvModal").modal("show");
		}
	});
	
	
	

});	

$(document).on("click", "#forSerCIFinvoice", function(){
	$("#ErrCIF").empty();
	
	
	var favorite = [];
    $.each($("input[name='visitDates']:checked"), function(){            
        favorite.push($(this).val());
    });

    
    console.log("----- favorite------", favorite)
    
    if(NotAllowedNullVal("#ErrSerCIF","Bill No ",$("#billNo")))
    	if(NotAllowedNullVal("#ErrSerCIF","Bill Date ",$("#billDate")))
    		if(favorite.length == 0){
    			$("#ErrSerCIF").append("select visit Dates");
    				return false;
    		}
    		if(NotAllowedNullVal("#ErrSerCIF","SGST ",$("#SGSTTax")))
    			if(NotAllowedNullVal("#ErrSerCIF","CGST ",$("#CGSTTax")))
    				if(NotAllowedNullVal("#ErrSerCIF","IGST ",$("#IGSTTax")))
    					if(NotAllowedNullVal("#ErrSerCIF","SAC Code ",$("#SACCode")))
    						if(NotAllowedNullVal("#ErrSerCIF","Description ",$("#Description"))){
    
    	var data = { 
 			orderIDV		: orderID,
 			billNo			: $("#billNo").val().trim(),
 			billDate		: $("#billDate").val().trim(),
 			
 			SGSTTax			: $("#SGSTTax").val().trim(),
 			CGSTTax			: $("#CGSTTax").val().trim(),
 			IGSTTax			: $("#IGSTTax").val().trim(),
 			SACCode			: $("#SACCode").val().trim(),
 			GSTNo			: $("#GSTNo").val().trim(),
 			visitDates		: favorite.join(", "),
 			
 			taxRevCharge	: $("input[name='taxReverseCharge']:checked").val().trim(),
 			Description		: $("#Description").val().trim()
// 			RemarksSerCIF	: $("#RemarksSerCIF").val()
 			
 		};
 	
 		
 		console.log("-----data----",data);
 		
 		
	$.ajax({
		url  : "getSerCIFInfo_invoice?"+new Date().getTime(),
		type : 'POST',
    	data : {
    		
    		"dataVal" : JSON.stringify(data)
    		
    	},
		success : function(res) {
			var CtrObj = $.parseJSON(res);
			
			
			console.log(CtrObj);
			
			console.log(CtrObj.lcCIFFilePath);
			CIFFilePath = CtrObj.lcCIFFilePath;
			
			if (CtrObj.lcInforesult == "success"){
				
				window.location.href = "downloadSerCIF?SerCIFFilePath="+CIFFilePath;
				
//				allLspoOpfList();
				
//				$("#CIFModal").modal("hide");
				
				$("#SerCIFInvModal").modal("hide");
			}
			
			
			if (CtrObj.lcInforesult == "error"){
				
				$("#ErrCIF").append("Please Contact to Administrator, There is some problem to generate CIF");
				
			}
		}
	});
   }	
});














function SCGstCheck() {
	console.log("-------------getElementById Item----------------",document.getElementById('SCGstCheck').checked);
	console.log("-------------getElementById Item----------------",document.getElementById('IGSTCheck').checked);
	
	
	console.log("-------------getElementByName Item----------------",document.getElementsByName('IGSTCheck'));
	
	
    /*if (document.getElementById('yesCheck').checked) {
        document.getElementById('ifYes').style.display = 'block';
    }
    else document.getElementById('ifYes').style.display = 'none';*/

}



$(document).on("click", "#saveOPFPdf", function(){

	/*console.log("-------------LSPOFilePath Item----------------",LSPOFilePath);
	window.location.href = LSPOFilePath;
	*/
	//var href = $('.downloadLink').attr('href');
	
	
	// window.location.href = "downloadOPF?OPFFilePath="+OPFFilePath;
	
});

$(document).ready(function(){
	
	
	
	allLspoOpfList();

});



function allLspoOpfList(){
	
	$.ajax({
		url  : "getGeneratedPdfList_invoice?"+new Date().getTime(),
		type : 'POST',
    	data : {
    		"dataVal" : orderID
    	},
		success : function(res) {
			var CtrObj = $.parseJSON(res);
			
			if (CtrObj.result == "success"){
				
				if( CtrObj.LspoData.length == 0 && CtrObj.OPFData.length == 0 && CtrObj.FpoData.length == 0 ){
					
					$("#LSPO_OPF").hide();
				}else{
				
				
					$("#LSPO_OPF").show();
					
					if( CtrObj.LspoData.length == 0){
					
						$("#LSPO_List").hide();
					}
					if(CtrObj.OPFData.length == 0){
					
						$("#OPF_List").hide();
					}
					
					if(CtrObj.FpoData.length == 0){
					
						$("#FPO_List").hide();
					}
					
				}
				
				$("#LspoList").empty();
				$("#OpfList").empty();
				$("#FpoList").empty();
				
				$.each( CtrObj.LspoData, function( index, value ){
					
					$("#LspoList").append("<li><a href='downloadLSPO?LSPOFilePath="+value.lspo_filePath+"'>"+  value.lspo_fileName +"</a></li>");
				});
				
				$.each( CtrObj.OPFData, function( index, value ){
					
					$("#OpfList").append("<li><a href='downloadOPF?OPFFilePath="+value.opf_filePath+"'>"+ value.opf_fileName +"</a></li>");
				});
				
				$.each( CtrObj.FpoData, function( index, value ){
					
					$("#FpoList").append("<li><a href='downloadFPO?FPOFilePath="+value.fpo_filePath+"'>"+ value.fpo_fileName +"</a></li>");
				});
			}
		}
	});
}
