import React,{useEffect, useState} from 'react';
import { FlatList,SafeAreaView,Image, View,ActivityIndicator,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CalenderInput from '../../components/CalenderInput';
import { commonStyles } from '../../styles';
import CustomHeader from '../../components/SearchHeader';
import ExpansesItem from './ExpansesCard';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../constants/theme';
import { MainRoutes } from '../../constants/routes';
import { AppScreenWidth } from '../../constants/sacling';
import { useSelector } from 'react-redux';
import Spacer from '../../components/Spacer';
import { getExpenseslist } from '../../api';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import moment from 'moment';

    const AllExpenseScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const [data, setData] = useState([])
        const [loading, setLoading ] = useState(true)
        const [error, setError] = useState(false)
        const [error_message , setErrorMessage] = useState("")
        useEffect(() => {
            getExpensesList()
        },[])

        getExpensesList = () => {
            setLoading(true)
            getExpenseslist(user.account_id, user.candidate_id)
            .then((response) => {
                if(response.status == 200){
                    setData(response.data.data);
                    setLoading(false)
                }else{
                    console.log("Some Error",response.status);
                    setError(true)
                    setLoading(false)
                    setErrorMessage('Some Error Ocured with status code'+ response.status)
                }
            }).catch((error) => {
                console.log(error ,"error");
              
                setLoading(false)
                setError(true)
                setLoading(false)
                setErrorMessage('Some Error Ocured with status code 200')
            })
        }

        const renderItem = ({ item }) => (
            <ExpansesItem 
                item={item}
                billtype={item.expense_report_title} 
                company={item.type} 
                status={item.module_status_name}
                date={moment(item.created_date).format('DD-MMM-YYYY')}
                job={item.job_title}
                status_colour_code={item.status_colour_code}
                price={`$ ${parseFloat(item.total_amount).toFixed(2)}`}
                onDelete={() => getExpensesList()}
                onPress={() => {navigation.navigate(MainRoutes.EditExpenseScreen,{item:item})}}
                List={() => {navigation.navigate(MainRoutes.ExpenseDetailsScreen,{item:item})}}
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
                        SearchPress={() => alert("Search Press")}
                        NotificationPress={() => alert("NotificationPress")}
                        FilterPress={(data) => alert(data)}
                        onPress={() => navigation.openDrawer()}
                        title={"All Expenses"}
                    />
                    <Spacer height={verticalScale(100)} />
                    <ActivityIndicator size={"large"} color={colors.dark_primary_color} />
                </SafeAreaView>
                </SafeAreaProvider>
            )
          }
        return (
            <SafeAreaProvider>
                <CustomStatusBar />
                <SafeAreaView style={commonStyles.container} >
                    <CustomHeader 
                            show_backButton={true}
                            isdrawer={true}
                            SearchPress={() => alert("Search Press")}
                            NotificationPress={() => alert("NotificationPress")}
                            FilterPress={(data) => alert(data)}
                            onPress={() => navigation.openDrawer()}
                            title={"All Expenses"}
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
                            onChangeText={(data) => setEndDate(data) }
                        />
                    </View>
                <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={data}
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
                        onPress={() => navigation.navigate(MainRoutes.AddExpenseScreen)}
                        style={{
                            alignSelf:"flex-end", 
                            paddingHorizontal:scale(20), 
                            paddingVertical:scale(10),
                            position:"absolute",
                            bottom:scale(25)
                        }}>
                        <AntDesign name={"pluscircle"} size={scale(35)} color={colors.dark_primary_color} />
                </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    };


export default AllExpenseScreen;
