import React from "react";
import { View,TextInput,Text,StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { AppScreenWidth } from "../../constants/sacling";
import { colors, fonts } from "../../constants/theme";
import { textStyles } from "../../styles/textStyles";
import moment from "moment";
const TimeInput = ({item , index ,editable, setHours}) => {
    return(
        <View style={styles.mainview} >
            <Text style={styles.label} >{moment(item.date).format('DD-MMM')}</Text>
            {item.type && 
            <Text style={{...styles.label, color:colors.dark_primary_color}} >{item.type}</Text>}
            <TextInput 
                keyboardType={"numeric"}
                placeholder={"0.0"}
                value={item.hours}
                editable={editable}
                onChangeText={(data) => setHours(index, data)}
                style={styles.textinput}
            />
        </View>
    )
}
export default TimeInput
const styles = StyleSheet.create({
    textinput:{
        backgroundColor:"rgba(0,0,0,.1)",
        paddingTop:0,
        paddingBottom:0, 
        width:AppScreenWidth/3,
        marginTop:scale(5),
        textAlign:"center",
        height:scale(30),
        fontFamily:fonts.Regular,
        borderRadius:5,
    },
    mainview:{
        width:((AppScreenWidth/3) + scale(10)),
        marginTop:scale(5), 
        marginRight:scale(5),
        borderWidth:1,
        borderColor:"rgba(0,0,0,.3)",
        borderRadius:5,
        padding:scale(5)
    },
    label:{
        ...textStyles.title,
        alignSelf:"center", 
        backgroundColor:"#0000"
    }
})