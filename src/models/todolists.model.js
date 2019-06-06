// todolists-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const todolists = new Schema(
    {
      name: { type: String, required: true },
      owner: { type: Schema.Types.ObjectId, ref: 'users' },
      invitedEmails: { type: Array }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('todolists', todolists);
};
