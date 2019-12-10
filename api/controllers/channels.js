const dataLayer = require("../data-layer");
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
  const filteredList = messagesList.map(message => {
    return {
      id: message.id,
      content: message.content,
      created_at: message.created_at,
      updated_at: message.updated_at,
      username: message.username,
    };
  });
  res.send(200, filteredList);
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
