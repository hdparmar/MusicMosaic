const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
  console.log('MQTT publisher connected');
});

module.exports = client;
