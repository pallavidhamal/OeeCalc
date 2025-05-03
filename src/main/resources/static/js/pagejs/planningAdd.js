

$(document).ready(function(){

$('.table_add_link').on('click',function(){
						
	console.log("-------------table_add_link----this---------",$("#myTbody").find('tr').length);
	
	count = $("#myTbody").find('tr').length;
	
      $('#myTbody').append('<tr class="tr_clone" roCnt = "'+count+'">'
		+'<td class="table_input"><select class="form-control"  id="selMachine'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control"  id="selShift'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control"  id="selItem'+count+'" >	</select> </td>'
		+'<td class="table_input"><select class="form-control"  id="selSetUp'+count+'" >	</select> </td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="setUptime'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="plannedQty'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="plannedMins'+count+'"></td>'
		+'<td class="table_input"><input type="text" class="form-control width80 line" id="timeUtilised'+count+'"></td>'
		+'<td class="table_input"><a href="#" class="deleteRow"><i class="fa fa-minus"></i></a></td>'
		

	  +'</tr>');
	  
	  
	  
	  $('.deleteRow').on('click',function(){
	  	$(this).closest('tr').remove();
	  });
	  
});  //end add row




$(document).on("click", "#addPlanningData", function(e){
	
				var myarray=[];
				
				 var i =  0 ;
				 $("#myTbody").find('tr').each(function (){
		 
					 var lineData  = {
							 

							 machine 		: $("#myTbody").find('tr').eq(i).find('td').eq(0).find('select').val(),
							 shift 		: $("#myTbody").find('tr').eq(i).find('td').eq(1).find('select').val(),
							 item	: $("#myTbody").find('tr').eq(i).find('td').eq(2).find('select').val(),
							 setup 		:$("#myTbody").find('tr').eq(i).find('td').eq(3).find('select').val(),
							 setuptime		: $("#myTbody").find('tr').eq(i).find('td').eq(4).find('input').val(),
							 plannqty			: $("#myTbody").find('tr').eq(i).find('td').eq(5).find('input').val(),
							 plannmins		: $("#myTbody").find('tr').eq(i).find('td').eq(6).find('input').val(),
							 timeutilised		: $("#myTbody").find('tr').eq(i).find('td').eq(7).find('input').val()

					};
					
		 
					 i++;
					 myarray.push(lineData);
					 
					 console.log("====myarray======",myarray);
				
				 });	 
				 console.log("====linelinelinelinelinelineline======","#line"+i);
				 
			/*	 if(NotAllowedNullVal("#poErrAdd","PO Name ",$('#ponumber')))
					 if(ValidationForSelectBox("#poErrAdd","Customer Name ",$('#customerListadd')))
						 if(NotAllowedNullVal("#poErrAdd","PO Date ",$('#poDate')))
							 if(NotAllowedNullVal("#poErrAdd","PO End Date ",$('#poEndDate')))
								 if(validateLineId("#poErrAdd"))
									 if(validateProduct())
									 if(validateRegion())
									 if(validatePOQty())*/
							{
					 
					 var dataVal = {
					 
							 PO_NO			: $('#ponumber').val(),
							 Customer 		: $('#customerListadd').val(),
							 PODate			: $('#poDate').val(),
							 POEDate		: $('#poEndDate').val(),
							 authKey		: localStorage.getItem("authkey"),
							 lineData       : myarray

						};
					 
				 
					 
					 console.log("====data==dataVal===",dataVal);
					 
					 
					 $.ajax({
							
						   type: 'POST',
						   url: url+"insertPO",  //from API add new data
						   data : JSON.stringify(dataVal),
						   processData: false,
						   contentType: "application/json; charset=utf-8",
	   
						   success: function(result) {
	   	
							console.log("insert--Information result==="+result);
							
							if(result.result==true){
								
								getPOList();
								
								$("#add_po").modal("hide");
							// $('#myTbody').empty();
								
							}else if(result.result==false){
								
								window.location.href = "sessionOut";
								
							}
							
							
			
						   }
				});
			}
});



});