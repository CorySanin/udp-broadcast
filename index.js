const dgram = require('dgram');
const TIMEOUT = 15000;

class UdpBroadcast {
  constructor(options = {}) {
    let port = 3616;
    let host = '127.0.0.1';
    let server = dgram.createSocket('udp4');
    let i = 0;
    let intervalId = null;
    this.connections = {};
    this.timeout = TIMEOUT;

    if ('port' in options) {
      port = options['port'];
    }
    if ('host' in options) {
      host = options['host'];
    }
    if ('timeout' in options) {
      this.timeout = options['timeout'];
    }

    server.on('listening', () => {
      var address = server.address();
      console.log('UDP Server listening on ' + address.address + ':' + address.port);
      intervalId = setInterval(this.removeInactive, Math.min(TIMEOUT, this.timeout));
    });

    server.on('message', (message, remote) => {
      let m = JSON.parse(message);
      if (m['id'] == -1) {
        server.send({ id: i++ }, remote.port, remote.address);
      }
      else {
        remote.timestamp = new Date().getTime();
        this.connections[m['id']] = remote;
        if ('message' in m && m.message !== null && m.message !== '') {
          let event = new CustomEvent('message', m.message);
        }
      }
    });

    this.send = (message) => {
      let str = message;
      if(typeof(str) !== 'string'){
        str = JSON.stringify(str);
      }
      for (let id in this.connections) {
        server.send(str, this.connections[id].port, this.connections[id].address);
      }
    }

    this.close = () => {
      clearInterval(intervalId);
      this.connections = {};
      server.close();
    }

    this.open = () => {
      server.bind(port, host);
    }
  }

  open() {
  }

  send(message) {
  }

  close() {
  }

  removeInactive() {
    let time = new Date().getTime();
    for (let id in this.connections) {
      if (time - this.connections[id].timestamp > this.timeout) {
        delete this.connections[id];
      }
    }
  }
}


module.exports = exports = UdpBroadcast;