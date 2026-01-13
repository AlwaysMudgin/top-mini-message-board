#! /usr/bin/env node
const { Client } = require('pg');

const drop = `DROP TABLE messages;`;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
text VARCHAR ( 255 ),
name VARCHAR ( 255 ),
added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, name)
VALUES
('Bri-', 'Jason'),
('Ji-', 'Brian'),
('Bri-i-', 'Jason');
`;

async function main() {
  console.log('seeding database...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(drop);
  await client.query(SQL);
  await client.end();
  console.log('database seeded');
}

main();
