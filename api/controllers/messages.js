const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const createMessage = async (req, res) => {
  const content = req.body.content;
  const channelId = req.body.channelId;
  const message = await dataLayer.createMessage(content, channelId);
  webSocket.notifyClientOfNewMessage(req.socket, content);
  res.status(201).send(message);
};

module.exports = {
  createMessage,
};
