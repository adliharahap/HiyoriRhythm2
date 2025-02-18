import { db } from "./setupDatabasePlaylist";

export const mergePlaylistAndStorageData = (playlistName, data1, data2) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
        // Mengambil ID dari playlist berdasarkan nama
            tx.executeSql(
                'SELECT id FROM playlists WHERE name = ?',
                [playlistName],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const playlistId = results.rows.item(0).id; // Ambil ID playlist

                        const finalData = []; // Array untuk menyimpan data akhir

                        // Looping melalui data 1 (semua lagu dari storage)
                        data1.forEach(song1 => {
                            const matchedSong = data2.find(song2 => song2.Path === song1.audioUrl && song2.playlist_id === playlistId);

                            // Jika ditemukan kecocokan, masukkan data final ke array finalData
                            if (matchedSong) {
                                finalData.push({
                                    id: song1.id,
                                    audioUrl: song1.audioUrl,
                                    title: song1.title,
                                    artist: song1.artist,
                                    album: song1.album,
                                    filedate: song1.addedDate,
                                    imageUrl: song1.imageUrl,
                                    duration: song1.duration,
                                    filesize: song1.size,
                                });
                            }
                        });

                        // Jika tidak ada kecocokan di antara keduanya
                        if (finalData.length === 0) {
                            resolve(false); // Mengembalikan false jika tidak ada data yang cocok
                        } else {
                            resolve(finalData); // Mengembalikan data final yang berisi lagu-lagu yang cocok
                        }
                    } else {
                        resolve(false); // Jika tidak ada playlist ditemukan
                    }
                },
                error => {
                    console.error('Error fetching playlist id: ', error);
                    reject(error); // Menolak promise jika ada error
                },
            );
        });
    });
};
