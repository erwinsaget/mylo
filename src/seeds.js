// https://medium.com/@tomaszbak/feathersjs-seeds-with-services-and-async-await-49765c59b7a1

const app = require('./app');
const { capitalize, random, shuffle } = require('lodash');
const faker = require('faker');
const { format } = require('date-fns');

async function seed(name, data) {
  console.log(data.length + ' ' + name); // eslint-disable-line
  const service = app.service(name);
  await service.Model.deleteMany({});
  return service.create(data);
}

async function main() {
  console.log('\nSeeds START'); // eslint-disable-line

  const users = await seed('users', [
    {
      name: 'Test User',
      email: 'test@example.com',
      password: 'secret'
    },
    {
      name: 'Test User 2',
      email: 'test2@example.com',
      password: 'secret'
    }
  ]);

  const todoFactory = function(number) {
    let todos = [];

    for (let i = 0; i < number; i++) {
      let todo = {
        title: capitalize(faker.lorem.words(random(3, 7))),
        completed: false,
        owner: shuffle(users)[0]._id,
        dueOn: format(new Date(), 'MM/DD/YYYY')
      };

      todos.push(todo);
    }

    return todos;
  };

  await seed('todos', todoFactory(50));

  console.log('\nSeeds DONE'); // eslint-disable-line
  process.exit();
}

main();
