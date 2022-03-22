import React from "react";
import { colors, fonts } from "../constants/theme";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
import LEAVE from '../assets/images/Leave.svg'
import Entypo from 'react-native-vector-icons/Entypo'
import {MainRoutes} from '../constants/routes'
import { scale } from "react-native-size-matters";
const DrawerContentt = ({ navigation, props }) => {
    return (
        <View style={styles.MainContent}>
        
                <View style={styles.drawercontent}>  
                    <Image 
                        source={require("../assets/images/dummy.png")} 
                        style={{
                            width:scale(70),
                            borderRadius:scale(100),
                            height:scale(70), 
                            resizeMode:"cover"
                        }}
                    />
                    <View style={{justifyContent:"flex-start"}}>
                        <Text style={styles.textStyleHeader}>Aftab Ameen</Text>
                        <Text style={styles.textStyleHeader}>engr.aftabufaq@gmail.com</Text>
                    </View> 
                    <TouchableOpacity
                        onPress={() => navigation.navigate(MainRoutes.EditProfileScreen) }
                        style={{
                            position:"absolute",
                            top:scale(10),
                            right:scale(10)
                        }} >
                        <Entypo name="edit" color={"#fff"} size={scale(20)} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity   
                    onPress={() => navigation.navigate(MainRoutes.HomeScreen)} 
                    style={styles.btnView}>
                    <View style={{width:scale(20), height:scale(20)}} >
                        <AntDesign 
                            name="home" 
                            color={colors.dark_primary_color} 
                            size={scale(20)} 
                        />
                    </View>
                    <Text style={styles.textStyle}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity   
                    onPress={() => navigation.navigate(MainRoutes.TimeSheetListScreen)} 
                    style={styles.btnView}>
                    <View style={{width:scale(20), height:scale(20)}} >
                        <AntDesign 
                            name="clockcircle" 
                            color={colors.dark_primary_color} 
                            size={scale(18)} 
                        />
                    </View>
                    <Text style={styles.textStyle}>My Time</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => navigation.navigate(MainRoutes.MyExpensesScreen) } 
                    style={styles.btnView}>
                     <View style={{width:scale(20), height:scale(20)}} > 
                        <Entypo 
                            name="credit" 
                            color={colors.dark_primary_color} 
                            size={scale(20)}
                        />
                    </View>  
                    <Text style={{...styles.textStyle}}>My Expenses</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => navigation.navigate(MainRoutes.LeavesScreen) } 
                    style={styles.btnView}>
                    <View style={{width:scale(20), height:scale(20)}} > 
                        <LEAVE width={scale(20)} height={scale(20)} />
                    </View>
                    <Text style={styles.textStyle}>Leaves</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => navigation.navigate(MainRoutes.CalendarScreen) } 
                    style={styles.btnView}>
                    <View style={{width:scale(20), height:scale(20)}} >    
                        <FontAwesome 
                            name="calendar" 
                            color={colors.dark_primary_color} 
                            size={scale(16)} 
                        />
                    </View>
                    <Text style={styles.textStyle}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => navigation.navigate(MainRoutes.MyTasksScreen) } 
                    style={styles.btnView}>
                    <View style={{width:scale(20), height:scale(20)}} >    
                        <FontAwesome 
                            name="tasks" 
                            color={colors.dark_primary_color} 
                            size={scale(16)} 
                        />
                    </View>
                    <Text style={styles.textStyle}>My Tasks</Text>
                </TouchableOpacity>
        </View >
    )
}
export default DrawerContentt;

const styles = StyleSheet.create({
    MainContent:{
        flex: 1,
        backgroundColor:"#fff"
    },
    drawercontent:{
        padding:scale(10), 
        flexDirection: 'row',
        marginBottom:scale(20),
        alignItems:"center",
        backgroundColor:colors.dark_primary_color
    },
   
    btnView: {
        marginLeft:scale(15),
        marginBottom:scale(12),
        flexDirection: 'row',
        alignItems:"center"
    },
    textStyle: {
        marginLeft:scale(10), 
        fontFamily:fonts.Medium,
        color: colors.text_primary_color
    },
    textStyleHeader: {
        marginLeft:scale(10), 
        fontFamily:fonts.Medium,
        fontSize:scale(12),
        color: colors.white
    }
})