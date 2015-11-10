var express  		= require("express"),  
    app      		= express(),
	bodyParser  	= require("body-parser"),
	methodOverride 	= require("method-override");
    http     		= require("http"),
    server  		= http.createServer(app),
    mongoose		= require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {  
   res.send("Hello World!");
});

app.use(router);

var ComercioCtrl = require('./controllers/comercios');

// API routes
var comercios = express.Router();

comercios.route('/comercios')  
  .get(ComercioCtrl.findAllComercios)
  .post(ComercioCtrl.addComercio);

comercios.route('/comercios/:id')  
  .get(ComercioCtrl.findById)
  .put(ComercioCtrl.updateComercio)
  .delete(ComercioCtrl.deleteComercio);

app.use('/api', comercios);  



mongoose.connect('mongodb://localhost/comercios', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
	console.log("Connected to Database");
  });
});