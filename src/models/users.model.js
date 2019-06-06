require('mongoose-type-email');
// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema(
    {
      email: {
        type: mongooseClient.SchemaTypes.Email,
        unique: true,
        lowercase: true
      },
      password: { type: String },
      points: { type: Number, default: 0 },
      googleId: { type: String },
      facebookId: { type: String }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('users', users);
};
