console.log('in global');

document.addEventListener('DOMContentLoaded', function(){
	var req = new XMLHttpRequest();
		
	req.onreadystatechange = function(){
		if(req.readystate == 4 && req.status == 200){
			document.getElementById('stuff').innerHTML = req.responseText;
		}else{
			document.getElementById('stuff').innerHTML = 'waiting';
		}
	}

	req.open("GET", "http://localhost:3000/", true);
	req.send();
	
});

