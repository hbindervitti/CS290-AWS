var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4000);

app.post('/', function(req, res){
	var context = {};
	context.dataList = readData('POST', req);
	res.render('postReq', context);
});

app.get('/', function(req, res){
	var context = {};
	context.dataList = readData('Get', req);
	res.render('getReq', context);
});

var readData = function(type, req){
	if(type == 'POST')
	{
		var qParams = [];
		for (var p in req.body){
			qParams.push({'name':p,'value':req.body[p]})
		}
		return qParams;
	}
	else
	{
		var qParams = [];
		for (var p in req.query){
			qParams.push({'name':p,'value':req.query[p]})
		}
		return qParams;
	}
};

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

console.log('Express started on http://localhost:' + app.get('port');
//app.listen(app.get('port'), function(){
//  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
//});