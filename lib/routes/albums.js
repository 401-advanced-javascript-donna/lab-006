// eslint-disable-next-line new-cap
const router = require('express').Router();
const Album = require('../models/album');

router
  .post('/', (req, res, next) => {
    Album.create(req.body)
      .then(album => res.json(album))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Album.findById(req.params.id)
      .then(album => res.json(album))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Album.find()
      .then(albums => res.json(albums))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(album => res.json(album))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Album.findByIdAndRemove(req.params.id)
      .then(album => res.json(album))
      .catch(next);
  });


module.exports = router;
