import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setSortOrder } from '../../redux/slices/audioSlice';
import { setRunSorting } from '../../redux/slices/modalSlice';

const SortModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const sortBy = useSelector((state) => state.audio.sortBy);
    const sortOrder = useSelector((state) => state.audio.sortOrder);

    const handleSortByChange = (criteria) => {
        dispatch(setSortBy(criteria));
        dispatch(setRunSorting());
        onClose();
    };

    const handleSortOrderChange = () => {
        dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
        dispatch(setRunSorting());
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
        <View style={styles.modalContent}>
            <Text style={styles.title}>Urut berdasarkan</Text>

            {/* Skip Fillers Option */}
            <TouchableOpacity
            onPress={() => handleSortByChange('skipFillers')}
            style={[
                styles.option,
                sortBy === 'skipFillers' && styles.selectedOption,
            ]}
            >
            <Text style={styles.optionText}>
                Lewati Pengisi <Text style={styles.helperText}>(A, An, The, Symbols..)</Text>
            </Text>
            </TouchableOpacity>

            {/* Sort Options */}
            {[
            { label: 'Judul', value: 'title' },
            { label: 'Artis', value: 'artist' },
            { label: 'Album', value: 'album' },
            { label: 'Duration', value: 'duration' },
            { label: 'Size', value: 'size' },
            { label: 'Terbaru', value: 'addedDate' },
            ].map((criteria) => (
            <TouchableOpacity
                key={criteria.value}
                onPress={() => handleSortByChange(criteria.value)}
                style={[
                styles.option,
                sortBy === criteria.value && styles.selectedOption,
                ]}
            >
                {/* Add icons before the text here */}
                {/* <IconName width={20} height={20} /> */}
                <Text style={styles.optionText}>{criteria.label}</Text>
            </TouchableOpacity>
            ))}

            {/* Sort Order Button */}
            <TouchableOpacity
            onPress={handleSortOrderChange}
            style={styles.sortOrderButton}
            >
            {/* Add the SVG icon for sorting order here */}
            {/* {sortOrder === 'asc' ? <IconArrowDownward width={20} height={20} /> : <IconArrowUpward width={20} height={20} />} */}
            <Text style={styles.sortOrderText}>
                {sortOrder === 'asc' ? 'Urutan Menurun' : 'Urutan Menaik'}
            </Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
        </View>
        </Modal>
    );
    };

    const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#2c1a4d',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    selectedOption: {
        backgroundColor: 'rgba(200,200,200,0.2)',
        borderRadius: 5,
    },
    helperText: {
        color: 'grey',
        fontSize: 12,
    },
    sortOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 12,
        backgroundColor: '#323232',
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
    },
    sortOrderText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: '#FE3535',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SortModal;
