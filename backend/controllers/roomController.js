const { validationResult } = require('express-validator');
const { Room } = require('../models');
const { Student } = require('../models');

// @route   POST api/room/allocate
// @desc    Allocate room to student
// @access  Admin/Student
exports.allocateRoom = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }

    const { cms_id, room_no } = req.body;

    try {
        const student = await Student.findOne({ cms_id });
        if (!student) {
            return res.status(404).json({ success, msg: 'Student not found' });
        }

        const room = await Room.findOne({ room_no });
        if (!room) {
            return res.status(404).json({ success, msg: 'Room not found' });
        }

        // Already in same room
        if (student.room_no === room_no) {
            return res.status(400).json({ success, msg: 'Student is already in this room' });
        }

        // Prevent overbooking
        if (room.occupants.length >= room.capacity) {
            return res.status(400).json({ success, msg: 'Room is already full' });
        }

        // Remove from old room if any
        if (student.room_no) {
            const oldRoom = await Room.findOne({ room_no: student.room_no });
            if (oldRoom) {
                oldRoom.occupants = oldRoom.occupants.filter(id => id.toString() !== student._id.toString());
                await oldRoom.save();
            }
        }

        // Assign new room
        student.room_no = room_no;
        await student.save();

        // Add to occupants list
        if (!room.occupants.includes(student._id)) {
            room.occupants.push(student._id);
            await room.save();
        }

        success = true;
        res.json({ success, msg: 'Room allocated successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST api/room/deallocate
// @desc    Deallocate student from room
// @access  Admin/Student
exports.deallocateRoom = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }

    const { cms_id } = req.body;

    try {
        const student = await Student.findOne({ cms_id });
        if (!student || !student.room_no) {
            return res.status(400).json({ success, msg: 'Student is not assigned to any room' });
        }

        const room = await Room.findOne({ room_no: student.room_no });
        if (room) {
            room.occupants = room.occupants.filter(id => id.toString() !== student._id.toString());
            await room.save();
        }

        student.room_no = null;
        await student.save();

        success = true;
        res.json({ success, msg: 'Room deallocated successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST api/room/byhostel
// @desc    Get all rooms in a hostel
// @access  Public
exports.getRoomsByHostel = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }

    const { hostel } = req.body;

    try {
        const rooms = await Room.find({ hostel }).populate('occupants', ['name', 'cms_id', 'room_no']);
        success = true;
        res.json({ success, rooms });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST api/room/bystudent
// @desc    Get room details of a student
// @access  Public
exports.getRoomByStudent = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }

    const { cms_id } = req.body;

    try {
        const student = await Student.findOne({ cms_id });
        if (!student || !student.room_no) {
            return res.status(404).json({ success, msg: 'Student not allocated to any room' });
        }

        const room = await Room.findOne({ room_no: student.room_no }).populate('occupants', ['name', 'cms_id']);
        success = true;
        res.json({ success, room });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
