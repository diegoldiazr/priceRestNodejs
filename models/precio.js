var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var precioSchema = new Schema({  
  id_Comercio:  { type: String },
  id_Juego:    	{ type: String },
  precio:   	{ type: Number }
});

module.exports = mongoose.model('Precio', precioSchema);  