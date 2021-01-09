const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

// taskSchema.pre('save', function(next) {
//   console.log('I work!');
//   next();
// })

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;