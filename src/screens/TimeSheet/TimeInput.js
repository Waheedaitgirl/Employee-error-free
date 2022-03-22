import React, {useEffect, useState} from "react";
import { View,TextInput,Text,InteractionManager,FlatList, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { AppScreenWidth } from "../../constants/sacling";
import { fonts } from "../../constants/theme";
import { textStyles } from "../../styles/textStyles";
const TimeInput = ({item , index , setHours}) => {
    return(
        <View style={styles.mainview} >
            <Text style={styles.label} >{item.date}</Text>
            <TextInput 
                keyboardType={"numeric"}
                placeholder={"0.0"}
                value={item.hours}
                onChangeText={(data) => setHours(index, data)}
                style={styles.textinput}
            />
        </View>
    )
}
export default TimeInput
const styles = StyleSheet.create({
    textinput:{
        backgroundColor:"rgba(0,0,0,.1)",
        paddingTop:0,
        paddingBottom:0, 
        marginTop:scale(5),
        textAlign:"center",
        height:scale(30),
        fontFamily:fonts.Regular,
        borderRadius:5,
    },
    mainview:{
        width:scale(70),
        marginTop:scale(5), 
        marginRight:scale(5)
    },
    label:{
        ...textStyles.title,
        alignSelf:"center", 
        backgroundColor:"#0000"
    }
})