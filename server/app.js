require('dotenv').config();

const express = require('express');
const request = require('request'); // We'll use this to make HTTP requests
const cors = require('cors');
const querystring = require('querystring');

const app = express();

// Add middleware
app.use(cors());

let redirect_uri = process.env.REDIRECT_URI;

app.get('/login', function(req, res) {
  // your application requests authorization
  let scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: redirect_uri
    }));
});

app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    if (error) {
        console.error('Error requesting tokens: ', error);
        return;
    }
    if (response.statusCode === 200) {
      let access_token = body.access_token,
          refresh_token = body.refresh_token;

      console.log('Access token:', access_token); // log the access token
      console.log('Refresh token:', refresh_token); // log the refresh token

      // we can also pass the token to the browser to make requests from there
      res.redirect('http://localhost:3000/search#' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
    } else {
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
});

app.listen(5001, function () {
  console.log('Listening on port 5001');
});
