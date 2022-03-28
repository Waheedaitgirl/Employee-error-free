import React from "react";
import { View,ActivityIndicator } from "react-native";
import { scale } from "react-native-size-matters";
const BlockLoading = () => {
    return(
        <View 
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems:"center",
                flex:1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,.02)'
            }} 
            pointerEvents={'none'}>
                <View style={{backgroundColor:"rgba(0,0,0,.5)",borderRadius:scale(5), padding:scale(20)}}>
                    <ActivityIndicator color={"#fff"} size={"large"} />
                </View>
        </View>
    )
}

export default BlockLoading