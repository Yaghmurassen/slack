const dataLayer = require("../data-layer/index");
const webSocket = require("../webSocket");

const createChannel = async (req, res) => {
  const channelName = req.body.name;
  const newChannel = await dataLayer.createChannel(channelName);
  webSocket.notifyClienOfNewChannel(req.socket, channelName);
  res.send(201, newChannel); // grégoire envoi channelName ici ?
};

const deleteChannel = async (req, res) => {
  const channelId = req.params.id;
  await dataLayer.deleteChannel(channelId);
  res.send(200, channelId);
};

const getChannels = async (req, res) => {
  const channelList = await dataLayer.getChannels();
  res.send(200, channelList);
};

const getMessagesByChannel = async (req, res) => {
  const id = req.params.id;
  const messageList = await dataLayer.getMessageByChannel(id);
  res.send(200, messageList);
};

const changeChannelName = async (req, res) => {
  const channelId = req.params.id;
  const newChannelName = req.body.name;
  const channel = await dataLayer.changeChannelName(newChannelName, channelId);
  res.status(200).send(channel);
};

module.exports = {
  createChannel,
  deleteChannel,
  getChannels,
  getMessagesByChannel,
  changeChannelName
};
