import React from "react";
import { colors, fonts } from "../constants/theme";
import { View,SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Signout } from "../store/actions/LoginActions";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {MainRoutes} from '../constants/routes'
import { scale } from "react-native-size-matters";
import {useDispatch} from 'react-redux';
const DrawerContentt = ({ navigation, props }) => {
    const dispatch = useDispatch();
    const  localSignout = () => dispatch(Signout(null))
    return (
        <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}}>
            <DrawerContentScrollView 
                    style={{flex:1, backgroundColor:"#fff"}} 
                        contentContainerStyle={{alignItems:"flex-start",
                        paddingTop:0, marginStart:0, 
                        justifyContent:"flex-start"}} > 
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
                            </View> 
                            <TouchableOpacity
                               // onPress={() => navigation.navigate(MainRoutes.EditProfileScreen) }
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
                                <Entypo 
                                    name="calendar" 
                                    color={colors.dark_primary_color} 
                                    size={scale(20)}
                                />
                            </View>
                            <Text style={styles.textStyle}>Leaves</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  
                            onPress={() => navigation.navigate(MainRoutes.CalendarScreen) } 
                            style={styles.btnView}>
                            <View style={{width:scale(20), height:scale(20)}} >    
                                <Ionicons 
                                    name="md-briefcase" 
                                    color={colors.dark_primary_color} 
                                    size={scale(16)} 
                                />
                            </View>
                            <Text style={styles.textStyle}>New Openings</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity  
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
                        </TouchableOpacity> */}
              
            </DrawerContentScrollView>
            <TouchableOpacity  
                onPress={() => localSignout() } 
                style={styles.logoutbutton}>
                <View style={{width:scale(20), height:scale(20)}} > 
                    <Entypo 
                        name="log-out" 
                        color={colors.dark_primary_color} 
                        size={scale(20)}
                    />
                </View>  
                <Text style={{...styles.textStyle}}>Log Out</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}
export default DrawerContentt;

const styles = StyleSheet.create({
    MainContent:{
        flex: 1,
        alignSelf:"flex-start",
        backgroundColor:"red"
    },
    drawercontent:{
        padding:scale(10), 
        flex:1,
       width:"100%",
        alignSelf:"flex-start",
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
    },
    logoutbutton:{
        marginLeft:scale(15),
        marginBottom:scale(12),
        flexDirection: 'row',
        alignItems:"center", marginLeft:0,
        paddingBottom:scale(10), 
        paddingLeft:scale(15), 
        backgroundColor:"#fff"
    },
})