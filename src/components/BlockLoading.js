import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import {textStyles} from '../styles';
const BlockLoading = () => {
  return (
    <View style={styles.main} pointerEvents={'none'}>
      <View style={styles.bg}>
        <Image
          style={{
            width: widthPercentageToDP(50),
            height: widthPercentageToDP(50),
            backgroundColor: 'rgba(0,0,0,0)',
          }}
          resizeMode={'contain'}
          source={require('../assets/images/loading.gif')}
        />
        <Text
          style={{...textStyles.smallheading, marginTop: 10, color: '#fff'}}>
          Loading
        </Text>
      </View>
    </View>
  );
};

export default BlockLoading;

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.05)',
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: scale(10),
    padding: scale(40),
  },
});
