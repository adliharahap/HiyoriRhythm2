import RNFS from 'react-native-fs';

export const saveImageToAppFolder = async (contentUri) => {
  try {
    // Dapatkan path folder aplikasi
    const appFolderPath = `${RNFS.ExternalDirectoryPath}/MyAppImages`;

    // Buat folder jika belum ada
    await RNFS.mkdir(appFolderPath);

    // Gunakan nama file yang tetap
    const fileName = 'profile_image.jpg';
    const filePath = `${appFolderPath}/${fileName}`;

    // Salin file dari content URI ke path baru (akan menimpa jika sudah ada)
    await RNFS.copyFile(contentUri, filePath);

    console.log('Gambar berhasil disimpan:', filePath);
    return filePath;
  } catch (error) {
    console.log('Gagal menyimpan gambar:', error);
  }
};

// Penggunaan:
// saveImageToAppFolder("content://media/external/audio/albumart/5");