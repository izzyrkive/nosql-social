const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return new Date(this.createdAt).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;