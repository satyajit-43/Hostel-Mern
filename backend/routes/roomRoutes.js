const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { 
    allocateRoom, 
    deallocateRoom, 
    getRoomsByHostel, 
    getRoomByStudent 
} = require('../controllers/roomController');

// @route   POST api/room/allocate
// @desc    Allocate room to student
// @access  Public
router.post('/allocate', [
    check('cms_id', 'CMS ID is required').not().isEmpty(),
    check('room_no', 'Room number is required').not().isEmpty()
], allocateRoom);

// @route   POST api/room/deallocate
// @desc    Deallocate room of a student
// @access  Public
router.post('/deallocate', [
    check('cms_id', 'CMS ID is required').not().isEmpty()
], deallocateRoom);

// @route   POST api/room/hostel
// @desc    Get all rooms by hostel id
// @access  Public
router.post('/hostel', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getRoomsByHostel);

// @route   POST api/room/student
// @desc    Get room info of a student
// @access  Public
router.post('/student', [
    check('cms_id', 'CMS ID is required').not().isEmpty()
], getRoomByStudent);

module.exports = router;
