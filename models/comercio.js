var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var comercioSchema = new Schema({  
  nombre:    	{ type: String },
  puntuacion:   { type: Number },
  icono:   		{ type: String }
});

module.exports = mongoose.model('Comercio', comercioSchema);  