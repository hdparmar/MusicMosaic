const mqtt = require('mqtt');
const request = require('request'); // or any HTTP request library
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
  console.log('search_service connected to MQTT broker');
  
  // Subscribe to the topic
  client.subscribe('spotify/search', function (err) {
    if (!err) {
      console.log('search_service subscribed to spotify/search');
    }
  });
});

client.on('message', function (topic, message) {
  // message is a Buffer, convert to string
  const { searchQuery, accessToken } = JSON.parse(message.toString());
  
  // Make the request to the Spotify API
  const options = {
    url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      
      // Publish the results to the topic
      client.publish('spotify/search/results', JSON.stringify(info));
    }
  });
});
