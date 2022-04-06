import React,{useEffect, useState} from 'react';
import { FlatList,View,ActivityIndicator,TouchableOpacity} from 'react-native';
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
import { getExpenseslist, DeleteExpense } from '../../api';
import moment from 'moment';

    const AllExpenseScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const [data, setData] = useState([])
        const [loading, setLoading ] = useState(true)
        useEffect(() => {
            getExpenseslist(user.account_id, user.candidate_id)
            .then((response) => {
                if(response.status == 200){
                    setData(response.data.data);
                    setLoading(false)
                }else{
                    console.log("Some Error",response.status);
                }
            }).catch((error) => {
                console.log(error ,"error");
                alert("Error")
                setLoading(false)
            })
        },[])
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
                onPress={() => {navigation.navigate(MainRoutes.ExpenseDetailsScreen,{item:item})}}
            />
        ); 
          if(loading){

            return(
                <View style={commonStyles.container} >
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
                </View>
            )
          }
        return (
            <View style={commonStyles.container} >
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
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity 
                    onPress={() => navigation.navigate(MainRoutes.AddExpenseScreen)}
                    style={{
                        alignSelf:"flex-end", 
                        paddingHorizontal:scale(20), 
                        paddingVertical:scale(10),
                        position:"absolute",
                        bottom:0
                    }}>
                    <AntDesign name={"pluscircle"} size={scale(35)} color={colors.dark_primary_color} />
               </TouchableOpacity>
            </View>
        );
    };


export default AllExpenseScreen;
