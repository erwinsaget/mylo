const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  associateCurrentUser,
  queryWithCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [queryWithCurrentUser({ as: 'owner' })],
    get: [],
    create: [associateCurrentUser({ as: 'owner' })],
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
