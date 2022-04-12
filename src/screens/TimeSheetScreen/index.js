import React, { useEffect, useState } from 'react';
import { FlatList,View,ActivityIndicator,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale, verticalScale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import TimeSheetFlatListItem from './TimeSheetFlatListItem'
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from '../../components/SearchHeader';
import { MainRoutes } from '../../constants/routes';
import { colors } from '../../constants/theme';
import { AppScreenWidth } from '../../constants/sacling';
import { useSelector } from 'react-redux';
import { listTimeSheetByCandidateId } from '../../api';
import Spacer from '../../components/Spacer';
import DeleteModal from '../../components/DeleteModal';
    const TimeSheetListScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [data, setData] = useState([])
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const [loading, setLoading ] = useState(true)
        const [isVisible , setIsVisible] = useState(false)
        useEffect(() => {
            listTimeSheetByCandidateId(user.account_id, user.candidate_id)
            .then((response) => {
                if(response.status == 200){
                    setData(response.data.data);
                    setLoading(false)
                }else{
                    console.log("Some Error",response.status);
                }
            }).catch((error) => {
                console.log(error ,"error");
            })
        },[])

        const renderItem = ({ item }) => (
            <TimeSheetFlatListItem 
                time={`${item.time_sheet_view} Starts At ${item.log_date}`} 
                name={item.job_title}
                submittedto={item?.approver_name}
                status={item.module_status_name}
                status_style={item.status_colour_code}
                hours={`${item.log_hours} Hours`}
                onPress={() => navigation.navigate(MainRoutes.EditTimeSheetScreen, {item})}
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
                        title={"Time Sheet"}
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
                    title={"Time Sheet"}
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
                    getItemLayout={(data, index) => {
                        return {
                          length: verticalScale(100),
                          offset: verticalScale(100) * data.length,
                          index,
                        }
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
               <TouchableOpacity 
                    onPress={() => navigation.navigate(MainRoutes.AddTimeSheetScreen)}
                    style={{
                        alignSelf:"flex-end", 
                        paddingHorizontal:scale(20), 
                        paddingVertical:scale(10),
                        position:"absolute",
                        right:scale(10),
                        bottom:verticalScale(30)
                    }}>
                    <AntDesign name={"pluscircle"} size={scale(35)} color={colors.dark_primary_color} />
               </TouchableOpacity>
              
            </View>
            
        );
    };


export default TimeSheetListScreen;

