const chai = require('chai'),
  chaiHttp = require('chai-http'),
  faker = require('faker'),
  expect = chai.expect;

chai.use(chaiHttp);

const app = require('../../src/app');

// TODO: mock emails being sent

describe('Registering users', function() {
  describe('Validation', function() {
    it('Does not allow user to register without a name', function(done) {
      chai
        .request(app)
        .post('/users')
        .send({
          email: faker.internet.email(),
          password: faker.internet.password()
        })
        .end(function(err, response) {
          expect(err).to.be.null;
          expect(response).to.have.status(400);
          expect(response.body.message).to.eql(
            'Field name does not exist. (required)'
          );
          done();
        });
    });

    it('Does not allow user to register without an email', function(done) {
      chai
        .request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          password: faker.internet.password()
        })
        .end(function(err, response) {
          expect(err).to.be.null;
          expect(response).to.have.status(400);
          expect(response.body.message).to.eql(
            'Field email does not exist. (required)'
          );
          done();
        });
    });

    it('Does not allow user to register without a password', function(done) {
      chai
        .request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email()
        })
        .end(function(err, response) {
          expect(err).to.be.null;
          expect(response).to.have.status(400);
          expect(response.body.message).to.eql(
            'Field password does not exist. (required)'
          );
          done();
        });
    });
  });

  describe('User model after creation', function() {
    this.timeout(5000);

    it('Creates a user successfully', async function() {
      const user = await app.service('users').create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'password'
      });

      expect(user.password).to.not.equal('password');
    });

    it('Removes password from the response object', function(done) {
      chai
        .request(app)
        .post('/users')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: 'password'
        })
        .end(function(err, response) {
          expect(err).to.be.null;
          expect(response.body.password).to.be.undefined;
          done();
        });
    });
  });
});
