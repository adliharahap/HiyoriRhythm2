import { getColors } from 'react-native-image-colors';

export const getImageColor = async (url) => {
    try {
        const colors = await getColors(url, {
        fallback: '#228B22',
        cache: true,
        key: url,
        });

        return colors.dominant;
    } catch (error) {
        console.log('Error fetching image colors:', error);
    }
};