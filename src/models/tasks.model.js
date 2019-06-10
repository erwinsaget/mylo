// tasks-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const tasks = new Schema(
    {
      title: { type: String, required: true },
      completed: { type: Boolean, default: false },
      points: { type: Number, default: 0 },
      dueOn: { type: String, required: true },
      owner: { type: Schema.Types.ObjectId, ref: 'users' },
      todolistId: { type: Schema.Types.ObjectId, ref: 'todolists' },
      status: {
        type: String,
        enum: ['start', 'done', 'in progress'],
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('tasks', tasks);
};
