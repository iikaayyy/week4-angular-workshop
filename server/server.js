// server/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());            // allow Angular :4200 to call :3000
app.use(express.json());    // parse JSON bodies

// ---------- Week 5: simple auth route ----------
class User {
  constructor(username, email, password, birthdate, age) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
    this.age = age;
  }
}

const users = [
  new User('john_doe','john@example.com','password123','1990-05-15',33),
  new User('jane_smith','jane@example.com','securepass','1985-12-22',38),
  new User('bob_wilson','bob@example.com','mypassword','1992-08-03',31)
];

app.post('/api/auth', (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.json({ valid: false });
  const { password: _pw, ...safe } = user; // strip password
  res.json({ ...safe, valid: true });
});

// ---------- Week 6: Socket.IO (chat) ----------
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: { origin: 'http://localhost:4200', methods: ['GET','POST'] }
});

// wire socket event handlers and start server
require('./sockets')(io);
require('./listen')(http);
