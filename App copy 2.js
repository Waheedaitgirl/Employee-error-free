import React, { useEffect, useState } from 'react';
import {StatusBar,ScrollView,TouchableOpacity,StyleSheet, View,Text} from 'react-native';
import moment from 'moment';
import { commonStyles,textStyles } from './src/styles';
import CustomHeader from './src/components/CustomHeader';
import { scale } from 'react-native-size-matters';
import CalenderInput from './src/components/CalenderInput';
import { AppScreenWidth, width } from './src/constants/sacling';
import { colors, fonts } from './src/constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
    const WelcomeScreen = ({navigation}) => {
        const [endDate, setEndDate] = useState("")
        const [week_days , setWeekDays] = useState([])
        const [time_type , setTimeType] = useState([
            {
                name:"Standrad Time"
            }
        ])
        const [working_days , set_working_days] = useState({"second-day":"1","third-day":"1","fourth-day":"1","fifth-day":"1","sixth-day":"1"})
        const [w_array, set_w_array] = useState([])
        const [alldata, setAlldata] = useState([])
        useEffect(() => {
            let arr2 = Object.entries(working_days)
            set_w_array(arr2.map(([day, value]) => ({day, value })));
        },[])

        function getISOWeekDates(isoWeekNum = 1, year = new Date().getFullYear()) {
            let d = moment().isoWeek(0).startOf('isoWeek').add(isoWeekNum - 1, 'weeks');
            for (var dates=[], i=0; i < 7; i++) {
              dates.push(d.format('ddd DD MMM'));
              d.add(1, 'day');
            }
            return dates;
        }

       
        const getNumberofdays = async (date) => {
            const weekNumber = moment(date).format("w");
            let weekdays =  await getISOWeekDates(weekNumber)
            setWeekDays(weekdays)
            setEndDate(date)
           
            setAlldata([[...weekdays]])
          
        }

        const add = () => {
            let t_type = [...time_type]
            t_type.push({name:`Testing ${time_type.length +1}`})
            setTimeType(t_type)
            let temp  = [...alldata]
            temp.push(week_days)
         
            setAlldata(temp)
        }

        const check = () => {
            console.log(alldata);
        }
        const deleteItem = (index) => {
            let temp  = [...alldata]
             temp.splice(index)
             setAlldata(temp)
        }
        return (
            <ScrollView contentContainerStyle={{alignItems:"center"}} >
                <StatusBar backgroundColor={colors.dark_primary_color} />
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={true}
                    onPress={() => navigation.openDrawer()}
                    title={"App"}
                />
                <CalenderInput 
                    placeholder={"Select Date"}
                    value={endDate}
                    errorMessage={""}
                    w={AppScreenWidth/2-scale(5)}
                    onChangeText={(data) => getNumberofdays(data) }
                />
                <View style={{height:scale(20)}} />
                {
                    alldata.map((item, index) => {
                        
                        return(
                            <View style={{minHeight:120,flex:1 ,borderRadius:5, borderWidth:1, padding:10, margin:5, width:width-10,marginVertical:10,}}>
                                <View style={{flexDirection:"row"}}>
                                    <View 
                                        style={styles.type}>
                                            <Text style={styles.type_text} >{time_type[index].name}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => deleteItem(index)}
                                        style={{...styles.type,width:50,borderWidth:0, backgroundColor:"red"}}>
                                           <MaterialCommunityIcons name={'delete'} color={"#fff"} size={24} />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView 
                                showsHorizontalScrollIndicator={false}
                                    horizontal={true} 
                                    contentContainerStyle={{flexDirection:"row"}} >
                                    {
                                        item.map((item, index) => {
                                            let magenicVendors = false
                                            if(index === 0){
                                                magenicVendors = w_array.some(item => item['day'] === 'first-day')
                                            }
                                            if(index === 1){
                                                magenicVendors = w_array.some(item => item['day'] === 'second-day')
                                            }
                                            if(index === 2){
                                                magenicVendors = w_array.some(item => item['day'] === 'third-day')
                                            }
                                            if(index === 3){
                                                magenicVendors = w_array.some(item => item['day'] === 'fourth-day')
                                            }
                                            if(index === 4){
                                                magenicVendors = w_array.some(item => item['day'] === 'fifth-day')
                                            }
                                            if(index === 5){
                                                magenicVendors = w_array.some(item => item['day'] === 'sixth-day')
                                            }
                                            if(index === 6){
                                                magenicVendors = w_array.some(item => item['day'] === 'seventh-day')
                                            }
                                        
                                            
                                                return(
                                                    <View key={`${index}`} 
                                                        style={{...styles.input,  backgroundColor:magenicVendors?"green":"gray",}} >
                                                        <Text  style={{...textStyles.Label, color:"#fff"}} >{item}</Text>
                                                    </View>
                                                )
                                        
                                        })
                                    }
                                </ScrollView> 
                            </View>
                        )
                    })
                }
             
                <TouchableOpacity 
                disabled={alldata.length < 1 ?true :false}
                    onPress={() => add()}
                    style={{...styles.add, backgroundColor:alldata.length < 1 ?"gray" :"green"}}>
                        <Text style={styles.text} >Add</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => check()}
                    style={styles.add}>
                        <Text style={styles.text} >check</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };


export default WelcomeScreen;

const styles = StyleSheet.create({
    type:{
        width:120, marginHorizontal:10,
        justifyContent:"center",
        alignItems:"center", 
        height:40, 
        borderRadius:5,
        borderWidth:1,
        borderColor:"rgba(0,0,0,1)",
        backgroundColor:"rgba(0,0,0,.1)"
    },
    type_text:{
        color:colors.dark_primary_color, 
        fontFamily:fonts.Medium
    },
    input:{
        width:120, 
        height:40,
        padding:10,
        borderRadius:5,
        justifyContent:"center", 
        alignItems:"center", 
        margin:10
    },
    add:{
        width:100,
        justifyContent:"center",
        alignItems:"center", 
        height:40, 
        borderRadius:5,
        marginTop:10,
        borderColor:1, 
        backgroundColor:"green"
    },
    text:{
        color:colors.white, 
        fontFamily:fonts.Medium 
    }
})
