var express = require('express'),
	expressHbs = require('express-handlebars');

var app = express();

app.set('views', __dirname + '/views');
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'base.hbs', layoutsDir: __dirname + '/templates/layouts'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000);

