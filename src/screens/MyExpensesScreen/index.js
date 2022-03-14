import React from 'react';
import { SafeAreaView,View,StyleSheet,Text} from 'react-native';
import { commonStyles } from '../../styles';

import CustomHeader from './Header';
import { scale } from 'react-native-size-matters';
    const AllExpenseScreen = ({navigation}) => {
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={true}
                    onPress={() => navigation.openDrawer()}
                    title={"All Expenses"}
                />
               
              
            </View>
        );
    };


export default AllExpenseScreen;
