//File: controllers/comercios.js
var mongoose = require('mongoose');  
var Comercio  = mongoose.model('Comercio');

//GET - Return all comercios in the DB
exports.findAllComercios = function(req, res) {  
    Comercio.find(function(err, comercios) {
    if(err) res.send(500, err.message);

    console.log('GET /comercios')
        res.status(200).jsonp(comercios);
    });
};

//GET - Return a Comercio with specified ID
exports.findById = function(req, res) {  
    Comercio.findById(req.params.id, function(err, comercio) {
    if(err) return res.send(500, err.message);

    console.log('GET /comercio/' + req.params.id);
        res.status(200).jsonp(comercio);
    });
};

//POST - Insert a new Comercio in the DB
exports.addComercio = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var comercio = new Comercio({  
		nombre:    	req.body.nombre,
		puntuacion: req.body.puntuacion,
		icono:   	req.body.icono
	});

	console.log(comercio);
    comercio.save(function(err, comercio) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(comercio);
    });
};

//PUT - Update a register already exists
exports.updateComercio = function(req, res) {  
    Comercio.findById(req.params.id, function(err, comercio) {
        comercio.nombre 	= req.body.nombre;
		comercio.puntuacion = req.body.puntuacion;
		comercio.icono 		= req.body.icono;

        comercio.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(comercio);
        });
    });
};

//DELETE - Delete a Comercio with specified ID
exports.deleteComercio = function(req, res) {  
    Comercio.findById(req.params.id, function(err, comercio) {
        comercio.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};