

//DOM readyState
document.addEventListener('DOMContentLoaded', function(){
	populateTable();	
});



//fill table with data
function populateTable(){
	var req = new XMLHttpRequest();
	var payload = {name:name, reps:reps, weight:weight, date:date, lbs:lbs};
	
	req.open('GET', 'http://52.27.157.90:3000/', true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener('load', function(){
		if(req.status >=200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);
			for(var item in response){
				alert("key: " + item + "Value: " + response[item]);
			}
			
		}
		event.preventDefault();
	});
}