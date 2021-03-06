var express  		= require("express"),  
    app      		= express(),
	  bodyParser  	  = require("body-parser"),
	  methodOverride 	= require("method-override"),
    http     		= require("http"),
    server  		= http.createServer(app),
    mongoose		= require('mongoose');

//indicar a express donde estaran los archivos estaticos (public)
app.use(express.static(__dirname + '/public'));

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
   res.sendFile(__dirname + "/index.html");
});

app.use(router);

// Import Models and controllers
var Comercios     = require('./models/comercio')(app, mongoose);
var Juegos     = require('./models/juego')(app, mongoose);
var Precios     = require('./models/precio')(app, mongoose);
var ComercioCtrl = require('./controllers/comercios');
var JuegoCtrl = require('./controllers/juegos');
var PrecioCtrl = require('./controllers/precios');

// API routes

// COMERCIOS
//----------------------------

var comercios = express.Router();

comercios.route('/comercios')  
  .get(ComercioCtrl.findAll)
  .post(ComercioCtrl.add);

comercios.route('/comercios/:id')  
  .get(ComercioCtrl.findById)
  .put(ComercioCtrl.update)
  .delete(ComercioCtrl.delete);

app.use('/api', comercios);  

// JUEGOS
//----------------------------

var juegos = express.Router();

juegos.route('/juegos')  
  .get(JuegoCtrl.findAll)
  .post(JuegoCtrl.add);

juegos.route('/juegos/:id')  
  .get(JuegoCtrl.findById)
  .put(JuegoCtrl.update)
  .delete(JuegoCtrl.delete);

app.use('/api', juegos);  

// PRECIOS
//----------------------------

var precios = express.Router();

precios.route('/precios')  
  .get(PrecioCtrl.findAll)
  .post(PrecioCtrl.add);

precios.route('/precios/:id')  
  .get(PrecioCtrl.findById)
  .put(PrecioCtrl.update)
  .delete(PrecioCtrl.delete);

app.use('/api', precios);  

//ARRANQUE DEL SERVIDOR
//****************************


app.listen(3000, function() {
console.log("Node server running on http://localhost:3000");
});
