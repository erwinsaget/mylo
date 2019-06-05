const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client');
const axios = require('axios');

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://api.my-lo.org'
    : 'http://localhost:3030';

// Connect to a different URL
const restClient = rest(uri);

const client = feathers()
  .configure(restClient.axios(axios))
  .configure(
    auth({
      storage: window.localStorage
    })
  );

export default client;
