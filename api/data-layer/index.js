const pg = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const createChannel = async name => {
  try {
    await pool.query(`INSERT INTO channel (name) VALUES ($1)`, [name]);
    const result = await pool.query(`SELECT * FROM channel WHERE name = ($1)`, [
      name,
    ]);
    const channel = result.rows[0];
    return channel;
  } catch (error) {
    console.log('error: ', error);
  }
};
const deleteChannel = async channelId => {
  try {
    await pool.query(`DELETE from channel WHERE id = ($1)`, [channelId]);
  } catch (error) {
    console.log('error: ', error);
  }
};
const getChannels = async () => {
  try {
    const channelList = await pool.query(`SELECT * FROM channel`);
    return channelList.rows;
  } catch (error) {
    console.log('error: ', error);
  }
};
const getMessagesByChannel = async id => {
  try {
    const messageList = await pool.query(
      `SELECT * FROM message WHERE channel_id = $1`,
      [id]
    );
    return messageList.rows;
  } catch (error) {
    console.log('error: ', error);
  }
};

const createMessage = async (content, channelId) => {
  const message = await pool.query(
    `INSERT INTO message (content, channel_id) VALUES ($1, $2) RETURNING *`,
    [content, channelId]
  );
  return message.rows[0];
};

const changeChannelName = async (newChannelName, channelId) => {
  try {
    await pool.query(`UPDATE channel SET name = $1 WHERE id = $2`, [
      newChannelName,
      channelId,
    ]);
    const result = await pool.query(`SELECT * FROM channel where id = $1`, [
      channelId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log('error: ', error);
  }
};

const createUser = async name => {
  try {
    await pool.query(`INSERT INTO appuser (name) VALUES ($1)`, [name]);
  } catch (error) {
    console.log('error: ', error);
  }
};

const deleteUser = async userId => {
  try {
    await pool.query(`DELETE FROM appuser WHERE id = ($1)`, [userId]);
  } catch (error) {
    console.log('error: ', error);
  }
};

const getUsers = async () => {
  try {
    const usersList = await pool.query(`SELECT * from appuser`);
    return usersList.rows;
  } catch (error) {
    console.log('error: ', error);
  }
};

const getMessagesByUser = async userId => {
  try {
    const messageList = await pool.query(
      `SELECT * FROM message WHERE id = $1`,
      [userId]
    );
    console.log(messageList);
  } catch (error) {
    console.log('error: ', error);
  }
};

const changeUserName = async (newUserName, userId) => {
  try {
    await pool.query(`UPDATE user SET name = $1 WHERE id = $2`, [
      newUserName,
      userId,
    ]);
    const result = await pool.query(`SELECT * FROM user where id = $1`, [
      userId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  createChannel,
  deleteChannel,
  getChannels,
  getMessagesByChannel,
  changeChannelName,
  createMessage,
  createUser,
  deleteUser,
  getUsers,
  getMessagesByUser,
  changeUserName,
};
