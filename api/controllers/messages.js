const dataLayer = require('../data-layer');

const createMessage = async (req, res) => {
  const content = req.body.content;
  const channelId = req.body.channelId;
  const message = await dataLayer.createMessage(content, channelId);
  res.status(201).send(message);
};

module.exports = {
  createMessage,
};
