const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config()
const axios = require('axios').default;
const querystring = require('querystring');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(cookieParser());

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.get('/login', (req, res) => {
  const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
          grant_type: 'client_credentials'
      },
      headers: {
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
  };

  axios(authOptions)
      .then(response => {
          if (response.status === 200) {
              const token = response.data.access_token;
              // Use the token
              // For example, you can send it back to the client
              res.set("Access-Control-Allow-Origin", "http://localhost:3000"); // add the CORS header
              res.send(token); // send the token as a string
          }
      })
      .catch(error => {
          console.error(`Failed to get token: ${error}`);
          res.status(500).send('Failed to get token');
      });
});


app.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    axios.post(authOptions.url, authOptions.form, {headers: authOptions.headers})
        .then(response => {
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            res.redirect('/#' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
        })
        .catch(error => {
            console.error(`Failed to get token: ${error}`);
            res.redirect('/#' +
                querystring.stringify({
                    error: 'invalid_token'
                }));
        });
});

app.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    axios.post(authOptions.url, authOptions.form, {headers: authOptions.headers})
        .then(response => {
            const access_token = response.data.access_token;
            res.send({
                'access_token': access_token
            });
        })
        .catch(error => {
            console.error(`Failed to refresh token: ${error}`);
        });
});

app.get('/search', (req, res) => {
    const query = req.query.query;
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

    axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            res.json(response.data.tracks.items);
        })
        .catch(error => {
            console.error(`Search request failed: ${error}`);
            res.status(500).send('Search request failed');
        });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
