import React, { useState } from 'react';
import { FlatList,View,StyleSheet,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import TimeSheetItem from './TimeSheetItem'
import CalenderInput from '../../components/CalenderInput';
import CustomHeader from './Header';
import { MainRoutes } from '../../constants/routes';
import data from './data.json'
import { colors } from '../../constants/theme';
           
    const HomeScreen = ({navigation}) => {
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const renderItem = ({ item }) => (
            <TimeSheetItem 
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
                <CalenderInput 
                    placeholder={"Start Date"}
                    value={startDate}
                    errorMessage={""}
                    onChangeText={(data) => setStartDate(data) }
                />
               
                <CalenderInput 
                    placeholder={"End Date"}
                    value={endDate}
                    errorMessage={""}
                    onChangeText={(data) => setEndDate(data) }
                />
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


export default HomeScreen;

const styles = StyleSheet.create({
    main:{

    }
})
