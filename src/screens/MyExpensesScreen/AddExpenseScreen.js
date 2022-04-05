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
import {getExpenseslist, getExpenseTypeCategoryBillType, listCandidateJobs } from '../../api';
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
        const [filepath, setFilePath] = useState({
            path:null, ext:null, name:null
        })
        const [selected_expense_type,setselectedExpenseType] = useState(false)
        const [selected_category_type,setselectedCategoryType] = useState(false)
        const [selected_bill_type,setSelectedBillType] = useState(false)
        const [bill_type , setBillType] = useState([])
        const [caregory , setCategoryType] = useState([])
        const [expensetype , setExpenseType] = useState([])
        const [amount , setAmount] = useState("")
        const [expense_list , setExpenseList] = useState([
            {
                date:"",
                expense_categor:"",
                expense_type:"",
                expense_bill_type:"",
                document:"",
                comments:"",
                filepath:{
                    path:null, ext:null, name:null
                }
            }
        ])
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

        const fun_set_selected_job = (itemValue) => {
            setLoading(true)
            set_selected_job(itemValue)
            let result = jobs.find(obj =>obj.job_id === itemValue)
           
            getExpenseTypeCategoryBillType(user.account_id, result.company_id)
            .then((response) => {
                setLoading(false)
                if(response.status === 200){
                    setCategoryType(response.data.categories)
                    setExpenseType(response.data.expenses_type)
                    setBillType(response.data.expense_bill_types)
                }else{
                    alert("Some Error with stauts code" , response.status)
                }
            }).catch((err) => {
                console.log(error);
                setLoading(false)
            })
        }
        const addNewCard =  () => {
                const temp = [...expense_list]
                let obj =  {
                    date:"",
                    expense_categor:"",
                    expense_type:"",
                    expense_bill_type:"",
                    document:"",
                    comments:"",
                    filepath:{
                        path:null, ext:null, name:null
                    }
                }
                temp.push(obj)
                setExpenseList(temp)
        }

        const deleteCard = (index) =>{
            if(expense_list.length> 1){
                let temp = [...expense_list]
                temp.splice(index, 1)
                setExpenseList(temp)
            }else{
                alert("Must have a least one item")
            }
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
                                        fun_set_selected_job(itemValue)
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
                            {
                                expense_list.map((item, index) => {
                                    return(
                                        <View key={`${index}`} style={styles.cardView} >
                                        <View style={styles.Row} >
                                           
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
                                            <View>
                                                <Text
                                                    style={styles.label}>
                                                    Expense Bill type
                                                </Text>
                                                <Spacer  height={scale(5)}  />
                                                <Select
                                                    selectedValue={selected_bill_type}
                                                    width={AppScreenWidth/2-scale(10)}
                                                    placeholderTextColor={colors.text_primary_color}
                                                    fontFamily={fonts.Medium}
                                                    fontSize={scale(13)}
                                                    maxHeight={"10"}
                                                    placeholder="Select type"
                                                    _item={selectStyles._item}
                                                    _selectedItem={selectStyles._selectedItem}
                                                    bg={"#fff"}
                                                    onValueChange={(itemValue) => setSelectedBillType(itemValue)}>
                                                    {
                                                        bill_type.map((item, index) => {
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
                                        </View>
                                        <View>
                                            <CustomTextInput
                                                placeholder={'Amount'}
                                                value={item.amount}
                                                borderWidth={1}
                                                lableColor={colors.dark_primary_color}
                                                borderRadius={scale(5)}
                                                onChangeText={text => {
                                                    let temp = [...expense_list]
                                                    temp[index].amount = text
                                                    setExpenseList(temp)
                                                }}
                                                errorMessage={""}
                                            />
                                        </View>
                                        <View>
                                            <CustomTextInput
                                                placeholder={'Comments'}
                                                value={item.comments}
                                                borderWidth={1}
                                                lableColor={colors.dark_primary_color}
                                                borderRadius={scale(5)}
                                                onChangeText={text => {
                                                    let temp = [...expense_list]
                                                    temp[index].comments = text
                                                    setExpenseList(temp)
                                                }}
                                                errorMessage={""}
                                            />
                                        </View>
                                        <View style={styles.Row} >
                                            <UpLoadComponent 
                                                filepath={item.filepath}
                                                setFilePath={(file) => {
                                                    let temp = [...expense_list]
                                                    temp[index].filepath = file
                                                    setExpenseList(temp)
                                                }}
                                                wdt={AppScreenWidth/1.2} 
                                            />
                                            <TouchableOpacity 
                                              
                                                onPress={() =>deleteCard(index)}           
                                                style={styles.deletebutton}>
                                                <Entypo name={'squared-cross'} color={colors.delete_icon} size={scale(30)} />
                                            </TouchableOpacity>
                                        </View>
        
                                       
                                    </View>
                                )})
                            }
                        
                            <Spacer/>
                        
                            <TouchableOpacity 
                                onPress={() => addNewCard()}
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
