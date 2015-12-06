var f = document.createElement("form");
f.setAttribute('id', 'editForm');

//add heading
var heading = document.createElement("h2");
var text = document.createTextNode("Edit Record");
heading.appendChild(text);
f.appendChild(heading);

var legend = document.createElement("legend");
var text = document.createTextNode("Name");
legend.appendChild(text);
f.appendChild(legend);
var ename = document.createElement("input"); 
ename.setAttribute('type',"text");
ename.setAttribute('id',"name");
f.appendChild(ename);

var legend = document.createElement("legend");
var text = document.createTextNode("Repetitions");
legend.appendChild(text);
f.appendChild(legend);
var reps = document.createElement("input"); 
reps.setAttribute('type',"number");
reps.setAttribute('id',"reps");
f.appendChild(reps);

var legend = document.createElement("legend");
var text = document.createTextNode("Weight");
legend.appendChild(text);
f.appendChild(legend);
var weight = document.createElement("input"); 
weight.setAttribute('type',"number");
weight.setAttribute('id',"weight");
f.appendChild(weight);

var legend = document.createElement("legend");
var text = document.createTextNode("Date");
legend.appendChild(text);
f.appendChild(legend);
var date = document.createElement("input"); 
date.setAttribute('type',"date");
date.setAttribute('id',"date");
f.appendChild(date);

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
var text = document.createTextNode("Kgs");
kgs.appendChild(text);
f.appendChild(kgs);


var linebreak = document.createElement("br");
f.appendChild(linebreak);
//submit button
var s = document.createElement("input"); 
s.setAttribute('type',"submit");
s.setAttribute('value',"Update");
// s.setAttribute('onclick', 'updateRow('+ rID +')');
f.appendChild(s);


document.getElementsByTagName('body')[0].appendChild(f);
