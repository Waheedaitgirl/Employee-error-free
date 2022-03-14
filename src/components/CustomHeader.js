import React from 'react';
import {View, Text,TouchableOpacity, Platform, Dimensions, StyleSheet} from 'react-native';
import Entypo from  'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors, fonts } from '../constants/theme';
import { scale, verticalScale } from 'react-native-size-matters';
import { width } from '../constants/sacling';
const CustomHeader = ({isdrawer, show_backButton,title,onPress}) => {
    return (
      <View
        style={{
            ...styles.touchable_bg,
            justifyContent:show_backButton ? 'space-between' : 'center',   
          }}>
        {
            show_backButton && (
                <TouchableOpacity
                    style={{
                        marginLeft: 12,
                        shadowColor: '#fff',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    onPress={onPress}>
                    {
                        isdrawer 
                            ? 
                                <AntDesign color={colors.white} name="menu-fold"  size={scale(24)} />
                            : 

                                <Entypo color={"#fff"} name="chevron-thin-left" size={scale(24)}  />
                    }
                </TouchableOpacity>
            )
        }

        <Text
            style={{
                fontFamily:fonts.Bold,
                fontSize: scale(18),
                color: colors.white,
            }}>
          {title}
        </Text>

        {
            show_backButton && 
                <View style={{width: 36, height: 36}} />
        }

      </View>
    );
  
};
const styles = StyleSheet.create({
  touchable_bg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:"flex-end",
    width:width,
    position: 'relative',
    height:verticalScale(55.75),
    backgroundColor:colors.dark_primary_color,
    paddingVertical: verticalScale(10),
  },
});

export default CustomHeader;