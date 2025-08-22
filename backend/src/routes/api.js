const express = require('express');
const router = express.Router();
const { someControllerFunction } = require('../controllers/index');

// Define your API routes here
router.get('/some-endpoint', someControllerFunction);

module.exports = router;