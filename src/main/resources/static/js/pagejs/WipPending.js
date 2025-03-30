
		var tableData = $('#wipPendinglist').DataTable();
	
		$(document).ready(function(){
			

			generateSubContractorList();
						
			
			 var siId = GetURLParameter('siId');
			 var dateFrom = GetURLParameter('dateFrom');
			 var dateTo = GetURLParameter('dateTo');
			 
			 
			 console.log("siId----",siId);
			 console.log("dateFrom----",dateFrom);
			 console.log("dateTo----",dateTo);
			 
			
			 var dataVal = {
				     "siId"	  	:siId,
				     "dateFrom"	:dateFrom,
				     "dateTo"	:dateTo,
			    	}	
			 
			 getlist(dataVal);
			 
			 
		});
				
		
		
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
		
function generateSubContractorList(){
	
	console.log("-----generateSubContractorList--111----",localStorage.getItem("authkey"));

	$("#subContractorList").empty();
	
	$.get(url+"getSICompanyList/"+localStorage.getItem("userId"), function( data ) { //from API list
		
	console.log("---------------data.result----------",data.result);
	
	$('#subContractorList').append('<option value=' + 0+ '> ALL </option>');
	
		$.each(data.result, function(key,val) {
		
		console.log("-------------val.EmpId--------",val.Id);
			
	$("#subContractorList").append('<option value='+val.Id+'>'+val.Company+'</option>');
	
			
	});
	
});

}





$(document).on("click", "#wippendingSubmit", function(e){
	
	
			console.log("--------click on approveTaskSubmit-------");
			
			//if(ValidationForSelectBox("#reportErr1","SI Name ",$('#subContractorList')))
				if(NotAllowedNullVal("#reportErr1","From date ",$('#dateFrmw')))
					if(NotAllowedNullVal("#reportErr1","To date ",$('#dateTow'))){
			
			
			 window.location.href = "WipPending?siId="+$("#subContractorList").val()+"&dateFrom="+$("#dateFrmw").val()+"&dateTo="+$("#dateTow").val();
					}
			 
});

function getlist(dataVal){

				 
			 console.log("--getlist---------",dataVal);
			
			 $.ajax({
				
				type: 'POST',
				url: url+"getWippendingReport",  //from API update data
				data : JSON.stringify(dataVal),
				contentType: "application/json",
	    
				success: function(data) {
	    	
				console.log("getWippendingReport=data==",data);
				
				
				console.log("-- getWippendingReport=data.result==",data.result);
				
				tableData.destroy();
			       
				$('#wipPendinglist.tbody').empty();
	
						
						
						 tableData = $('#wipPendinglist').DataTable( {
							
							 dom: 'Blfrtip',   
							 buttons: [ 'excel', 'print'],
						 	 destroy: true,
		    				 data: data.result,
		    				 "initComplete": function(settings, json) {
							  },
		    				 
		    				 columns: [
		    				    { "data": "JobId" },
		    				    { "data": "CustName" },
		    		            { "data": "RegionName" },
		    		            { "data": "Site" },
		    		            
		    		            { "data": "product" },
		    		            { "data": "stages" },
		    		            { "data": "pm_name" },
		    		            
		    		            { "data": "Emp_Name" }, // si
		    		           /* { "data": "" },*/

		    		            { "data": "si_company" },
		    		            { "data": "allocation_on" },
		    		            
		    		            //{ "data": "stt" },
		    				 
		    				 ],
		    				 "columnDefs": 
							 [	
				              /* {
				                    "targets": [ 6 ],
				                    "orderable": false
				                },
				                {
				                    "targets": [ 7 ],
				                    "orderable": false
				                }*/
				            ],
		    				 "order": [[0, 'desc']],
				    } );
						
						
						
	   // });
				
				
				}
			});
	
}



