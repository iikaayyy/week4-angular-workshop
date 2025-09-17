const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());            // allow :4200 to call :3000
app.use(express.json());

const http = require('http').Server(app);

// Socket.IO v4 + explicit CORS (required since v3)
const io = require('socket.io')(http, {
  cors: { origin: 'http://localhost:4200', methods: ['GET','POST'] }
});

require('./sockets')(io);   // socket handlers
require('./listen')(http);  // start server
