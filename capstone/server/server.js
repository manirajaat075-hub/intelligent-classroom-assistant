// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection (Placeholder)
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/classroom_assistant');

// WebSocket Logic for Real-time Attendance
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('mark_attendance', (data) => {
    io.emit('attendance_update', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Intelligent Classroom Assistant API is running.');
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
