//=======[ Settings, Imports & Data ]==========================================
var PORT = 3000;
const cors = require('cors');
var express = require('express');
var app = express();
var pool = require('./mysql-connector'); 
const jwt = require('jsonwebtoken');

const YOUR_SECRET_KEY = 'mi llave';
var testUser = { username: 'test', password: '1234' };

const corsOptions = {
    origin: '*',  
};

var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};

var authenticator = function (req, res, next) {
    let autHeader = (req.headers.authorization || '');
    let token;
    if (autHeader.startsWith('Bearer ')) {
        token = autHeader.split(' ')[1];
    } else {
        return res.status(401).send({ message: 'Se requiere un token de tipo Bearer' });
    }
    jwt.verify(token, YOUR_SECRET_KEY, function(err) {
      if(err) {
        return res.status(403).send({ message: 'Token inválido' });
      }
      next();
    });
};

// Importando las nuevas rutas
const routerUsuarios = require('./routes/usuarios');
const routerConsumos = require('./routes/consumos');
const routerGrupos = require('./routes/grupos');
const routerGruposConsumos = require('./routes/grupos_consumos');
const routerProgramacionHoraria = require('./routes/programacion_horaria');
const routerProgramacionGrupos = require('./routes/programacion_grupos');

// Middleware
app.use(express.json());
app.use(express.static('/home/node/app/static/'));
app.use(cors(corsOptions));
app.use(myLogger);

// Rutas
app.use('/usuarios', routerUsuarios);
app.use('/consumos', routerConsumos);
app.use('/grupos', routerGrupos);
app.use('/grupos_consumos', routerGruposConsumos);
app.use('/programacion_horaria', routerProgramacionHoraria);
app.use('/programacion_grupos', routerProgramacionGrupos);

app.get('/', function(req, res) {
    res.send({'Estdo': 'OK!'}).status(200);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE nombre = ? AND password = ?';

    pool.query(query, [username, password], (err, result) => {
        if (err) {
            res.status(500).send({ errorMessage: 'Error al consultar la base de datos' });
            return;
        }
        if (result.length > 0) {
            const user = result[0];
            const token = jwt.sign({ id: user.id, username: user.nombre }, YOUR_SECRET_KEY);
            res.status(200).send({ signed_user: user, token });
        } else {
            res.status(403).send({ errorMessage: 'Usuario o contraseña incorrectos' });
        }
    });
});


app.get('/prueba', authenticator, function(req, res) {
    res.send({message: 'Está autenticado, accede a los datos'});
});

// Iniciar servidor
app.listen(PORT, function() {
    console.log("NodeJS API running correctly on port " + PORT);
});
