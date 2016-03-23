module.exports = function (server, port) {
    var Rx = require('rx'),
        subject=new Rx.Subject(),
        bd = require('./bd');
    //servidor de socket
    var io = require('socket.io')(server);

    //el servidor de socket escucha mensajes de tipo connection
    io.on('connection', function (socket) {
        console.log('Alguien se ha conectado a nuestro socket');
        bd.findAllLeds().subscribe({
            onNext: function (data) {
                console.log(data);
                data.forEach(function (obj) {
                    subject.onNext(obj);
                });
                socket.emit('changeCSS', data);
            },
            onError: function (err) {
            },
            onCompleted: function () {
            }
        });
        socket.on('ledToggle', function (data) {
            console.log(data);
            subject.onNext(data);
            bd.updateLedStatus([data]);
            //data es un objeto y esperamos un array
            io.sockets.emit('changeCSS', [data]);
        });
        socket.on('refreshToggles', function (data) {
            data.forEach(function (obj) {
                subject.onNext(obj);
            });
            console.log(data);
            bd.updateLedStatus(data);
            io.sockets.emit('changeCSS', data);
        });

    });
    require('./leds')(subject);
    server.listen(port, function () {
        console.log('El servidor socket de la Raspberry está escuchando en el puerto ' + port);
    });


};