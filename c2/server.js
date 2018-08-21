var express = require('express');
var app = express();

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, X-UserId, X-Nonce' +
        ', X-Secret, X-Ts, X-Sig, X-Vendor-Sig, X-Vendor-Apikey, X-Vendor-Nonce, X-Vendor-Ts, X-ProfileId' +
        ', X-Authorization, Authorization, Token, Pragma, Cache-Control, Expires');
    res.header('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,PUT,POST,DELETE');
    next();
});

var tareas = [{
    _id: 1,
    title: 'Mi tarea 1',
    completed: false
}, {
    _id: 2,
    title: 'Mi tarea 2',
    completed: false
}, {
    _id: 3,
    title: 'Mi tarea 3',
    completed: false
}];

app.get('/tareas', function(req, res) {
    res.status(200).json(tareas);
});

app.listen(3000, function() {
    console.log('El server esta funcionando en el puerto 3000');
});