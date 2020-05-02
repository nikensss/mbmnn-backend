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
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 12 }
  ]),
  (req, res) => {
    console.log('[Project] adding new project...');
    projectService
      .add(req)
      .then((project) => res.send({ ok: true, id: project._id }))
      .catch((err) => res.status(400).send({ err: err.message }));
  }
);

router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  projectService.delete(id, (err, project) => {
    if (err) return res.status(400).send({ err });
    if (!project) return res.status(400).send({ status: 'no such project' });
    return res.send({ status: 'deleted', id: project._id });
  });
});

export default router;
