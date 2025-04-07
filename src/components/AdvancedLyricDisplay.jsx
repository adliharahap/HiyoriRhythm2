import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import TrackPlayer, { useProgress, usePlaybackState } from 'react-native-track-player';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { setLyric } from '../redux/slices/lyricSlice';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const AdvancedLyricDisplay = ({ lrcFilePath }) => {
  const lyrics = useSelector((state) => state.lyric.lyric);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const scrollViewRef = React.useRef(null);

  const loadLrcFile = useCallback(async () => {
    try {
      const content = await RNFS.readFile(lrcFilePath, 'utf8');
      const parsedLyrics = content.split('\n').map(line => {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
        if (match) {
          const [, minutes, seconds, hundredths, text] = match;
          return {
            time: parseInt(minutes) * 60 + parseInt(seconds) + parseInt(hundredths) / 100,
            content: text.trim()
          };
        }
        return null;
      }).filter(lyric => lyric !== null);
      dispatch(setLyric(parsedLyrics));
    } catch (err) {
      
    }
  }, [lrcFilePath]);

  useEffect(() => {
    loadLrcFile();
  }, [loadLrcFile]);

  const getCurrentLyricIndex = useCallback(() => {
    return lyrics.findIndex(lyric => lyric.time > progress.position) - 1;
  }, [lyrics, progress.position]);

  useEffect(() => {
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      const currentIndex = getCurrentLyricIndex();
      if (currentIndex >= 0 && scrollViewRef.current) {
        scrollY.value = withTiming(currentIndex * 36, { duration: 300 });
        scrollViewRef.current.scrollTo({ y: currentIndex * 36, animated: true });
      }
    }
  }, [playbackState, progress.position, getCurrentLyricIndex, scrollY]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -scrollY.value }],
    };
  });

  if (error) {
    return;
  }

  if (lyrics.length === 0) {
    return <Text style={styles.loading}>Loading lyrics...</Text>;
  }

  return (
    <AnimatedScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
    >
      <Animated.View style={[styles.lyricsContainer, animatedStyle]}>
        {lyrics.map((lyric, index) => (
          <Text
            key={index}
            style={[
              styles.lyricText,
              getCurrentLyricIndex() === index && styles.activeLyricText
            ]}
          >
            {lyric.content}
          </Text>
        ))}
      </Animated.View>
    </AnimatedScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 350,
    paddingBottom: 350,
  },
  lyricsContainer: {
    paddingHorizontal: 5
  },
  lyricText: {
    textAlign: 'center',
    color: '#cdcdcd',
    fontSize: 15,
    opacity: 0.4,
    // fontWeight: '400',
    lineHeight: 36,
    fontFamily: 'Roboto-Regular'
  },
  activeLyricText: {
    color: '#fff',
    fontSize: 18,
    opacity: 1,
    // fontWeight: '500',
    fontFamily: 'Roboto-Medium'
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  loading: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AdvancedLyricDisplay;
