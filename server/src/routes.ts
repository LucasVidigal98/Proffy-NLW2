import express from "express";

import ClassesController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionsController";
import UsersController from "./controllers/UsersController";

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.index);
routes.get("/schedules", classesController.getSchedules);
routes.put("/classes-update", classesController.update);
routes.get("/classes-exists", classesController.checkIfClassesExists);

routes.post("/connections", connectionsController.create);
routes.get("/connections", connectionsController.index);

routes.post("/user-create", usersController.create);
routes.get("/users", usersController.index);
routes.put("/user-update", usersController.update);
routes.get("/user-login", usersController.login);
routes.get("/user-info", usersController.filterIndex);

export default routes;
