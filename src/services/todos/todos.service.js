// Initializes the `todos` service on path `/todos`
const createService = require('feathers-mongoose');
const createModel = require('../../models/todos.model');
const hooks = require('./todos.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    multi: process.env.NODE_ENV !== 'production'
  };

  // Initialize our service with any options it requires
  app.use('/todos', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('todos');

  service.hooks(hooks);
};
