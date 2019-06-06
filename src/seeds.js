// https://medium.com/@tomaszbak/feathersjs-seeds-with-services-and-async-await-49765c59b7a1

const app = require('./app');
const { capitalize, random, shuffle } = require('lodash');
const faker = require('faker');
const { format } = require('date-fns');

async function seed(name, data) {
  console.log(data.length + ' ' + name + '\n'); // eslint-disable-line
  const service = app.service(name);
  await service.Model.deleteMany({});
  return service.create(data).catch(err => {
    console.log(err);
    process.exit();
  });
}

const userFactory = function(number) {
  let users = [];

  for (let i = 0; i < number; i++) {
    let user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'password'
    };

    users.push(user);
  }

  return users;
};

const todoFactory = function(number, users) {
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

const todoListFactory = function(number, users) {
  let todolists = [];

  for (let i = 0; i < number; i++) {
    let todolist = {
      name: faker.name.findName(),
      owner: shuffle(users)[0]._id
    };

    todolists.push(todolist);
  }

  return todolists;
};

const taskFactory = function(number, users, todolists) {
  const tasks = [];
  const statuses = ['start', 'in progress', 'done'];

  for (let i = 0; i < number; i++) {
    let task = {
      title: capitalize(faker.lorem.words(random(3, 7))),
      completed: false,
      status: shuffle(statuses)[0],
      owner: shuffle(users)[0]._id,
      todolistId: shuffle(todolists)[0]._id,
      dueOn: format(new Date(), 'MM/DD/YYYY')
    };

    tasks.push(task);
  }

  return tasks;
};

async function main() {
  console.log('\nSeeds START\n'); // eslint-disable-line

  let dummyUsers = [
    {
      name: 'Test User',
      email: 'test@example.com',
      password: 'secret'
    }
  ].concat(userFactory(1));

  const users = await seed('users', dummyUsers);

  const todos = await seed('todos', todoFactory(50, users));

  const todolists = await seed('todolists', todoListFactory(3, users));

  const tasks = await seed('tasks', taskFactory(50, users, todolists));
  console.log('\nSeeds DONE'); // eslint-disable-line
  process.exit();
}

main();
