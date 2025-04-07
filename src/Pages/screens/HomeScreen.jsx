import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAudioFiles } from 'react-native-audio-files';


const HomeScreen = () => {
  const [audioFiles, setAudioFiles] = useState([]);

useEffect(() => {
  const getAudioFiles = async () => {
    return await fetchAudioFiles();
  };
  getAudioFiles().then((result) => {
    setAudioFiles(result);
    console.table("data audio cik : ", result);
    
  });
}, []);

return (
  <ScrollView style={{backgroundColor: 'black', paddingBottom: 500}}>
    {audioFiles?.map((element, index) => {
      return (
        <View key={index}>
          <Text style={{color: '#fff'}}>{element?.imageUrl}</Text>
        </View>
      );
    })}

  </ScrollView>
);
};

export default HomeScreen