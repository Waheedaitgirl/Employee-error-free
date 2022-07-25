import React, { useEffect, useState } from 'react';
import {SafeAreaView,StyleSheet, FlatList,Text,TouchableOpacity, StatusBar,View} from 'react-native';
import { commonStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { getJobs } from '../../api';
import { AppScreenWidth, width } from '../../constants/sacling';
    const CalendarScreen = ({navigation}) => {
    const [jobs , setJobs] = useState([])
        const {user} = useSelector(state => state.LoginReducer)
         useEffect(() => {
            getJobs(user.account_id).then((response) => {
                if(response.status === 200){
                    setJobs(response.data.result);
                }else{
                    alert("Error")
                }
            }).catch((err) => {
                console.log(err);
            })
         },[])
        
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        onPress={() => navigation.openDrawer()}
                        title={"New jobs opening"}
                    />
                    <View style={{flex:1}} >
                        <FlatList 
                            data={jobs}
                            keyExtractor={item => `${item.job_publish_id}${item.item_id}`}
                            renderItem={({item, index}) => {
                                return(
                                    <View style={styles.CardView}>
                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Job Title:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} > {item.JobTitle}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Job Type:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} >{item.JobType}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Location:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} >{item.Location}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.Row}>
                                            <View style={styles.ColumnLeft} >
                                                <Text style={textStyles.title} >Date:</Text>
                                            </View>
                                            <View style={styles.ColumnRight} >
                                                <Text style={textStyles.title} >{item.Date}</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity 
                                            onPress={() => navigation.navigate("JobApplyScreen", {item:item})}
                                            style={styles.button}>
                                           
                                            <Text style={{...textStyles.Label, color:"#fff"}} >Apply</Text>
                                          
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
            
        );
    };


export default CalendarScreen;

const styles = StyleSheet.create({
    CardView:{
        backgroundColor:"#fff",
        overflow:"hidden",
        width:width-10, 
        margin:5, 
        borderWidth:2, 
        borderRadius:5,  
        alignSelf:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    Row:{
        flexDirection:"row",
        borderBottomWidth:1,
    },
    ColumnLeft:{
        width:AppScreenWidth/2,
        paddingVertical:5, 
        paddingHorizontal:10, 
        borderRightWidth:1
    },
    ColumnRight:{
        width:AppScreenWidth/2, 
        paddingVertical:5, 
        paddingHorizontal:10
    },
    button:{
        width:width-14,
        justifyContent:"center",
        backgroundColor:colors.dark_primary_color,
        padding:10, 
        alignItems:"center", 
        flex:1, 
        borderBottomWidth:0
    }
})

