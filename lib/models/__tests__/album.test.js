const Album = require('../album');
const mongoose = require('mongoose');

describe('Music model', () => {
  it('valid model all props', () => {
    const data = {
      album: 'For Your Pleasure',
      artist: 'Roxy Music',
      yearReleased: 1973,
      genre: ['art rock', 'glam rock'],
      length: '42:16', 
      personnel: {
        songWriter: 'Bryan Ferry',
        producer: 'Chris Thomas',
      },
      firstAlbum: false
    };

    const album = new Album(data);
    const err = album.validateSync();
    expect(err).toBeUndefined();

    const json = album.toJSON();
    expect(json).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  it('validates require props', () => {
    const data = {};
    const album = new Album(data);
    const { errors } = album.validateSync();
    expect(errors.album.kind).toBe('required');
    expect(errors.artist.kind).toBe('required');
    expect(errors.yearReleased.kind).toBe('required');
    // expect(errors['personnel.songWriter'].kind).toBe('required');
  });
});