const express = require('express');
const router = express.Router();

const {
  createUser,
  deleteUser,
  getUsers,
  getMessagesByUser,
  changeUserName,
} = require('../controllers/user');

router.post('/', changeUserName);
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id/message', getMessagesByUser);
router.delete('/:id', deleteUser);

module.exports = router;
