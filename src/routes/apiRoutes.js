const express = require('express');
const apiRouter = express.Router();
const verified = require('../middleware/verifyToken')

let salleController = require('../controllers/salleController');
let movieController = require('../controllers/movieController');
let clientController = require('../controllers/clientController');
let programmeController = require('../controllers/programmeController');
let reservationController = require('../controllers/reservationController');
let dashboradController = require('../controllers/dashboardController');
let contactController = require('../controllers/contactController');
let paymentController = require('../controllers/paymentController');
let subscribeController = require('../controllers/subscribeController');
let auth = require('../controllers/auth');

// auth
apiRouter.post('/admin/account/auth/client', clientController.postRegisterClient);
apiRouter.post('/admin/account/auth/client/login', clientController.postLoginClient);
apiRouter.get('/admin/account/clients',verified.cookieToken, clientController.getClients);
apiRouter.get('/admin/account/delete-client/:id', verified.cookieToken, clientController.deleteClients);
apiRouter.post('/admin/auth', auth.postLoginUser);
apiRouter.get('/', auth.adminHome);

// Dashboard
apiRouter.get('/admin/account', verified.cookieToken, dashboradController.getdashboard);

// salles
apiRouter.get('/admin/account/add-salles', verified.cookieToken, salleController.getAddSalle);
apiRouter.post('/admin/account/add-salles', verified.cookieToken, salleController.postSalle);
apiRouter.get('/admin/account/salles', verified.cookieToken, salleController.getSallesAll);
apiRouter.get('/admin/account/salles-json', salleController.getSallesAllJson);
apiRouter.get('/admin/account/detail-salle-json/:id', salleController.getIdSallesAllJson);
apiRouter.get('/admin/account/delete-salle/:id', verified.cookieToken, salleController.deleteSalles);
apiRouter.get('/admin/account/edit-salle/:id', verified.cookieToken, salleController.editSalles);
apiRouter.post('/admin/account/update-salle', verified.cookieToken, salleController.updateSalles);

// movies
apiRouter.get('/admin/account/edit-movies/:id', verified.cookieToken, movieController.editMovies);
apiRouter.get('/admin/account/delete-movie/:id', verified.cookieToken, movieController.deleteMovies);
apiRouter.get('/admin/account/movies', verified.cookieToken, movieController.getMovieAll);
apiRouter.get('/admin/account/add-movies', verified.cookieToken, movieController.getAddMovies);
apiRouter.post('/admin/account/add-movies', verified.cookieToken, movieController.postMovies);
apiRouter.get('/admin/account/detail-movie/:id', verified.cookieToken, movieController.getMovieOne);

// Programmes
apiRouter.get('/admin/account/add-programmes', verified.cookieToken, programmeController.getAddProgramme);
apiRouter.post('/admin/account/add-programmes', verified.cookieToken, programmeController.postProgramme);
apiRouter.get('/admin/account/programmes', verified.cookieToken, programmeController.getProgrammesAll);
apiRouter.get('/admin/account/programmes-json', programmeController.getProgrammesAllJson);
apiRouter.get('/admin/account/edit-programme/:id', verified.cookieToken, programmeController.editProgrammes);
apiRouter.post('/admin/account/update-programme', verified.cookieToken, programmeController.updateProgrammes);
apiRouter.get('/admin/account/delete-programme/:id', verified.cookieToken, programmeController.deleteProgrammes);
apiRouter.get('/admin/account/detail-programme/:id', verified.cookieToken, programmeController.getProgrammesOne);
apiRouter.get('/admin/account/detail-programme-json/:id',  programmeController.getProgrammesOneJson);

// reservations
apiRouter.get('/admin/account/reservations',verified.cookieToken, reservationController.getReservationsAll);
apiRouter.get('/admin/account/reservations-json', reservationController.getReservationsAllJson);
apiRouter.post('/admin/account/add-reservation-json', verified.auth, reservationController.postReservationJson);
apiRouter.get('/admin/account/detail-reservation/:id', verified.cookieToken, reservationController.getReservationsOne);
apiRouter.get('/admin/account/delete-reservation/:id', verified.cookieToken, reservationController.deleteReservations);
// manuelaaa@gmail.com

// Contact
apiRouter.post('/admin/account/add-contact', contactController.postContactJson);
apiRouter.get('/admin/account/contacts',verified.cookieToken, contactController.getContactsAll);
apiRouter.get('/admin/account/detail-contact/:id', verified.cookieToken, contactController.getContactsOne);
apiRouter.get('/admin/account/delete-contact', verified.cookieToken, contactController.deleteContacts);

// Payment
apiRouter.post('/admin/account/payment', verified.auth, paymentController.postCheckout);
apiRouter.post('/admin/account/subscribe', subscribeController.postSubscribe);






module.exports = apiRouter;