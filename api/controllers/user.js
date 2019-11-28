const dataLayer = require('../data-layer/index');

const createUser = async (req, res) => {
  const userName = req.body.name;
  const newUser = await dataLayer.createUser(userName);
  res.send(201, userName);
};

const deleteUser = async (req, res) => {
  console.log("On viens de delete l'user possédant l'id : ", req.params.id);
  const userId = req.params.id;
  await dataLayer.deleteUser(userId);
  res.send(200, userId);
};

const getUsers = async (req, res) => {
  const userList = await dataLayer.getUsers();
  res.send(201, userList);
};

const getMessagesByUser = async (req, res) => {
  const userId = req.params.id;
  await dataLayer.getMessagesByUser(userId);
  res.send(200, userId);
};

const changeUserName = async (req, res) => {
  const userId = req.params.id;
  const newUserName = req.body.name;
  const user = await dataLayer.changeUserName(newUserName, userId);
  res.status(200).send(user);
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  getMessagesByUser,
  changeUserName,
};
