/**
 * 
 *//*$(document).ready(function() {
$( ".datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });
});*/
var url = "http://192.168.29.26:8082/Eci/Eci/";
var url1 = "http://192.168.29.26:8082/Eci/Eci/";


var app_global_path="E:\\Tomcat 10/webapps";
var app_global_url="http://proapp.rbbn.com"
var app_global_path1="E:\\Tomcat 10/webapps";

//var url="http://192.168.42.149:8080/Eci/";
//var url1="http://192.168.42.149:8080/Eci/";

/*var url="http://101.53.136.239:4443/Eci/Eci/";
var url1="http://101.53.136.239:4443/Eci/Eci/";*/

/*var url="https://proapp.co.in/Eci/Eci/";
var url1="https://proapp.co.in/Eci/Eci/";
*/

$(document).ready(function() {
	
	detectIEversion();
	
	
});

function detectIEversion(){
	// Get IE or Edge browser version
	var version = detectIE();

	if (version === false) {
//	  document.getElementById('result').innerHTML = '<s>IE/Edge</s>';
	} else if (version >= 12) {
//	  document.getElementById('result').innerHTML = 'Edge ' + version;
	} else {
//	  document.getElementById('result').innerHTML = 'IE ' + version;
	  
	  $( ".datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });

	}

	// add details to debug result
//	document.getElementById('details').innerHTML = window.navigator.userAgent;

	/**
	 * detect IE
	 * returns version of IE or false, if browser is not Internet Explorer
	 */
	function detectIE() {
	  var ua = window.navigator.userAgent;

	  // Test values; Uncomment to check result �

	  // IE 10
	  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
	  
	  // IE 11
	  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
	  
	  // Edge 12 (Spartan)
	  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
	  
	  // Edge 13
	  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	  var msie = ua.indexOf('MSIE ');
	  if (msie > 0) {
	    // IE 10 or older => return version number
	    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	  }

	  var trident = ua.indexOf('Trident/');
	  if (trident > 0) {
	    // IE 11 => return version number
	    var rv = ua.indexOf('rv:');
	    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	  }

	  var edge = ua.indexOf('Edge/');
	  if (edge > 0) {
	    // Edge (IE 12+) => return version number
	    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	  }

	  // other browser
	  return false;
	}
	
}


function CallMe(url)
{	
	//alert("GO"+url);
	window.location.replace(url);
}




function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



function makeProgressVisible()
{
	document.getElementById("progressBar").style.visibility = "visible";
}

function makeProgressHidden()
{
	document.getElementById("progressBar").style.visibility = "hidden";

}


/*
var $loading = $('#progressBar').hide();
//Attach the event handler to any element
$(document)
  .ajaxStart(function () {
     //ajax request went so show the loading image
      $loading.show();
  })
.ajaxStop(function () {
    //got response so hide the loading image
     $loading.hide();
 });*/