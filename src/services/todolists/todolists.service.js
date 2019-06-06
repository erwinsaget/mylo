// Initializes the `todolists` service on path `/todolists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/todolists.model');
const hooks = require('./todolists.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    multi: process.env.NODE_ENV !== 'production'
  };

  // Initialize our service with any options it requires
  app.use('/todolists', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('todolists');

  service.hooks(hooks);
};
