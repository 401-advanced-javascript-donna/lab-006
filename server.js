require('dotenv').config();
require('./lib/connect');
const express = require('express');
const app = express();
const Album = require('./lib/models/album');

app.use(express.json());

app.get('/api/albums', (req, res, next) => {
  Album.find()
    .then(albums => {
      res.json(albums);
    }) 
    .catch(next);
});