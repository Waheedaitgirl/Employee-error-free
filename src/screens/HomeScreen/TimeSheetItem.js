import React, {memo} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AppScreenWidth } from "../../constants/sacling"
const TimeSheetItem = memo(({name, time, submittedto, status, hours,onPress}) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={styles.mainView}>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <AntDesign 
                        name="clockcircle" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{time}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Ionicons 
                        name="md-person-sharp" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{name}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MaterialCommunityIcons 
                        name="account-supervisor" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{submittedto}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MaterialCommunityIcons 
                        name="lightning-bolt" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{status}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <AntDesign 
                        name="clockcircle" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text style={styles.textStyle}>{hours}</Text>
            </View>
        </TouchableOpacity>
    )
})

export default TimeSheetItem

const styles = StyleSheet.create({
    mainView:{
        width:AppScreenWidth, 
        alignSelf:"center",
        elevation:2,
        backgroundColor:"#fefefe",
        marginVertical:scale(5),
        padding:scale(10),
        borderRadius:scale(10)
    },
    btnView: {
      
        marginBottom:scale(12),
        flexDirection: 'row',
        alignItems:"center"
    },
    textStyle: {
        marginLeft:scale(10), 
        fontFamily:fonts.Medium,
        color: colors.text_primary_color
    },
})