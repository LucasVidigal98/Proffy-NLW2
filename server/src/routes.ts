import express from 'express';

import ClassesControler from './controllers/ClassesController';
import ConnectionsControler from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const classesControler = new ClassesControler();
const connectionsController = new ConnectionsControler();
const usersController = new UsersController();

routes.post('/classes', classesControler.create);
routes.get('/classes', classesControler.index);
routes.get('/schedules', classesControler.getSchedules);
routes.put('/classes-update', classesControler.update);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

routes.post('/user-create', usersController.create);
routes.get('/users', usersController.index);
routes.put('/user-update', usersController.update);
routes.get('/user-login', usersController.login);
routes.get('/user-info', usersController.filterIndex);

export default routes;