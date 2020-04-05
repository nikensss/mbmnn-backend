import fs from 'fs';
import Project from '../models/Project';

class ProjectService {
  constructor() {}

  getProjects(next) {
    Project.find({}, (err, projects) => {
      if (err) return next(err);
      return next(null, projects);
    });
  }

  getProject(id, next) {
    Project.findById(id, (err, project) => {
      if (err) return next(err);
      return next(null, project);
    });
  }

  add(req) {
    console.log(req);
    // return Promise.resolve("POSTED!");
    if (!req.files['images'] || !req.files['mainImage']) {
      return Promise.reject(new Error('missing data'));
    }

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      texts: req.body.texts,
      images: []
    });

    return fs.promises
      .readFile(req.files['mainImage'][0].path)
      .then(data => {
        project.mainImage = {
          contentType: req.files['mainImage'][0].mimetype,
          data: Buffer.from(data)
        };

        return Promise.all(req.files['images'].map(c => fs.promises.readFile(c.path)));
      })
      .then(data => {
        project.images = data.map(d => ({
          contentType: req.files['images'][0].mimetype,
          data: Buffer.from(d)
        }));

        return project.validate();
      })
      .then(() => project.save())
      .then(project => project)
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  delete(id, next) {
    Project.findByIdAndDelete(id, (err, project) => {
      if (err) return next(err);
      return next(null, project);
    });
  }
}

export default ProjectService;