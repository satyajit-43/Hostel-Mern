// models/Room.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    room_no: {
        type: Number,
        required: true,
        unique: true
    },
    hostel: {
        type: Schema.Types.ObjectId,
        ref: 'hostel',
        required: true
    },
    type: {
        type: String,
        enum: ['Single', 'Double', 'Triple'],
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    occupants: [{
        type: Schema.Types.ObjectId,
        ref: 'student'
    }]
}, { timestamps: true });

module.exports = Room = mongoose.model('room', RoomSchema);
