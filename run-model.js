require('dotenv').config();
const connect = require('./lib/connect');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

connect();

const Album = require('./lib/models/album');

Album.create({
  album: 'For Your Pleasure',
  artist: 'Roxy Music',
  yearReleased: 1973,
  genre: ['art rock', 'glam rock'],
  length: '42:16', 
  personnel: {
    songWriter: 'Bryan Ferry',
    producer: 'Chris Thomas',
  },
  firstAlbum: false,
  rating: 5
})
  .then(albums => {
    console.log(albums);
  });