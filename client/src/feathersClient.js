const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

// Url for backend
const socketURI = process.env.NODE_ENV !== "production" ? "http://localhost:3030/" : "";

const socket = io(socketURI);

const fc = feathers();

// Setup the transport (Socket) here
fc.configure(socketio(socket));
// configure storage for authentication
fc.configure(auth({
  storage: window.localStorage
}))

export default fc
