import React, { useState } from 'react';
import { Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
import LEAVE from '../../assets/images/Leave.svg'
import Entypo from 'react-native-vector-icons/Entypo'
import { scale, verticalScale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { MainRoutes } from '../../constants/routes';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth, hp, width } from '../../constants/sacling';

           
    const HomeScreen = ({navigation}) => {
   
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={true}
                    onPress={() => navigation.openDrawer()}
                    title={"DashBoard"}
                />
                <View style={{width:AppScreenWidth,marginVertical:scale(5) ,alignItems:"flex-start", alignSelf:"center"}} >
                    <Text style={styles.headingtext} >Welcome !</Text>
                    <Text style={styles.nameText} >Aftab Ameen</Text>
                    <Text style={styles.paragraph} >Streamline your company’s business efficiently managing candidates, jobs and placements</Text>
                </View>
                <View style={styles.main} />
                <View style={styles.row} >
                    <TouchableOpacity 
                        onPress={() => navigation.navigate(MainRoutes.TimeSheetListScreen)} 
                        style={styles.box} >
                        <AntDesign 
                            name="clockcircle" 
                            color={colors.dark_primary_color} 
                            size={scale(50)} 
                        />
                        <Text style={styles.textStyle}>My Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate(MainRoutes.MyExpensesScreen) } 
                        style={styles.box} >
                        <Entypo 
                            name="credit" 
                            color={colors.dark_primary_color} 
                            size={scale(50)} 
                        />
                         <Text style={{...styles.textStyle}}>Expenses</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row} >
                    <TouchableOpacity 
                        onPress={() => navigation.navigate(MainRoutes.LeavesScreen) } 
                        style={styles.box} >
                        <LEAVE width={scale(50)} height={scale(50)} />
                        <Text style={styles.textStyle}>Leaves</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     onPress={() => navigation.navigate(MainRoutes.MyTasksScreen) } 
                        style={styles.box} >
                        <FontAwesome 
                            name="tasks" 
                            color={colors.dark_primary_color} 
                            size={scale(50)} 
                        />
                        <Text style={styles.textStyle}>Tasks</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.main2} >
                    <Text style={styles.paragraph}>
                        Copyright @{new Date().getFullYear()} RecruitBPM All Rights Reserved
                    </Text>
                </View>
               
            </View>
            
        );
    };


export default HomeScreen;

const styles = StyleSheet.create({
    main:{
        height:hp(55),
        width:width*1.2,
        zIndex:-1,
        position:"absolute",
        top:verticalScale(40),
        borderBottomRightRadius:hp(100),
        backgroundColor:colors.dark_primary_color
    },
    main2:{
        height:hp(7),
        width:width,
        zIndex:10,
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:scale(5),
        bottom:scale(-10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        borderTopLeftRadius:hp(3),
        borderTopRightRadius:hp(3),
        backgroundColor:colors.dark_primary_color
    },
    headingtext:{
        ...textStyles.heading,
        fontSize:scale(22), 
        color:"#fff", 
        textAlign:"left"
    },
    nameText:{
        ...textStyles.title,
        fontSize:scale(18),
        marginTop:scale(2), 
        marginHorizontal:scale(5), 
        color:"#fff", 
        textAlign:"left"
    },
    paragraph:{
        ...textStyles.paragraph,
        fontSize:scale(14), 
        color:"#fff", 
        marginTop:scale(2), 
        marginHorizontal:scale(5), 
        textAlign:"left"
    },
    row:{
        width:AppScreenWidth,
        alignSelf:"center",
        flexDirection:"row",
        marginVertical:hp(2),
        justifyContent:"space-evenly"
    },
    box:{
        width:((AppScreenWidth/2)-scale(20)),
        height:((AppScreenWidth/2)-scale(20)),
        backgroundColor:"#fff",
        elevation:10,
        padding:hp(5),
        justifyContent:"center",
        alignItems:"center",
        borderRadius:scale(10),
        borderBottomWidth:3,
        borderWidth:0,
        borderColor:"#fff",
        borderBottomColor:colors.secondary_text_color,
    },
    textStyle: {
        marginTop:scale(10),
        fontFamily:fonts.Medium,
        fontSize:scale(16),
        color: colors.secondary_text_color
    },
})
