var modeloLed = require('./../models/led');
var Rx = require('rx');
//Se exporta la funcion a la que pasaremos la app de express
module.exports = {
    findAllLeds: function () {
        return Rx.Observable.create(function (obs) {
            modeloLed.find(function (err, leds) {
                if (!err) {
                    obs.onNext(leds);
                    console.log('Todos los led encontrados');
                    obs.onCompleted();

                } else {
                    console.log('ERROR al obtener TODOS los leds: ' + err);
                    obs.onError(leds);
                }
            });
        });
    },
    //Update  status led
    updateLedStatus: function (data) {
        console.log('Actualizando estado del led de color:');
        data.forEach(function(record){
            modeloLed.find({'led': record.led}, function (err, leds) {
                var led=leds[0];
                console.log(led.led);
                if (!err) {
                    led.status = record.status;
                    led.save(function (err) {
                        if (err) {
                            console.log('ERROR al actualizar el led: ' + err);
                        } else {
                            console.log('Estado del led actualizado');
                        }
                    });
                } else {
                    console.log('ERROR al obtener el led de color ' + record.led + ': ' + err);
                }
            });
        });
    }
};





