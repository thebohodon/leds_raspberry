var Cylon = require('cylon');
module.exports = function (subject) {

    Cylon.robot({
        connections: {
            raspi: {adaptor: 'raspi'}
        },
        devices: [
            {name: 'red', driver: 'led', pin: 37},
            {name: 'yellow', driver: 'led', pin: 33},
            {name: 'green', driver: 'led', pin: 35}
        ],
        work: function (my) {

            subject.subscribe({
                onNext: function (data) {
                   console.log('status= ' + data.status + ' led= ' + data.led);
                    data.status==='on' ? my[data.led].turnOn() : my[data.led].turnOff();
                },
                onError: function (err) {
                },
                onCompleted: function () {
                }
            });
        }
    }).start();
};