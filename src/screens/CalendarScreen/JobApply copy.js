import React, { useEffect, useState } from 'react';
import {SafeAreaView,StyleSheet, FlatList,Text,TouchableOpacity, StatusBar,View} from 'react-native';
import { commonStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { AppScreenWidth, width } from '../../constants/sacling';
    const JobApplyScreen = ({navigation, route}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [job , setjob] = useState(route.params.item)
         useEffect(() => {
            console.log(job,"job");
         },[])
        
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={false}
                        onPress={() => navigation.goBack()}
                        title={job.JobTitle}
                    />
                    <View style={{flex:1}} >
                        <View style={styles.CardView}>
                            <View style={styles.Row}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >Job Title:</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.JobTitle}</Text>
                                </View>
                            </View>
                            <View style={styles.Row}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >Country</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.country_name !== "" && job.country_name !== null ?job.country_name :"-----"}</Text>
                                </View>
                            </View>
                            <View style={styles.Row}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >State:</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.Location !== "" ?job.Location:"------"}</Text>
                                </View>
                            </View>
                            <View style={styles.Row}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >Company</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.company_name !== "" && job.company_name !== null ? job.company_name:"-----"}</Text>
                                </View>
                            </View>
                            <View style={styles.Row}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >Job Type</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.JobType !== "" && job.JobType !== null ?job.JobType :"-----"}</Text>
                                </View>
                            </View>
                            <View style={styles.Row}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >Pay Type</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.pay_type_name !== "" && job.pay_type_name !== null ? job.pay_type_name:"---" }</Text>
                                </View>
                            </View>
                            <View style={styles.Row}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >Contact Name</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.contact_name !== null && job.company_name !== "" ?job.company_name :"-----"}</Text>
                                </View>
                            </View>
                            <View style={{...styles.Row, borderBottomWidth:0}}>
                                <View style={styles.ColumnLeft} >
                                    <Text style={textStyles.title} >Description</Text>
                                </View>
                                <View style={styles.ColumnRight} >
                                    <Text style={textStyles.title} > {job.job_description !== "" && job.job_description !== null ?job.job_description :"-----"}</Text>
                                </View>
                            </View>
                           
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            
        );
    };


export default JobApplyScreen;

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

