import React from "react";
import {NativeBaseProvider, Select, Icon } from "native-base";
import Entypo from 'react-native-vector-icons/Entypo'
import { scale } from "react-native-size-matters";
import { colors } from "../constants/theme";
import { fonts } from "../constants/theme";
const selectStyles = {
    _item:{
        pt:0,
        pb:0,
        borderBottomWidth:1,
        borderBottomColor:"rgba(0,0,0,.1)",
        _text:{
            fontFamily:fonts.Medium,
            color:colors.secondary_text_color
        }
    
    },
    _selectedItem:{
        bg:colors.dark_primary_color,
        _text:{
            fontFamily:fonts.Medium,
            color:"#fff"
        },
        endIcon: <Icon as={Entypo} name={"check"} size={scale(25)} color={colors.white}  />
    }
}

export default  selectStyles