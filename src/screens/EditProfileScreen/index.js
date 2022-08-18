import React, { useEffect, useState } from 'react';
import {SafeAreaView,StatusBar, Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth, hp, width } from '../../constants/sacling';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GeneralProfileScreen from './GeneralProfileScreen';
import ListCertificateScreen from './ListCertificateScreen';
import AddEducationScreen from './AddEducationScreen';
import AddExperienceScreen from './AddExperienceScreen';

    const EditProfileScreen = ({navigation}) => {
        const Tab = createMaterialTopTabNavigator();
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        onPress={() => navigation.openDrawer()}
                        title={"Edit Profile"}
                    />
                    <View
                        style={{
                            height: hp(93),
                            backgroundColor: '#fff',
                            alignSelf: 'center',
                        }}>
                        <Tab.Navigator
                            screenOptions={{
                            activeTintColor: '#50d3a7',
                            inactiveTintColor: 'gray',
                            tabBarScrollEnabled: true,
                            swipeEnabled:false,
                            tabBarIndicatorStyle: {
                                backgroundColor: colors.dark_primary_color,
                                height: 2,
                            },
                            tabBarLabelStyle: {
                                fontSize: scale(12),
                                fontFamily: fonts.Medium,

                                textTransform: 'none',
                            },
                            tabBarItemStyle: {
                                width: 120,
                                padding: 0,
                                paddingTop: 0,

                                borderRadius: 100,
                            },
                            tabBarStyle: {
                                backgroundColor: 'white',
                            },
                            }}
                            sceneContainerStyle={{
                                backgroundColor: 'white',
                            }}>
                            <Tab.Screen
                                name={'GeneralProfileScreen'}
                                children={() =>  <GeneralProfileScreen/>}
                                options={{tabBarLabel: 'General'}}
                            />
                          
                            <Tab.Screen
                                name={'AddEducationScreen'}

                                children={() =>  <AddEducationScreen />}
                                options={{tabBarLabel: 'Education'}}
                            />
                            <Tab.Screen
                                name={'AddExperienceScreen'}
                                children={() =>  <AddExperienceScreen />}
                                options={{tabBarLabel: 'Experience'}}
                            />
                              <Tab.Screen
                                name={'ListCertificateScreen'}
                                children={() =>  <ListCertificateScreen />}
                                options={{tabBarLabel: 'Certificate'}}
                            />
                        </Tab.Navigator>
                    </View>
                </View>
            </SafeAreaView> 
        );
    };


export default EditProfileScreen;

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
        height:hp(5),
        width:width,
        zIndex:10,
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:scale(5),
        bottom:scale(0),
     
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
        fontSize:scale(12), 
        color:"#fff", 
       includeFontPadding:false,
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
        fontSize:scale(14),
        color: colors.secondary_text_color
    },
})
