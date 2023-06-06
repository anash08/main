const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
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
        clientB.send(messageString);
      }
    } else if (ws === clientB) {
      if (clientA) {
        clientA.send(messageString);
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
