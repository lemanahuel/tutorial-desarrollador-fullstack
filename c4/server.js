var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('mongoose');
var TareaModel = require('./tarea');

var connectDb = function() {
    db.connect('mongodb://127.0.0.1:27017/lista-de-tareas', {
        promiseLibrary: global.Promise
    }).then(function() {
        // console.log('db-connect', DB_URI);
    }, function(err) {
        // console.log('err-db-connect', err);
        connectDb();
    });
};

db.Promise = global.Promise;
connectDb();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, X-UserId, X-Nonce' +
        ', X-Secret, X-Ts, X-Sig, X-Vendor-Sig, X-Vendor-Apikey, X-Vendor-Nonce, X-Vendor-Ts, X-ProfileId' +
        ', X-Authorization, Authorization, Token, Pragma, Cache-Control, Expires');
    res.header('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,PUT,POST,DELETE');
    next();
});

app.get('/tareas', function(req, res) {
    TareaModel.find().lean().exec(function(err, tareas) {
        res.status(200).json(tareas);
    });
});

app.post('/tareas', function(req, res) {
    TareaModel.create(req.body, function(err, nuevaTarea) {
        res.status(200).json(nuevaTarea);
    });
});

app.listen(3000, function() {
    console.log('El server esta funcionando en el puerto 3000');
});