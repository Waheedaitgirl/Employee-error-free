import React,{useState} from 'react';
import {View,Text,StyleSheet, ScrollView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import {NativeBaseProvider, Select, Icon } from "native-base";
import { commonStyles,selectStyles, textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import AddExpensesItem from './AddExpensesItem';
import { scale } from 'react-native-size-matters';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth, width } from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import CalenderInput from '../../components/CalenderInput';
import CustomButton from '../../components/Button';
    const AddExpenseScreen = ({navigation}) => {
        const [startDate, setStartDate] = useState("")
        const [submit , setSubmit] = useState(false)
        const [draft, setDraft] = useState(false)
        let item =  {
            "billtype":"Mark Bin",
            "company":"Staffing Manager",
            "name":"Hiring House",
            "job":"Jorden Shah",
            "date":"Time Approver Manager",
            "price":"Time"
        }
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
                    <ScrollView>
                        <AddExpensesItem 
                            billtype={item.billtype} 
                            company={item.company} 
                            name={item.name}
                            date={item.date}
                            job={item.job}
                            price={null}
                            onPress={() => {}}
                        />
                        <Spacer/>
                        <View>
                            <Text
                                style={{...textStyles.smallheading , color:colors.dark_primary_color}}>
                                Select type
                            </Text>
                            <Spacer  height={scale(5)}  />
                            <Select
                                selectedValue={selected_type}
                                width={AppScreenWidth}
                                placeholderTextColor={colors.text_primary_color}
                                fontFamily={fonts.Regular}
                                maxHeight={"10"}
                                accessibilityLabel="Please select type"
                                placeholder="Please select  type"
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
                        <CalenderInput 
                            placeholder={"Date"}
                            value={startDate}
                            errorMessage={""}
                            labelColor={colors.dark_primary_color}
                            onChangeText={(data) => setStartDate(data) }
                        />
                        <Spacer/>
                        <View>
                            <Text
                                style={{...textStyles.smallheading, color:colors.dark_primary_color}}>
                                Expense type
                            </Text>
                            <Spacer  height={scale(5)}  />
                            <Select
                                selectedValue={selected_expense_type}
                                width={AppScreenWidth}
                                bg={"#fff"}
                                placeholderTextColor={colors.text_primary_color}
                                fontFamily={fonts.Regular}
                                fontSize={scale(12)}
                                maxHeight={"10"}
                                accessibilityLabel="Please select type"
                                placeholder="Please select  type"
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
                        <Spacer/>
                        <View>
                            <Text
                                style={{...textStyles.smallheading, color:colors.dark_primary_color}}>
                                Category type
                            </Text>
                            <Spacer  height={scale(5)}  />
                            <Select
                                selectedValue={selected_category_type}
                                width={AppScreenWidth}
                               
                                placeholderTextColor={colors.text_primary_color}
                                fontFamily={fonts.Regular}
                                fontSize={scale(12)}
                                maxHeight={"10"}
                                bg={"#fff"}
                                accessibilityLabel="Please select Category"
                                placeholder="Please select  Category"
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
                        <Spacer/>
                        <View>
                            <Text
                                style={{...textStyles.smallheading, color:colors.dark_primary_color}}>
                                Bill type
                            </Text>
                            <Spacer  height={scale(5)}  />
                            <Select
                                selectedValue={selected_bill_type}
                                width={AppScreenWidth}
                                bg={"#fff"}
                                placeholderTextColor={colors.text_primary_color}
                                color={colors.text_primary_color}
                                fontFamily={fonts.Regular}
                                fontSize={scale(12)}
                                maxHeight={"10"}
                               
                                accessibilityLabel="Please select type"
                                placeholder="Please select  type"
                                _item={selectStyles._item}
                                _selectedItem={selectStyles._selectedItem}
                                onValueChange={(itemValue) => setselectedBillType(itemValue)}>
                                {
                                    billtype.map((item, index) => {
                                        return(
                                            <Select.Item key={`${index}`} label={item.name} value={item.name} />
                                        )
                                    })
                                }
                            </Select>
                        </View>
                        <Spacer/>
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
                    </ScrollView>
                </View>
            </NativeBaseProvider>
        );
    };


export default AddExpenseScreen;
