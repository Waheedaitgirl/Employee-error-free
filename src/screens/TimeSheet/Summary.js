import React, { useState } from "react";
import { View,TextInput,Text,ScrollView,FlatList, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { AppScreenWidth } from "../../constants/sacling";
import { fonts } from "../../constants/theme";
import { textStyles } from "../../styles/textStyles";
import TimeInput from "./TimeInput";
const WeeklySummary = ({summerydays,editable, setHours}) => {
    const [value , setValue] = useState("")
    return(
        <View style={styles.mainview}>
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
    )
}
export default WeeklySummary

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
        width:AppScreenWidth-scale(10),
        paddingVertical:scale(10),
        alignSelf:"center",
    }
})