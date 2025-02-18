import { db } from './setupDatabasePlaylist';

export async function addSongToPlaylist(playlistName, songData) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            // Mencari playlist berdasarkan nama
            tx.executeSql(
                `SELECT id FROM playlists WHERE name = ?`,
                [playlistName],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const playlistId = results.rows.item(0).id;

                        // Memeriksa apakah lagu sudah ada di playlist
                        tx.executeSql(
                            `SELECT * FROM playlist_songs WHERE playlist_id = ?`,
                            [playlistId],
                            (tx, results) => {
                                console.log("result : ", results);
                                
                                if (results) {
                                    // Menambahkan lagu ke playlist
                                    tx.executeSql(
                                        `INSERT INTO playlist_songs (playlist_id, Title, Artist, Path) VALUES (?, ?, ?, ?)`,
                                        [playlistId, songData.Title, songData.Artist, songData.Path],
                                        () => {
                                            console.log('Song added to playlist successfully');
                                            resolve(true); // Sukses
                                        },
                                        (tx, error) => {
                                            console.error('Error adding song to playlist: ', error);
                                            reject(error); // Gagal
                                        }
                                    );
                                } else {
                                    console.log('Song already in playlist');
                                    resolve(false); // Lagu sudah ada
                                }
                            }
                        );
                    } else {
                        console.log('Playlist not found');
                        resolve(false); // Playlist tidak ditemukan
                    }
                }
            );
        });
    });
}

export async function removeSongFromPlaylist(playlistName, songData) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            // Mencari playlist berdasarkan nama
            tx.executeSql(
                `SELECT id FROM playlists WHERE name = ?`,
                [playlistName],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const playlistId = results.rows.item(0).id;

                        // Memeriksa apakah lagu ada di playlist
                        tx.executeSql(
                            `SELECT * FROM playlist_songs WHERE playlist_id = ? AND Path = ?`,
                            [playlistId, songData.Path],
                            (tx, results) => {
                                if (results.rows.length > 0) {
                                    // Menghapus lagu dari playlist
                                    tx.executeSql(
                                        `DELETE FROM playlist_songs WHERE playlist_id = ? AND Path = ?`,
                                        [playlistId, songData.Path],
                                        () => {
                                            console.log('Song removed from playlist successfully');
                                            resolve(true); // Sukses
                                        },
                                        (tx, error) => {
                                            console.error('Error removing song from playlist: ', error);
                                            reject(error); // Gagal
                                        }
                                    );
                                } else {
                                    console.log('Song not found in playlist');
                                    resolve(false); // Lagu tidak ditemukan
                                }
                            }
                        );
                    } else {
                        console.log('Playlist not found');
                        resolve(false); // Playlist tidak ditemukan
                    }
                }
            );
        });
    });
}

export async function getAllPlaylists() {
    try {
        const playlists = [];

        // Membaca semua playlist
        const playlistsPromise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM playlists`,
                    [],
                    (tx, results) => {
                        for (let i = 0; i < results.rows.length; i++) {
                            const playlist = results.rows.item(i);
                            playlists.push({
                                ...playlist,
                                songs: [] // Inisialisasi dengan array kosong
                            });
                        }
                        resolve(); // Resolving after processing playlists
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            });
        });

        await playlistsPromise;

        // Mengambil semua lagu untuk setiap playlist
        await Promise.all(playlists.map(playlist => {
            return new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `SELECT fs.* FROM playlist_songs ps
                         JOIN favorite_songs fs ON ps.song_id = fs.id
                         WHERE ps.playlist_id = ?`,
                        [playlist.id],
                        (tx, results) => {
                            for (let j = 0; j < results.rows.length; j++) {
                                playlist.songs.push(results.rows.item(j));
                            }
                            resolve(); // Resolving after processing songs for the playlist
                        },
                        (tx, error) => {
                            reject(error);
                        }
                    );
                });
            });
        }));

        console.log('All Playlists:', playlists);
        return playlists;
    } catch (error) {
        console.log('Error reading playlists:', error);
        return []; // Mengembalikan array kosong jika ada error
    }
}

export async function addNewPlaylist(playlistName) {
    try {
        db.transaction(tx => {
            // Mengecek apakah playlist dengan nama yang sama sudah ada
            tx.executeSql(
                `SELECT * FROM playlists WHERE name = ?`,
                [playlistName],
                (tx, results) => {
                    if (results.rows.length === 0) {
                        // Menambahkan playlist baru
                        tx.executeSql(
                            `INSERT INTO playlists (name, artwork) VALUES (?, '')`,
                            [playlistName],
                            () => {
                                console.log(`Playlist '${playlistName}' created successfully`);
                            }
                        );
                    } else {
                        console.log('Playlist with this name already exists');
                    }
                }
            );
        });
    } catch (error) {
        console.log('Error creating new playlist:', error);
    }
}

export const getPlaylistData = async () => {
    try {
        const playlists = [];
        await new Promise((resolve, reject) => {
            db.transaction(tx => {
                // Ambil semua playlist
                tx.executeSql(
                    `SELECT * FROM playlists`,
                    [],
                    (tx, results) => {
                        const playlistRows = results.rows.raw();
                        // Untuk setiap playlist, ambil jumlah lagu
                        Promise.all(playlistRows.map(async (playlist) => {
                            return new Promise((resolve, reject) => {
                                tx.executeSql(
                                    `SELECT COUNT(*) AS songCount FROM playlist_songs WHERE playlist_id = ?`,
                                    [playlist.id],
                                    (tx, results) => {
                                        const songCount = results.rows.item(0).songCount;
                                        resolve({
                                            name: playlist.name,
                                            artwork: playlist.artwork,
                                            songLength: songCount,
                                        });
                                    },
                                    (error) => reject(error)
                                );
                            });
                        }))
                        .then((formattedPlaylists) => {
                            playlists.push(...formattedPlaylists);
                            resolve();
                        })
                        .catch((error) => reject(error));
                    },
                    (error) => reject(error)
                );
            });
        });
        return playlists;
    } catch (error) {
        console.error('Error loading playlist data:', error);
        return []; // Return array kosong jika ada error
    }
};

