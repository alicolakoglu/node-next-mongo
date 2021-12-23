module.exports = (app) => {
    const projectController = require('../../controllers/projectController.js');
  
    app.route('/api/projects')
      .get(projectController.projects);

    app.route('/api/project')
      .post(projectController.createProject);
  
    app.route('/api/project/:projectId')
      .get(projectController.getProject)
      .put(projectController.updateProject)
      .delete(projectController.deleteProject);
  };
  