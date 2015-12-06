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
			//create table
			var body = document.getElementsByTagName("body")[0];
			var table = document.createElement("table");
			table.setAttribute('id', 'ExerciseTable');
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
				var row = document.createElement("tr");
				row.setAttribute('id', response[item].id);
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
				cell.innerHTML = '<input id="delete" name=' + response[item].id + ' type="submit" value="Delete" onclick="deleteRow('+response[item].id + ')"/>';
				row.appendChild(cell);
				var cell = document.createElement("td");
				cell.innerHTML = '<input id="edit" name=' + response[item].id + ' type="submit" value="Edit" onclick="editRow('+response[item].id+')"/>';
				row.appendChild(cell);
				
				tblBody.appendChild(row);
				table.appendChild(tblBody);
				body.appendChild(table);
			}
			
		}
		event.preventDefault;
	});
}

function editRow(rID){
	var req = new XMLHttpRequest();	
	req.open('GET', 'http://52.27.157.90:3000/api/workout/' + rID, true);
	req.setRequestHeader("Content-type", "application/json");
	req.send(null);
	req.addEventListener('load', function(event){
		if(req.status >=200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);			//for debug!
			
			//create form 
			var f = document.createElement("form");
			f.setAttribute('id', 'editForm');
			//add heading
			var heading = document.createElement("h2");
			var text = document.createTextNode("Edit Record");
			heading.appendChild(text);
			f.appendChild(heading);
			//name
			var legend = document.createElement("legend");
			var text = document.createTextNode("Name");
			legend.appendChild(text);
			f.appendChild(legend);
			var ename = document.createElement("input"); 
			ename.setAttribute('type',"text");
			ename.setAttribute('id',"name");
			f.appendChild(ename);
			//reps
			var legend = document.createElement("legend");
			var text = document.createTextNode("Repetitions");
			legend.appendChild(text);
			f.appendChild(legend);
			var reps = document.createElement("input"); 
			reps.setAttribute('type',"number");
			reps.setAttribute('id',"reps");
			f.appendChild(reps);
			//weight
			var legend = document.createElement("legend");
			var text = document.createTextNode("Weight");
			legend.appendChild(text);
			f.appendChild(legend);
			var weight = document.createElement("input"); 
			weight.setAttribute('type',"number");
			weight.setAttribute('id',"weight");
			f.appendChild(weight);
			//date
			var legend = document.createElement("legend");
			var text = document.createTextNode("Date");
			legend.appendChild(text);
			f.appendChild(legend);
			var date = document.createElement("input"); 
			date.setAttribute('type',"text");		//try as text
			date.setAttribute('id',"date");
			f.appendChild(date);
			//lbs or kgs
			var legend = document.createElement("legend");
			var text = document.createTextNode("Lbs");
			legend.appendChild(text);
			f.appendChild(legend);
			var lbs = document.createElement("input"); 
			lbs.setAttribute('type',"radio");
			lbs.setAttribute('id',"lbs");
			lbs.setAttribute('value', "1");
			var text = document.createTextNode("Lbs");
			lbs.appendChild(text);
			f.appendChild(lbs);
			var linebreak = document.createElement("br");
			f.appendChild(linebreak);
			var kgs = document.createElement("input"); 
			kgs.setAttribute('type',"radio");
			kgs.setAttribute('id',"lbs");
			kgs.setAttribute('value', "0");
			var text = document.createTextNode("Kgs");		//text for radio buttons not showing - try just adding a next node to form instead of input
			kgs.appendChild(text);
			f.appendChild(kgs);
			var linebreak = document.createElement("br");
			f.appendChild(linebreak);
			//submit button
			var s = document.createElement("input"); 
			s.setAttribute('type',"submit");
			s.setAttribute('value',"Update");
			s.setAttribute('onclick', 'updateRow('+ rID +')');
			f.appendChild(s);
			document.getElementsByTagName('body')[0].appendChild(f);
			//end create form
			
			//populate form with values from json string
			ename.setAttribute('value', response[0].name);
			reps.setAttribute('value', response[0].reps);
			weight.setAttribute('value', response[0].weight);
			var exerciseDate = (response[0].date).substring(0, 9);
			console.log(date);
			date.setAttribute('value', exerciseDate);		//not working yet
			if(response[0].lbs == 1){
				lbs.setAttribute('checked', 'checked');
			}else if(response[0].lbs == 0){
				kgs.setAttribute('checked', 'checked');
			}
			
			
		}
		event.preventDefault;
	});
}

function updateRow(rID){
	
	alert("in updateRow");
}

function deleteRow(rID){
    var req = new XMLHttpRequest();
	req.open('DELETE', 'http://52.27.157.90:3000/api/workout/' + rID, true);
	req.send();
	req.addEventListener('load', function(){
		if(req.status >=200 && req.status < 400){
			//delete old table
			var tbl = document.getElementById('ExerciseTable');
			if(tbl) tbl.parentNode.removeChild(tbl);
			populateTable();
		}
		event.preventDefault();
	})
	
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
}




