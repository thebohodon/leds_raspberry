var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    cons = require('consolidate'),
    path = require('path'),
    port = 3000,
    server;

//require('./app/controllers/prueba').capturarEveto();

mongoose.connect('mongodb://localhost/ledbd', function (err, res) {
    if (err) {
        console.log('ERROR: no se ha conectado a la bd: ' + err);
    } else {
        console.log('Conectado a la bd');
    }
});

var app = express();
//Creo así el servidor para que funcione con sockets
server = require('http').Server(app);
require('./app/controllers/sockets')(server, port);

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

//Añade metodos post y delete a framework que no los tienen
app.use(methodOverride());

//Asigna el motor de renderizado swig para ficheros .html
//Se usan para crear plantillas
app.engine('html', cons.swig);
//añade la extension .html a todos los ficheros que se rendericen
app.set('view engine', 'html');
//la app intenta cargar ficheros de /Users/enriquecarrerosalcedo/Desktop/raspberry/views
//y se pone para que coja de /Users/enriquecarrerosalcedo/Desktop/raspberry/app/views
app.set('views', './app/views');

//los archivos estaticos de los html tiran de esta carpeta
app.use(express.static(path.resolve('./public')));

//cuando se llame a la url IP:3000 se renderizará el index
app.route('/')
    .get(function (req, res, next) {
        res.status(200);
        res.render('index');
    });



