const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addEmailToTodoList = require('../../src/hooks/add-email-to-todo-list');

describe('\'addEmailToTodoList\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: addEmailToTodoList()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
