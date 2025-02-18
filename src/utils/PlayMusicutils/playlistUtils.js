// playlistUtils.js
import SQLite from 'react-native-sqlite-storage';

// Inisialisasi database
const db = SQLite.openDatabase(
  {
    name: 'PlaylistDB',
    location: 'default',
  },
  () => {
    console.log('Database connected successfully');
  },
  error => {
    console.log('Error connecting to database: ', error);
  },
);

// Fungsi untuk menambahkan playlist baru
export const addPlaylist = (name, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO playlists (name) VALUES (?);',
      [name],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Playlist added successfully');
          callback && callback(true);
        } else {
          console.log('Failed to add playlist');
          callback && callback(false);
        }
      },
      error => {
        console.log('Error adding playlist: ', error);
        callback && callback(false);
      },
    );
  });
};

// Fungsi untuk menambahkan lagu ke playlist
export const addSongToPlaylist = (playlistId, songPath, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO playlist_songs (playlist_id, song_path) VALUES (?, ?);',
      [playlistId, songPath],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Song added to playlist successfully');
          callback && callback(true);
        } else {
          console.log('Failed to add song to playlist');
          callback && callback(false);
        }
      },
      error => {
        console.log('Error adding song to playlist: ', error);
        callback && callback(false);
      },
    );
  });
};

// Fungsi untuk mengambil semua playlist
export const getPlaylists = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM playlists;',
      [],
      (tx, results) => {
        let playlists = [];
        for (let i = 0; i < results.rows.length; i++) {
          playlists.push(results.rows.item(i));
        }
        console.log('Playlists retrieved successfully');
        callback && callback(playlists);
      },
      error => {
        console.log('Error retrieving playlists: ', error);
        callback && callback([]);
      },
    );
  });
};

// Fungsi untuk mengambil lagu di dalam playlist
export const getSongsInPlaylist = (playlistId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM playlist_songs WHERE playlist_id = ?;',
      [playlistId],
      (tx, results) => {
        let songs = [];
        for (let i = 0; i < results.rows.length; i++) {
          songs.push(results.rows.item(i));
        }
        console.log('Songs in playlist retrieved successfully');
        callback && callback(songs);
      },
      error => {
        console.log('Error retrieving songs in playlist: ', error);
        callback && callback([]);
      },
    );
  });
};

// Fungsi untuk menghapus playlist
export const deletePlaylist = (playlistId, callback) => {
  db.transaction(tx => {
    // Hapus lagu terkait di playlist_songs terlebih dahulu
    tx.executeSql(
      'DELETE FROM playlist_songs WHERE playlist_id = ?;',
      [playlistId],
      (tx, results) => {
        console.log('Related songs deleted successfully');
      },
      error => {
        console.log('Error deleting related songs: ', error);
      },
    );

    // Hapus playlist dari tabel playlists
    tx.executeSql(
      'DELETE FROM playlists WHERE id = ?;',
      [playlistId],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Playlist deleted successfully');
          callback && callback(true);
        } else {
          console.log('Failed to delete playlist');
          callback && callback(false);
        }
      },
      error => {
        console.log('Error deleting playlist: ', error);
        callback && callback(false);
      },
    );
  });
};
