import express from 'express';

import ClassesControler from './controllers/ClassesController';
import ConnectionsControler from './controllers/ConnectionsController';

const routes = express.Router();
const classesControler = new ClassesControler();
const connectionsController = new ConnectionsControler();

routes.post('/classes', classesControler.create);
routes.get('/classes', classesControler.index);

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes;