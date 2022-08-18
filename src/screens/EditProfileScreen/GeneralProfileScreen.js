import React, {useReducer} from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
  Text,
  StatusBar,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import { commonStyles,selectStyles } from '../../styles';
import {colors} from '../../constants/theme';
import CustomTextInput from '../../components/TextInput';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import UpLoadComponent from '../../components/Uploadcomponent';
import CustomButton from '../../components/Button';
const initialState = {
  degreeLevel: '',
  degreeTitle: '',
  startDate: '',
  endDate: '',
  currentlyWorking: true,
  educationDetails: '',
};
const GeneralProfileScreen = ({navigation}) => {
  const [profileData, dispatch] = useReducer(reducer, initialState);
  function reducer(state, action) {
    switch (action.type) {
      case 'degreeLevel':
        return {...state, degreeLevel: action.payload};
      case 'degreeTitle':
        return {...state, degreeTitle: action.payload};
      case 'startDate':
        return {...state, startDate: action.payload};
      case 'endDate':
        return {...state, endDate: action.payload};
      case 'educationDetails':
        return {...state, educationDetails: action.payload};
      case 'currentlyWorking':
        return {...state, currentlyWorking: action.payload};
      default:
        return initialState;
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <StatusBar barStyle={'light-content'} />
        <View style={commonStyles.container}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                style={{
                  width: wp(30),
                  height: wp(30),
                  marginVertical: wp(5),
                  // tintColor:colors.dark_primary_color,
                  borderRadius: wp(15),
                }}
                source={require('../../assets/images/dummy.png')}
              />
              <UpLoadComponent is_profile_image={true} />
            </View>
            <CustomTextInput
              placeholder={'First Name *'}
              value={profileData.degreeTitle}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'degreeTitle', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'Last Name *'}
              value={profileData.degreeTitle}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'degreeTitle', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'Primary Email *'}
              value={profileData.degreeTitle}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'degreeTitle', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'Phone (Direct)'}
              value={profileData.degreeTitle}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'degreeTitle', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'Address'}
              value={profileData.degreeTitle}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'degreeTitle', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'City'}
              value={profileData.degreeTitle}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'degreeTitle', payload: text});
              }}
              errorMessage={''}
            />
            <UpLoadComponent 
                setFilePath={() => alert("fdfg")}
                filepath={{
                    path:null
                }} title={"Upload Resume"} />
            <CustomButton
                loading={false}
                loadingText={'Saving'}
                onPress={() => alert('Adddd')}
                text={'Save'}
                />
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default GeneralProfileScreen;
