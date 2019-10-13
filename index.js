let fs = require('fs');
let configuration = JSON.parse(fs.readFileSync('./configuration.json').toString());

let http = require('http');
let express = require('express');

let app = express();
let server = http.createServer(app);

let io = require('socket.io')(server);
let mqtt = require('mqtt');

let client = mqtt.connect('mqtt://' + configuration.host, configuration.authentication);

var metadata = {};

app.use('/', express.static(__dirname + '/static'));

client.on('connect', () => {
    console.log('[MQTT] Connection established');

    client.subscribe(configuration.topic + '/title');
    client.subscribe(configuration.topic + '/album');
    client.subscribe(configuration.topic + '/artist');
    client.subscribe(configuration.topic + '/cover');
    client.subscribe(configuration.topic + '/play_end');
});

client.on('message', (topic, message) => {
    let subtopic = topic.split('/')[2];
    console.log(`[MQTT] New message on topic ${subtopic}: ${subtopic == 'cover' ? 'Binary image data' : message}`);

    switch (subtopic) {
        case 'title':
            metadata.title = message.toString();
            break;
        case 'album':
            metadata.album = message.toString();
            break;
        case 'artist':
            metadata.artist = message.toString();
            break;
        case 'cover':
            metadata.cover = message.toString('base64');
            break;
        case 'play_end':
            metadata = {};
            break;
    }

    io.sockets.emit('metadata', metadata)
});

io.on('connection', (socket) => {
    console.log('[Socket] Connection established');
    socket.emit('metadata', metadata)

    socket.on('disconnect', () => {
        console.log('[Socket] Connection closed');
    })
});
  

server.listen(3000, () => {
    console.log('[HTTP] Started listening on port 3000');
});