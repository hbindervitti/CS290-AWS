
var body = document.getElementsByTagName("body")[0];
var table = document.getElementById("tbl");
var tblBody = document.createElement("tbody");

document.addEventListener('DOMContentLoaded', bindButtons);
	
	function bindButtons(){
		var req = new XMLHttpRequest();
		var payload = {name:name, reps:reps, weight:weight, date:date, lbs:lbs};
		console.log(payload);			// for debug
		req.open('GET', 'http://52.27.157.90:3000/', true);
		req.setRequestHeader("Content-type", "application/json");
		req.addEventListener('load', function(){
			if(req.status >=200 && req.status < 400){
				var response = JSON.parse(req.responseText);
				console.log(response);
				
				var row = document.createElement("tr");
				
				
				// var row = tableRowInit(res[0].id, res[0].name, res[0].reps, res[0].weight, res[0].date, res[0].lbs);
				var row = tableRowInit(1, "test", 3, 3, "2015-12-05", 0);
								
				var edit = editButtonInit(res[0].id);
				var remove = removeButtonInit(res[0].id);
				row.appendChild(edit);
				row.appendChild(remove);
				tblBody.appendChild(row);
				
				table.appendChild(tblBody);				
				table.setAttribute("border", "1");
			}
			event.preventDefault();
		})
	}
	
	
	function createTable(){
		var body = document.getElementsByTagName("body")[0];
		var table = document.createElement("table");
		var tblBody = document.createElement("tbody");

		for(var i = 0; i < 4; i++)
		{
			var row = document.createElement("tr");
			
			for(var j = 0; j < 4; j++)
			{
				if(i == 0){
					var cell = document.createElement("th");
					var text = document.createTextNode("Header " + (j+1));
				} else{
					var cell = document.createElement("td");
					var xtext = document.createTextNode(i + ", " + (j+1));
					var text = document.createTextNode((j+1) + ", " + i);
				}		
				cell.appendChild(text);
				row.appendChild(cell);
			}
			tblBody.appendChild(row);
		}

		table.appendChild(tblBody);
		body.appendChild(table);
		table.setAttribute("border", "1");
	}