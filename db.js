const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');

db.exec(`
  CREATE TABLE users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    email    TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role     TEXT NOT NULL DEFAULT 'customer'
  );
`);

const insert = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)');
insert.run('user@example.com', 'password123', 'customer');
insert.run('admin@juice-sh.op', 'S3cureAdminPass!', 'admin');

module.exports = db;
