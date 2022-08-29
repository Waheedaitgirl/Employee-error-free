import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { stringMd5 } from 'react-native-quick-md5';
const GRAVATAR_URI = 'https://www.gravatar.com/avatar/';
const  Gravatar  = ({size=wp(8),resizeMode="cover",emailAddress="engr.aftabufaq@gmail.com",defaultImage="retro"}) => {

  
        const uri = GRAVATAR_URI + stringMd5(emailAddress) + '?s=' + wp(size) + '&d=' + defaultImage;
       
        return (
            <View style={[styles.overlay]}>
                <Image resizeMode={resizeMode} source={{uri}} style={styles.image} />
            </View>
        );
    
}
const styles = StyleSheet.create({
    overlay: {
        overflow: 'hidden',
    },

    image: {
        
        width: wp(25),
        height: wp(25),
        marginVertical: wp(5),
        borderRadius: wp(15),
    },
});

export default Gravatar;