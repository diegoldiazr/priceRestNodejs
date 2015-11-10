//File: controllers/comercios.js
var mongoose = require('mongoose');  
var Juego  = mongoose.model('Juego');

//GET - Return all comercios in the DB
exports.findAllJuegos = function(req, res) {  
    Juego.find(function(err, comercios) {
    if(err) res.send(500, err.message);

    console.log('GET /comercios')
        res.status(200).jsonp(comercios);
    });
};

//GET - Return a Juego with specified ID
exports.findById = function(req, res) {  
    Juego.findById(req.params.id, function(err, juego) {
    if(err) return res.send(500, err.message);

    console.log('GET /juego/' + req.params.id);
        res.status(200).jsonp(juego);
    });
};

//POST - Insert a new Juego in the DB
exports.addJuego = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var juego = new Juego({  
		nombre:    	req.body.nombre,
		compania: 	req.body.compania,
		edad:   	req.body.edad,
		imagen:   	req.body.imagen
	});

	console.log(juego);
    juego.save(function(err, juego) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(juego);
    });
};

//PUT - Update a register already exists
exports.updateJuego = function(req, res) {  
    Juego.findById(req.params.id, function(err, juego) {        	
		juego.nombre = 	req.body.nombre;
		juego.compania=	req.body.compania;
		juego.edad=  	req.body.edad;
		juego.imagen=  	req.body.imagen;

        juego.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(juego);
        });
    });
};

//DELETE - Delete a Juego with specified ID
exports.deleteJuego = function(req, res) {  
    Juego.findById(req.params.id, function(err, juego) {
        juego.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};