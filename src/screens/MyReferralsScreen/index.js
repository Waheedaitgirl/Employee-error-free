import React from 'react';
import {SafeAreaView,StatusBar,ScrollView,StyleSheet} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth, hp, width } from '../../constants/sacling';
import { useWindowDimensions } from 'react-native';
const MyRefrerrals = ({navigation}) => {
        const { width } = useWindowDimensions()
        return (
            <SafeAreaView style={{flex:1, backgroundColor:"#fff"}} >
                <StatusBar barStyle={"light-content"} />
                <ScrollView style={{flex:1,}} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        onPress={() => navigation.openDrawer()}
                        title={"My Refrerrals"}
                    />
                  
                </ScrollView>
            </SafeAreaView>
            
        );
    };


export default MyRefrerrals;

const styles = StyleSheet.create({
    
})
