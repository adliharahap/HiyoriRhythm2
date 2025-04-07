import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundImageMusicRecently from '../../components/BackgroundImageMusicRecently';
import RecentlyPlayedMusic from '../../components/RecentlyPlayedMusic';
import ShuffleSvg from '../../assets/Svg/ShuffleSvg';
import SortirSvg from '../../assets/Svg/SortirSvg';
import MusicList from '../../components/MusicList';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { setShuffledArray } from '../../redux/slices/audioSlice';
import { setSortingEnd } from '../../redux/slices/modalSlice';
import MusicSortButton from '../../components/MusicSortButton';
import { setQueue } from '../../redux/slices/PlayerSlice';

const ListMusicScreen = () => {
  const { height, width } = Dimensions.get('window');
  const [isFloatBtnHidden, setBtnHidden] = useState(false);
  const [autotophide, setautotophide] = useState(0);
  const navigation = useNavigation();
  // const slideAnim = useRef(new Animated.Value(0)).current;
  
  const audioFiles = useSelector((state) => state.audio.files);
  const sortBy = useSelector((state) => state.audio.sortBy);
  const sortOrder = useSelector((state) => state.audio.sortOrder);
  const runSortingOrNot = useSelector((state) => state.modal.runSorting);
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.player.queue);

  const sortedFiles = [...audioFiles].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
        case 'title':
            valueA = a.title?.toString().toLowerCase() || '';
            valueB = b.title?.toString().toLowerCase() || '';
            break;
        case 'artist':
            valueA = a.artist?.toString().toLowerCase() || '';
            valueB = b.artist?.toString().toLowerCase() || '';
            break;
        case 'album':
            valueA = a.album?.toString().toLowerCase() || '';
            valueB = b.album?.toString().toLowerCase() || '';
            break;
        case 'duration':
            valueA = a.duration || 0;
            valueB = b.duration || 0;
            break;
        case 'size':
            valueA = parseFloat(a[sortBy]) || 0;
            valueB = parseFloat(b[sortBy]) || 0;
            break;
        case 'addedDate':
            valueA = new Date(a.addedDate * 1000).getTime();
            valueB = new Date(b.addedDate * 1000).getTime();
            break;
        default:
            valueA = '';
            valueB = '';
            break;
    }

    if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
    }
    return 0; // mereka sama
});

    const updateTrackPlayer = async () => {
        try {
            const newTrackQueue = sortedFiles.map((file, index) => ({
                id: file.id,
                imageUrl: file.imageUrl,
                title: file.title,
                artist: file.artist,
                album: file.album,
                duration: file.duration / 1000,
                audioUrl: file.audioUrl,
                addedDate: new Date(file.addedDate * 1000).toISOString().slice(0, 19).replace('T', ' '),
                size: file.size,
                position: index,
            }));

            // console.log('hasil queue : ', newTrackQueue);

            await dispatch(setQueue(newTrackQueue));
            
            const shuffleArray = (length) => {
                const array = Array.from({ length }, (_, index) => index);
                return array.sort(() => Math.random() - 0.5);
            };

            const shuffledArray = shuffleArray(newTrackQueue.length);
            await dispatch(setShuffledArray(shuffledArray));
            await dispatch(setSortingEnd());
        } catch (error) {
            console.log('Error updating queue:', error);
        }
    };

    useEffect(() => {
      if (runSortingOrNot) {
        updateTrackPlayer();
      }
    }, [runSortingOrNot]);



  const renderItem = ({item, index}) => {
    return (
      <TouchableHighlight
        underlayColor="rgba(34,34,34,0.6)"
        onPress={() => {
          navigation.navigate('MusicPlay', {MusicId: index});
        }}>
        <MusicList
          id={index}
          img={item.imageUrl}
          title={item.title}
          artist={item.artist}
          album={item.album}
          duration={item.duration}
          path={item.audioUrl}
          filedate={item.addedDate}
          filesize={item.size}
        />
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0d0d0d'}}>
      <BackgroundImageMusicRecently />
      <ScrollView
        style={{flex: 1}}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}>
        <LinearGradient
          style={{height: 300, width: '100%'}}
          colors={['rgba(0,0,0,0.1)', '#2c1a4d']}
          pointerEvents="box-none">
          <RecentlyPlayedMusic />
        </LinearGradient>
        <View style={{flex: 1}}>
          <View style={{minHeight: 80, flex: 1, backgroundColor: '#2c1a4d'}}>
            <View
              style={{
                minHeight: 60,
                flexDirection: 'row',
                marginTop: 5,
                paddingHorizontal: 10,
              }}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    height: 20,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/Onboarding/icons-apps.png')}
                    style={{height: 30, width: 30}}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 14,
                    }}>
                    Hiyori Rhythm
                  </Text>
                </View>
                <View
                  style={{
                    height: 40,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 14,
                    }}>
                    130 song • 2 j 14 mnt
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingRight: 20,
                    paddingTop: 10,
                    gap: 15,
                  }}>
                  <MusicSortButton />
                  <TouchableOpacity>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        padding: 20,
                        height: 30,
                        width: 30,
                        borderWidth: 1.5,
                        borderColor: '#07d63b',
                        borderRadius: 25,
                      }}>
                      <ShuffleSvg color="#fff" width={24} height={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Bagian List Music */}
          </View>
          <LinearGradient
            style={{minHeight: height, width: '100%', backgroundColor: '#000', paddingBottom: 150}}
            colors={['#2c1a4d', '#000']}
            locations={[0, 0.1]}>
              <FlatList
                scrollEnabled={false}
                data={sortedFiles}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListMusicScreen;
