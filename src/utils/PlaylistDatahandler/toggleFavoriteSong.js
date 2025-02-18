import { db } from "./setupDatabasePlaylist";

export async function toggleFavoriteSong(songData) {
    try {
        await new Promise((resolve, reject) => {
            db.transaction(tx => {
                // Mengecek apakah lagu sudah ada di daftar favorite
                tx.executeSql(
                    `SELECT * FROM favorite_songs WHERE path = ?`,
                    [songData.path],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            // Jika lagu ada, hapus dari daftar favorite
                            tx.executeSql(
                                `DELETE FROM favorite_songs WHERE path = ?`,
                                [songData.path],
                                () => {
                                    console.log('Song removed from favorites successfully');
                                    resolve();
                                },
                                (error) => {
                                    console.error('Error removing song from favorites:', error);
                                    reject(error);
                                }
                            );
                        } else {
                            // Jika lagu tidak ada, tambahkan ke daftar favorite
                            tx.executeSql(
                                `INSERT INTO favorite_songs (artist, path, title) VALUES (?, ?, ?)`,
                                [songData.artist, songData.path, songData.title],
                                () => {
                                    console.log('Song added to favorites successfully');
                                    resolve();
                                },
                                (error) => {
                                    console.error('Error adding song to favorites:', error);
                                    reject(error);
                                }
                            );
                        }
                    },
                    (error) => {
                        console.error('Error checking song in favorites:', error);
                        reject(error);
                    }
                );
            });
        });
    } catch (error) {
        console.log('Error updating favorite song list:', error);
    }
}

export async function isSongFavorite(songPath) {
    try {
        let isFavorite = false;

        await new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM favorite_songs WHERE path = ?`,
                    [songPath],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            isFavorite = true;
                        }
                        resolve(isFavorite);
                    },
                    (error) => {
                        console.error('Error checking if song is favorite:', error);
                        reject(error);
                    }
                );
            });
        });

        return isFavorite;
    } catch (error) {
        console.error('Error checking if song is favorite:', error);
        return false; // Default return value in case of error
    }
}
