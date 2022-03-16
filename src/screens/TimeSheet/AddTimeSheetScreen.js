import React, {useState, useRef} from 'react';
import { ScrollView,View,StyleSheet,Text} from 'react-native';
import moment from 'moment';
import { commonStyles,textStyles } from '../../styles';
import CustomButton from '../../components/Button';
import CalenderInput from '../../components/CalenderInput';
import TimeSheetItem from './TimeSheetItem'
import CustomHeader from '../../components/CustomHeader';
import { scale } from 'react-native-size-matters';
import UpLoadComponent from "../../components/Uploadcomponent"
import WeeklySummary from './Summary';
import Spacer from '../../components/Spacer';
import DrawLine from '../../components/DrawLine';
import { AppScreenWidth } from '../../constants/sacling';
    const AddTimeSheetScreen = ({navigation}) => {
        const [submit , setSubmit] = useState(false)
        const [draft, setDraft] = useState(false)
        const [summerydays, setSummaryDays] = useState([])
        const [errorMessage, setErrorMessage] = useState("")
        let item = {
            "time":"Week starting 07-03-2022",
            "name":"Afftab Amenen",
            "submittedto":"John",
            "status":"Submitted",
            "hours":"40:00:00 Hours"
    
        }
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
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
            if(currDate.isBefore(lastDate)){
                currDate  = currDate.add(-1, "days")
                while(currDate.add(1, 'days').diff(lastDate) < 0) {
                    dates.push(`${currDate.format("MMM")}`+" "+`0${currDate.clone().toDate().getDate()}`.slice(-2));
                }
                setSummaryDays(dates)
                setErrorMessage("")
            }else{
                setErrorMessage("End date must be grater then start date")
            }
            
        
        }
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={false}
                    onPress={() =>  navigation.goBack()}
                    title={"Add TimeSheet"}
                />
               <ScrollView contentContainerStyle={{paddingBottom:scale(100)}} >
               <TimeSheetItem 
                    time={item.time} 
                    name={item.name}
                    submittedto={item.submittedto}
                    status={item.status}
                    hours={item.hours}
                />

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
                <UpLoadComponent />
                <Spacer />
                <DrawLine />
                <Spacer />
                <WeeklySummary summerydays={summerydays} />
                <Spacer />

               
                <View style={{position:"absolute", width:AppScreenWidth,flex:1, bottom:0, height:scale(100)}}> 
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
        );
    };


export default AddTimeSheetScreen;
