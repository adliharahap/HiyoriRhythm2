import SQLite from 'react-native-sqlite-storage';

// Membuka atau membuat database
export const db = SQLite.openDatabase(
    { name: 'playlist.db', location: 'default' },
    () => console.log('Database opened successfully'),
    error => console.log('Error opening database:', error)
);

export async function setupDatabasePlaylist() {
    try {
        db.transaction(tx => {
            // Membuat tabel playlists
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS playlists (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    artwork TEXT,
                    description TEXT
                )`
            );

            // Membuat tabel favorite_songs
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS favorite_songs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    artist TEXT,
                    path TEXT UNIQUE,
                    title TEXT
                )`
            );

            // Membuat tabel playlist_songs untuk relasi many-to-many
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS playlist_songs (
                    playlist_id INTEGER,
                    Title TEXT,
                    Artist TEXT,
                    Path TEXT,
                    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
                    PRIMARY KEY (playlist_id, Path)
                )`
            );
        }, error => {
            console.log('Transaction error:', error);
        }, () => {
            console.log('Tables created successfully');
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

// import RNFS from 'react-native-fs';

// const database_name = 'playlist.db'; // Nama database Anda
// const db_path = `/data/data/com.hiyorirhythm/databases/${database_name}`;

// export function deleteDatabase() {
//     // Menutup koneksi database jika ada
//     const db = SQLite.openDatabase({ name: database_name, location: 'default' });
//     db.close(() => {
//         console.log('Database closed successfully');
//     }, (error) => {
//         console.error('Error closing database:', error);
//     });

//     // Menghapus file database
//     RNFS.unlink(db_path)
//         .then(() => {
//             console.log('Database file deleted successfully');
//         })
//         .catch((error) => {
//             console.error('Error deleting database file:', error);
//         });
// }
