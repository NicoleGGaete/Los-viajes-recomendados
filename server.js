require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

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
const { getMeCtrl } = require('./controllers/users/getMeCtrl');
const { getRecosUserCtrl } = require('./controllers/users/getRecosUserCtrl');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static('./uploads'));

//Rutas users
app.post('/users', newUserCtrl);
//Agregar el avatar en la respuesta de la peticion para getMeCtrl y para getUserCtrl
app.get('/users', authUser, getMeCtrl);
app.get('/users/:userId', getUserCtrl);
app.get('/users/:userId/recos', authUser, getRecosUserCtrl);
app.post('/login', loginCtrl);
app.put('/users/:userName', authUser, editUserCtrl);

//Rutas reco
app.post('/', authUser, newRecoCtrl); //publicar reco
app.get('/', listRecoCtrl); //ver listado de todas las reco //fatal esto (userId, tittle, image, category, spot, openLine), se puede incluir aca la buscqueda por categoria, lugar y votos
app.get('/:recoId', getRecoCtrl); //ver el detalle de una reco por ID
app.post('/:recoId/votes', authUser, recoExist, voteRecoCtrl); //voto recomendacion por ID
app.delete('/:recoId', authUser, recoExist, delRecoCtrl); //eliminar una reco
app.post('/:recoId', authUser, recoExist, comRecoCtrl); //comentar una reco

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
app.listen(4000, () => {
  console.log('Servidor funcionando');
});
