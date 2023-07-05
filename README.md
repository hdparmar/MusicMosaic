# MusicMosaic

MusicMosaic is a music search and discovery platform that utilizes Natural Language Processing (NLP), Spotify, and the lyrics API in a microservices architecture. This project serves as a hands-on learning exercise in JavaScript, React, Node.js, Express, MQTT.

## Features

- User-friendly search: Enter a sentence describing the music you're looking for, and MusicMosaic will provide a list of matching songs from Spotify.
- Filtered search results: The search results are tailored to show only Indie artists based on the subscribers/listeners of the artist. This feature aims to promote the discovery of new Indie artists, expand users' music tastes, and provide increased traction and exposure for Indie artists.
- OAuth2 authentication: Log in with your Spotify account to receive personalized recommendations.
- Microservices architecture: The application is divided into multiple services that communicate over MQTT, showcasing the use of this protocol in a microservices context.

## Current Updates

- Client-side development with React: MusicMosaic now utilizes React for the client-side implementation, enhancing the user interface and providing a more interactive experience.

## To-Do List

- [ ] Implement search query with MQTT. Text as User a request and a service to fetch songs.
- [ ] After, implementing search query, try NLP to better filter the result.
- [ ] Display search results with the filtered list of Indie artists.

Stay tuned for more updates as MusicMosaic evolves!
