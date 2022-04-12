import React,{useEffect, useState} from 'react';
import {Text,ScrollView,View,StyleSheet} from 'react-native';
import { commonStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/Button';
import ExpansesItem from './ExpansesCard';
import { scale } from 'react-native-size-matters';
import { colors } from '../../constants/theme';
import { AppScreenWidth } from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import Modal from "react-native-modal";
import CommentsBox from '../TimeSheetScreen/CommentsBox';
import DrawLine from '../../components/DrawLine';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getExpensesDetails } from '../../api';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const Item = ({date, expense_type, bill_type , category, amount , filename, approver_comments,expense_comments }) => {
   
    return(
        <View style={styles.CardView}>
        <View style={styles.row}>
            <Text style={styles.buleText} >Date:</Text>
            <Text style={textStyles.title} >{date}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Expense Type:</Text>
            <Text style={textStyles.title} >{expense_type}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Bill Type:</Text>
            <Text style={textStyles.title} >{bill_type}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Category:</Text>
            <Text style={textStyles.title} >{category}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Amount:</Text>
            <Text style={styles.ButtonText} >${amount}</Text>
        </View>
        {
            approver_comments !== null && approver_comments !== "" &&
            <View style={styles.row}>
                <Text style={styles.buleText} >Approver Comment:</Text>
                <Text style={textStyles.title} >{approver_comments}</Text>
            </View>
        }
        {expense_comments !== null && expense_comments !== "" &&
        <View style={styles.row}>
            <Text style={styles.buleText} >Expense Comment:</Text>
            <Text style={textStyles.title} >{expense_comments}</Text>
        </View>
        }
        <View style={styles.row}>
            <Text style={styles.buleText} >File name:</Text>
            <Text style={{...textStyles.title, width:widthPercentageToDP(40)}} >{filename}</Text>
        </View>
    </View>
    )
}
    const ExpenseDetailsScreen = ({navigation, route}) => {
        let item = route.params.item
        const [logs, setLogs] = useState([])
        const {user} = useSelector(state => state.LoginReducer)
        const [isModalVisible, setModalVisible] = useState(false);
        const toggleModal = () => {
            setModalVisible(!isModalVisible);
        };
        useEffect(() => {
            getExpensesDetails(user.account_id, item.expense_id)
            .then((response) => {
                setLogs(response.data.data) //, "status");
            }).catch((err) => {
                console.log(err, "Error");
            })
        },[])
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={false}
                    onPress={() => navigation.goBack()}
                    title={"Expense  Details"}
                />
             <ScrollView showsVerticalScrollIndicator={false}>
                <ExpansesItem 
                    item={item}
                    billtype={item.expense_report_title} 
                    company={item.type} 
                    status={"Approved"}
                    date={moment(item.created_date).format('DD-MMM-YYYY')}
                    job={item.job_title}
                    status_colour_code={item.status_colour_code}
                    price={`$ ${parseFloat(item.total_amount).toFixed(2)}`}
                    onPress={() => {navigation.navigate(MainRoutes.ExpenseDetailsScreen,{item:item})}}
                />
                {logs.length > 0 &&
                <Item 
                        date={logs[0].expense_date} 
                        expense_type={logs[0].expense_type_name} 
                        bill_type={logs[0].expense_bill_type_name} 
                        category={logs[0].category_name} 
                        amount={logs[0].expense_amount} 
                        approver_comments={logs[0].approver_comments}
                        expense_comments={logs[0].expense_comments}
                        filename={logs[0].expense_receipt}

                /> }
                <Spacer  />
                {logs.length > 0 &&
                    <CustomButton
                        loading={false}
                        loadingText={"Getting"}
                        onPress={() =>toggleModal()}
                        text={"View More Details"}
                        marginTop={scale(10)}
                    />
                }
                
                </ScrollView>
                <Modal 
                    isVisible={isModalVisible}
                    animationIn={"zoomInUp"}
                    animationInTiming1={500}
                    animationOut={"zoomOutDown"}
                    animationOutTiming={300}
                    onBackButtonPress={()=>toggleModal()}
                    useNativeDriver={true}
                    style={{
                        margin:scale(5),
                        borderRadius:scale(10),
                      
                    }}
                    onBackdropPress={() =>toggleModal()}
                >
                    <ScrollView contentContainerStyle={{backgroundColor:"#fff",alignItems:"center",  padding:scale(5), borderRadius:scale(5) }}>
                      {logs.map((item, index) => {
                          return(
                              <View key={`${index}`}>
                                  <Item
                                    date={item.expense_date} 
                                    expense_type={item.expense_type_name} 
                                    bill_type={item.expense_bill_type_name} 
                                    category={item.category_name} 
                                    amount={item.expense_amount} 
                                    approver_comments={item.approver_comments}
                                    expense_comments={item.expense_comments}
                                    filename={item.expense_receipt}
                                  />
                              </View>
                          )
                      })}

                        <CustomButton
                            loading={false}
                            width={AppScreenWidth-scale(20)}
                            loadingText={"Getting"}
                            onPress={() =>toggleModal()}
                            text={"Close"}
                            marginTop={scale(10)}
                        />
                    </ScrollView>
                </Modal>

            </View>
        );
    };


export default ExpenseDetailsScreen;

const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        marginTop:scale(2),
       
    },
    CardView:{
        elevation:2,
        backgroundColor:"#fff",
        borderRadius:scale(10),
        width:AppScreenWidth, 
        padding:scale(10)
    },
    buleText:{
        ...textStyles.smallheading,
        width:AppScreenWidth/2.1,
         color:colors.blue
    },
    ButtonText:{
        ...textStyles.title, 
        backgroundColor:"#34CE44", 
        color:"#fff",
        borderRadius:scale(3), 
        paddingHorizontal:scale(8), 
        paddingVertical:scale(1)
    }
})

