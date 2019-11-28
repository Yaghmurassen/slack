const express = require('express');
const router = express.Router();

const { createMessage } = require('../controllers/messages');

router.post('/', createMessage);

module.exports = router;
