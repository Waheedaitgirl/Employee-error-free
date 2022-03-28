import React, {memo} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import { AppScreenWidth } from "../../constants/sacling"
import Job from '../../assets/images/job.svg'
import Person from '../../assets/images/person.svg'
import MPerson from '../../assets/images/mperson.svg'

import Hiring from '../../assets/images/Hiring.svg'
const LeaveCard = memo(({name, time, submittedto, status, hours}) => {
    return(
        <TouchableOpacity 
            style={styles.mainView}>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MPerson width={scale(20)} height={scale(20)} />
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
                    <Hiring width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{submittedto}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Person width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{status}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Person width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{hours}</Text>
            </View>
        </TouchableOpacity>
    )
})

export default LeaveCard

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