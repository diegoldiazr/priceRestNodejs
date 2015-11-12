//File: controllers/precios.js
var mongoose = require('mongoose');  
var Precio  = mongoose.model('Precio');

//GET - Return all precios in the DB
exports.findAll = function(req, res) {  
    Precio.find(function(err, precios) {
    if(err) res.send(500, err.message);

    console.log('GET /precios')
        res.status(200).jsonp(precios);
    });
};

//GET - Return a Precio with specified ID
exports.findById = function(req, res) {  
    Precio.findById(req.params.id, function(err, precio) {
    if(err) return res.send(500, err.message);

    console.log('GET /precio/' + req.params.id);
        res.status(200).jsonp(precio);
    });
};

//POST - Insert a new Precio in the DB
exports.add = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var precio = new Precio({  
		id_Comercio:req.body.id_Comercio,
		id_Juego: 	req.body.id_Juego,
		precio:   	req.body.precio		
	});

	console.log(precio);
    precio.save(function(err, precio) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(precio);
    });
};

//PUT - Update a register already exists
exports.update = function(req, res) {  
    Precio.findById(req.params.id, function(err, precio) {        	
		precio.id_Comercio =req.body.id_Comercio;
		precio.id_Juego=	req.body.id_Juego;
		precio.precio=  	req.body.precio;		

        precio.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(precio);
        });
    });
};

//DELETE - Delete a Precio with specified ID
exports.delete = function(req, res) {  
    Precio.findById(req.params.id, function(err, precio) {
        precio.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};