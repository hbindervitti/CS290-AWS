var express = require('express');
var mysql = require('./dbconn.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res,next){
	res.sendFile('public/table.html', {root: __dirname })
});

//select all
app.get('/api/workout/',function(req,res,next){
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }	
    res.send(rows);
  }); 
});

//add a workout
app.post('/api/workout/',function(req,res,next){
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?,?,?,?,?)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
  });
});

//delete a workout
app.delete('/api/workout/:id', function(req,res,next){			
	mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.params.id], function(err, result){
		if(err){
			next(err);
			return;
		}
	});	
	res.send();
});

//select a workout to edit
app.get('/api/workout/:id',function(req,res,next){
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.params.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }	
    res.send(rows);
  }); 
});

//update record 
app.post('/api/workout/:id',function(req,res,next){
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
	  [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.params.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        res.send();
      });
});


app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});


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

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});