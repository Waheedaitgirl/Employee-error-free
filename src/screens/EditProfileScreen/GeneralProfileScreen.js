import React, {useReducer, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
  StatusBar,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {commonStyles, selectStyles, textStyles} from '../../styles';
import {colors, fonts} from '../../constants/theme';
import CustomTextInput from '../../components/TextInput';
import DropdownAddComponent from '../../components/DropdownAddComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import UpLoadComponent from '../../components/Uploadcomponent';
import CustomButton from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SkillsAdd from '../../components/SkillsAdd';
import Gravatar from '../../components/Gravatar';
import {
  country_data,
  state_data,
} from '../../data/data';

import moment from 'moment';
const initialState = {
  firstName: '',
  lastName: '',
  primaryEmail: '',
  phone: '',
  address: true,
  city: '',
};
const CreateExperinceItem = ({item, index}) => {
  return (
    <TouchableOpacity key={`${index}`} style={styles.EducationMainView}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={styles.ImageView}
          source={require('../../assets/images/job.png')}
        />
      </View>
      <View style={{marginLeft: scale(15), width: '80%'}}>
        <Text style={styles.job_tiltetext}>Full Stack Web Developer</Text>
        <Text style={styles.Addresstext}>Vertelligence - New York, USA</Text>

        <Text style={styles.date}>
          {`${moment().format('MMM YYYY')} -`}
          {'2' === '1' ? 'Present' : `${moment().format('MMM YYYY')}`}
          {'  •  '}

          {'2' === '1'
            ? moment('2019-04-30T07:30:53.000Z').fromNow()
            : moment([2007, 0, 28]).from(moment([2020, 10, 29]))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const CreateEducationItem = ({item, index}) => {
  return (
    <TouchableOpacity key={`${index}`} style={styles.EducationMainView}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={styles.ImageView}
          source={require('../../assets/images/study.png')}
        />
      </View>
      <View style={{marginLeft: scale(15), width: '80%'}}>
        <Text style={styles.job_tiltetext}>Computer Software Engineering</Text>
        <Text style={styles.Addresstext}>UET Peshawar Pakistan</Text>

        <Text style={styles.date}>
          {`${moment('2016-04-30T07:30:53.000Z').format('MMM YYYY')} - `}
          {'1' === '1' ? 'Present' : `${moment().format('MMM YYYY')}`}

          {'2' === '1'
            ? '1' === '1'
              ? moment('2019-04-30T07:30:53.000Z').fromNow()
              : moment([2007, 0, 28]).from(moment([2020, 10, 29]))
            : null}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ExperienceSection = () => {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          marginTop: verticalScale(10),
        }}>
        <Text
          style={{
            fontSize: scale(16),
            fontFamily: fonts.Medium,
            color: '#343434',
          }}>
          Experience
        </Text>
      </View>
      <CreateExperinceItem />
      <CreateExperinceItem />
      <CreateExperinceItem />
    </View>
  );
};

EducationSection = () => {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          marginTop: verticalScale(10),
        }}>
        <Text
          style={{
            fontSize: scale(16),
            fontFamily: fonts.Medium,
            color: '#343434',
          }}>
          Education
        </Text>
      </View>
      <CreateEducationItem />
      <CreateEducationItem />
      <CreateEducationItem />
    </View>
  );
};
const GeneralProfileScreen = ({navigation}) => {
  const [profileData, dispatch] = useReducer(reducer, initialState);
  const [states, setstates] = useState(state_data);
  const [selected_state, setSelectstate] = useState('');
  const [state_modal_visible, setstatesModalVisibe] = useState(false);

  const [countrys, setcountrys] = useState(country_data);
  const [selected_country, setSelectcountry] = useState('');
  const [country_modal_visible, setcountrysModalVisibe] = useState(false);
  const [is_Editabe, setisEditable] = useState(false);
  function reducer(state, action) {
    switch (action.type) {
      case 'firstName':
        return {...state, firstName: action.payload};
      case 'lastName':
        return {...state, lastName: action.payload};
      case 'primaryEmail':
        return {...state, primaryEmail: action.payload};
      case 'phone':
        return {...state, phone: action.payload};
      case 'address':
        return {...state, address: action.payload};
      case 'city':
        return {...state, city: action.payload};
      default:
        return initialState;
    }
  }

  if (!is_Editabe) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                width: wp(100),
                height: hp(45),
              }}>
              <ImageBackground
                blurRadius={50}
                style={{
                  width: wp(100),
                  height: hp(45),
                }}
                resizeMode={'cover'}
                source={require('../../assets/images/dp.jpg')}>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    flex: 1,
                   
                  
                    alignItems: 'flex-start',
                  }}>
                    <Gravatar 
                      emailAddress=''  
                    />
                  
                  <Text style={styles.profileInfoText}>Name: Hasir Numan</Text>
                  <Text style={styles.profileInfoText}>
                    Email: engr.hashirnumman@gmail.com
                  </Text>
                  <Text style={styles.profileInfoText}>
                    Phone:+923168890612
                  </Text>
                  <Text style={styles.profileInfoText}>
                    Address: California United State
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.Card}>
              <Text
                style={{
                  ...textStyles.Label,
                  textAlign: 'justify',
                  color: colors.secondary_text_color,
                }}>
                10+ years investment experience across multiple investment
                strategies and asset classes, incl. Goldman Sachs Private
                Equity, Novalpina Capital Special-Sits, early stage and buyout,
                private and public markets. Board Advisor
              </Text>
              <ExperienceSection />
              <EducationSection />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => setisEditable(true)}
          style={styles.EditButton}>
          <AntDesign
            name={'edit'}
            size={widthPercentageToDP(5)}
            color={colors.white}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
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
              value={profileData.firstName}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'firstName', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'Last Name *'}
              value={profileData.lastName}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'lastName', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'Primary Email *'}
              value={profileData.primaryEmail}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'primaryEmail', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'Phone (Direct)'}
              value={profileData.phone}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'phone', payload: text});
              }}
              errorMessage={''}
            />
            <SkillsAdd />
            <CustomTextInput
              placeholder={'Address'}
              value={profileData.address}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'address', payload: text});
              }}
              errorMessage={''}
            />
            <CustomTextInput
              placeholder={'City'}
              value={profileData.city}
              borderWidth={1}
              lableColor={colors.dark_primary_color}
              borderRadius={scale(5)}
              onChangeText={text => {
                dispatch({type: 'city', payload: text});
              }}
              errorMessage={''}
            />
            <DropdownAddComponent
              show_add_button={false}
              width={wp(96)}
              placeholder={'country'}
              items={countrys}
              setItems={setcountrys}
              selectedItems={selected_country}
              setSelectItems={setSelectcountry}
              isVisible={country_modal_visible}
              setIsVisible={setcountrysModalVisibe}
            />

            <DropdownAddComponent
              show_add_button={false}
              width={wp(96)}
              placeholder={'state'}
              items={states}
              setItems={setstates}
              selectedItems={selected_state}
              setSelectItems={setSelectstate}
              isVisible={state_modal_visible}
              setIsVisible={setstatesModalVisibe}
            />
            <UpLoadComponent
              wdt={wp(94)}
              setFilePath={() => alert('fdfg')}
              filepath={{
                path: null,
              }}
              title={'Upload Resume'}
            />
            <CustomButton
              loading={false}
              loadingText={'Saving'}
              onPress={() => setisEditable(false)}
              text={'Save'}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default GeneralProfileScreen;

const styles = StyleSheet.create({
  EditButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.dark_primary_color,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: widthPercentageToDP(2),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(14),
    height: widthPercentageToDP(14),
    borderRadius: widthPercentageToDP(10),
    right: widthPercentageToDP(2),
    bottom: widthPercentageToDP(0),
  },
  profileInfoText: {
    ...textStyles.Label,
    fontSize: scale(12),
    color: '#fff',
    width: widthPercentageToDP(88),
    paddingVertical: wp(1),

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.2)',
    marginBottom: 2,
  },
  Card: {
    borderTopLeftRadius: 25,
    elevation: 10,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',

    flex: 1,
    padding: 25,
    width: wp(100),
    marginTop: hp(-10),
  },
  ActionButtonRows: {
    borderTopRightRadius: scale(5),
    overflow: 'hidden',
    borderBottomRightRadius: scale(5),
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  ActionButton: {
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e6a020',
  },
  EducationMainView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.03)',

    paddingVertical: verticalScale(8),
  },
  ImageView: {
    width: wp(15),
    height: wp(15),
    // tintColor:colors.dark_primary_color,
    borderRadius: wp(15),
  },
  job_tiltetext: {
    fontFamily: fonts.Medium,
    fontSize: scale(14),
    includeFontPadding: false,
    color: '#191919',
  },
  Addresstext: {
    fontFamily: fonts.Medium,
    fontSize: scale(12),
    includeFontPadding: false,
    color: '#191919',
  },
  date: {
    fontFamily: fonts.Medium,
    fontSize: scale(11),
    includeFontPadding: false,
  },
});
