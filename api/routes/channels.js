const express = require('express');
const router = express.Router();

const {
  createChannel,
  deleteChannel,
  getChannels,
  getMessagesByChannel,
  changeChannelName,
} = require('../controllers/channels');

router.post('/', createChannel);
router.get('/', getChannels);
router.patch('/:id', changeChannelName);
router.get('/:id/message', getMessagesByChannel);
router.delete('/:id', deleteChannel);

module.exports = router;
