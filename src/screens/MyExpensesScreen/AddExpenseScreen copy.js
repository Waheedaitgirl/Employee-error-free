import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, ScrollView, Alert} from 'react-native';
import {NativeBaseProvider, Select } from "native-base";
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomTextInput from '../../components/TextInput';
import { commonStyles,selectStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth} from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import CalenderInput from '../../components/CalenderInput';
import CustomButton from '../../components/Button';
import UpLoadComponent from "../../components/Uploadcomponent"
import {getExpenseslist, listCandidateJobs } from '../../api';
import BlockLoading from '../../components/BlockLoading';
import Entypo from 'react-native-vector-icons/Entypo'
    const AddExpenseScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [startDate, setStartDate] = useState("")
        const [submit , setSubmit] = useState(false)
        const [draft, setDraft] = useState(false)
        const [selected_job,set_selected_job] = useState(null)
        const [jobs , setJobs] = useState([])
        const [loading, setLoading ] = useState(true)
        const [comment, setcomments] = useState("");
        const [expenses_report_title, setExpensesReportTitle] = useState('');
        const [expensetype , setExpenseType] = useState([
            {id:1, name:"Expense 1", value:"Expense 1"},
            {id:2, name:"Expense 2", value:"Expense 2"},
            {id:2, name:"Expense 3", value:"Expense 3"},
            {id:2, name:"Expense 4", value:"Expense 4"},
            {id:2, name:"Expense 4", value:"Expense 5"},

        ])
        const [selected_expense_type,setselectedExpenseType] = useState(false)

        const [billtype , setBillType] = useState([
            {id:1, name:"Bill 1", value:"Bill 1"},
            {id:2, name:"Bill 2", value:"Bill 2"},
            {id:2, name:"Bill 3", value:"Bill 3"},
            {id:2, name:"Bill 4", value:"Bill 4"},
            {id:2, name:"Bill 5", value:"Bill 5"},

        ])
        const [selected_bill_type,setselectedBillType] = useState(false)

        const [caregory , setCategoryType] = useState([
            {id:1, name:"Category 1", value:"Category 1"},
            {id:2, name:"Category 2", value:"Category 2"},
            {id:2, name:"Category 3", value:"Category 3"},
            {id:2, name:"Category 4", value:"Category 4"},
            {id:2, name:"Category 5", value:"Category 5"},

        ])
        const [selected_category_type,setselectedCategoryType] = useState(false)

        const [type , setType] = useState([
            {id:1, name:"Food", value:"food"},
            {id:2, name:"Lunch", value:"lunch"},
            {id:2, name:"Dinner", value:"dinner"},
            {id:2, name:"BreakFast", value:"breakfast"},
            {id:2, name:"Transport", value:"transport"},
        ])
        const [selected_type,setselectedType] = useState(false)

        useEffect(() => {
            listCandidateJobs(user.account_id, user.candidate_id).then((response) => {
                setJobs(response.data.data);
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                alert("Some Error")
                setLoading(false)
            })
        },[])

        const DraftSave = () => {
            setDraft(true)
            setTimeout(() =>{
                setDraft(false)
            },2000)
        }

        const Submit = () => {
            setSubmit(true)
            setTimeout(() =>{
                setSubmit(false)
            },2000)
        }

        return (
            <NativeBaseProvider>
                <View style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={false}
                        onPress={() => navigation.goBack()}
                        title={"Add Expense"}
                    />
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:verticalScale(115)}} >
                     
                            <View style={{marginTop:scale(10)}}>
                                <Text
                                    style={{...styles.label, marginLeft:scale(5)}}>
                                    Select Job
                                </Text>
                                <Spacer height={scale(3)} />
                                <Select
                                    selectedValue={selected_job}
                                    width={AppScreenWidth}
                                    placeholderTextColor={colors.text_primary_color}
                                   
                                    maxHeight={"10"}
                                    alignSelf={"center"}
                                    fontFamily={fonts.Medium}
                                    fontSize={scale(13)}
                                    placeholder="Please select  type"
                                    _item={selectStyles._item}
                                    _selectedItem={selectStyles._selectedItem}
                                    onValueChange={(itemValue) => {
                                        set_selected_job(itemValue)
                                        getJobtimetype()
                                        }}>
                                    {
                                        jobs.map((item, index) => {
                                            return(
                                                <Select.Item key={`${item.job_id}`} label={item.job_title} value={item.job_id} />
                                            )
                                        })
                                    }
                                </Select>
                                <Spacer height={scale(3)} />
                                <CustomTextInput
                                    placeholder={'Expenses Report Title'}
                                    value={expenses_report_title}
                                    borderWidth={1}
                                    lableColor={colors.dark_primary_color}
                                    borderRadius={scale(5)}
                                    onChangeText={text => setExpensesReportTitle(text)}
                                    errorMessage={""}
                                />
                            </View>
                            
                            <Spacer/>
                            <View style={styles.cardView} >
                                <View style={styles.Row} >
                                    <View>
                                        <Text
                                            style={styles.label}>
                                            Select type
                                        </Text>
                                        <Spacer  height={scale(5)}  />
                                        <Select
                                            selectedValue={selected_type}
                                            width={AppScreenWidth/2-scale(10)}
                                            placeholderTextColor={colors.text_primary_color}
                                            fontFamily={fonts.Medium}
                                            fontSize={scale(13)}
                                            maxHeight={"10"}
                                            placeholder="Select type"
                                            _item={selectStyles._item}
                                            _selectedItem={selectStyles._selectedItem}
                                            bg={"#fff"}
                                            onValueChange={(itemValue) => setselectedType(itemValue)}>
                                            {
                                                type.map((item, index) => {
                                                    return(
                                                        <Select.Item key={`${index}`} label={item.name} value={item.name} />
                                                    )
                                                })
                                            }
                                        </Select>
                                    </View>
                                    <View>
                                        <Text
                                            style={styles.label}>
                                            Select Date
                                        </Text>
                                
                                        <CalenderInput 
                                            placeholder={"Expense Date"}
                                            value={startDate}
                                            errorMessage={""}
                                            w={AppScreenWidth/2-scale(5)}
                                            show_label={false}
                                            hght={scale(40)}
                                            onChangeText={(data) => setStartDate(data) }
                                        />
                                    </View>
                                </View>
                                
                                <Spacer/>
                           
                                <View style={styles.Row} >
                                    <View>
                                        <Text
                                            style={styles.label}>
                                            Category type
                                        </Text>
                                        <Spacer  height={scale(5)}  />
                                        <Select
                                            selectedValue={selected_category_type}
                                            width={AppScreenWidth/2-scale(10)}
                                            placeholderTextColor={colors.text_primary_color}
                                            fontFamily={fonts.Medium}
                                            fontSize={scale(13)}
                                            maxHeight={"10"}
                                            bg={"#fff"}
                                           
                                            placeholder="Select category"
                                            _item={selectStyles._item}
                                            _selectedItem={selectStyles._selectedItem}
                                        
                                            onValueChange={(itemValue) => setselectedCategoryType(itemValue)}>
                                            {
                                                caregory.map((item, index) => {
                                                    return(
                                                        <Select.Item key={`${index}`} label={item.name} value={item.name} />
                                                    )
                                                })
                                            }
                                        </Select>
                                    </View>
                                    <View>
                                        <Text style={styles.label}>Expense type</Text>
                                        <Spacer  height={scale(5)}  />
                                        <Select
                                            selectedValue={selected_expense_type}
                                            width={AppScreenWidth/2-scale(10)}
                                            bg={"#fff"}
                                            placeholderTextColor={colors.text_primary_color}
                                           
                                            fontFamily={fonts.Medium}
                                            fontSize={scale(13)}
                                            maxHeight={"10"}
                                            accessibilityLabel="Select type"
                                            placeholder="Select type"
                                            _item={selectStyles._item}
                                            _selectedItem={selectStyles._selectedItem}
                                            onValueChange={(itemValue) => setselectedExpenseType(itemValue)}>
                                            {
                                                expensetype.map((item, index) => {
                                                    return(
                                                        <Select.Item key={`${index}`} label={item.name} value={item.name} />
                                                    )
                                                })
                                            }
                                        </Select>
                                    </View>
                                </View>
                                <View style={styles.Row} >
                                    <UpLoadComponent wdt={AppScreenWidth/1.5} />
                                    <TouchableOpacity 
                                      
                                        onPress={() =>deleteItem(index)}           
                                        style={styles.deletebutton}>
                                        <Entypo name={'squared-cross'} color={colors.delete_icon} size={scale(30)} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                <CustomTextInput
                                    placeholder={'Comments'}
                                    value={comment}
                                    borderWidth={1}
                                    lableColor={colors.dark_primary_color}
                                    borderRadius={scale(5)}
                                    onChangeText={text => setcomments(text)}
                                    errorMessage={""}
                                />
                                </View>
                            </View>
                            <Spacer/>
                        
                            <TouchableOpacity 
                                onPress={() => alert("Add")}
                                style={styles.button} >
                                    <FontAwesome name={"plus"} size={scale(16)} color={"#fff"} />
                                    <Text style={styles.text} >Add</Text>
                            </TouchableOpacity>
                            
                            <Spacer/>
                      
                    </ScrollView>
                    <View style={styles.bottomView} >
                        <CustomButton
                            loading={submit}
                            loadingText={"Submitting"}
                            onPress={() => Submit()}
                            backgroundColor={"#0073B4"}
                            text={"Submit"}
                            marginTop={scale(10)}
                        />
                        <Spacer />
                        <CustomButton
                            loading={draft}
                            loadingText={"Saving"}
                            onPress={() =>DraftSave() }
                            text={"Save as a Draft"}
                            marginTop={scale(10)}
                        />
                    </View>
                    {
                        loading && 
                        <BlockLoading/>
                    }
                </View>
            </NativeBaseProvider>
        );
    };


export default AddExpenseScreen;

const styles = StyleSheet.create({
    Row:{
        flexDirection:"row",
        width:AppScreenWidth, 
        alignItems:"flex-end",
        justifyContent:"space-between",
        marginTop:5
    },
    cardView:{
        elevation:5,
        padding:scale(2.5), 
        margin:3,
        borderColor:colors.divide_color, 
        borderWidth:0,
        borderRadius:scale(5),marginVertical:scale(10),
        backgroundColor:"#fff"
    },
    label:{
        ...textStyles.smallheading , 
        fontSize:scale(12),
        color:colors.dark_primary_color,
       
    },
    button:{
        backgroundColor:"green",
        padding:scale(10),
        width:scale(100),
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center",
        alignSelf:"flex-start",
        borderWidth:1,
        
        borderColor:"rgba(0,0,0,.3)",
        borderRadius:scale(5)
    }, 
    text:{
        ...textStyles.smallheading,
        backgroundColor:"#0000",
        alignSelf:"flex-start", 
        includeFontPadding:false,
        color:"#fff",
        marginLeft:scale(5),
        textAlign:"left"
    },
    deletebutton:{
        width:50, 
      
        justifyContent:"center",
        alignItems:"center", 
        height:scale(40),
        borderRadius:5,
        borderWidth:0,
        borderColor:"red",
        backgroundColor:"#fff"
        
    },
    bottomView:{
        position:"absolute", 
        justifyContent:"center", 
        alignItems:"center", 
        width:AppScreenWidth+scale(20),
        paddingVertical:10,
        backgroundColor:"#fff",
        alignSelf:"center", 
        bottom:10,
    }
})
