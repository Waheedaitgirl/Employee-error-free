import moment from 'moment';
import {NativeBaseProvider, Select} from 'native-base';
import React, {useReducer} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import CalenderInput from '../../components/DateInputMethod';
import CustomTextInput from '../../components/TextInput';
import {AppScreenWidth} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {commonStyles, selectStyles} from '../../styles';
const initialState = {
  degreeLevel: '',
  degreeTitle: '',
  startDate: '',
  endDate: '',
  currentlyWorking: true,
  educationDetails: '',
};

function init(initialState) {
  if (initialState == undefined) {
    return {
      degreeLevel: '',
      degreeTitle: '',
      startDate: '',
      endDate: '',
      currentlyWorking: true,
      educationDetails: '',
    };
  } else {
    return {
      degreeLevel: initialState.education_level,
      degreeTitle: initialState.education_title,
      startDate:
        initialState.education_start_date !== null
          ? moment(initialState.education_start_date).format('MMM YYYY')
          : '',
      endDate: moment(initialState.experience_end_date).format('MMM YYYY'),
      currentlyWorking: initialState.is_currently_studying == 0 ? false : true,
      educationDetails: initialState.education_details,
    };
  }
}
const AddEducationScreen = ({navigation, route}) => {
  const [experienceData, dispatch] = useReducer(
    reducer,
    route.params?.item,
    init,
  );

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
        <CustomHeader
          show_backButton={true}
          isdrawer={false}
          onPress={() => navigation.goBack()}
          title={
            route.params?.item !== undefined
              ? 'Edit Education'
              : 'Add Education'
          }
        />
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
                  width: wp(35),
                  height: wp(35),
                  marginVertical: wp(10),
                  // tintColor:colors.dark_primary_color,
                  borderRadius: wp(35),
                }}
                source={require('../../assets/images/study.png')}
              />
            </View>
            <CustomTextInput
              placeholder={'Degree Title'}
              value={experienceData.degreeTitle}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'degreeTitle', payload: text});
              }}
              errorMessage={''}
            />
            <View>
              <NativeBaseProvider>
                <View
                  style={{
                    width: AppScreenWidth,

                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.dark_primary_color,
                      fontFamily: fonts.Medium,
                      fontSize: scale(12),
                    }}>
                    Degree Level
                  </Text>
                </View>
                <Select
                  selectedValue={experienceData.degreeLevel}
                  width={AppScreenWidth}
                  placeholderTextColor={colors.text_primary_color}
                  maxHeight={'10'}
                  alignSelf={'center'}
                  fontFamily={fonts.Medium}
                  fontSize={scale(13)}
                  placeholder="Degree Level"
                  _item={selectStyles._item}
                  _selectedItem={selectStyles._selectedItem}
                  onValueChange={itemValue => {
                    dispatch({type: 'degreeLevel', payload: itemValue});
                  }}>
                  <Select.Item key={'0'} label={'Associate'} value={'0'} />
                  <Select.Item key={'1'} label={'Bachelor'} value={'1'} />
                  <Select.Item
                    key={`2`}
                    label={'Technical College'}
                    value={'2'}
                  />
                  <Select.Item key={'3'} label={'Masters'} value={'3'} />
                  <Select.Item key={`4`} label={'Doctoral'} value={'4'} />
                  <Select.Item key={`5`} label={'Post Doctoral'} value={'5'} />
                  <Select.Item key={`6`} label={'High School'} value={'6'} />
                  <Select.Item key={`7`} label={'Some College'} value={'7'} />
                </Select>
              </NativeBaseProvider>
            </View>
            <CalenderInput
              placeholder={'Start Date'}
              value={experienceData.startDate}
              errorMessage={''}
              onChangeText={date =>
                dispatch({
                  type: 'startDate',
                  payload: moment(new Date(date)).format('MMM-YYYY'),
                })
              }
            />

            <CalenderInput
              placeholder={'End Date'}
              value={experienceData.endDate}
              errorMessage={''}
              onChangeText={date =>
                dispatch({
                  type: 'endDate',
                  payload: moment(new Date(date)).format('MMM-YYYY'),
                })
              }
            />

            <CustomTextInput
              placeholder={'Education Details'}
              value={experienceData.educationDetails}
              borderWidth={1}
              multilines={true}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'educationDetails', payload: text});
              }}
              errorMessage={''}
            />

            <View
              style={{
                width: AppScreenWidth,
                marginVertical: scale(10),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: colors.dark_primary_color,
                  fontFamily: fonts.Medium,
                  fontSize: scale(12),
                }}>
                Currently studying
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch({
                    type: 'currentlyWorking',
                    payload: !experienceData.currentlyWorking,
                  });
                }}
                style={{
                  width: scale(22),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: experienceData.currentlyWorking
                    ? colors.dark_primary_color
                    : '#fff',
                  height: scale(22),
                  marginTop: scale(5),
                  borderWidth: experienceData.currentlyWorking ? 0 : 1,
                  borderRadius: scale(2),
                  borderColor: '#0002',
                }}>
                {experienceData.currentlyWorking && (
                  <Entypo name="check" color={'#fff'} size={scale(20)} />
                )}
              </TouchableOpacity>
            </View>
            <CustomButton
              loading={false}
              loadingText={'Saving'}
              onPress={() =>
                dispatch({
                  type: 'reset',
                  payload: !experienceData.currentlyWorking,
                })
              }
              text={'Save'}
            />
            <View style={{height: wp(10)}} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddEducationScreen;
