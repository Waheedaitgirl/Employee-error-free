import React from "react";
import { StyleSheet } from "react-native";
import { scale,verticalScale } from "react-native-size-matters";
import { width } from "../constants/sacling";
import { colors, fonts } from "../constants/theme";
export const commonStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#0000",
        alignItems:"center"
    },
    headerMianView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:"flex-end",
        width:width,
        position: 'relative',
        height:verticalScale(40),
        backgroundColor:colors.dark_primary_color,
        paddingVertical: verticalScale(10),
    },
   hedaerWithIcons:{
    flexDirection: 'row',
    justifyContent:'space-between' ,  
    alignItems:"flex-end",
    width:width,
    position: 'relative',
    height:verticalScale(40),
    backgroundColor:colors.dark_primary_color,
    paddingBottom: verticalScale(5),
   }
})