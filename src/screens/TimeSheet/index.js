import React, { useEffect, useState } from 'react';
import { FlatList,View,StyleSheet,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import TimeSheetFlatListItem from './TimeSheetFlatListItem'
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from '../../components/SearchHeader';
import { MainRoutes } from '../../constants/routes';
import data from './data.json'
import { colors } from '../../constants/theme';
import { AppScreenWidth } from '../../constants/sacling';
import { useSelector } from 'react-redux';
import { listTimeSheetByCandidateId } from '../../api';
    const TimeSheetListScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
       
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")

        useEffect(() => {
            listTimeSheetByCandidateId(user.account_id, user.candidate_id)
            .then((response) => {
                if(response.status == 200){
                   console.log(response.data);
                   
                }else{
                    console.log("Some Error",response.status);
                }
            }).catch((error) => {
                console.log(error ,"error");
            })
        },[])

        const renderItem = ({ item }) => (
            <TimeSheetFlatListItem 
                time={item.time} 
                name={item.name}
                submittedto={item.submittedto}
                status={item.status}
                hours={item.hours}
                onPress={() => navigation.navigate(MainRoutes.DetailsSheetScreen, {item})}
            />
          ); 
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
                    keyExtractor={(item, index) => index.toString()}
                />
               <TouchableOpacity 
                    onPress={() => navigation.navigate(MainRoutes.AddTimeSheetScreen)}
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


export default TimeSheetListScreen;

const styles = StyleSheet.create({
    main:{

    }
})
