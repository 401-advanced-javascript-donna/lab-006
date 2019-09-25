const request = require('../request');
const db = require('../db');

describe('albums api', () => {
  beforeEach(() => {
    return db.dropCollection('albums');
  });
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
    firstAlbum: false,
    rating: 5
  };

  function postAlbum(album) {
    return request
      .post('/api/albums')
      .send(album)
      .expect(200)
      .then(({ body }) => body);
  }
  it('post an album', () => {
    return postAlbum(data)
      .then(album => {
        expect(album).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...data
        });
      });
  });

  it('gets an album by id', () => {
    return postAlbum(data)
      .then(album => {
        return request.get(`/api/albums/${album._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(album);
          });
      });
  });

  it('gets a list of albums', () => {
    return Promise.all([
      postAlbum({ 
        album: 'Heroes', 
        artist: 'David Bowie', 
        yearReleased: 1977, 
        personnel: {
          songWriter: 'David Bowie',
          producer: 'Brian Eno',
        } }),
      postAlbum({ 
        album: 'Low', 
        artist: 'David Bowie', 
        yearReleased: 1977, 
        personnel: {
          songWriter: 'David Bowie',
          producer: 'Brian Eno',
        } }),
      postAlbum({ 
        album: 'Hunky Dory', 
        artist: 'David Bowie', 
        yearReleased: 1971, 
        personnel: {
          songWriter: 'David Bowie',
          producer: 'Mick Ronson',
        } })
    ])
      .then(() => {
        return request
          .get('/api/albums')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });
  it('updates an album', () => {
    return postAlbum(data)
      .then(album => {
        album.artist = 'Bowie';
        return request
          .put(`/api/albums/${album._id}`)
          .send(album)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.artist).toBe('Bowie');
      });
  });
  it('deletes an album', () => {
    return postAlbum(data)
      .then(album => {
        return request
          .delete(`/api/albums/${album._id}`)
          .expect(200);
      });
  });
});