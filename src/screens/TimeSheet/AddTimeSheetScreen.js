import React, {useEffect, useState} from 'react';
import {ScrollView,View,StyleSheet, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/FontAwesome'
import { commonStyles,selectStyles, textStyles } from '../../styles';
import {NativeBaseProvider, Select } from "native-base";
import CustomButton from '../../components/Button';
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from '../../components/CustomHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import UpLoadComponent from "../../components/Uploadcomponent"
import WeeklySummary from './AddSummary';
import Spacer from '../../components/Spacer';
import DrawLine from '../../components/DrawLine';
import { AppScreenWidth } from '../../constants/sacling';
import { colors, fonts } from '../../constants/theme';
import BlockLoading from '../../components/BlockLoading';
import { getJobWorkingDays, jobTimeTypes, listCandidateJobs } from '../../api';
    const AddTimeSheetScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [submit , setSubmit] = useState(false)
        const [draft, setDraft] = useState(false)
        const [selected_job,set_selected_job] = useState(null)
        const [job_working_days , set_job_working_days] = useState(null)
        const [job_time_types, set_job_time_types] = useState([])
        const [summerydays, setSummaryDays] = useState([])
        const [errorMessage, setErrorMessage] = useState("")
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const [loading, setLoading ] = useState(true)
        const [jobs , setJobs] = useState([])
        
        useEffect(() => {
            listCandidateJobs(user.account_id, user.candidate_id).then((response) => {
                setJobs(response.data.data);
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        },[])
     
        const getJobtimetype = () => {
            setLoading(true)
            getJobWorkingDays(1, 606).then((response) => {
                if(response.status === 200){
                    set_job_working_days(response.data.data);
                }else{
                    alert("Some Error")
                }
            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
            jobTimeTypes(user.account_id, selected_job).then((response) => {
                if(response.status === 200){
                    set_job_time_types(response.data.data);
                }else{
                    alert("Some Error")
                }
               
                setLoading(false)
            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
        }
        const DraftSave = () => {
            setDraft(true)
            setTimeout(() =>{
                setDraft(false)
            },2000)
        }

        const Submit = () => {
            setSubmit(true)
            setTimeout(() =>{
                setSubmit(false)
            },2000)
        }

        const getNumberofdays = (date) => {
            setEndDate(date)
            var dates = [];
            var currDate = moment(startDate).startOf('day');
            var lastDate = moment(date).startOf('day');
           
            if(currDate.isSameOrBefore(lastDate)){
                while(currDate.diff(lastDate) < 1) {
                    dates.push({date:currDate, hours:null} );
                    currDate  = currDate.add(1, "days")
                }
                setSummaryDays(dates)
                setErrorMessage("")
            }else{
                setSummaryDays([])
                setErrorMessage("End date must be grater then start date")
            }
        }

        const FunsetHours = (index, text) => {
            let temparray = [...summerydays]
            temparray[index].hours =  text
            setSummaryDays(temparray)
        }
       
        return (
            <NativeBaseProvider>
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={false}
                        onPress={() =>  navigation.goBack()}
                        title={"Add TimeSheet"}
                    />
                    <View>
                        <Text
                            style={styles.label}>
                            Select Job
                        </Text>
                            <Spacer  height={scale(5)}  />
                            <Select
                                selectedValue={selected_job}
                                width={AppScreenWidth}
                                placeholderTextColor={colors.text_primary_color}
                                fontFamily={fonts.Regular}
                                maxHeight={"10"}
                                accessibilityLabel="Please select type"
                                placeholder="Please select  type"
                                _item={selectStyles._item}
                                _selectedItem={selectStyles._selectedItem}
                             
                                onValueChange={(itemValue) => {
                                  
                                    set_selected_job(itemValue)
                                    getJobtimetype()
                                    }}>
                                {
                                    jobs.map((item, index) => {
                                        return(
                                            <Select.Item key={`${item.job_id}`} label={item.job_title} value={item.job_id} />
                                        )
                                    })
                                }
                            </Select>
                    </View>
                    <ScrollView contentContainerStyle={{paddingBottom:scale(100)}} >
                        <View style={{flexDirection:"row",width:AppScreenWidth, justifyContent:"space-between"}} >
                            <CalenderInput 
                                placeholder={"Start Date"}
                                value={startDate}
                                errorMessage={""}
                                w={AppScreenWidth/2-scale(5)}
                                onChangeText={(data) => setStartDate(data) }
                            />
                        
                            <CalenderInput 
                                placeholder={"End Date"}
                                value={endDate}
                                errorMessage={""}
                                w={AppScreenWidth/2-scale(5)}
                                onChangeText={(data) => getNumberofdays(data) }
                            />
                        </View>
                        <Spacer />
                        <DrawLine />
                        <Spacer />
                        <WeeklySummary 
                            editable={true}
                            job_time_types={job_time_types}
                            setHours={(index, text) => FunsetHours(index, text)}                
                            summerydays={summerydays}
                        />  
                          <Spacer />  
                        <TouchableOpacity 
                            style={styles.button} >
                                  <AntDesign name={"plus"} size={scale(16)} color={"#fff"} />
                                <Text style={styles.text} >Add</Text>
                        </TouchableOpacity>
                        <Spacer />

                        <Spacer />
                        <UpLoadComponent />
                        <Spacer />
                        <DrawLine />
                        <Spacer />
                    <View style={styles.bottomButtons}> 
                        <CustomButton
                            loading={submit}
                            loadingText={"Submitting"}
                            onPress={() => Submit()}
                            backgroundColor={"#0073B4"}
                            text={"Submit"}
                            marginTop={scale(10)}
                        />
                        <Spacer />
                        <CustomButton
                            loading={draft}
                            loadingText={"Saving"}
                            onPress={() =>DraftSave() }
                            text={"Save as a Draft"}
                            marginTop={scale(10)}
                        />
                    </View>
                    </ScrollView>
                
                </View>
                {loading && <BlockLoading/>}
            </NativeBaseProvider>
        );
    };


export default AddTimeSheetScreen;


const styles = StyleSheet.create({
    button:{
        backgroundColor:"green",
        padding:scale(10),
        width:scale(100),
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
        alignSelf:"flex-start",
        borderWidth:1,
        
        borderColor:"rgba(0,0,0,.3)",
        borderRadius:scale(5)
    },
    label:{
        ...textStyles.smallheading , 
        color:colors.dark_primary_color,
        paddingTop:scale(5)
    },
    bottomButtons:{
        position:"absolute", 
        width:AppScreenWidth,
        flex:1,
        bottom:0, 
        height:scale(100)
    },
    text:{
        ...textStyles.smallheading,
        backgroundColor:"#0000",
        alignSelf:"flex-start", 
        includeFontPadding:false,
        color:"#fff",
        marginLeft:scale(5),
        textAlign:"left"
    },
})