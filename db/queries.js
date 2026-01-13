const pool = require('./pool');

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT id, text, name, TO_CHAR(added, 'FMMM/FMDD/YY, FMHH:MM AM') AS added FROM messages`
  );
  return rows;
}

async function insertMessage(text, name) {
  await pool.query('INSERT INTO messages (text, name) VALUES ($1, $2)', [
    text,
    name,
  ]);
}

async function getMessageById(id) {
  const { rows } = await pool.query(
    `SELECT id, text, name, TO_CHAR(added, 'FMMM/FMDD/YY, FMHH:MM AM') AS added FROM messages WHERE id = $1`,
    [id]
  );
  return rows;
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessageById,
};
