import moment from 'moment';
import React, {useReducer} from 'react';
import {
  Image,
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
import {commonStyles} from '../../styles';
const initialState = {
  companyName: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  currentlyWorking: true,
  jobDuties: '',
};

function init(initialState) {
  if (initialState == undefined) {
    return {
      companyName: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      currentlyWorking: true,
      jobDuties: '',
    };
  } else {
    return {
      companyName: initialState.candidate_employer_id,
      jobTitle: initialState.job_title,
      startDate: moment(initialState.experience_start_date).format(
        'YYYY-MM-DD',
      ),
      endDate: moment(initialState.experience_end_date).format('YYYY-MM-DD'),
      currentlyWorking: initialState.is_currently_working == 0 ? false : true,
      jobDuties: initialState.job_duties,
    };
  }
}

const AddExperienceScreen = ({navigation, route}) => {
  const [experienceData, dispatch] = useReducer(
    reducer,
    route.params?.item,
    init,
  );
  console.log(route.params?.item);
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
        <CustomHeader
          show_backButton={true}
          isdrawer={false}
          onPress={() => navigation.goBack()}
          title={
            route.params !== undefined ? 'Edit Experience' : 'Add Experience'
          }
        />
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: wp(25),
                height: wp(25),
                marginVertical: wp(5),
                // tintColor:colors.dark_primary_color,
                borderRadius: wp(15),
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
                payload: moment(new Date(date)).format('YYYY-MM-DD'),
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
                payload: moment(new Date(date)).format('YYYY-MM-DD'),
              })
            }
          />

          <CustomTextInput
            placeholder={'Job Duties'}
            value={experienceData.jobDuties}
            borderWidth={1}
            multilines={true}
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
                width: scale(20),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: experienceData.currentlyWorking
                  ? colors.dark_primary_color
                  : '#fff',
                height: scale(20),
                marginTop: scale(5),
                borderWidth: experienceData.currentlyWorking ? 0 : 1,
                borderRadius: scale(2),
                borderColor: '#0002',
              }}>
              {experienceData.currentlyWorking && (
                <Entypo name="check" color={'#fff'} size={scale(15)} />
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

export default AddExperienceScreen;
