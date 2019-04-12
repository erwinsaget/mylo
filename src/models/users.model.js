// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    googleId: {
      type: String
    },
    facebookId: {
      type: String
    },

  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
