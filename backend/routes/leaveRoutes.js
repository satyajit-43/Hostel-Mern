const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerLeave, getbyhostel, getbystudent, resolve } = require('../controllers/leaveController');

// @route   Register api/compalint/register
// @desc    Register complaint
// @access  Public
router.post('/register', [
    check('student', 'Student is required').not().isEmpty(),
    check('hostel', 'Hostel is required').not().isEmpty(),
    check('purpose', 'Purpose is required').not().isEmpty(),
    check('leaving_date', 'Leaving Date is required').not().isEmpty(),
    check('return_date', 'Return Date is required').not().isEmpty()
], registerLeave);

// @route   GET api/complaint/hostel
// @desc    Get all complaints by hostel id
// @access  Public
router.post('/hostel/', [
    check('hostel', 'Hostel is required').not().isEmpty()
], getbyhostel);

// @route   GET api/complaint/student
// @desc    Get all complaints by student id
// @access  Public
router.post('/student', [
    check('student', 'Student is required').not().isEmpty()
], getbystudent);

// @route   GET api/complaint/resolve
// @desc    Get complaint by complaint id
// @access  Public
router.post('/resolve', [
    check('id', 'Complaint id is required').not().isEmpty()
], resolve);


module.exports = router;