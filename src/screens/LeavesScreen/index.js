import React, { useState } from 'react';
import {ScrollView,TouchableOpacity, Text,View,StyleSheet} from 'react-native';
import CustomButton from '../../components/Button';
import {NativeBaseProvider, Select, Icon } from "native-base";
import { scale, verticalScale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import CustomTextInput from '../../components/TextInput';
import PickerInput from '../../components/PickerInput';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth, width } from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import selectStyles from '../../styles/selectStyles';
import LeaveCard from './LeaveCard'
import { Calendar, } from 'react-native-calendars'
import moment from 'moment';
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(100, 'days').format(_format)
    const LeaveScreen = ({navigation}) => {
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const [type , setType] = useState([
            {id:1, name:"Skiness", value:"food"},
            {id:2, name:"Emergency", value:"lunch"},
            {id:2, name:"Leave 3", value:"dinner"},
            {id:2, name:"Leave 4", value:"breakfast"},
            {id:2, name:"Leave 5", value:"transport"},
        ])
        let item = {
            "time":"Week starting 07-03-2022",
            "name":"Afftab Amenen",
            "submittedto":"John",
            "status":"Submitted",
            "hours":"40:00:00 Hours"
    
        }
        const [_markedDates, setMarkedDates] = useState({_today})
        const [selectedDates, setSelectdates] = useState([])
        const onDaySelect = (day) => {
            let temp = [...selectedDates]
            const _selectedDay = moment(day.dateString).format(_format);
            
            let selected = true;
            if (_markedDates[_selectedDay]) {
                delete temp[_selectedDay]
                selected = !_markedDates[_selectedDay].selected;
            }else{
                temp.push(_selectedDay)
                setSelectdates(temp)
            }
            const updatedMarkedDates = {..._markedDates, ...{ [_selectedDay]: { selected} } }
            
        
            setMarkedDates(updatedMarkedDates);
        }
        const [leaveNote, setLeaveNotes] = useState("")
        const [leavenoteErrorMessage , setLeaveNoteErrorMessage] = useState("")
        const [selected_type,setselectedType] = useState(false)
        const [attachment , setAttachment]= useState("")
        const [attachmenterror , setAttachmentError]= useState("")
        return (
            <NativeBaseProvider>
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}onPress={() => navigation.openDrawer()}
                        title={"Leave Application"}
                    />
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:verticalScale(100)}}>
                    <LeaveCard 
                        time={item.time} 
                        name={item.name}
                        submittedto={item.submittedto}
                        status={item.status}
                        hours={item.hours}
                    />
                    <Calendar
                        style={{width:AppScreenWidth,borderRadius:scale(10) }}
                       
                      
                        minDate={_today}
                        maxDate={_maxDate}
                        onDayPress={onDaySelect}
                        markedDates={_markedDates}
                    />
                   
                    <Spacer />
                    <View>
                        <Text
                            style={{...textStyles.smallheading , color:colors.dark_primary_color}}>
                            Leave Type
                        </Text>
                        <Spacer  height={scale(5)}  />
                        <Select
                            selectedValue={selected_type}
                            opacity={1}
                            bg={"#fff"}
                            width={AppScreenWidth}
                            placeholderTextColor={colors.text_primary_color}
                            fontFamily={fonts.Regular}
                            maxHeight={"10"}
                            variant={"underlined"}
                            accessibilityLabel="Please select type"
                            placeholder="Please select  type"
                            _item={selectStyles._item}
                            _selectedItem={selectStyles._selectedItem}
                            onValueChange={(itemValue) => setselectedType(itemValue)}>
                            {
                                type.map((item, index) => {
                                    return(
                                        <Select.Item key={`${index}`} label={item.name} value={item.name} />
                                    )
                                })
                            }
                        </Select>
                    </View>
                    <CustomTextInput
                        placeholder={'Leave Note'}
                        value={leaveNote}
                        onChangeText={text => setLeaveNotes(text)}
                        errorMessage={leavenoteErrorMessage}
                    />
                     <PickerInput
                        placeholder={'Attachment'}
                        value={attachment}
                        onChangeText={text => setAttachment(text)}
                        errorMessage={attachmenterror}
                    />
                    <View style={styles.row}>
                        <Text style={textStyles.smallheading}>Note: </Text>
                        <Text style={{...styles.buleText,width:AppScreenWidth-scale(40)}} >These employees will be notified through email when your leave request is approved</Text>
                    </View>
                    
                    </ScrollView>
                    <View 
                        style={styles.BottomView}>
                        <CustomButton 
                            onPress={() => navigation.goBack()}
                            loading={false}
                            text={"Submit Application"}
                            loadingText={"Processing"}
                        />
                    </View>
                </View>
            </NativeBaseProvider>
            
        );
    };


export default LeaveScreen;

const styles = StyleSheet.create({
    dateView:{
        flexDirection:"row",
        width:AppScreenWidth, 
        justifyContent:"space-between"
    },
    BottomView:{
        alignSelf:"center", 
        paddingHorizontal:scale(20), 
        paddingVertical:scale(10),
        position:"absolute",
        backgroundColor:"#fff",
        bottom:0
    },
    row:{
        flexDirection:"row",
        marginTop:scale(2),
       
        width:AppScreenWidth,
    },
    buleText:{
        ...textStyles.smallheading,
         color:colors.default_primary_color
    },
    calenderButton:{
        width:scale(30),
        backgroundColor:"rgba(0,0,0,.1)",
        height:scale(30),
        borderRadius:scale(5),
        justifyContent:"center",
        alignItems:"center"
    }
})
