const dgram = require('dgram');

const serverAddress = '127.0.0.1';
const servers = new Map(); // Store created servers

let timer = 0;
// This will hold the Group map for access from other scripts
const Groups = new Map();

function createServer(port) {
  if (servers.has(port)) {
    console.log(`Server on port ${port} already exists.`);
    return;
  }

  const server = dgram.createSocket('udp4');
  const Group = new Map(); // Local Group for this server

  // Store the Group map in the Groups map
  Groups.set(port, Group);

  server.on('error', (err) => {
    console.log(`Server error (port ${port}):\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    for (const [client, { address: endpointAddress, port: endpointPort }] of Group) {
      server.send(msg, 0, msg.length, endpointPort, endpointAddress, (err) => {
        if (err) {
          console.error(`Failed to send packet to client ${client}:`, err);
        } else {
          console.log(`Packet sent to client ${client}`);
        }
      });
    }
    Group.set(rinfo.address + ':' + rinfo.port, { address: rinfo.address, port: rinfo.port, time: timer });
    console.log(`${Group.size} clients connected on port ${port}`);
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`Server (port ${port}) listening at ${serverAddress}:${address.port}`);
  });

  server.bind(port, serverAddress);
  servers.set(port, server); // Store the server in the map
}

// Close server function
function closeServer(port) {
  if (servers.has(port)) {
    const server = servers.get(port);
    server.close(() => {
      console.log(`Server on port ${port} closed.`);
      servers.delete(port);
      Groups.delete(port); // Remove the associated group
    });
  } else {
    console.log(`No server found on port ${port}.`);
  }
}

// Export the createServer and closeServer functions and Groups map
module.exports = { createServer, closeServer, Groups };

// Example of calling the function to create servers
createServer(41627); // Create server on port 41627
createServer(41235); // Create server on port 41235
console.log('Ready to create servers on demand.');

// Example of making a POST request every second
setInterval(() => {
  timer++;
}, 10); // 100 ms = 0.1 second

// Example of closing a server
setTimeout(() => {
  closeServer(41627); // Close server on port 41627 after 10 seconds
}, 10000);