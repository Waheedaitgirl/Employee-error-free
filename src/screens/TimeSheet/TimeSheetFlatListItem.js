import React, {memo} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Manager from '../../assets/images/Manager.svg'
import Job from '../../assets/images/job.svg'
import { AppScreenWidth } from "../../constants/sacling"
import transform from 'css-to-react-native';
const TimeSheetFlatListItem = memo(({name, time, submittedto,status_style, status, hours,onPress}) => {
    let arr = (status_style.split(";"))
    const ss = transform([
                [arr[0].split(":")[0].trim(),arr[0].split(":")[1].trim()],
                [arr[1].split(":")[0].trim(),arr[1].split(":")[1].trim()],
                [arr[2].split(":")[0].trim(),arr[2].split(":")[1].trim()]
            ])
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
                    <Job width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{name}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Manager width={scale(20)} height={scale(20)} />
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
                <Text style={[styles.textStyle,ss,{paddingHorizontal:10, paddingVertical:2,borderRadius:5,}]}>{status}</Text>
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
         {
            status !== "Approved" &&
                <View style={styles.buttonView} >
                    { 
                        status !== "Submitted" && 
                            <TouchableOpacity style={{...styles.actionButton}} >
                                <MaterialCommunityIcons name="clock-edit" color={colors.dark_primary_color} size={scale(22)} />
                            </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialCommunityIcons name="delete" color={'#ff2e2e'} size={scale(22)} />
                    </TouchableOpacity>
                </View>
        }
        </TouchableOpacity>
    )
})

export default TimeSheetFlatListItem

const styles = StyleSheet.create({
    mainView:{
        width:AppScreenWidth-scale(3), 
        marginHorizontal:scale(1.5),
        alignSelf:"center",
        elevation:2,
        height:verticalScale(160),
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
    buttonView:{
        position:"absolute",
        bottom:scale(5),
        right:scale(5),
        height:scale(30),
        borderWidth:0,
        borderColor:colors.text_primary_color,
        borderRadius:5,
        justifyContent:"space-between",
        flexDirection:"row"
    },
    actionButton:{
        height:scale(30)-2, 
        paddingHorizontal:scale(5), 
        alignItems:"center", 
        justifyContent:"center"
    }
})