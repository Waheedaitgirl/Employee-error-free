import React, { useState } from "react";
import { View,Text,FlatList, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { AppScreenWidth } from "../../constants/sacling";
import { colors, fonts } from "../../constants/theme";
import { textStyles } from "../../styles/textStyles";
import TimeInput from "./TimeInput";
import {NativeBaseProvider, Select } from "native-base";
import { selectStyles } from "../../styles";
import Spacer from "../../components/Spacer";
const AddWeeklySummary = ({summerydays,editable,job_time_types, setHours}) => {
    console.log(job_time_types);
    const [value , setValue] = useState("")
    return(
        <NativeBaseProvider>
            <View style={styles.mainview}>
            <View>
                        <Text
                            style={styles.label}>
                            Time Type
                        </Text>
                          <Spacer />
                            <Select
                                selectedValue={value}
                                width={AppScreenWidth/2}
                                placeholderTextColor={colors.text_primary_color}
                                fontFamily={fonts.Regular}
                                maxHeight={"10"}
                                accessibilityLabel="Please select type"
                                placeholder="Please select  type"
                                _item={selectStyles._item}
                                _selectedItem={selectStyles._selectedItem}
                                onValueChange={(itemValue) => { setValue(itemValue)}}>
                                {
                                    job_time_types.map((item, index) => {
                                        return(
                                            <Select.Item key={`${item.job_id}`} label={item.name} value={item.name} />
                                        )
                                    })
                                }
                            </Select>
                    </View>
                    <Spacer />
                <Text style={styles.text}>{editable?"Enter Summary":"Daily Summary"}</Text>
                    <FlatList 
                        data={summerydays}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            return(
                            <TimeInput 
                                    item={item} 
                                    editable={editable} 
                                    index={index} 
                                    setHours={setHours} 
                                />
                            )
                        }}
                    />
            </View>
        </NativeBaseProvider>
    )
}
export default AddWeeklySummary

const styles = StyleSheet.create({
    text:{
        ...textStyles.smallheading,
        backgroundColor:"#0000",
        alignSelf:"flex-start", 
        textAlign:"left"
    },
    textinput:{
        backgroundColor:"rgba(0,0,0,.1)",
        paddingTop:0,
        paddingBottom:0, 
        marginTop:scale(5),
        textAlign:"center",
        height:scale(30),
        fontFamily:fonts.Regular,
        borderRadius:5,
    },
    mainview:{
        width:AppScreenWidth,
        padding:scale(5),
        alignSelf:"center",
        borderWidth:1,
        borderColor:"rgba(0,0,0,.05)",
        borderRadius:scale(5)
    },
    label:{
        ...textStyles.smallheading , 
        color:colors.dark_primary_color,
        paddingTop:scale(5)
    },
})