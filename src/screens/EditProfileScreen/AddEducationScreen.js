import moment from 'moment';
import {NativeBaseProvider, Select} from 'native-base';
import React, {useReducer} from 'react';
import {
  Alert,
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
import {useSelector} from 'react-redux';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import CalenderInput from '../../components/DateInputMethod';
import CustomTextInput from '../../components/TextInput';
import {AppScreenWidth} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {useUpdateEducationMutation} from '../../store/services/taskApi';
import {commonStyles, selectStyles} from '../../styles';
const initialState = {
  education_level: '',
  education_title: '',
  candidate_id: '',
  education_start_date: '',
  education_end_date: '',
  is_currently_studying: true,
  education_details: '',
};

function init(initialState) {
  if (initialState == undefined) {
    return {
      education_level: '',
      education_title: '',
      education_start_date: '',
      candidate_id: '',
      education_end_date: '',
      is_currently_studying: true,
      education_details: '',
    };
  } else {
    return {
      education_level: initialState.education_level,
      education_title: initialState.education_title,
      candidate_id: initialState.candidate_id,
      education_start_date:
        initialState.education_start_date !== null
          ? moment(initialState.education_start_date).format('YYYY-MM-DD')
          : '',
      education_end_date: moment(initialState.experience_end_date).format(
        'YYYY-MM-DD',
      ),
      is_currently_studying:
        initialState.is_currently_studying == 0 ? false : true,
      education_details: initialState.education_details,
    };
  }
}
const AddEducationScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const [educationData, dispatch] = useReducer(
    reducer,
    route.params?.item,
    init,
  );
  const [updateEducation, {isLoading, isSuccess, isError}] =
    useUpdateEducationMutation();

  function reducer(state, action) {
    switch (action.type) {
      case 'education_level':
        return {...state, education_level: action.payload};
      case 'education_title':
        return {...state, education_title: action.payload};
      case 'education_start_date':
        return {...state, education_start_date: action.payload};
      case 'education_end_date':
        return {...state, education_end_date: action.payload};
      case 'education_details':
        return {...state, education_details: action.payload};
      case 'is_currently_studying':
        return {...state, is_currently_studying: action.payload};
      default:
        return initialState;
    }
  }

  const validateDataAndSubmit = () => {
    if (educationData.education_title.trim().length < 5) {
      alert('Please enter education title at least 5 chars');
      return;
    }
    if (educationData.education_level.trim().length < 1) {
      alert('Please enter education level at least 5 chars');
      return;
    }
    if (
      educationData.education_start_date == null ||
      educationData.education_start_date == undefined ||
      educationData.education_start_date == ''
    ) {
      alert('Please enter education start date');
      return;
    }
    if (educationData.is_currently_studying == false) {
      if (
        educationData.education_end_date == null ||
        educationData.education_end_date == undefined ||
        educationData.education_end_date == ''
      ) {
        alert('Please enter education end date');
        return;
      }
      if (
        moment(educationData.education_end_date).isBefore(
          moment(educationData.education_start_date),
        )
      ) {
        alert('start date must be before then end date');
        return;
      }
    }
    if (
      educationData.education_details.trim() == '' ||
      educationData.education_details.length < 20
    ) {
      alert('Please enter at least 20 character');
      return;
    }

    updateEducation({
      ...educationData,
      candidate_id: user.candidate_id,
      id: route.params?.item.candidate_education_id,
    });
    if (isSuccess) {
      Alert.alert('Eucation Update', 'Education Updated Succcessfully', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Go Back',
          onPress: () => {
            dispatch({
              type: 'reset',
              payload: null,
            });
            navigation.goBack();
          },
        },
      ]);
    }
    if (isError) {
      Alert.alert('Eucation Update ', 'Education Update Failed', [
        {
          text: 'Try Again',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Go Back',
          onPress: () => {
            dispatch({
              type: 'reset',
              payload: null,
            });
            navigation.goBack();
          },
        },
      ]);
    }
  };
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
              value={educationData.education_title}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'education_title', payload: text});
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
                  selectedValue={educationData.education_level}
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
                    dispatch({type: 'education_level', payload: itemValue});
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
              value={educationData.education_start_date}
              errorMessage={''}
              onChangeText={date =>
                dispatch({
                  type: 'education_start_date',
                  payload: moment(new Date(date)).format('YYYY-MM-DD'),
                })
              }
            />

            <CalenderInput
              placeholder={'End Date'}
              value={educationData.education_end_date}
              errorMessage={''}
              onChangeText={date =>
                dispatch({
                  type: 'education_end_date',
                  payload: moment(new Date(date)).format('YYYY-MM-DD'),
                })
              }
            />

            <CustomTextInput
              placeholder={'Education Details'}
              value={educationData.education_details}
              borderWidth={1}
              multilines={true}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'education_details', payload: text});
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
                    type: 'is_currently_studying',
                    payload: !educationData.is_currently_studying,
                  });
                }}
                style={{
                  width: scale(22),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: educationData.is_currently_studying
                    ? colors.dark_primary_color
                    : '#fff',
                  height: scale(22),
                  marginTop: scale(5),
                  borderWidth: educationData.is_currently_studying ? 0 : 1,
                  borderRadius: scale(2),
                  borderColor: '#0002',
                }}>
                {educationData.is_currently_studying && (
                  <Entypo name="check" color={'#fff'} size={scale(20)} />
                )}
              </TouchableOpacity>
            </View>
            <CustomButton
              loading={isLoading}
              loadingText={'Saving'}
              onPress={() => validateDataAndSubmit()}
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
