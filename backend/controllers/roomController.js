const { validationResult } = require("express-validator");
const { RoomAllocation } = require("../models");
const { Room } = require("../models");
const { Student } = require("../models");

// @route   POST /api/roomallocation
// @desc    Student applies for a room
// @access  Public
exports.applyRoom = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }

  const { student, room } = req.body;

  try {
    const existing = await RoomAllocation.findOne({ student });
    if (existing && existing.status === "pending") {
      return res.status(400).json({ success, msg: "Already applied for a room." });
    }

    const allocation = new RoomAllocation({ student, room });
    await allocation.save();

    success = true;
    res.json({ success, msg: "Room allocation request submitted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET /api/roomallocation/pending
// @desc    Get all pending room requests
// @access  Admin
exports.getPendingRequests = async (req, res) => {
  let success = false;
  try {
    const requests = await RoomAllocation.find({ status: "pending" })
      .populate("student", ["name", "cms_id", "course"]) // lowercase
      .populate("room", ["number", "capacity"]);

    success = true;
    res.json({ success, requests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   POST /api/roomallocation/approve/:id
// @desc    Approve room request
// @access  Admin
exports.approveRequest = async (req, res) => {
  let success = false;
  try {
    const request = await RoomAllocation.findById(req.params.id)
      .populate("student") // lowercase
      .populate("room");

    if (!request || request.status !== "pending") {
      return res.status(400).json({ success, msg: "Invalid request" });
    }

    const room = await Room.findById(request.room._id);
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ success, msg: "Room is full" });
    }

    room.occupants.push(request.student._id);
    await room.save();

    request.status = "approved";
    request.approvedAt = Date.now();
    await request.save();

    success = true;
    res.json({ success, msg: "Request approved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   POST /api/roomallocation/reject/:id
// @desc    Reject room request
// @access  Admin
exports.rejectRequest = async (req, res) => {
  let success = false;
  try {
    const request = await RoomAllocation.findById(req.params.id);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ success, msg: "Invalid request" });
    }

    request.status = "rejected";
    await request.save();

    success = true;
    res.json({ success, msg: "Request rejected" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET api/room/available
// @desc    Get all rooms that have space (available capacity)
// @access  Public
exports.getAvailableRooms = async (req, res) => {
  let success = false;
  try {
    const rooms = await Room.find().populate("occupants"); // if occupants is ref to 'student', use lowercase

    const availableRooms = rooms.filter(
      (room) => room.occupants.length < room.capacity
    );

    success = true;
    res.json({ success, rooms: availableRooms });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success, msg: "Server Error" });
  }
};
