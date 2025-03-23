const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    number: {
      type: String,
      required: true,
      unique: true
    },
    capacity: {
      type: Number,
      required: true
    },
    occupants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }]
  });
  
  module.exports = Room =  mongoose.model('room', RoomSchema);
  