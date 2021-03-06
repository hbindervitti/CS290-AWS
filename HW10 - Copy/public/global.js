alert("in global.js");

//DOM readyState
document.addEventListener('DOMContentLoaded', function(){			
	populateTable();	
});


//fill table with data
function populateTable(){
	var req = new XMLHttpRequest();
	var payload = {name:name, reps:reps, weight:weight, date:date, lbs:lbs};
	
	req.open('GET', 'http://52.27.157.90:3000/', true);
	// req.open('GET', '',  true);
	req.setRequestHeader("Content-type", "application/json");
	req.send(null);
	req.addEventListener('load', function(){
		if(req.status >=200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			// var response = [];
			// response = {"id":2,"name":"Lift Weights","reps":12,"weight":5,"date":"2015-11-30T00:00:00.000Z","lbs":1},{"id":3,"name":"Do stuff","reps":17,"weight":20,"date":"2015-12-01T00:00:00.000Z","lbs":1}
			console.log(response);
			//create table
			var body = document.getElementsByTagName("body")[0];
			var table = document.createElement("table");
			var tblBody = document.createElement("tbody");
			//create header
			var row = document.createElement("tr");
			var cell = document.createElement("th");
			var text = document.createTextNode("Name");
			cell.appendChild(text);
			row.appendChild(cell);
			var cell = document.createElement("th");
			var text = document.createTextNode("Reps");
			cell.appendChild(text);
			row.appendChild(cell);
			var cell = document.createElement("th");
			var text = document.createTextNode("Weight");
			cell.appendChild(text);
			row.appendChild(cell);
			var cell = document.createElement("th");
			var text = document.createTextNode("Date");
			cell.appendChild(text);
			row.appendChild(cell);
			var cell = document.createElement("th");
			var text = document.createTextNode("Lbs");
			cell.appendChild(text);
			row.appendChild(cell);
			tblBody.appendChild(row);	
				
			
			// fill in table row
			for(var item in response){				
				// console.log( item + ": " + response[item]);		//for debug
				// alert(response[item].name);
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				var text = document.createTextNode(response[item].name);
				cell.appendChild(text);
				row.appendChild(cell);
				var cell = document.createElement("td");
				var text = document.createTextNode(response[item].reps);
				cell.appendChild(text);
				row.appendChild(cell);
				var cell = document.createElement("td");
				var text = document.createTextNode(response[item].weight);
				cell.appendChild(text);
				row.appendChild(cell);
				var cell = document.createElement("td");
				var text = document.createTextNode(response[item].date);
				cell.appendChild(text);
				row.appendChild(cell);
				var cell = document.createElement("td");
				var text = document.createTextNode(response[item].lbs);
				cell.appendChild(text);
				row.appendChild(cell);
				
				//add delete and edit buttons with id = response[item].id
				
				
				tblBody.appendChild(row);
				table.appendChild(tblBody);
				body.appendChild(table);
			}
		}
	});
}
