import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Slide1, Slide2, Slide3, Slide4 } from './OnboardingComponent';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />];

  const renderItem = ({index}) => slides[index]; // Render berdasarkan index

  const Pagination = () => (
    <View style={styles.pagination}>
      {slides.map((_, idx) => (
        <View
          key={idx}
          style={[
            styles.dot,
            idx === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000'
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 110,
      zIndex: 1,
      width: '100%',
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#fff',
      height: 8,
      width: 8,
    },
    inactiveDot: {
      backgroundColor: 'gray',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 20,
      position: 'absolute',
      bottom: 30,
      width: '100%',
    },
    navButtonLeft: {
      padding: 15,
      backgroundColor: '#333',
      borderRadius: 25,
      minWidth: 100,
      alignItems: 'center',
      opacity: activeIndex === 0 ? 0 : 0.8,
    },

    navButtonRight: {
      padding: 15,
      backgroundColor: '#333',
      borderRadius: 25,
      minWidth: 100,
      alignItems: 'center',
      opacity: activeIndex === slides.length - 1 ? 0 : 0.8,
    },

    navButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'Roboto-Bold',
    },
  });

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        width={width}
        height={height}
        autoPlay={false}
        loop={false}
        data={slides}
        scrollAnimationDuration={200}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={renderItem}
      />

      {keyboardHeight === 0 && (
        <>
          <Pagination />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.navButtonLeft}
              onPress={() => carouselRef.current?.prev()}
              disabled={activeIndex === 0}>
              <Text style={styles.navButtonText}>Prev</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButtonRight}
              onPress={() => carouselRef.current?.next()}
              disabled={activeIndex === slides.length - 1}>
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default OnboardingScreen;
