/**
 * 
 */console.log("--FOR CHANGE PASSWORD---");

$(document).ready(function() 
	{
	
	console.log("uname-in header---",localStorage.getItem("uname"));
	
	
/*	if(localStorage.getItem("uname")=="")
	{
		window.location.replace('index');
	}
	*/
	
	
	$("#logName").text(localStorage.getItem("uname"));
	$("#logName1").text(localStorage.getItem("uname"));
	
	 // $("#logName").attr("href", localStorage.getItem("authkey"));
	// change pswd modal
	$("#pswdChangeAction").bind("click",function(){
		emptyAllField();
		$("#passErr").empty();
		
		console.log("change pswd button clicked.11");	
	//	displayemp();
		$("#pswd_userdiv").modal('show');
		//$("#Err pull-left").reset();
		});	
				
});//doc ready
//$("#pswd_userdiv").empty();
//$("#pswd_userdiv").modal('hide');

function OnSignOut()
{

	localStorage.setItem("authkey", "");
	localStorage.setItem("role", "");
	localStorage.setItem("uname", "");
	localStorage.setItem("userId", "");

	window.location.replace('index');

	
}


	function displayemp(){

		$.ajax({
		url  : "readEmpiD?"+new Date().getTime(),
		type : 'POST',
		async: false,
	
		success : function(res) 
		{
			var CtrObj = $.parseJSON(res);
			
			console.log("----",CtrObj);
			console.log("----",CtrObj.Emp_Email);
			$("#pswdemail").empty();
			$("#pswdemail").append(CtrObj.Emp_Email);
			if (CtrObj.result == "success"){
				$.each( CtrObj, function( index, value ){
					
				});
//passErr				
			}
	  }
});
	
	
}
	
	/*if(document.AddChangePswd.txtoldpswd.value == "")
	{
	alert('Please input old password');
	document.AddChangePswd.txtoldpswd.focus();
	
	} */
	
/*// onclick password change
	$(document).on("click", "#AddChangePswd", function(e){
		
		console.log("uname================  ",localStorage.getItem("uname"));
		console.log("authkey==============  ",localStorage.getItem("authkey"));
		console.log("old password is  ",$("#txtoldpswd").val());
		console.log("new password is  ",$("#txtnewpswd").val());		
		console.log("confirm new password ",$("#txtcnfmpswd").val());
		
		if(NotAllowedNullVal("#passErr","Old Password",$('#txtoldpswd')))
		if(NotAllowedNullVal("#passErr","New Password",$('#txtnewpswd')))
		if(NotAllowedNullVal("#passErr","Confirm Password" ,$('#txtcnfmpswd')))
		if(ValidatePswd("#passErr","New Password",$('#txtnewpswd'),$('#txtcnfmpswd')))
			{
			
			data= {
				    "oldpassword":$("#txtoldpswd").val(),
				    "newpassword":$("#txtnewpswd").val(),
					"emppassword":$("#txtcnfmpswd").val(),
					"userName"    : localStorage.getItem("uname"),
					"authKey"      : localStorage.getItem("authkey")
				 }
			console.log("--------click on dataVal-------",data);
			
			$.ajax({
				   type: 'POST',
				   url: url+"changePswd",  //from API add new data
				   data : JSON.stringify(data),
				  // processData: false,
				   contentType: "application/json; charset=utf-8",
	 
				   success : function(res) 
				   {
					   
					   console.log("res----",res);
					   console.log("res.result----",res.result);
					   
					   $("#passErr").empty();
					      
					   if (res.result == "success"){
						   
						$("#pswd_userdiv").modal('hide');
						
						window.location.href="index?PFlag=cp" ;
						
						console.log("PFlag---PFlag---PFlag---PFlag-",PFlag);
						
					//    ('<a id="" data-toggle="" >' Your Password has been changed, Login Again '</a></p>');
						
					   }else if(CtrObj.result == "NoData"){
						   
						$("#passErr").empty();
						//$("#passErr").append("You Enter Incorrect Old Password");	
					   }
					
				}	
				
		});
	}
});	
*/	
	function emptyAllField(){
		
		document.getElementById('pswdemail').value = "";
		document.getElementById('txtoldpswd').value = "";
		document.getElementById('txtnewpswd').value = "";
		document.getElementById('txtcnfmpswd').value = "";
		
	}
	
	
	
	
	
const dataTableData = [
  { id: 1,Part: 'adapter' ,RMsize: '10*12',vmcnumber: '1512' ,setupTime: '20-10-2024' ,productionTime: '20-10-2024' , Quantity: '10 ' ,DueDate: '20-10-2024' , namCustomere: 'Customere 1', jobNumber: 'job 1', rm: 'RM 1', Vendor: 'Vendor 1', material: 'Material 1', poNumber: 'po001', poDate: '20-10-2024' , deliveryDate: '25-10-2024' , remarks: 'Pending',machineType : 'MSP', machineNo: 'MSP1' ,uom: 'Seconds' },
  { id: 2,Part: 'elbow' ,RMsize: '5*6' , vmcnumber: '1342' ,setupTime: '20-10-2024' ,productionTime: '20-10-2024' , Quantity: ' 12' ,DueDate: '20-10-2024' , namCustomere: 'Customere 2', jobNumber: 'job 2', rm: 'RM 2', Vendor: 'Vendor 2', material: 'Material 1', poNumber: 'po002', poDate: '12-10-2024' , deliveryDate: '20-10-2024' , remarks: 'Pending' ,machineType : 'CNC', machineNo: 'CNC101' ,uom: 'Seconds'},
  { id: 3,Part: 'p3' ,RMsize: '30*8' ,vmcnumber: '1622' ,setupTime: '20-10-2024' ,productionTime: '20-10-2024' , Quantity: '1012' ,DueDate: '20-10-2024' , namCustomere: 'Customere 3', jobNumber: 'job 3', rm: 'RM 3', Vendor: 'Vendor 3', material: 'Material 1', poNumber: 'po003', poDate: '10-10-2024' , deliveryDate: '15-10-2024' , remarks: 'Pending',  machineType : 'Plating', machineNo: 'Plant 1' ,uom: 'Kgs'}
 ,
  
  
  
/*  machineType : 'Assembly', machineNo: 'Assembly Line 1' ,uom: 'Minutes'
*/
  
  	


  
  
  // Add more data as needed
];


const planningTableData = [
  { id: 1,date: '01-04-2025' ,machine : 'MSP 1',shift: 'A' ,itemcode: '61M5003' ,setup: 'MSP setup1' , cycletime : '12 ' ,plannedqty: '1000' , plannedmins: '200', utilised: '98%' },
  { id: 2,date: '01-04-2025' ,machine : 'MSP 1',shift: 'A' ,itemcode: '61M5007' ,setup: 'MSP setup1' , cycletime : '8 ' ,plannedqty: '1800' , plannedmins: '240', utilised: ' ' },
  { id: 3,date: '01-04-2025' ,machine : 'MSP 1',shift: 'A' ,itemcode: 'Setup change' ,setup: ' ' , cycletime : '1800 ' ,plannedqty: '1' , plannedmins: '30', utilised: ' ' },
  
  { id: 4,date: '01-04-2025' ,machine : 'CNC 10',shift: 'A' ,itemcode: 'HT6801-06-06' ,setup: 'CNC setup1' , cycletime : '12 ' ,plannedqty: '800' , plannedmins: '160', utilised: '89%' },
  { id: 5,date: '01-04-2025' ,machine : 'CNC 10',shift: 'A' ,itemcode: 'HT5023' ,setup: 'CNC setup2' , cycletime : '20 ' ,plannedqty: '800' , plannedmins: '267', utilised: ' ' },
  { id: 6,date: '01-04-2025' ,machine : 'CNC 10',shift: 'A' ,itemcode: 'Setup change' ,setup: ' ' , cycletime : '1200 ' ,plannedqty: '1' , plannedmins: '20', utilised: ' ' },
  
  
];

const productionTableData = [
  { id: 1,workcentre :'Cell 1' ,date: '01-02-2025' ,machine : 'MSP 1',shift: 'A' ,availability: '78%' ,productivity: '58%' ,quality: '38%' ,oee: '38%' },
  { id: 2,workcentre :'Cell 2' ,date: '11-03-2025' ,machine : 'MSP 1',shift: 'A' ,availability: '68%' ,productivity: '38%' ,quality: '48%' ,oee: '68%'},
  { id: 3,workcentre :'Cell 3' ,date: '21-03-2025' ,machine : 'MSP 1',shift: 'A' ,availability: '88%' ,productivity: '28%' ,quality: '58%' ,oee: '68%' },
];

