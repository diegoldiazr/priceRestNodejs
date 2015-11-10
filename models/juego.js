var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var juegoSchema = new Schema({  
  nombre:    	{ type: String },
  compania:   	{ type: String },
  edad:   		{ type: Number },
  imagen:		{ type: String}
});

module.exports = mongoose.model('Juego', juegoSchema);  