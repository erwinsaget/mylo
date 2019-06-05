const chai = require('chai'),
  chaiHttp = require('chai-http'),
  faker = require('faker'),
  expect = chai.expect;

chai.use(chaiHttp);

const app = require('../../src/app');

describe('Logging in', function() {
  it('User can log in', async function() {
    const email = faker.internet.email();

    await app.service('users').create({
      name: faker.name.findName(),
      email,
      password: 'password'
    });

    chai
      .request(app)
      .post('/authentication')
      .send({
        strategy: 'local',
        email,
        password: 'password'
      })
      .end(function(err, response) {
        expect(err).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('accessToken');
      });
  });
});
