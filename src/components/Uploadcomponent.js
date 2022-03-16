import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { scale } from "react-native-size-matters";
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'
import { AppScreenWidth } from "../constants/sacling";
import Cloud from '../assets/images/clouds.svg'
import Camera from '../assets/images/camera.svg'
import Clouds2 from '../assets/images/Clouds2.svg'
import Drive from '../assets/images/Drive.svg'
import Disk from '../assets/images/Disk.svg'
import {  } from "react-native-gesture-handler";
import { textStyles } from "../styles";
const UpLoadComponent = () => {
    const Pickimage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          }).catch((err) => {
              console.log(err);
          })
    }

    const Pickfromcamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          }).catch((err) => {
              console.log(err);
          })
    }
    
    const pickDocument  = async () => {
        try {
          const pickerResult = await DocumentPicker.pickSingle({
            presentationStyle: 'fullScreen',
            copyTo: 'cachesDirectory',
          })
          console.log([pickerResult])
        } catch (e) {
          console.log(e)
        }
      }
    return(
        <View style={{width:AppScreenWidth-scale(10), alignSelf:"center", marginVertical:scale(10), justifyContent:"center", alignItems:"center"}}>
            <Text style={{...textStyles.smallheading,backgroundColor:"#0000",alignSelf:"flex-start", textAlign:"left"}}>Upload Document</Text>
            <View style={{width:AppScreenWidth-scale(10),marginTop:scale(10), flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableOpacity
                    onPress={() => {
                        Pickimage()
                    }}
                >
                    <Disk width={scale(20)} height={scale(20)} />
                </TouchableOpacity>
                <TouchableOpacity
                     onPress={() => {
                        pickDocument()
                    }}
                >
                    <Drive width={scale(20)} height={scale(20)} />
                </TouchableOpacity>
                <TouchableOpacity
                         onPress={() => {
                            pickDocument()
                        }}
                >
                    <Clouds2 width={scale(20)} height={scale(20)} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        pickDocument()
                    }}
                >
                    <Cloud width={scale(20)} height={scale(20)} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        Pickfromcamera()
                    }} >
                    <Camera width={scale(20)} height={scale(20)} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default UpLoadComponent