const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
var searchRouter = require('./routes/search');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/search', searchRouter)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

// Remember to paste here your credentials
var spotifyApi = new SpotifyWebApi({
  clientId: 'b72796df428c4c0c8bdbf6c6721ae730',
  clientSecret: 'add1adee3dd9471693b1ed93788c937e',
  redirectUri: 'http://localhost:3000/callback'
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

app.listen(port, () => {
    console.log('App listening at http://localhost:${port}');
});