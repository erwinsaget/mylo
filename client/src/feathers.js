const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const socket = io(``);
const client = feathers();

// Setup the transport (Rest, Socket, etc.) here
client.configure(socketio(socket));

// Feathers authentication setup
// Available options are listed in the "Options" section
client.configure(auth({
  storage: window.localStorage
}));

export default client;
