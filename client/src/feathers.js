const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const uri = process.env.NODE_ENV === 'production' ? 'https://api.my-lo.org' : 'localhost:3030';

const socket = io(uri);

const client =
  feathers()
    .configure(socketio(socket))
    .configure(auth({
      storage: window.localStorage
    }));

export default client;
