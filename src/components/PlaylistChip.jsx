import { View, Text, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'

const PlaylistChip = ({title}) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <TouchableHighlight onPress={()=> setIsActive(!isActive)}>
            <View style={{height: 30, paddingHorizontal: 30, backgroundColor: isActive? '#582FFF' : 'transparent', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 50, borderWidth: 1, borderColor: '#cdcdcd', marginHorizontal: 8}}>
                <Text style={{fontFamily: 'Roboto-Medium', color: '#fdfdfd'}}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
};

export default PlaylistChip;