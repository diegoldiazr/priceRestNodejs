var express  		= require("express"),  
    app      		= express(),
	bodyParser  	= require("body-parser"),
	methodOverride 	= require("method-override");
    http     		= require("http"),
    server  		= http.createServer(app),
    mongoose		= require('mongoose');

	
//connection to db
mongoose.connect('mongodb://localhost/prices', function(err, res) {  
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
		throw err;
	}
	console.log("Connected to Database");  
});
	
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {  
   res.send("Prices Rest Node Js. Rest Services");
});

app.use(router);

// Import Models and controllers
var Comercios     = require('./models/comercio')(app, mongoose);
var Juegos     = require('./models/juego')(app, mongoose);
var ComercioCtrl = require('./controllers/comercios');
var JuegoCtrl = require('./controllers/juegos');

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



var juegos = express.Router();

juegos.route('/juegos')  
  .get(JuegoCtrl.findAllJuegos)
  .post(JuegoCtrl.addJuego);

juegos.route('/juegos/:id')  
  .get(JuegoCtrl.findById)
  .put(JuegoCtrl.updateJuego)
  .delete(JuegoCtrl.deleteJuego);

app.use('/api', juegos);  



app.listen(3000, function() {
console.log("Node server running on http://localhost:3000");
});
