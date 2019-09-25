require('dotenv').config();
require('./lib/connect')();

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

app.get('/api/albums/:id', (req, res, next) => {
  Album.findById(req.params.id)
    .then(album => {
      res.json(album);
    })
    .catch(next);
});

app.post('/api/albums', (req, res, next) => {
  Album.create(req.body)
    .then(album => {
      res.json(album);
    })
    .catch(next);
});

app.put('/api/albums/:id', (req, res, next) => {
  Album.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(album => {
      res.json(album);
    })
    .catch(next);
});

app.delete('/api/albums/:id', (req, res, next) => {
  Album.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server is running on port 3000'));