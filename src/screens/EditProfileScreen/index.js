import React from 'react';
import { SafeAreaView,View,StyleSheet,Text} from 'react-native';
import { commonStyles,textStyles } from '../../styles';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import { scale } from 'react-native-size-matters';
    const EditProfileScreen = ({navigation}) => {
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={true}
                    onPress={() => navigation.openDrawer()}
                    title={"Edit Profile"}
                />
                <Text style={textStyles.title} >Welcome to</Text>
                <Text style={textStyles.heading} >Recruit BPM</Text>
                <View style={{height:scale(20)}} />
                <CustomButton 
                    onPress={() => navigation.navigate.goBack()}
                    loading={false}
                    text={"Save"}
                    loadingText={"Processing"}
                />
            </View>
        );
    };


export default EditProfileScreen;
