//DOM readyState
document.addEventListener('DOMContentLoaded', function(event){			
	populateTable();	
	bindButtons();
});


//fill table with data
function populateTable(){
	var req = new XMLHttpRequest();	
	req.open('GET', 'http://52.27.157.90:3000/api/workout/', true);
	req.setRequestHeader("Content-type", "application/json");
	req.send(null);
	req.addEventListener('load', function(event){
		if(req.status >=200 && req.status < 400){
			var response = JSON.parse(req.responseText);
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
			var cell = document.createElement("th");
			var text = document.createTextNode("delete?");
			cell.appendChild(text);
			row.appendChild(cell);
			var cell = document.createElement("th");
			var text = document.createTextNode("edit?");
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
				
				//add delete and edit buttons 
				var cell = document.createElement("td");
				cell.innerHTML = '<input id="delete" name=' + response[item].id + ' type="submit" value="Delete" />';
				row.appendChild(cell);
				var cell = document.createElement("td");
				cell.innerHTML = '<input id="edit" name=' + response[item].id + ' type="submit" value="Edit" />';
				row.appendChild(cell);
				
				tblBody.appendChild(row);
				table.appendChild(tblBody);
				body.appendChild(table);
			}
		}
		event.preventDefault;
	});
}



function bindButtons(){
document.getElementById('insert').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
	var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
	payload.name = document.getElementById('name').value;
	payload.reps = document.getElementById('reps').value;
	payload.weight = document.getElementById('weight').value;
	payload.date = document.getElementById('date').value;
	var radios = document.getElementsByName("lbs");
	for(var i = 0; i < radios.length; i++){
		if(radios[i].checked){
			payload.lbs = radios[i].value;
		}
		break;
	}
	
	req.open('POST', 'http://52.27.157.90:3000/api/workout/', true);
	req.setRequestHeader('Content-Type', 'application/json');	
	req.send(JSON.stringify(payload));
	req.addEventListener('load', function(){
		if(req.status >=200 && req.status < 400){
			populateTable();
		}
		event.preventDefault();
	})
  });
  
  document.getElementById('delete').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
	var payload = document.getElementById('delete').name;
	alert(payload);
	// req.open('POST', 'http://52.27.157.90:3000/api/workout/', true);
	// req.setRequestHeader('Content-Type', 'application/json');	
	// req.send(JSON.stringify(payload));
	// req.addEventListener('load', function(){
		// if(req.status >=200 && req.status < 400){
			// populateTable();
		// }
		// event.preventDefault();
	// })
  });
  
  
}




