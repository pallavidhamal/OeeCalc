
	
function authHeaderFunction() {
	
//    const accessToken = JSON.parse(localStorage.getItem('userobj'));
//const user = localStorage.getItem('userId');
const accessToken = localStorage.getItem('accessToken');
//const userName = localStorage.getItem('username');
//const role = localStorage.getItem('role');

//console.log("---------accessToken--df-------",accessToken)

    	if (accessToken) {
       		return { Authorization: 'Bearer ' + accessToken }; // for Spring Boot back-end
			// return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    	} 
		else {
      		return {};
    		}
	}


	

  