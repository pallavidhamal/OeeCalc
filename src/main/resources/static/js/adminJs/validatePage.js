/*
@Company : Scube Technology Services
@Author : Keshav patel

Please don't remove any comments from this file.
*/

/*
NotAllowedNullVal(ErrorDivName,ColumnName,$.trim(EnterValue)) // null
AllowedOnlyAlphabetsVal(ErrorDivName,ColumnName,$.trim(EnterValue))  //Only Alphabets
AllowedAlphabetsLengthVal(ErrorDivName,ColumnName,$.trim(EnterValue),3,10) // Alphabets Length
NotMandatoryButUrlValidation(ErrorDivName,ColumnName,$.trim(EnterValue))// Url
EmailValidation(ErrorDivName,ColumnName,$.trim(EnterValue))// EmailId
ValidationForSelectBox(ErrorDivName,ColumnName,$.trim(EnterValue))// SelectBox

*/

/* ****************************************************************************** massages ****************************************************************************** */

var mandatory 		= "is mandatory.";
var message         = "do not match with Confirm password.";
var message1         = "password incorrect";
var OnlyAlphabets 	= "can have Alphabets only.";
var OnlyNumber	  	= "is only Number.";
var Min 	  		= "minimum"; 

var ChaReq    		= "characters required."
	
/* ****************************************************************************** massages ****************************************************************************** */

	function validationForSiteAndLoc(ErrDivName,value){
	
	console.log("validationForSiteAndLoc--value---- ",value);
	
	if(value==7){
		
		console.log("herehere herehere--- ");
		
		
		if(NotAllowedNullVal("#pmErrAdd","Site to",$('#siteto')))
			
		return true;
	}
	return true;
	
	/*if(NotAllowedNullVal("#pmErrAdd","Site to",$('#siteto')))
		return true;*/
	}
	
	
	function validationSIandCust(ErrDivName,value){
	
	console.log("validationSIandCust--value---- ",ErrDivName);
	
	console.log("-validationSIandCust-value---- ",value.val());
	
	if(value.val() == 1){
		
		if(ValidationForSelectBox("#usrErrAdd","SI Company Name ",$('#siCompanylist')))
		return true;
	}
	
	if(value.val() == 3){
		
		if(ValidationForSelectBox("#usrErrAdd","Customer Name is",$('#subContractorListadd')))
		return true;
	}
	if((value.val() == 2)||(value.val() == 4)){
		
		return true;
	}
	
 	}

function validationSIandCustEdt(ErrDivName,value){
	
	console.log("validationSIandCust--value---- ",ErrDivName);
	
	console.log("-validationSIandCust-value---- ",value.val());
	
	if(value.val() == 1){
		
		if(ValidationForSelectBox("#usrErrAdd","SI Company Name ",$('#siCompanylistEdt')))
		return true;
	}
	
	if(value.val() == 3){
		
		if(ValidationForSelectBox("#usrErrAdd","Customer Name is",$('#subContractorListedt')))
		return true;
	}
	if((value.val() == 2)||(value.val() == 4)){
		
		return true;
	}
	
 	}
	
	
	function checkLength(ErrDivName,FieldName,value){

			if(value.val().length <= 4){
		    	
		    	$(ErrDivName).append( FieldName+ "is must be more than 4 characters.");
		    	return false;
		    }
			return true;
	}
	
	
	function validationForCheckBoxInSelect(ErrDivName,FieldName){
			$(ErrDivName).empty();
	
			console.log("------append FieldName--------",FieldName);
			
			checked = $("input[type=checkbox]:checked").length;

			if(!checked) {
				console.log("------append --------");
				$(ErrDivName).append("You must check at least one " +FieldName);
				return false;
			}
					
			return true;
	}
	
	function ValidateOldPswd(ErrDivName,FieldName,value) {
	console.log("ValidateOldPswd--value---- ",value.val());
    var password = document.getElementById("txtoldpswd").value;
    $(ErrDivName).empty();
    if (password == NULL) {
    	 $(ErrDivName).append(FieldName+" "+ message1);
    	 
    //alert("Passwords do not match.");
    return false;
    }
   
    return true;
	}

	
	function ValidatePswd(ErrDivName,FieldName,valueNew_pass,valueConfm_pass) {

	    if (valueNew_pass.val() != valueConfm_pass.val()) {
	    	 $(ErrDivName).append(FieldName+" "+" do not match with Confirm password.");
	    	 
	     return false;
	    }else{
	    	
	    	 return true;
	    }

	}
	
	
	
	
	// validationForNotNull rel to 	AllowedOnlyNotNullVal
		
	function NotAllowedNullVal(ErrDivName,FieldName,value){

		 //console.log("NotAllowedNullVal ---------value---------hiiii-",value);
		 console.log("NotAllowedNullVal--value---- ",value.val());
		 //console.log("NotAllowedNullVal ---------value.selector----------",value.selector);
		if($.trim(value.val()) != "" && $.trim(value.val()) != null && $.trim(value.val()) != "null" && $.trim(value.val()) != undefined){
			//alert("Hi-----");
			 console.log("NotAllowedNullVal ---------if----------",FieldName);
			$(ErrDivName).empty();
			 removeErrorClass(value);
			 addSuccessClass(value);
		   return true;
		  }else{
			  console.log("NotAllowedNullVal ---------else----------",FieldName);
			 $(ErrDivName).empty();
			 $(ErrDivName).append(FieldName+" "+ mandatory);
			 removeSuccessClass(value);
			 addErrorClass(value);
			return false;
		 }
	}
		
// validation for migration type task	
	function validationForMigration(ErrDivName,arr)
	{		
		var flag =false;
		console.log("arr[0].task==="+arr[0].task);
		if((arr[0].task==7)||(arr[0].task==9))
		{			
			console.log("arr[0].task==inside="+arr[0].task);

			if(NotAllowedNullVal("#pmErrAdd","Opposite Site Name",$('#siteto')))
				if(NotAllowedNullVal("#pmErrAdd","Engineer At Opposite Location",$('#locto')))	
					if(NotAllowedNullVal("#pmErrAdd","Main Site Name",$('#fromEng')))
						if(NotAllowedNullVal("#pmErrAdd","Engineer At Main Site",$('#toEng')))	
						{
							flag=true;
						}
		}
		else
		{
			flag=true;
		}
		
		return flag;
	}
	
	function validationForManday(ErrDivName,arr)
	{		
		var flag =false;
		console.log("arr[0].task==="+arr[0].task);
		if((arr[0].task==10))
		{			
			console.log("arr[0].task==inside="+arr[0].task);

			if(NotAllowedNullVal("#pmErrAdd","Purpose",$('#mvPurpose')))
				{
							flag=true;
						}
		}
		else
		{
			flag=true;
		}
		
		return flag;
	}
	
	function validationForStandalone(ErrDivName,arr,value)
	{
		
		
		if((arr.includes("5"))&&(value.val()!= 1 ))
		{
			$(ErrDivName).empty();
			$(ErrDivName).append("Standalone acceptance can be selected only for Bharti Airtel");
			removeSuccessClass(value);
			addErrorClass(value);
			return false;
		}
		else
		{
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			return true;
		}
	}

	function ValidationForSelectBox(ErrDivName,FieldName,value){
		
		if( value.val() != 0 ){
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			return true;	
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append(FieldName+" "+ mandatory);
			removeSuccessClass(value);
			addErrorClass(value);
			return false;
		}
	}

	function ValidationForRadio(ErrDivName,FieldName,value){

		
		console.log("ValidationForRadio value---",value);
		console.log("ValidationForRadio value---",value.val());
		console.log("ValidationForRadio FieldName---",FieldName);
		console.log("ValidationForRadio ErrDivName---",ErrDivName);
		
		if($.trim(value.val()) != undefined && $.trim(value.val()) != "" && $.trim(value.val()) != null){
			console.log("ValidationForRadio ---------if----------");
			 $(ErrDivName).empty();
			 removeErrorClass(value);
			 addSuccessClass(value);
		   return true;
		  }else{
			  console.log("ValidationForRadio ---------else----------");
			 $(ErrDivName).empty();
			 $(ErrDivName).append(FieldName+" "+ mandatory);
			 removeSuccessClass(value);
			 addErrorClass(value);
			return false;
		 }	
	}
	
	function ValidationForCheckBox(ErrDivName,FieldName,value){

		
		console.log("ValidationForRadio value---",value.is(':checked'));
		console.log("ValidationForRadio value---",value.val());
		console.log("ValidationForRadio FieldName---",FieldName);
		console.log("ValidationForRadio ErrDivName---",ErrDivName);
		
		if(value.is(':checked')){
			console.log("ValidationForRadio ---------if----------");
			 $(ErrDivName).empty();
			 removeErrorClass(value);
			 addSuccessClass(value);
		   return true;
		  }else{
			  console.log("ValidationForRadio ---------else----------");
			 $(ErrDivName).empty();
			 $(ErrDivName).append(FieldName+" "+ mandatory);
			 removeSuccessClass(value);
			 addErrorClass(value);
			return false;
		 }	
	}


	/* chang after delete */	
		// for null 
	function validationForNotNull(ErrDivName,FieldName,value){

		if($.trim(value.val()) != "" && $.trim(value.val()) != null){
			 $(ErrDivName).empty();
			 removeErrorClass(value);
			 addSuccessClass(value);
		   return true;
		  }else{
			 $(ErrDivName).empty();
			 $(ErrDivName).append(FieldName+" "+ mandatory);
			 removeSuccessClass(value);
			 addErrorClass(value);
			return false;
		 }	
	}
	
	function validationNotNull(value,Label,errorDiv)
	{
		//alert(value);
		if(value != "" && value != null){
			$(errorDiv).empty();
			return true;
		  } 
		 else{
			 $(errorDiv).empty();
	 		 $(errorDiv).append(Label+" is mandatory.");
	 		 return false;
		 }	
	}
	

	function validationSelectBox(value,Label,errorDiv)
	{
//		alert(value);
		if(value != "0" && value != null){
			$(errorDiv).empty();
			return true;
		  } 
		 else{
			 $(errorDiv).empty();
	 		 $(errorDiv).append("Please select "+Label);
	 		 return false;
		 }	
	}
	
	/* end chang after delete */

	// Alphabets Validation 

	function AllowedOnlyAlphabetsVal(ErrDivName,FieldName,value){
		
		if((/^[a-zA-Z.\s]+$/).test($.trim(value.val()))){
			 $(ErrDivName).empty();
			 removeErrorClass(value);
			 addSuccessClass(value);
			return true;
		}else{
			 $(ErrDivName).empty();
			 $(ErrDivName).append(FieldName+" "+OnlyAlphabets);
			 removeSuccessClass(value);
			 addErrorClass(value);
			return false;
		}	
	}
	
	
	function allowEmptyOnlyAlphabetsVal(ErrDivName,FieldName,value)
	{
		console.log("here----PPPPPPPP"+value.val()+"----");
		
		if((value.val().trim())=="")
		{
			console.log("here----PPPPPPPP");
			return true;	
		}
		else
		{
			 return AllowedOnlyAlphabetsVal(ErrDivName,FieldName,value);
		}
	}
	
	function AllowedOnlyAlphanumericVal(ErrDivName,FieldName,value){
		
		
		console.log("AllowedOnlyAlphanumericVal value---",value);
		console.log("AllowedOnlyAlphanumericVal value.val()---",value.val());
		console.log("AllowedOnlyAlphanumericVal FieldName---",FieldName);
		console.log("AllowedOnlyAlphanumericVal ErrDivName---",ErrDivName);
		
		
		if((/^[a-zA-Z0-9\s]+$/).test($.trim(value.val()))){
			 $(ErrDivName).empty();
			 removeErrorClass(value);
			 addSuccessClass(value);
			return true;
		}else{
			 $(ErrDivName).empty();
			 $(ErrDivName).append(FieldName+" "+OnlyAlphabets);
			 removeSuccessClass(value);
			 addErrorClass(value);
			return false;
		}	
	}

	function AllowedAlphabetsLengthVal(ErrDivName,FieldName,value,minLimit,maxLimit){

//		if((/^[\s\S]{3,}$/).test(value.length)){
		
//		windowSize.between(500, 603, true)
		
		if(value.val().length >= minLimit && value.val().length <= maxLimit){
			 $(ErrDivName).empty();
			 removeErrorClass(value);
			 addSuccessClass(value);
			return true;		
		}else{
			
			 $(ErrDivName).empty();
			 $(ErrDivName).append(FieldName+" "+Min+" "+minLimit+" "+ChaReq);
			 removeSuccessClass(value);
			 removeSuccessClass(value);
			 addErrorClass(value);
			return false;
		}
	}


	function AllowedOnlyNumberNoDecimal(ErrDivName,FieldName,value){
		
		if((/^(0?[1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/).test($.trim(value.val()))){
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			return true;	
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append(FieldName+" can have Numeric value only.");
			removeSuccessClass(value);
			addErrorClass(value);
			return false;
		}
		
	}
	
function AllowedOnlyNumber(ErrDivName,FieldName,value){

		if((/^[0-9]+$/).test($.trim(value.val()))){
			console.log("asd");
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			return true;	
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append(FieldName+" can have Numeric only.");
			removeSuccessClass(value);
			addErrorClass(value);
			return false;
		}
		
	}
	
	
	

	function ZeroNotAllowed(ErrDivName,FieldName,value){
		
		if( value.text() > 0 ){
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			return true;	
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append("please select your Advertise area in "+FieldName);
			removeSuccessClass(value);
			addErrorClass(value);
			return false;
		}
		 return false;
	}


	/*this function allow 

	7506173236
	07506173236
	+917506173236
	*/
	function PhoneNoValidation(ErrDivName,FieldName,value){
		console.log("PhoneNoValidation--value--employee--phone",value.val());
		
		/* moax 10 digits allowd if((/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test($.trim(value.val()))){
		*/
		/* more than 10 digits allowed  if((/[1-9]{1}[0-9]{9}[1-9]{1}[0-9]{9}(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|* (?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)/).test($.trim(value.val()))){
		*/
		if((/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i).test($.trim(value.val()))){
		//if((/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).test($.trim(value.val()))){
		$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			return true;	
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append("Please enter a valid "+FieldName);
			removeSuccessClass(value);
			addErrorClass(value);
			//$(ErrDivName).append("more than 10 no not allowed");
			return false;
		}
		
	}


	function EmailValidation(ErrDivName,FieldName,value){
		
		 console.log("EmailValidation--value--employee--email",value.val());
		
		if((/[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})/).test($.trim(value.val()))){
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			return true;	
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append("Please Enter a Valid EmailID.");
			removeSuccessClass(value);
			addErrorClass(value);
			return false;
		}
		
	}

	function UrlValidation(ErrDivName,FieldName,value){
		
		if((/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/).test($.trim(value.val()))){
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			 return true;
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append("please enter a valid "+FieldName);
			removeSuccessClass(value);
			addErrorClass(value);
			 return false;
		}
	}

	/*
	^ = Start of the string.
	\d{5} = Match 5 digits (for condition 1, 2, 3)
	(?:�) = Grouping
	[-\s] = Match a space (for condition 3) or a hyphen (for condition 2)
	\d{4} = Match 4 digits (for condition 2, 3)
	�? = The pattern before it is optional (for condition 1)
	$ = End of the string.

	*/

	function ZipValidation(ErrDivName,FieldName,value){
		
		if((/^\d{5}?$/).test($.trim(value.val()))){
			$(ErrDivName).empty();
			removeErrorClass(value);
			addSuccessClass(value);
			 return true;
		}else{
			$(ErrDivName).empty();
			$(ErrDivName).append("please enter a valid "+FieldName);
			removeSuccessClass(value);
			addErrorClass(value);
			 return false;
		}
	}
	function NotMandatoryButUrlValidation(ErrDivName,FieldName,value){
		
		console.log("============value==========",value);
		if($.trim(value.val()) != "" && $.trim(value.val()) != null){
			return UrlValidation(ErrDivName,FieldName,value);
		}else{
			$(ErrDivName).empty();
			 return true;
		}
		
	}


	
	
	function removeSuccessClass(succThis){
		$(succThis.selector).closest(".form-group").removeClass("has-success");
		$(succThis.selector).closest(".input-group").removeClass("has-success");
		$(succThis.selector).closest(".input-group").find(".glyphicon-ok").remove();
		$(succThis.selector).closest(".my_form").removeClass("has-success");
	}
	function removeErrorClass(errThis){
		$(errThis).closest(".form-group").removeClass("has-error");
		$(errThis).closest(".input-group").removeClass("has-error");
		$(errThis).closest(".input-group").find(".glyphicon-remove").remove();
		$(errThis).closest(".input-group").find(".text-danger").remove();
		$(errThis).closest(".my_form").removeClass("has-error");
	}
	function addErrorClass(errThis){
		console.log("errThis-------->",errThis);
		$(errThis.selector).closest(".form-group").addClass("has-error");
		$(errThis.selector).closest(".input-group").addClass("has-error");
		$(errThis.selector).closest(".input-group").append("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
		$(errThis.selector).closest(".my_form").addClass("has-error");
	}
	function addSuccessClass(succThis){
		$(succThis).closest(".form-group").addClass("has-success");
		$(succThis).closest(".input-group").addClass("has-success");
		$(succThis).closest(".input-group").append("<span class='glyphicon glyphicon-ok form-control-feedback'></span>");
		$(succThis).closest(".my_form").addClass("has-success");
	}
	
	function modeHide(modeID){
		$(modeID).modal('hide');
	}
	
// Advertise Pricing for some time 	
	
function NotAllowedNullValPricing(ErrDivName,FieldName,value){

	 console.log("NotAllowedNullVal ---------value----------",value);
	 console.log("NotAllowedNullVal ---------value----------",value.val());
	 console.log("NotAllowedNullVal ---------value.selector----------",value.selector);
	if($.trim(value.val()) != "" && $.trim(value.val()) != null && $.trim(value.val()) != "null" && $.trim(value.val()) != undefined){
		
		 console.log("NotAllowedNullVal ---------if----------");
		$(ErrDivName).empty();
		 removeErrorClass(value);
		 addSuccessClass(value);
	   return true;
	  }else{
		  console.log("NotAllowedNullVal ---------else----------");
		 $(ErrDivName).empty();
		 $(ErrDivName).append(FieldName+" "+ mandatory);
		 removeSuccessClass1(value);
		 addErrorClass1(value);
		return false;
	 }
}	
	
function AllowedOnlyNumberOrDecimal(ErrDivName,FieldName,value){
	//alert("hiiiii");
	//if($.isNumeric($.trim(value.val()))){
	if((Number($.trim(value.val())))>=0){
		console.log("AllowedOnlyNumberOrDecimal----------",value.val());
		console.log("errdiv value : ",$(ErrDivName));
		$(ErrDivName).empty();
		removeErrorClass(value);
		addSuccessClass(value);
		return true;	
	}else{
		console.log("else AllowedOnlyNumberOrDecimal----------",value.val());
		console.log("else errdiv value: ",$(ErrDivName));
		$(ErrDivName).empty();
		$(ErrDivName).append(FieldName+" can have Numeric only.");
		removeSuccessClass(value);
		addErrorClass(value);
		return false;
	}
	
}

/*
function selectBoxWithCheck(ErrDivName,FieldName,value){
	
	console.log("errdiv ErrDivName : ",ErrDivName);
	console.log("errdiv FieldName : ",FieldName);
	console.log("errdiv value value : ",value);
	
	
	$('.multiselect_checkbox').each(function(){
        if($(this).is(':checked'))
        {
            ar.push({region_Id:$(this).val()}); 
        }   
        $(ErrDivName).append(FieldName+" is manadatory");
    });
	
}*/


function allowEmptyNumberOrDecimal(ErrDivName,FieldName,value)
{
	if((value.val().trim())=="")
	{
		console.log("trueee ");
		return true;	
	}
	else
	{
		console.log("some value ");
		return AllowedOnlyNumberOrDecimal(ErrDivName,FieldName,value);
	}
}
	

function allowEmptyEmailValidation(ErrDivName,FieldName,value)
{
	if((value.val().trim())=="")
	{
		return true;	
	}
	else
	{
		return EmailValidation(ErrDivName,FieldName,value);
	}
}

function allowEmptyPhoneNoValidation(ErrDivName,FieldName,value)
{
	if((value.val().trim())=="")
	{
		return true;	
	}
	else
	{
		return PhoneNoValidation(ErrDivName,FieldName,value);
	}
}



function allowEmptyOnlyNumber(ErrDivName,FieldName,value)
{
	if((value.val().trim())=="")
	{
		return true;	
	}
	else
	{
		return AllowedOnlyNumber(ErrDivName,FieldName,value);
	}
}




	
	
function removeSuccessClass1(succThis){
	$(succThis).closest(".form-group").removeClass("has-success");
	$(succThis).closest(".input-group").removeClass("has-success");
	$(succThis).closest(".input-group").find(".glyphicon-ok").remove();
	
}
function addErrorClass1(errThis){
	console.log("errThis-------->",errThis);
	$(errThis).closest(".form-group").addClass("has-error");
	$(errThis).closest(".input-group").addClass("has-error");
	$(errThis).closest(".input-group").append("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
}


function callAddRemoveClassFunction(divName){
	
	divName.val('');
	removeErrorClass(divName);
	removeSuccessClass(divName);
}
function callEditRemoveClassFunction(divName){
	removeErrorClass(divName);
	removeSuccessClass(divName);
}



function fixedEncodeURIComponent(str) {
	  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
	    return '%' + c.charCodeAt(0).toString(16);
	  });
	}


function compareDate(ErrDivName,strtDt,endDt)
{
if ((Date.parse(endDt) < Date.parse(strtDt))) {
   // alert("End date should be greater than Start date");
	console.log("strt date grter");
    $(ErrDivName).append("End date should be greater than Start date");
    return false;
}else
	{
	console.log("date proper");
	$(ErrDivName).empty();
	return true;
	}


}