require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const { authUser } = require('./middleware/auth');
const { newUserCtrl } = require('./controllers/users/newUserCtrl');
const { getUserCtrl } = require('./controllers/users/getUserCtrl');
const { loginCtrl } = require('./controllers/users/loginCtrl');
const { editUserCtrl } = require('./controllers/users/editUserCtrl');

const { newRecoCtrl } = require('./controllers/reco/newRecoCtrl');
const { listRecoCtrl } = require('./controllers/reco/listRecoCtrl');
const { getRecoCtrl } = require('./controllers/reco/getRecoCtrl');
const { voteRecoCtrl } = require('./controllers/reco/voteRecoCtrl');
const { comRecoCtrl } = require('./controllers/reco/comRecoCtrl');
const { delRecoCtrl } = require('./controllers/reco/delRecoCtrl');
const { recoExist } = require('./db/reco/recoExist');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
//Rutas users
app.post('/users', newUserCtrl);
app.get('/users/:userName', getUserCtrl);
app.post('/login', loginCtrl);
app.put('/users/:userName', authUser, editUserCtrl);

//Rutas reco
app.post('/reco', authUser, newRecoCtrl); //publicar reco
app.get('/reco', authUser, listRecoCtrl); //ver listado de todas las reco (userId, tittle, image, category, spot, openLine), se puede incluir aca la buscqueda por categoria, lugar y votos
app.get('/reco/:recoId', getRecoCtrl); //ver el detalle de una reco por ID
app.post('/reco/:recoId/votes', authUser, recoExist, voteRecoCtrl); //voto recomendacion por ID
app.delete('/reco/:recoId', authUser, recoExist, delRecoCtrl); //eliminar una reco
app.post('/reco/:recoId', authUser, recoExist, comRecoCtrl); //comentar una reco

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
