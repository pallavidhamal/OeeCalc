var optionsData = "";
			$(document).ready(function(){
				
				alert("add po js")
				
				
				$("#addMore").on("click", function (event) {
						      event.preventDefault();

							  
							  alert("add button")
								counter++;

						      var newRow = $("<tr>");
						      var cols = "";

						      // Table columns
						    /*  cols += '<th scrope="row">' + counter + "</th>";*/
						      cols +=
						        `<td><select name="titles" id="productCategory${counter}" class="form-input demo productCategory form-control" style="width: 100%" >
						        <option value="">Select</option>` +
						        optionsData +
						        `</select>`;
						        cols +=
						        `</td>`;
						     
						      cols += `<td><input type="text" id="buyprice${counter}" class="form-input form-control" disabled=""></td>`;
						      
						      cols += `<td><input type="text" id="qty${counter}"  class="form-input nuz form-control qty  integer">	</td>`;
						      
						//      cols += `<td><input type="text" id="availableQ${counter}" class="form-input  form-control" disabled></td>`;
						//      	cols += `<td><input type="text" id="mstprice${counter}" class="form-input form-control" disabled></td>`;
						      cols += `<td><input type="text" id="rate${counter}"  class="form-input nuz form-control rate decimal" ></td>`;

						      cols += `<td><input type="text" id="disocuntpr${counter}"  class="form-input nuz form-control disocuntpr decimal" >`;
						      cols += `</td>`;
						     
						      cols += `<td><input type="text" id="disocunt${counter}"  class="form-input nuz form-control disocunt decimal" disabled></td>`;
						      cols += `<td><input type="text" id="amount${counter}" class="form-input form-control rate amount" disabled ></td>`;
						      
						      cols += `<td><input type="text" id="gstpr${counter}"  class="form-input nuz form-control gstpr integer" disabled>	</td>`;
						      
						      cols += `<td><a class="deletBtn deleteBtn1" id="deleteRow${counter}"><img  src="images/delete.png"  ></a></td>`;

						      // Insert the columns inside a row
						      newRow.append(cols);

						      // Insert the row inside a table
						      $("#tableBody").append(newRow);
						      
						      
						      $('#productCategory'+counter).select2();
							  $('#product'+counter).select2();

						      // Increase counter after each row insertion
						      counter++;
						      // Remove row when delete btn is clicked
						      $("table").on("click", "#deleteRow", function (event) {
						        $(this).closest("tr").remove();
						        counter -= 1;
						      });
						    });
				
				
				
				
				
				
				
				
				
			});
			
			
			 var counter = 0;

			 