const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Hardcoded users (password is only checked on the server)
const users = [
  { username: "John", birthdate: "2000-01-01", age: 25, email: "user1@test.com", password: "12345", valid: true },
  { username: "Jane", birthdate: "1998-05-05", age: 27, email: "user2@test.com", password: "abcde", valid: true },
  { username: "Mark", birthdate: "1995-12-12", age: 30, email: "user3@test.com", password: "password", valid: true }
];

app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.json({ valid: false });
  const { password: _pw, ...safe } = user;   // remove password
  res.json({ ...safe, valid: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
