const mongoose = require('mongoose');
const Project = mongoose.model('Project');

exports.projects = (req, res) => {
  Project.find({}, (err, project) => {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.createProject = (req, res) => {
  const new_project = new Project(req.body);
  new_project.save((err, project) => {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.getProject = (req, res) => {
  Project.findById(req.params.projectId, (err, project) => {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.updateProject = (req, res) => {
  Project.findOneAndUpdate({_id: req.params.projectId}, req.body, {new: true}, (err, project) => {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.deleteProject = (req, res) => {
  Project.remove({
    _id: req.params.projectId
  }, (err, project) => {
    if (err)
      res.send(err);
    res.json({ message: 'Project deleted' });
  });
};