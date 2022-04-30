require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const { newUserCtrl, getUserCtrl, loginCtrl } = require('./controllers/users');
const { authUser } = require('./middleware/auth');
const {
  listRecoCtrl,
  getRecoCtrl,
  voteRecoCtrl,
  delRecoCtrl,
  newRecoCtrl,
} = require('./controllers/reco');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
//Rutas users
app.post('/users', newUserCtrl);
app.get('/users/:userName', getUserCtrl);
app.post('/login', loginCtrl);

//Rutas reco
app.post('/reco', authUser, newRecoCtrl); //publicar reco
app.get('/reco', listRecoCtrl); //ver listado de todas las reco (userId, tittle, image, category, spot, openLine), se puede incluir aca la buscqueda por categoria, lugar y votos
app.get('/reco/:id', getRecoCtrl); //ver el detalle de una reco por ID
app.post('/reco/:id/votes', authUser, voteRecoCtrl); //voto recomendacion por ID
app.delete('/reco/:id', authUser, delRecoCtrl); //eliminar una reco

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

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Lanzamos el servidor
app.listen(3000, () => {
  console.log('Servidor funcionando');
});
