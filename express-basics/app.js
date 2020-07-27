const express = require('express');
const morgan = require('morgan');
const app = express();

function logger(req, res, next) {
    console.log('request recibido');
    console.log(`ruta recibida ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

// settings
app.set('appName','Tutorial de NodeJS');
app.set('port', 3000);

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.all('/user', (req, res, next) => {
    console.log('por aqui paso');
    // res.send('finish');
    next();
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/user', function (req, res) {
    res.json({
        nombre: 'ignacio',
        apellido: 'sanchez'
    });
    console.log('test');
});

app.post('/user/:id', function (req, res) {
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.body);
    res.send('user post recibido');
});

app.delete('/user/:id', function (req, res) {
    res.send(`usuario ${req.params.id} eliminado`);
});

app.put('/user/:id', function (req, res) {
    console.log(req.body);
    res.send(`user ${req.params.id} actualizado`);
});

app.use(express.static('public'));

app.listen(app.get('port'), function (param) {
    console.log(app.get('appName'));
    console.log('server on port', app.get('port'));
});

console.log('hola');