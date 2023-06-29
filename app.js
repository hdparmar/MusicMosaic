const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5001;

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Remember to paste here your credentials
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

// The /login route redirects the user to the Spotify Accounts service for them to log in
app.get('/login', (req, res) => {
  var scopes = ['user-read-private', 'user-read-email'];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// The /callback route is where the user is redirected after they log in
app.get('/callback', (req, res) => {
  // The authorization code is provided as a URL parameter
  var code = req.query.code;

  // Use the authorization code to get an access token
  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);

      res.redirect('/');
    })
    .catch(err => {
      console.log('Something went wrong!', err);
    });
});

/*
// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
*/

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
