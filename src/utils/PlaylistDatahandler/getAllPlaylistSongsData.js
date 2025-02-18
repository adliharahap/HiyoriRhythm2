import { db } from './setupDatabasePlaylist';


export const getAllPlaylistSongs = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM playlist_songs', // Query untuk mengambil semua data
            [],
            (tx, results) => {
            const rows = results.rows;
            let data = [];

            for (let i = 0; i < rows.length; i++) {
                data.push(rows.item(i)); // Menyimpan setiap baris data ke dalam array
            }

            resolve(data); // Mengembalikan data dalam bentuk array
            },
            (error) => {
            console.error('Error mengambil data dari playlist_songs: ', error);
            reject(error); // Menolak promise jika ada error
            }
        );
        });
    });
};
