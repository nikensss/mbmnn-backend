import { Router } from 'express';
import users from './users';
import projects from './projects';

const apiRoutes = Router();

apiRoutes.use('/users', users);
apiRoutes.use('/projects', projects);

export default apiRoutes;