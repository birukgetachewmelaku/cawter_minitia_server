const dgram = require('dgram');

const numServers = 10;
const startPort = 41234;
const serverAddress = '209.38.32.43';

const servers = [];

// Function to create a UDP server
const createServer = (port) => {
  const server = dgram.createSocket('udp4');
  const clients = new Map(); // Local map for tracking clients for this server

  server.on('error', (err) => {
    console.log(`Server error (port ${port}):\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    const currentTime = Math.floor(Date.now() / 1000); // Get current Unix time

    // Add/update client info with current Unix time
    clients.set(rinfo.address + ':' + rinfo.port, {
        address: rinfo.address,
        port: rinfo.port,
        lastActive: currentTime // Store last active time
    });

    // Broadcast the message to all clients connected to this server
    clients.forEach((clientData, clientKey) => {
        // Send the message to each client in the local clients map
        server.send(msg, 0, msg.length, clientData.port, clientData.address, (err) => {
            if (err) {
                console.error(`Failed to send packet to client ${clientKey}:`, err);
            } else {
                console.log(`Packet sent to client ${clientKey}`);
            }
        });
    });

    console.log(clients.size, "clients connected to port", port);
});

  server.on('listening', () => {
    const address = server.address();
    console.log(`Server (port ${port}) listening at ${serverAddress}:${address.port}`);
  });

  server.bind(port, serverAddress);
  return { server, clients };
};

// Create all UDP servers
for (let i = 0; i < numServers; i++) {
  const port = startPort + i;
  const { server, clients } = createServer(port);
  servers.push({ server, clients });
}

// Function to check and remove inactive clients
const checkInactiveClients = () => {
  const currentTime = Math.floor(Date.now() / 1000); // Get current Unix time
  servers.forEach(({ clients }) => {
    clients.forEach((clientData, clientKey) => {
      // Check if the client has been inactive for more than 5 seconds
      if (currentTime - clientData.lastActive > 5) {
        console.log(`Removing inactive client: ${clientKey}`);
        clients.delete(clientKey); // Remove inactive client
      }
    });
  });
};

// Set up a single interval to check inactive clients
setInterval(checkInactiveClients, 5000); // Check every 5 seconds

console.log('All servers started.');


























// const dgram = require('dgram');
// const serverAddress = '127.0.0.1';
// const servers = new Map(); // Store created servers

// const Groups = new Map(); // This will hold the Group map for access from other scripts

// function createServer(port) {
//   if (servers.has(port)) {
//     console.log(`Server on port ${port} already exists.`);
//     return;
//   }

//   const server = dgram.createSocket('udp4');
//   const Group = new Map(); // Local Group for this server

//   // Store the Group map in the Groups map
//   Groups.set(port, Group);

//   server.on('error', (err) => {
//     console.log(`Server error (port ${port}):\n${err.stack}`);
//     server.close();
//   });

//   server.on('message', (msg, rinfo) => {
//     for (const [client, { address: endpointAddress, port: endpointPort }] of Group) {
//       server.send(msg, 0, msg.length, endpointPort, endpointAddress, (err) => {
//         if (err) {
//           console.error(`Failed to send packet to client ${client}:`, err);
//         } else {
//           console.log(`Packet sent to client ${client}`);
//         }
//       });
//     }
//     Group.set(rinfo.address + ':' + rinfo.port, { address: rinfo.address, port: rinfo.port, time: timer });
//     console.log(`${Group.size} clients connected on port ${port}`);
//   });

//   server.on('listening', () => {
//     const address = server.address();
//     console.log(`Server (port ${port}) listening at ${serverAddress}:${address.port}`);
//   });

//   server.bind(port, serverAddress);
//   servers.set(port, server); // Store the server in the map
// }

// // Function to clear the Group map for all servers
// function clearGroups() {
//   for (const [port, group] of Groups) {
//     group.clear(); // Clear the Group for this port
//     console.log(`Cleared Group for server on port ${port}`);
//   }
// }

// // Set an interval to clear the Group map every 4 minutes (240,000 milliseconds)
// setInterval(clearGroups, 240000); // 240000 ms = 4 minutes

// // Export the createServer and clearGroups functions and Groups map
// module.exports = { createServer, Groups };

// // Example of calling the function to create servers
// createServer(41627); // Create server on port 41627
// createServer(41235); // Create server on port 41235
// console.log('Ready to create servers on demand.');