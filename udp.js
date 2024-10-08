const dgram = require('dgram');
const serverAddress = '209.38.32.43';
const servers = new Map(); // Store created servers

const Groups = new Map(); // This will hold the Group map for access from other scripts

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

// Function to clear the Group map for all servers
function clearGroups() {
  for (const [port, group] of Groups) {
    group.clear(); // Clear the Group for this port
    console.log(`Cleared Group for server on port ${port}`);
  }
}

// Set an interval to clear the Group map every 4 minutes (240,000 milliseconds)
setInterval(clearGroups, 240000); // 240000 ms = 4 minutes

// Export the createServer and clearGroups functions and Groups map
module.exports = { createServer, Groups };

// Example of calling the function to create servers
createServer(41627); // Create server on port 41627
createServer(41235); // Create server on port 41235
console.log('Ready to create servers on demand.');