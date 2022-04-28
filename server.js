require ('dotenv').config();

const express = require ('express');

const morgan = require ('morgan');


const {
    newuserController,
    getuserController,
    loginController,
} = require('./controllers/users');

const {
    newrecoController,
    getlistrecoController,
    getdetailrecoController,
    newvotrecoController,
    getlookrecoController,
    getresultvotrecoController,
    deleterecoController,
} = require('./controllers/reco');

const app = express();
app.use(morgan('dev'));


//Rutas users
app.post('/user', newuserController);
app.get('/user/:id', getuserController);
app.post('/login', loginController);

//Rutas reco
app.post('/', newrecoController);
app.get('/', getlistrecoController);
app.get('/', getdetailrecoController);
app.post ('/', newvotrecoController);
app.get ('/', getlookrecoController);
app.get ('/', getresultvotrecoController);
app.delete ('/reco/:id', deleterecoController);

// Middleware de 404

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

//Middleware de gestion de errores
app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500) .send({
        status: 'error',
        message: error.message,
    });
});


// Lanzamos el servidor
app.listen(3000, () => {
    console.log('Servidor funcionando');
});

