// todos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const todos = new Schema(
    {
      title: { type: String, required: true },
      completed: { type: Boolean, default: false },
      dueOn: { type: Date, required: true },
      owner: { type: Schema.Types.ObjectId, ref: 'users' }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('todos', todos);
};
