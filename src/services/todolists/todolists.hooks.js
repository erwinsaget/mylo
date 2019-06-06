const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  associateCurrentUser,
  queryWithCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

const addEmailToTodoList = require('../../hooks/add-email-to-todo-list');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [associateCurrentUser({ as: 'owner' }), addEmailToTodoList()],
    update: [restrictToOwner({ ownerField: 'owner' })],
    patch: [restrictToOwner({ ownerField: 'owner' })],
    remove: [restrictToOwner({ ownerField: 'owner' })]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
