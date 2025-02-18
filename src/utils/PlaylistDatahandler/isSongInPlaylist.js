import { db } from "./setupDatabasePlaylist";

export async function isSongInPlaylists(path) {
    try {
        const result = {}; // Objek untuk menyimpan hasil

        // Mendapatkan semua playlist
        const playlists = await new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT id, name FROM playlists`, // Mengambil nama playlist juga
                    [],
                    (tx, results) => {
                        const playlistData = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            playlistData.push(results.rows.item(i));
                        }
                        resolve(playlistData); // Resolving with all playlist ids and names
                    },
                    (tx, error) => {
                        reject('Error fetching playlists: ' + error.message);
                    }
                );
            });
        });

        // Memeriksa setiap playlist untuk path
        await Promise.all(playlists.map(playlist => {
            return new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        `SELECT COUNT(*) as count FROM playlist_songs WHERE playlist_id = ? AND Path = ?`,
                        [playlist.id, path],
                        (tx, results) => {
                            result[playlist.name] = results.rows.item(0).count > 0; // Menyimpan hasil dalam objek
                            resolve(); // Resolving after checking
                        },
                        (tx, error) => {
                            reject('Error checking path in playlist: ' + error.message);
                        }
                    );
                });
            });
        }));

        return result; // Mengembalikan objek hasil
    } catch (error) {
        console.log('Error checking path in playlists:', error);
        return {}; // Mengembalikan objek kosong dalam kasus error
    }
}
