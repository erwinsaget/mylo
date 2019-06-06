const users = require('./users/users.service.js');
const todos = require('./todos/todos.service.js');
const todolists = require('./todolists/todolists.service.js');
const tasks = require('./tasks/tasks.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(todos);
  app.configure(todolists);
  app.configure(tasks);
};
