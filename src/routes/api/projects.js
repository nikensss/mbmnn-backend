import { Router } from 'express';
import ProjectService from '../../services/ProjectService';
import multer from 'multer';
import { auth } from '../../auth/passport';

const router = Router();
const projectService = new ProjectService();

var upload = multer({
  dest: './uploads/'
});

router.get('/', (req, res) => {
  res.redirect('all');
});

router.get('/all', (req, res) => {
  projectService.getProjects((err, projects) => {
    if (err) res.status(400).send({ err });
    return res.send(projects);
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  projectService.getProject(id, (err, project) => {
    if (err) res.status(400).send({ err });
    return res.send(project);
  });
});

router.post(
  '/new',
  upload.fields([
    { name: 'main-image', maxCount: 1 },
    { name: 'images', maxCount: 12 }
  ]),
  (req, res) => {
    projectService
      .add(req)
      .then(project => res.send(project))
      .catch(err => res.status(400).send({ err: err.message }));
  }
);

router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  projectService.delete(id, (err, project) => {
    if (err) return res.status(400).send({ err });
    if (!project) return res.status(400).send({ status: 'no such project' });
    return res.send({ status: 'deleted', project: project });
  });
});

export default router;