import React from 'react';
import { SafeAreaView,View,StyleSheet,Text} from 'react-native';
import { commonStyles,textStyles } from '../../styles';
import CustomButton from '../../components/Button';
import { AuthRoutes } from '../../constants/routes';
import { scale } from 'react-native-size-matters';
    const ForgotPasswordScreen = ({navigation}) => {
        return (
            <View style={commonStyles.container} >
                <Text style={textStyles.title} >Welcome to</Text>
                <Text style={textStyles.heading} > Forgot password</Text>
                <View style={{height:scale(20)}} />
                <CustomButton 
                        onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
                        loading={false}
                        text={"Next"}
                        loadingText={"Processing"}
                    />
            </View>
        );
    };


export default ForgotPasswordScreen;
