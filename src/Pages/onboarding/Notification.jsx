import React, { useState, useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';

const Notification = ({ message, onClose, status }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animasi masuk
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Setelah 2000 milidetik (2 detik), mulai animasi keluar
    const timeout = setTimeout(() => {
      closeNotification();
    }, status === true ? 2000 : 5000);

    // Membersihkan timeout saat komponen dibongkar
    return () => clearTimeout(timeout);
  }, [fadeAnim]);

  const closeNotification = () => {
    // Animasi keluar
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Panggil fungsi onClose setelah animasi keluar selesai
      onClose();
    });
  };

  function checkreturn() {
    if(status) {
      return '#2ecc71'
    }else {
      return 'red'
    }
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [-50, 0] }) }],
        backgroundColor: status ? "#0C356A" : "#994221", // Warna latar belakang notifikasi
        padding: 20,
        borderRadius: 10,
        margin: 10,
        elevation: 5,
      }}
    >
      <Text style={{ color: 'white' }}>{message}</Text>
      <TouchableOpacity onPress={closeNotification} style={{ marginTop: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Poppins-Regular'}}>Tutup</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Notification;