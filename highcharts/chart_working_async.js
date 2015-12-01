
//global options
// Highcharts.setOptions({
	// chart: {
		// backgroundColor: '#FCFFC5',
		// borderWidth: 2,
		// borderRadius: 20,
		// plotBackgroundColor: 'rgba(255, 255, 255, .9)',
		// plotShadow: true,
		// plotBorderWidth: 1
	// }
// });	

//set chart options
var options = {
	chart: {
		renderTo: 'container',
		type: 'column'
	},
	title: {
	  text: 'Fruit Consumption'
	},
	xAxis: {
		categories: []
	},
	yAxis: {
		title: {
			text: 'Fruit eaten'
		}
	},
	series: []
};

////async request
var xhr = new XMLHttpRequest();
xhr.responseType = "text";
xhr.open("GET", "data.csv", true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);		//for debug
	  ////split the lines of the csv file
		var lines = xhr.responseText.split('\n');
		////iterate over lines 
		lines.forEach(function(ln, lnNo){
			var items = ln.split(',');
			
			////get categories from header line
			if(lnNo == 0){
				items.forEach(function(item, itemNo){
					if(itemNo > 0){
						options.xAxis.categories.push(item);
					}
				});
			}
			////other lines contain data with name in position 0
			else{
				var series = {
					data: []
				};
				items.forEach(function(item, itemNo){
					if(itemNo == 0){
						series.name = item;
					}else{
						series.data.push(parseFloat(item));
					}				
				});
				options.series.push(series);
			}
		});
    } else {
      console.error(xhr.statusText);
    }
  } 
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.send(null);
xhr.onloadend = function(){			//wait for xhr to load before creating chart or it will have no data
	var myChart = new Highcharts.Chart(options);
}
