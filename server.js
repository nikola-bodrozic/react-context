/*
  "dependencies": {
    "express": "^5.1.0",
    "http": "^0.0.1-security",
    "install": "^0.13.0",
    "nodemon": "^3.1.10",
    "npm": "^11.4.1",
    "socket.io": "^4.8.1"
  }
*/

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

let clientIdCounter = 1;

// Simulate a pin moving south (20 moves max) and decrease zoom
const simulateMovingPin = (socket) => {
  let currentLat = 52.2297; // Starting latitude (Warsaw)
  const startLat = 52.2297;
  const startLng = 21.0122;
  const southSpeed = 0.001; // Movement speed
  let moveCount = 0;
  const maxMoves = 20; // Stop after 20 moves
  let currentZoom = 13; // Initial zoom (will decrease by 0.1 each step)

  const interval = setInterval(() => {
    if (moveCount >= maxMoves) {
      clearInterval(interval);
      socket.send(JSON.stringify({ type: "movement_complete" }));
      return;
    }

    currentLat -= southSpeed;
    currentZoom -= 0.1; // Decrease zoom slightly each step
    moveCount++;

    const positionUpdate = {
      type: "position_update",
      payload: {
        lat: currentLat,
        lng: startLng,
        zoom: currentZoom, // Send zoom level to frontend
      },
    };

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(positionUpdate));
    } else {
      clearInterval(interval);
    }
  }, 1000); // Update every 1 second

  return interval;
};



wss.on("connection", (socket) => {
  const clientId = clientIdCounter++;
  console.log(`Client connected: ${clientId}`);

  // Send welcome message with clientId
  socket.send(JSON.stringify({
    type: "welcome",
    payload: {
      message: "Connected to WebSocket",
      clientId: clientId,
    },
  }));

  const interval = simulateMovingPin(socket);

  socket.on("close", () => {
    console.log(`Client disconnected: ${clientId}`);
    clearInterval(interval);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});