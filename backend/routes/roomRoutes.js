const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  applyRoom,
  getPendingRequests,
  approveRequest,
  rejectRequest,
  getAvailableRooms
} = require('../controllers/roomController');

// @route   POST api/roomallocation/apply
// @desc    Student applies for a room
// @access  Public
router.post('/apply', [
  check('student', 'Student is required').not().isEmpty(),
  check('room', 'Room is required').not().isEmpty()
], applyRoom);

// @route   GET api/roomallocation/pending
// @desc    Get all pending room requests
// @access  Admin
router.get('/pending', getPendingRequests);

// @route   POST api/roomallocation/approve
// @desc    Approve room request by ID
// @access  Admin
router.post('/approve', [
  check('id', 'Request ID is required').not().isEmpty()
], approveRequest);

// @route   POST api/roomallocation/reject
// @desc    Reject room request by ID
// @access  Admin
router.post('/reject', [
  check('id', 'Request ID is required').not().isEmpty()
], rejectRequest);


// @route   GET api/room/available
// @desc    Get available rooms
// @access  Public
router.get('/available', getAvailableRooms);



module.exports = router;
