# udp-broadcast
A simple Node module for broadcasting UDP messages to a list of subscribers!

I couldn't find anything that did what I wanted so I made my own.

```
const UdpBroadcast = require('udp-broadcast');

let udpbroadcast = new UdpBroadcast({
    port: 3616,
    host: '0.0.0.0',
    timeout: 15000
});

udpbroadcast.addEventListener('message', (message) => {console.log(message)});

udpbroadcast.send('Hello, everyone.');

udpbroadcast.send({timestamp: new Date().getTime(), message: 'Greetings.'});
```

TODO: instructions for clients