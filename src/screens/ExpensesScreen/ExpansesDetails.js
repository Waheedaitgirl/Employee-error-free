import React,{useState} from 'react';
import {Text,ScrollView,View,StyleSheet,TouchableOpacity} from 'react-native';
import { commonStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/Button';
import ExpansesItem from './AddExpensesItem';
import { scale } from 'react-native-size-matters';
import { colors } from '../../constants/theme';
import { AppScreenWidth } from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import Modal from "react-native-modal";
import CommentsBox from '../TimeSheet/CommentsBox';
import DrawLine from '../../components/DrawLine';
import UpLoadComponent from '../../components/Uploadcomponent'
const Item = () => {
    return(
        <View style={styles.CardView}>
        <View style={styles.row}>
            <Text style={styles.buleText} >Date:</Text>
            <Text style={textStyles.title} >11-02-2022</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Expense Type:</Text>
            <Text style={textStyles.title} >Non-billable</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Bill Type:</Text>
            <Text style={textStyles.title} >Food</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Category:</Text>
            <Text style={textStyles.title} >Client Reimbursement</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.buleText} >Amount:</Text>
            <Text style={styles.ButtonText} >$23</Text>
        </View>
    </View>
    )
}
    const ExpenseDetailsScreen = ({navigation}) => {
        
        const [isModalVisible, setModalVisible] = useState(false);

        const toggleModal = () => {
            setModalVisible(!isModalVisible);
        };

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
                    billtype={"Jhony crr"} 
                    company={"Staffing Manager"} 
                    name={"Hiring House"}
                    date={"Jordan Shwa"}
                    job={"Expense Approver Manager - Time Burton"}
                
                    status={"Submitted"}
                    onPress={() => {
                    }}
                />
               
                <UpLoadComponent />
                
               <Item />
                <Spacer  />
                <CustomButton
                    loading={false}
                    loadingText={"Getting"}
                    onPress={() =>toggleModal()}
                    text={"View More Details"}
                    marginTop={scale(10)}
                />
                <View style={{ marginTop:scale(10), width:AppScreenWidth}} >
                    <Text style={{...textStyles.smallheading,color:"#0090FF"}}>Comments</Text>
                    <DrawLine marginTop={scale(5)} />
                    <DrawLine marginTop={scale(1)} />
                    <CommentsBox 
                        title={"Approver Comment"}
                        name={"Approver"}
                        comment={"this is comment by approver"}
                    />
                    <CommentsBox 
                        title={"Submitter Comment"}
                        name={"Submitter"}
                        comment={null}
                    />

                    <CommentsBox 
                        title={"Document Attached"}
                        comment={null}
                    />
                </View>
                <Spacer  />
                <CustomButton 
                    onPress={() => navigation.goBack()}
                    loading={false}
                    backgroundColor={colors.blue}
                    text={"Submit Expense"}
                    loadingText={"Processing"}
                />
                 <Spacer />
                 <CustomButton 
                    onPress={() => navigation.goBack()}
                    loading={false}
                    text={"Discard"}
                    loadingText={"Processing"}
                />
                 <Spacer />
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
                        <Item />
                        <Spacer  />
                        <Item />
                        <Spacer  />
                        <Item />
                        <Spacer  />
                        <Item />
                        <Spacer  />
                        <Item />
                        <Spacer  />
                        <Item />
                        <Spacer  />
                        <Item />
                        <Spacer  />

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
        alignItems:"center"
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
        width:AppScreenWidth/3,
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

