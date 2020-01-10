import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/students', StudentController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // todas as rotas abaixo precisam de autenticação

routes.put('/students', StudentController.update);

export default routes;
