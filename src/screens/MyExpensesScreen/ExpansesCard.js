import React, {memo} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import { AppScreenWidth } from "../../constants/sacling"
import Bill from '../../assets/images/bill.svg'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Date from '../../assets/images/date.svg'
import Price from '../../assets/images/price.svg'
import Person from '../../assets/images/person.svg'
import Job from '../../assets/images/job.svg'
import transform from 'css-to-react-native';
const ExpansesItem = memo(({billtype, company, status,date, job,status_colour_code, price,onPress}) => {
    let arr = (status_colour_code.split(";"))
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
                    <Job width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{job}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                <Price width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{billtype}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Person width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{company}</Text>
            </View>
            
           
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Date width={scale(20)} height={scale(20)} />
                </View>
                <Text style={styles.textStyle}>{date}</Text>
            </View>
            {
                price !== null &&
                    <View   
                        style={styles.btnView}>
                        <View style={{width:scale(20), height:scale(20)}} >
                            <Bill width={scale(20)} height={scale(20)} />
                        </View>
                        <Text 
                            style={{
                                ...styles.textStyle, 
                                backgroundColor:"#34CE44",
                                color:"#fff",
                                paddingHorizontal:scale(10),
                                paddingVertical:scale(2),
                                borderRadius:scale(5)
                            }}>{price}</Text>
                    </View>
            }
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
                        <MaterialCommunityIcons name="delete" color={colors.delete_icon} size={scale(22)} />
                    </TouchableOpacity>
                </View>
            }
        </TouchableOpacity>
    )
})

export default ExpansesItem

const styles = StyleSheet.create({
    mainView:{
        width:AppScreenWidth, 
        alignSelf:"center",
        elevation:2,
        backgroundColor:"#fefefe",
        marginVertical:scale(5),
        padding:scale(10),
        marginHorizontal:3,
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