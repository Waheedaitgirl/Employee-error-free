import React,{useState} from 'react';
import { FlatList,View,StyleSheet,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CalenderInput from '../../components/CalenderInput';
import { commonStyles } from '../../styles';
import data from './data.json'
import CustomHeader from './Header';
import ExpansesItem from './ExpansesCard';
import { scale } from 'react-native-size-matters';
import { colors } from '../../constants/theme';
import { MainRoutes } from '../../constants/routes';
    const AllExpenseScreen = ({navigation}) => {
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const renderItem = ({ item }) => (
            <ExpansesItem 
                billtype={item.billtype} 
                company={item.company} 
                name={item.name}
                date={item.date}
                job={item.job}
                price={item.price}
                onPress={() => {navigation.navigate(MainRoutes.ExpenseDetailsScreen,{item:item})}}
            />
          ); 
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={true}
                    onPress={() => navigation.openDrawer()}
                    title={"All Expenses"}
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
