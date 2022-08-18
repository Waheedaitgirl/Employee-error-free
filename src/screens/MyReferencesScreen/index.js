import React from 'react';
import {SafeAreaView,StatusBar,ScrollView,StyleSheet} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useWindowDimensions } from 'react-native';
const MyReferences = ({navigation}) => {
        const { width } = useWindowDimensions()
        return (
            <SafeAreaView style={{flex:1, backgroundColor:"#fff"}} >
                <StatusBar barStyle={"light-content"} />
                <ScrollView style={{flex:1,}} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        onPress={() => navigation.openDrawer()}
                        title={"My References"}
                    />
                  
                </ScrollView>
            </SafeAreaView>
            
        );
    };


export default MyReferences;

const styles = StyleSheet.create({
  
})
