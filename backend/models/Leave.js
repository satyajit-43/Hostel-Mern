const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    hostel:{
        type:Schema.Types.ObjectId,
        ref:'hostel'
    },
    purpose:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    leaving_date:{
        type:Date,
        required:true
    },
    return_date:{
        type:Date,
        required:true
    },
})

module.exports = Leave = mongoose.model('leave',LeaveSchema);