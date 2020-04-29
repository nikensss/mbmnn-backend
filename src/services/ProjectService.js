import fs from 'fs';
import Project from '../models/Project';

class ProjectService {
  constructor() {}

  getProjects(next) {
    console.log('giving all projects');
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
    if (!req.files['mainImage']) {
      return Promise.reject(new Error('missing main image data'));
    }
    if (!req.files['images']) {
      return Promise.reject(new Error('missing side images data'));
    }
    console.log(req.files);
    console.log('[ProjectSecrive] processing new project...');
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      texts: req.body.texts,
      images: []
    });

    return fs.promises
      .readFile(req.files['mainImage'][0].path)
      .then((data) => {
        console.log('[ProjectService] setting project main image');
        project.mainImage = {
          contentType: req.files['mainImage'][0].mimetype,
          data: Buffer.from(data)
        };

        return Promise.all(req.files['images'].map((c) => fs.promises.readFile(c.path)));
      })
      .then((data) => {
        console.log('[ProjectService] setting project side images');
        project.images = data.map((d, i) => {
          console.log('[ProjectService] image ' + i);
          return {
            contentType: req.files['images'][0].mimetype,
            data: Buffer.from(d)
          };
        });
        console.log('validating project');
        return project.validate();
      })
      .then(() => {
        console.log('saving project');
        return project.save();
      })
      .then(() => console.log('project saved'))
      .catch((err) => {
        console.log(err);
        throw err;
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
