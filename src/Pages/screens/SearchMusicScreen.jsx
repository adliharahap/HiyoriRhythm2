import { View, Text, Button, Alert } from 'react-native';
import React, { useEffect } from 'react';
import BackgroundActions from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const testBackgroundTask = async (taskData) => {
    console.log('⏳ Background task started');

    try {
        for (let i = 0; BackgroundActions.isRunning(); i++) {
            console.log(`⌛ Background task running: ${i}`);
            await sleep(1000);
        }
    } catch (error) {
        console.error('❌ Error di background task:', error);
    } finally {
        console.log('✅ Background task stopped');
    }
};

const options = {
    taskName: 'TestBackground',
    taskTitle: 'Hiyori Background Task',
    taskDesc: 'Lagi jalanin task di background...',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#FF0000',
    linkingURI: 'yourapp://home', // Sesuai deeplink app kamu
    parameters: {
        delay: 1000,
    },
};

const SearchMusicScreen = () => {
    const startBackgroundTask = async () => {
        try {
            if (BackgroundActions.isRunning()) {
                Alert.alert('⚠️ Background Task', 'Task sudah berjalan!');
                return;
            }
            console.log('🚀 Starting Background Task...');
            await BackgroundActions.start(testBackgroundTask, options);
        } catch (e) {
            console.error('❌ Error start background task:', e);
            Alert.alert('Error', 'Gagal start background task. Cek log!');
        }
    };

    const stopBackgroundTask = async () => {
        try {
            console.log('🛑 Stopping Background Task...');
            await BackgroundActions.stop();
        } catch (e) {
            console.error('❌ Error stop background task:', e);
            Alert.alert('Error', 'Gagal stop background task.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Testing Background Actions 🚀</Text>
            <Button title="Start Background Task" onPress={startBackgroundTask} />
            <Button title="Stop Background Task" onPress={stopBackgroundTask} />
        </View>
    );
};

export default SearchMusicScreen;
