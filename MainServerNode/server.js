const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');
const path = require('path');

const staticPath = process.env.STATIC_PATH || 'MainReactAppMath/build';
const indexPath = path.join(staticPath, 'index.html');

app.use(express.static(staticPath));

const wss = new WebSocket.Server({ server: http });
console.log("WebSocket server started on port 8080");

let clientA = null;
let clientB = null;

wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.on('message', (message) => {
    const messageString = message.toString();

    console.log('Received input from CLIENT in Latex Format:', messageString);

    if (ws === clientA) {
      if (clientB) {
        clientB.send(message);
      }
    } else if (ws === clientB) {
      if (clientA) {
        clientA.send(message);
      }
    }
  });

  ws.on('close', () => {
    console.log('A client disconnected');

    if (ws === clientA) {
      clientA = null;
    } else if (ws === clientB) {
      clientB = null;
    }
  });

  if (!clientA) {
    clientA = ws;
  } else if (!clientB) {
    clientB = ws;
  }
});

// Example usage: sending a message to the Unity client when requested
let messageCounter = 0;

setInterval(() => {
  if (clientA && clientB) {
    const message = { data: `Hello from abcA! Message ${messageCounter}` };
    sendMessageToUnityClient(message);
    messageCounter++;
  }
}, 5000);

// Function to send a message to the Unity client (abcB)
function sendMessageToUnityClient(message) {
  if (clientB) {
    clientB.send(JSON.stringify(message));
  } else {
    console.log('No Unity client connected.');
  }
}

// API routes
app.get('/api/messages', (req, res) => {
  res.json({ message: 'API route: Get messages' });
});

app.post('/api/messages', (req, res) => {
  const { body } = req;
  console.log('Received POST request:', body);
  res.json({ message: 'API route: Post messages' });
});

// Catch-all route handler
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
