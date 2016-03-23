//modelo de la base de datos
var mongoose=require('mongoose');
//esquema que modela el json para almacenar en bd
var Schema =mongoose.Schema;

var led= new Schema({
    led:String,
    status:String
});

//para exportar el modelo a otros ficheros(como_se_llama_el_esquema,cual_es, collection_exportada)
module.exports = mongoose.model('ModeloLed',led,'ledsCollection');