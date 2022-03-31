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
        const [week_days , setWeekDays] = useState([])
        const [alldata, setAlldata] = useState([])
        const [startDate, setStartDate] = useState("")
        const [loading, setLoading ] = useState(true)
        const [jobs , setJobs] = useState([])
        const [time_sheet_type , set_time_sheet_type] = useState("Week")
        const [time_type , setTimeType] = useState([])
        const [date_error_message , setDateErrorMessage] = useState(null)
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
            getJobWorkingDays(user.account_id, selected_job).then((response) => {
                if(response.status === 200){
                    // convert object to two dimentional arrays ,
                    let arr2 = Object.entries(response.data.data[0].working_days_config)
                     // convert twodmnentional arra to one dimentional array
                    set_job_working_days(arr2.map(([day, value]) => ({day, value })));
                  
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
       

        
        function getISOWeekDates(isoWeekNum = 1, year = new Date().getFullYear()) {
            let d = moment().isoWeek(0).startOf('isoWeek').add(isoWeekNum - 1, 'weeks');
            for (var dates=[], i=0; i < 7; i++) {
              dates.push(d.format('ddd DD MMM'));
              d.add(1, 'day');
            }
            return dates;
        }

        const localTimeType = (val,index) => {
                let temp  = [...time_type] ;
                temp[index].name = val
                setTimeType(temp)
        }
        const getNumberofdays = async (date) => {
            
            if(time_sheet_type === "Week"){
                const weekNumber = moment(date).format("w");
                let weekdays =  await getISOWeekDates(weekNumber)
                setWeekDays(weekdays)
                setStartDate(date)
                let t_type = [...time_type]
                t_type.push({name:null})
                setTimeType(t_type)
                setAlldata([[...weekdays]])
            }else{
                const weekdays = moment(date).format('ddd DD MMM');
                setWeekDays(weekdays)
                setStartDate(date)
                let t_type = [...time_type]
              
                t_type.push({name:null})
                setTimeType(t_type)
                setAlldata([[weekdays]])
            }
           
          
        }

        const FunsetHours = (index, text) => {
            let temparray = [...summerydays]
            temparray[index].hours =  text
            setSummaryDays(temparray)
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

        const addButton = () => {
            if(startDate == ""){
                setDateErrorMessage("Please select date first")
                return;
            }
            setDateErrorMessage(null)
            if(time_sheet_type === "Week"){
                let t_type = [...time_type]
                t_type.push({name:null})
                setTimeType(t_type)
                let temp  = [...alldata]
                temp.push(week_days)
                setAlldata(temp)
            }else{
                let t_type = [...time_type]
                t_type.push({name:null})
                setTimeType(t_type)
                let temp  = alldata
                temp.push([week_days])
                setAlldata(temp)
            }
           
        }

        const deleteItem = (index) => {
            let temp  = [...alldata]
             temp.splice(index, 1)
             setAlldata(temp)
             let t_type = [...time_type]
             t_type.splice(index, 1)
             setTimeType(t_type)
        }

        const changeTab = async (value) => {
            if(startDate == ""){
                setDateErrorMessage("Please select date first")
                return;
            }
            set_time_sheet_type(value)
            setDateErrorMessage(null)
            if(time_sheet_type === "Week"){
                const weekNumber = moment(startDate).format("w");
                let weekdays =  await getISOWeekDates(weekNumber)
                setWeekDays(weekdays)
                setAlldata([])
                setTimeType([])
                
            }else{
                const weekdays = moment(startDate).format('ddd DD MMM');
                setWeekDays(weekdays)
                setAlldata([])
                setTimeType([])
              
            }
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
                    <View style={styles.Row} >
                        <View>
                            <Text
                                style={styles.label}>
                                Select Job
                            </Text>
                            <Spacer height={scale(3)} />
                            <Select
                                selectedValue={selected_job}
                                width={AppScreenWidth/2-scale(5)}
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
                        <View>
                            <Text
                                style={styles.label}>
                                Select Date
                            </Text>
                           
                            <CalenderInput 
                                placeholder={"Start Date"}
                                value={startDate}
                                errorMessage={""}
                                w={AppScreenWidth/2-scale(5)}
                                show_label={false}
                                hght={scale(40)}
                                onChangeText={(data) => getNumberofdays(data) }
                            />
                        </View>
                        
                    </View>
                    <Spacer />
                    <View> 
                        <Text
                            style={styles.label}>
                            Select TimeSheet Type
                        </Text>
                        <Spacer height={scale(3)} />
                        <View style={{...styles.tabview,}} >
                            <TouchableOpacity 
                                onPress={() => changeTab("Day")}
                                style={{
                                    ...styles.tabitem,
                                    backgroundColor:time_sheet_type === "Day"?colors.dark_primary_color:"#fff",
                                    borderRightWidth:1}} >
                                    <Text  style={styles.label}>Day</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => changeTab("Week")}
                                style={{
                                    ...styles.tabitem,
                                    backgroundColor:time_sheet_type === "Week"?colors.dark_primary_color:"#fff",
                                    }} >
                                <Text  style={styles.label}>Week</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            date_error_message !== null &&
                            <Text
                                style={{...textStyles.errorText, marginTop:scale(3)}}>
                                {date_error_message}
                            </Text>
                        }
                    </View>
                    
                    <ScrollView contentContainerStyle={{paddingBottom:scale(100)}} >
                      
                         <Spacer />
                            <WeeklySummary 
                                editable={true}
                                job_time_types={job_time_types}
                                alldata={alldata}
                                setHours={(index, text) => FunsetHours(index, text)}                
                                summerydays={summerydays}
                                time_type={time_type}
                                job_working_days={job_working_days}
                                deleteItem={(i) => deleteItem(i)}
                                localTimeType={(val,i) => localTimeType(val,i)}
                            />  
                          <Spacer />  
                        <TouchableOpacity 
                            onPress={() => addButton()}
                            style={styles.button} >
                                  <AntDesign name={"plus"} size={scale(16)} color={"#fff"} />
                                <Text style={styles.text} >Add</Text>
                        </TouchableOpacity>
                       
                        <Spacer />
                        <DrawLine />
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
                {
                loading && <BlockLoading/>}
            </NativeBaseProvider>
        );
    };


export default AddTimeSheetScreen;


const styles = StyleSheet.create({
    Row:{
        flexDirection:"row",
        width:AppScreenWidth, 
        alignItems:"flex-end",
        justifyContent:"space-between",
        marginTop:5
    },
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
    text:{
        ...textStyles.smallheading,
        backgroundColor:"#0000",
        alignSelf:"flex-start", 
        includeFontPadding:false,
        color:"#fff",
        marginLeft:scale(5),
        textAlign:"left"
    },
    label:{
        ...textStyles.smallheading , 
        fontSize:scale(12),
        color:colors.text_primary_color,
       
    },
    bottomButtons:{
        position:"absolute", 
        width:AppScreenWidth,
        flex:1,
        bottom:0, 
        height:scale(100)
    },
   
    tabview:{
       
        flexDirection:"row",
        width:AppScreenWidth, 
        alignItems:"flex-end",
        justifyContent:"space-between",
        height:42, 
        borderRadius:5,
        borderWidth:1,
        overflow:"hidden",
        borderColor:colors.divide_color,
        backgroundColor:"#fff" 
    },
    tabitem:{
        width:AppScreenWidth/2, 
        justifyContent:"center",
        alignItems:"center",
        height:40, 
        borderRadius:0,
        borderWidth:0,
        borderColor:colors.divide_color,
        backgroundColor:"#fff"  
    }
})