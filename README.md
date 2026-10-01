# Juice Shop Login Form

A minimal Node.js + Express app that mimics Juice Shop's login page.

## What this does

- Serves a simple HTML login form (email + password fields).
- **Client-side validation** (in `public/app.js`): blocks empty submissions, checks that the email contains `@`, and checks that the password is at least 8 characters before anything is sent to the server.
- **Server-side validation** (in `server.js`): the `/api/login` endpoint independently re-checks the email format and password length, and never trusts the client-side checks alone. It returns a `400` for invalid input and a `401` for valid-but-incorrect credentials.
- **SQLite backend** (in `db.js`): login runs against a database (Node's built-in `node:sqlite`), seeded with a `customer` and an `admin` user.

## How to run

```bash
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## Project structure

```
juice-login-form/
├── server.js          # Express server + validation + vulnerable & safe login routes
├── db.js              # SQLite setup + seeded users (node:sqlite)
├── package.json
├── public/
│   ├── index.html      # Login form markup
│   └── app.js           # Client-side validation + fetch call to /api/login
└── README.md
```