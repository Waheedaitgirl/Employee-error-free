import React, {useReducer} from 'react';
import {SafeAreaView, ScrollView,Image, Text, StatusBar, View} from 'react-native';
import {commonStyles} from '../../styles';
import CalenderInput from '../../components/DateInputMethod';
import {colors, fonts} from '../../constants/theme';
import CustomTextInput from '../../components/TextInput';
import {scale} from 'react-native-size-matters';
import {AppScreenWidth} from '../../constants/sacling';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../components/Button';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import moment from 'moment';
const initialState = {
  companyName: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  currentlyWorking: true,
  jobDuties: '',
};
const ListExperienceScreen = ({navigation}) => {
  const [experienceData, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case 'companyName':
        return {...state, companyName: action.payload};
      case 'jobTitle':
        return {...state, jobTitle: action.payload};
      case 'startDate':
        return {...state, startDate: action.payload};
      case 'endDate':
        return {...state, endDate: action.payload};
      case 'jobDuties':
        return {...state, jobDuties: action.payload};
      case 'currentlyWorking':
        return {...state, currentlyWorking: action.payload};
      default:
        return initialState;
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width:wp(25), 
                height:wp(25),
                marginVertical:wp(5),
               // tintColor:colors.dark_primary_color, 
                borderRadius:wp(15)
              }}
              source={require('../../assets/images/job.png')}
            />
          </View>
          <CustomTextInput
            placeholder={'Company name'}
            value={experienceData.companyName}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'companyName', payload: text});
            }}
            errorMessage={''}
          />
          <CustomTextInput
            placeholder={'Job Title'}
            value={experienceData.jobTitle}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'jobTitle', payload: text});
            }}
            errorMessage={''}
          />
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
            placeholder={'Job Duties'}
            value={experienceData.jobDuties}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'jobDuties', payload: text});
            }}
            errorMessage={''}
          />
          <View
            style={{
              width: AppScreenWidth,
              marginVertical: scale(15),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.dark_primary_color,
                fontFamily: fonts.Medium,
                fontSize: scale(12),
              }}>
              Currently Working
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'currentlyWorking',
                  payload: !experienceData.currentlyWorking,
                });
              }}
              style={{
                width: scale(25),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: experienceData.currentlyWorking
                  ? colors.dark_primary_color
                  : '#fff',
                height: scale(25),
                marginTop: scale(5),
                borderWidth: experienceData.currentlyWorking ? 0 : 1,
                borderRadius: scale(5),
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ListExperienceScreen;
