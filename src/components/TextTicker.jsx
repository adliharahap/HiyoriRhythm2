import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const TextTicker = ({
  children,
  duration = 4000,
  repeatSpacer = 100,
  marqueeDelay = 2000,
  pauseDuration = 10,
  style = {},
  minLengthToAnimate = 25, // Kalau teks <= 25, animasi tidak jalan
}) => {
  const [textContent, setTextContent] = useState(children?.toString() || '');
  const translateX = useSharedValue(0);
  const textWidth = useSharedValue(0);
  const [isMeasured, setIsMeasured] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const timeoutRef = useRef(null);

  // Reset semua state kalau children berubah
  useEffect(() => {
    setTextContent(children?.toString() || '');
    setIsMeasured(false);
    setAnimationReady(false);
    translateX.value = 0; // Reset posisi animasi
    textWidth.value = 0;
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      cancelAnimation(translateX);
    };
  }, [children]);

  const handleTextLayout = (e) => {
    const measured = e.nativeEvent.layout.width;
    if (measured > 0) {
      textWidth.value = measured;
      setIsMeasured(true);
    }
  };

  const startAnimation = () => {
    const totalDistance = textWidth.value + repeatSpacer;
    const animateLoop = () => {
      translateX.value = withDelay(
        marqueeDelay,
        withTiming(-totalDistance, {
          duration,
          easing: Easing.linear,
        }, (finished) => {
          if (finished) {
            translateX.value = screenWidth;
            translateX.value = withDelay(
              pauseDuration,
              withTiming(0, {
                duration,
                easing: Easing.linear,
              }, (finished2) => {
                if (finished2) {
                  runOnJS(animateLoop)();
                }
              })
            );
          }
        })
      );
    };

    animateLoop();
  };

  useEffect(() => {
    if (isMeasured && textContent.length > minLengthToAnimate) {
      setAnimationReady(true);
      startAnimation();
    }
    return () => {
      cancelAnimation(translateX);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMeasured, textContent]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (textContent.length <= minLengthToAnimate) {
    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={[styles.text, style]}>
          {textContent}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Text tersembunyi buat ukur lebar */}
      <Text
        onLayout={handleTextLayout}
        numberOfLines={1}
        style={[styles.hiddenText, style]}
      >
        {textContent}
      </Text>

      {/* Teks animasi / static sesuai readiness */}
      {!animationReady ? (
        <Text numberOfLines={1} style={[styles.text, style]}>
          {textContent}
        </Text>
      ) : (
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, style, animatedStyle]}
        >
          {textContent}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  hiddenText: {
    position: 'absolute',
    opacity: 0,
  },
});

export default TextTicker;
