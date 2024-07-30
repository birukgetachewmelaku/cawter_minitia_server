const UDP = require('dgram');

const server = UDP.createSocket('udp4');

const serverAddress = '128.140.100.243'; // Replace with the actual server address
let ip_address = [];
let ports = []

server.on('listening', () => {
  const address = server.address();
  console.log('Server listening on', 'Address:', address.address, 'Port:', address.port);
});

server.on('message', (message, remote) => {
  console.log('Received message from client:', message.toString(), 'from:', remote.address, 'port:', remote.port,"::::::");
  if (!ports.includes(remote.port)) {
      ports[ports.length] = remote.port;
      ip_address[ip_address.length] = remote.address;
  }
  for(let i=0; i<ports.length; i++){
    if(ports[i] >= 55550 && ports[i] <= 55559){
      server.send(message, 0, message.length, ports[i], ip_address[i], (err) => {
        if (err) {
          console.error('Failed to send packet to client!');
        } else {
          console.log('Packet sent to client!',ports[i]);
        }
      });
    }
    
  }
});

setInterval(reset_all_saved_networks, 120000);
function reset_all_saved_networks(){
  ip_address = [];
  ports = [];
  console.log("array reseted");
}
server.bind(2222, serverAddress); // Bind the server to the desired port and server address





















































/* const { debug } = require('console');
const UDP = require('dgram');

const server = UDP.createSocket('udp4');

const clientPort = 8888;
const clientAddress = 'localhost';

const list_of_ip_adress = [];
const time_track = [];



server.on('listening', () => {
  const address = server.address(); 
  console.log('Server listening on', 'Address:', address.address, 'Port:', address.port);
});
server.on('message', (message, remote) => {
  console.log('Received message from client:', message.toString(), 'from:', remote.address, 'port:', remote.port);
  let qq = remote.port;
  const ttt = Math.floor(qq / 10) * 10;
  for(let i=qq; i<ttt+10; i++){
    if(list_of_ip_adress[ttt]){
      console.log("do sending method");
      server.send(packet, 0, packet.length, ttt, list_of_ip_adress[ttt], (err) => {
        if (err) {
          console.error('Failed to send packet to client!');
        } else { 
          console.log('Packet sent to client!');
        }
      });
    }
  }
});

server.bind(2222, 'localhost');
// Send data to the client
const message = 'Hello, client!';
const packet = Buffer.from(message);

function qqq(){
  const ttt = Math.floor(8881 / 10) * 10;
  list_of_ip_adress[2] = "127.0.0.1";
  server.send(packet, 0, packet.length, clientPort, clientAddress, (err) => {
    if (err) {
      console.error('Failed to send packet to client!');
    } else { 
      console.log('Packet sent to client!');
    }
  });
}

//setInterval(qqq, 30);

function greet() {
    for(let i=3000; i<1000000; i++){
        if(time_track[i] > 30){
            return i;
        }
    }
  }
  
  module.exports = greet; */