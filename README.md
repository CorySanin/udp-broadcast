# udp-broadcast

[![Travis build](https://img.shields.io/travis/CorySanin/udp-broadcast)](https://travis-ci.org/CorySanin/udp-broadcast) 
[![David](https://img.shields.io/david/dev/CorySanin/udp-broadcast)](https://david-dm.org/CorySanin/udp-broadcast?type=dev)
[![License](https://img.shields.io/github/license/CorySanin/udp-broadcast)](https://github.com/CorySanin/udp-broadcast/blob/master/LICENSE)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/CorySanin/udp-broadcast)](https://github.com/CorySanin/udp-broadcast/blob/master/package.json)

A simple Node module for broadcasting UDP messages to a list of subscribers!

I couldn't find anything that did what I wanted so I made my own.

```
const UdpBroadcast = require('udp-broadcast');

let udpbroadcast = new UdpBroadcast({
    port: 2278,
    host: '0.0.0.0',
    timeout: 15000
});

udpbroadcast.addEventListener('message', (message) => {console.log(message)});

udpbroadcast.send('Hello, everyone.');

udpbroadcast.send({timestamp: new Date().getTime(), message: 'Greetings.'});
```

TODO: instructions for clients
