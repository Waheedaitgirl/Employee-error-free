import React, { useState } from "react";
import {View,Text,TouchableOpacity, TextInput} from 'react-native'
import { scale, verticalScale } from "react-native-size-matters";
import { width } from "../constants/sacling";
import { colors, fonts } from "../constants/theme";
import Animated, {
   LightSpeedInRight, LightSpeedOutLeft, FadeOutDown, FadeInUp, FadeInDown
  } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { textStyles } from "../styles/textStyles";
const CustomTextInput = ({value,placeholder,errorMessage,secureTextEntry = false, onChangeText}) => {
    const [eyeon , setEyeOn] = useState(secureTextEntry)
    return (
        <View style={{ width:width-scale(20),justifyContent:"center",  minHeight:verticalScale(50),paddingVertical:scale(5), marginVertical:scale(0) }} >
            { 
                value !== "" && 
                <Animated.Text 
                    entering={FadeInDown} 
                    exiting={FadeOutDown}
                  
                    style={textStyles.Label}>
                        {placeholder}
                </Animated.Text>
            }
            <View>
            <TextInput
                secureTextEntry={eyeon}
                placeholder={placeholder}
                placeholderTextColor={colors.divide_color}
                value={value}
                onChangeText={(text) => onChangeText(text)}
                style={{
                    backgroundColor:"#fff", 
                    marginVertical:verticalScale(5),
                    width:width-scale(20), 
                    borderColor:colors.divide_color,
                    borderBottomWidth:1,
                  //  borderRadius:scale(5),
                    height:verticalScale(40),
                    fontFamily:fonts.Medium,
                    paddingHorizontal:scale(10),
                    color:colors.text_primary_color
                }}
            />
             {
                secureTextEntry &&
                    <TouchableOpacity 
                        onPress={() => setEyeOn(!eyeon)}
                        style={{
                            position:"absolute", 
                            width:scale(30), 
                            marginVertical:verticalScale(5),
                            right:0,
                            borderTopRightRadius:5,
                            borderBottomRightRadius:5,
                            backgroundColor:"rgba(0,0,0,0)",
                            height:verticalScale(40),
                            justifyContent:"center",
                            alignItems:"center"
                        }} >
                        <FontAwesome name={!eyeon?"eye":"eye-slash"} size={scale(16)} color={colors.text_primary_color}  />
                    </TouchableOpacity>
            }
            </View>
           
            { 
                errorMessage !== "" && 
                <Animated.Text 
                    entering={LightSpeedInRight} 
                    exiting={LightSpeedOutLeft}
                    style={textStyles.errorText}>
                        {errorMessage}
                </Animated.Text>
            }
        </View>
    )
};

export default CustomTextInput
