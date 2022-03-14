import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
const Spacer = () => {
    return(
        <View style={{height:scale(10)}} />
    )
}
export default Spacer