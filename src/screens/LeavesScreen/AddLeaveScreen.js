import React, { useState, useEffect } from 'react';
import {ScrollView,TouchableOpacity, Text,View,StyleSheet} from 'react-native';
import CustomButton from '../../components/Button';
import {NativeBaseProvider, Select, Icon } from "native-base";
import { scale, verticalScale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import CustomTextInput from '../../components/TextInput';
import CalenderInput from '../../components/CalenderInput';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth, width } from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import selectStyles from '../../styles/selectStyles';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getpolicylist } from '../../api';
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(1, 'days').format(_format)
    const AddLeaveScreen = ({navigation}) => {
        const [endDate, setEndDate] = useState(_maxDate)
        const {user} = useSelector(state => state.LoginReducer)
        const [startDate, setStartDate] = useState(_today)
        const [policy , setPolicy] = useState([
         
        ])
       
        const [_markedDates, setMarkedDates] = useState({_today})
        const [leaveNote, setLeaveNotes] = useState("")
        const [leavenoteErrorMessage , setLeaveNoteErrorMessage] = useState("")
        const [selected_policy,setselectedPolicy] = useState(null)
        const  [number_of_hours, setNumberofHours] = useState("")
        const [date_error, setDateError] = useState(false)
        useEffect(() => {
            getpolicylist(user.account_id).then((response) => {
                if(response.status === 200){
                    setPolicy(response.data.data);
                }else{
                    console.log(response.status);
                }
            }).catch((err) => {
                console.log(err)
            })
        },[])
        
        
        const filterbydate = (date , is_start) => {
            setDateError(false)
            if(is_start){
                setStartDate(date)
                if(moment(date).isSameOrBefore(moment(endDate))){
                    setDateError(false)
                    let hours =  moment(endDate).diff(moment(date), 'days') * 8
                    setNumberofHours(moment.utc(hours*3600*1000).format('HH:mm'))
                }else{
                        setDateError(true)
                }
            }else{
                setEndDate(date)
                if(moment(startDate).isSameOrBefore(moment(date))){
                    setDateError(false)
                    let hours =  moment(date).diff(moment(startDate), 'days')
                    console.log(hours);
                    setNumberofHours(moment.utc((hours+1)*8*3600*1000).format('HH:mm'))
                }else{
                        setDateError(true)
                }
            }
           
                      
        }
        return (
            <NativeBaseProvider>
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={false}
                        onPress={() => navigation.goBack()}
                        title={"Leave Application"}
                    />
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:verticalScale(100)}}>
                        <Spacer />
                        <CustomTextInput
                            placeholder={'Employee'}
                            value={`${user.first_name} ${user.last_name}`}
                            onChangeText={text => setLeaveNotes(text)}
                            errorMessage={leavenoteErrorMessage}
                            borderRadius={scale(5)}
                            borderWidth={1}
                            editable={false}
                            lableColor={colors.dark_primary_color}
                        />
                     
                    
                  
                        <View>
                            <Text
                                style={{...textStyles.Label , color:colors.dark_primary_color}}>
                                Leave Policy *
                            </Text>
                        
                            <Select
                                selectedValue={selected_policy}
                                opacity={1}
                                bg={"#fff"}
                                width={AppScreenWidth}
                                placeholderTextColor={colors.text_primary_color}
                                fontFamily={fonts.Regular}
                                maxHeight={"10"}
                                variant={"underlined"}
                                accessibilityLabel="Please select policy"
                                placeholder="Please select  policy"
                                _item={selectStyles._item}
                                _selectedItem={selectStyles._selectedItem}
                                onValueChange={(itemValue) => setselectedPolicy(itemValue)}>
                                {
                                    policy.map((item, index) => {
                                        return(
                                            <Select.Item key={`${index}`} label={item.policy_name} value={item.leave_policy_id} />
                                        )
                                    })
                                }
                            </Select>
                        </View>
                        <Spacer  height={scale(10)}  />
                        <View style={{
                                paddingVertical:scale(3),
                                borderWidth:1,
                                borderRadius:5,
                                borderColor:"rgba(0,0,0,.1)"
                            }} >
                            <View style={styles.Row} >
                                <Text style={textStyles.Label} >Total Balance</Text>
                                <Text style={textStyles.Label} >
                                    {
                                        selected_policy === null 
                                        ? 
                                            "00:00:00"
                                        :
                                        policy.filter(function(item){
                                            return item.leave_policy_id === selected_policy
                                        })
                                        .map(function({maximum_leaves}){
                                            return maximum_leaves
                                        })   
                                    } Hours</Text>
                            </View>

                            <View style={styles.Row} >
                                <Text style={textStyles.Label} >Leaves Balance</Text>
                                <Text style={textStyles.Label} >
                                    {
                                        selected_policy === null 
                                        ? 
                                            "00:00:00"
                                        :
                                        policy.filter(function(item){
                                            return item.leave_policy_id === selected_policy
                                        })
                                        .map(function({maximum_leaves}){
                                            return maximum_leaves
                                        })   
                                    } Hours</Text>
                            </View>

                            <View style={styles.Row} >
                                <Text style={textStyles.Label} >Requested Hours</Text>
                                <Text style={textStyles.Label} >
                                    {
                                        selected_policy === null 
                                        ? 
                                            "00:00:00"
                                        :
                                        policy.filter(function(item){
                                            return item.leave_policy_id === selected_policy
                                        })
                                        .map(function({maximum_leaves}){
                                            return maximum_leaves
                                        })   
                                    } Hours</Text>
                            </View>

                            <View style={{...styles.Row, paddingBottom:0, borderBottomWidth:0}} >
                                <Text style={textStyles.Label} >Remaining Balance</Text>
                                <Text style={textStyles.Label} >
                                    {
                                        selected_policy === null 
                                        ? 
                                            "00:00:00"
                                        :
                                        policy.filter(function(item){
                                            return item.leave_policy_id === selected_policy
                                        })
                                        .map(function({maximum_leaves}){
                                            return maximum_leaves
                                        })   
                                    } Hours</Text>
                            </View>
                        </View>
                        <Spacer  height={scale(10)}  />
                  
                        <View style={styles.RowDate} >
                            <CalenderInput 
                                placeholder={"Start Date"}
                                value={startDate}
                                errorMessage={""}
                                w={AppScreenWidth/2-scale(5)}
                                onChangeText={(date) => filterbydate(date , true) }
                            />
                        
                            <CalenderInput 
                                placeholder={"End Date"}
                                value={endDate}
                                errorMessage={""}
                                w={AppScreenWidth/2-scale(5)}
                                onChangeText={(date) => filterbydate(date , false) }
                            />
                        </View>
                        <CustomTextInput
                            placeholder={'Requested Hours'}
                            value={number_of_hours !== "" ?`${number_of_hours} Hours`:""}
                            onChangeText={text => setLeaveNotes(text)}
                            errorMessage={""}
                            borderRadius={scale(5)}
                            borderWidth={1}
                            
                            lableColor={colors.dark_primary_color}
                        />
                        {
                            date_error && 
                            <View style={styles.RowDate}>
                                <Text style={textStyles.errorText} >End date must greater or same then start date </Text>
                            </View>
                        }
                        <CustomTextInput
                            placeholder={'Reason Note'}
                            value={leaveNote}
                            onChangeText={text => setLeaveNotes(text)}
                            errorMessage={leavenoteErrorMessage}
                            borderRadius={scale(5)}
                            borderWidth={1}
                            
                            lableColor={colors.dark_primary_color}
                        />
                
                        <View style={styles.row}>
                            <Text style={{...textStyles.smallheading, fontSize:scale(12)}}>Note: </Text>
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


export default AddLeaveScreen;

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
    Row:{
        flexDirection:"row",
        width:AppScreenWidth, 
        justifyContent:"space-between",
        paddingVertical:scale(3),
        paddingHorizontal:scale(5),
        borderBottomWidth:1,
        borderBottomColor:"rgba(0,0,0,.1)"
    },
    RowDate:{
        flexDirection:"row",
        width:AppScreenWidth, 
        justifyContent:"space-between"
    },
    buleText:{
        ...textStyles.smallheading,
        color:colors.default_primary_color,
        fontSize:scale(10)
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
