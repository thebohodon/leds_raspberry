//Aquí se encuentra todo lo referido a los socket de la parte cliente

//mando mensaje connection al conectarme al socket de esta url
var socket = io('http://192.168.1.12:3000', {'forceNew': true});
//para localhost solo
//var socket = io();

//escucho eventos de tipo inicio
socket.on('changeCSS', function (inicioData) {
    inicioData.forEach(function (data) {
        console.log(data);
    });
    changeCSS(inicioData);
});


//funcion para pintar los datos iniciales
function changeCSS(data) {
    var toggle;
    data.forEach(function (value) {
        toggle = $('.toggle#' + value.led);
        value.status === 'on' ? toggle.addClass('active') : toggle.removeClass('active');
    })
};


//Funciones JS
function onReady() {
    var $btn = $('.toggle'),
        $refresh = $('.icon-refresh');

    //cuando se detecta que se ha emitido el evento toggle de cualquier botón
    $btn.on('toggle', function (e) {
        var led = $(this).attr('id'),
            payload,
            status = 'off';
        if ($(this).hasClass('active')) {
            status = 'on';
        }
        payload = {"led": led, "status": status};
        socket.emit('ledToggle', payload);
    });

    $refresh.click(function () {
        var payload = [
            {"led": "red", "status": "off"},
            {"led": "yellow", "status": "off"},
            {"led": "green", "status": "off"}
        ];
        $('.toggle').removeClass('active');
        socket.emit('refreshToggles', payload);

    });
};
$(document).ready(onReady);
