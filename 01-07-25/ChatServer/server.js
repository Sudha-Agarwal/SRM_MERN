const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the public directory
app.use(express.static('public'));

// Listen for new connections
io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log(`${msg.user}: ${msg.text}`);

    // Broadcast the message to all connected clients
    if (msg.text.toLowerCase() === "hi") {
      io.emit('chat message', { user: "Server", text: "How are you?" });
    } else {
      io.emit('chat message', msg);
    }
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
// Start the server
http.listen(PORT, () => {
  console.log('listening on *:3000');
});
