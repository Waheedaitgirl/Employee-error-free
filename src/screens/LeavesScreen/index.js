import React,{useEffect, useState} from 'react';
import { FlatList,SafeAreaView,Image,StyleSheet, View,ActivityIndicator,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CalenderInput from '../../components/CalenderInput';
import { commonStyles } from '../../styles';
import CustomHeader from '../../components/SearchHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../constants/theme';
import { MainRoutes } from '../../constants/routes';
import { AppScreenWidth } from '../../constants/sacling';
import { useSelector } from 'react-redux';
import Spacer from '../../components/Spacer';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { getLeavesList } from '../../api';
import LeaveCard from './LeaveCard'
    const HomeScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [data, setData] = useState([])
        const [filterdata, setFilterData] = useState([])
        const [loading, setLoading] = useState(true)
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const [error, setError] = useState(false)
        const isFocused = useIsFocused();
        useEffect(() => {
           gelocallist()
        },[isFocused])

        const gelocallist = () => {
            getLeavesList(user.account_id, user.candidate_id).then((response) => {
                if(response.status === 200){
                    setData(response.data.data);
                    setFilterData(response.data.data);
                  
                }
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                setError(true)
                console.log(err);
            })
        }
        

        const FilterByTitle = (title) => {
            let se = title.toLowerCase()
            const regex = new RegExp(`${se}`);
            let draft_data = data.filter(function(item){ 
                return item.job_title.toLowerCase().match(regex) || item.expense_report_title.toLowerCase().match(regex) ||  item.module_status_name.toLowerCase().match(regex)
             })
             setFilterData(draft_data)
        }

        const renderItem = ({ item }) => (
            <LeaveCard 
               item={item}
               onPress={() => navigation.navigate(MainRoutes.EditLeaveScreen, {item})}
            />
        ); 

        if(loading){
            return(  
                <SafeAreaProvider>
                <CustomStatusBar />
                <SafeAreaView style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        SearchPress={(text) => FilterByTitle(text)}
                        NotificationPress={() => alert("NotificationPress")}
                        FilterPress={(data) => alert(data)}
                        onPress={() => navigation.openDrawer()}
                        title={"Leaves List"}
                    />
                    <Spacer height={verticalScale(100)} />
                    <ActivityIndicator size={"large"} color={colors.dark_primary_color} />
                </SafeAreaView>
                </SafeAreaProvider>
            )
            }
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                 <CustomStatusBar />
                <View style={commonStyles.container} >
                     <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        SearchPress={(text) => FilterByTitle(text)}
                        NotificationPress={() => alert("NotificationPress")}
                        FilterPress={(data) => alert(data)}
                        onPress={() => navigation.openDrawer()}
                        title={"Leaves List"}
                    />
                    <View style={{flexDirection:"row",width:AppScreenWidth, justifyContent:"space-between"}} >
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
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={filterdata}
                        renderItem={renderItem}
                        maxToRenderPerBatch={20}
                        updateCellsBatchingPeriod={80}
                        initialNumToRender={20}
                        windowSize={35}
                        bounces={false}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => {

                            return(
                                <View style={{alignSelf:"center",marginTop:verticalScale(150), flex:1, justifyContent:"center", alignItems:"center"}} >
                                    {
                                        error
                                    ?
                                    <Image 
                                        source={require("../../assets/images/error.gif")}
                                        style={{
                                            width:verticalScale(150), 
                                            height:verticalScale(150),
                                            resizeMode:"contain"
                                        }} 
                                    />
                                    :
                                    <Image 
                                        source={require("../../assets/images/norecord.gif")}
                                        style={{
                                            width:verticalScale(150), 
                                            height:verticalScale(150),
                                            resizeMode:"contain"
                                        }} 
                                    />
                        }
                                </View>
                            )
                        }}
                    />
                    <TouchableOpacity 
                        onPress={() => navigation.navigate(MainRoutes.AddLeaveScreen)}
                        style={{
                            alignSelf:"flex-end", 
                            paddingHorizontal:scale(20), 
                            paddingVertical:scale(10),
                            position:"absolute",
                            bottom:scale(55)
                        }}>
                        <AntDesign name={"pluscircle"} size={scale(35)} color={colors.dark_primary_color} />
                </TouchableOpacity>
                </View>
            </SafeAreaView>
            
        );
    };


export default HomeScreen;

