const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  album: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  yearReleased: {
    type: Number,
    required: true
  },
  genre: [{
    type: String,
    enum: ['art rock', 'glam rock']
  }],
  length: {
    type: String
  },
  personnel: {
    songWriter:{ 
      type:String,
      required: true
    },
    producer: String
  },
  firstAlbum: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max:5
  }
});

module.exports = mongoose.model('Album', schema);