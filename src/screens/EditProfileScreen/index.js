import {decode} from 'html-entities';
import React, {useEffect, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import BlockLoading from '../../components/BlockLoading';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import DropdownAddComponent from '../../components/DropdownAddComponent';
import Gravatar from '../../components/Gravatar';
import SkillsAdd from '../../components/SkillsAdd';
import CustomTextInput from '../../components/TextInput';
import UpLoadComponent from '../../components/Uploadcomponent';
import {colors, fonts} from '../../constants/theme';
import {country_data, state_data} from '../../data/data';
import {useGetCandidatesQuery} from '../../store/services/taskApi';
import {commonStyles, textStyles} from '../../styles';
import CertificateItem from './CertificateItem';
import EducationItem from './EducationItem';
import ExperienceItem from './ExperienceItem';
const initialState = {
  account_id: '',
  address: '',
  annual_salary: null,
  available_date: null,
  best_time_tocontact: '',
  candidate_id: '',
  candidate_name: '',
  candidate_owner_id: '',
  candidate_owner_username: '',
  certifications: '',
  city: '',
  country_name: '',
  created_by: '',
  created_date: '',
  created_username: '',
  date_of_birth: null,
  email1: '',
  email2: '',
  emergency_contact: '',
  emergency_no: '',
  ethnicity_id: null,
  ethnicity_name: null,
  fax: '',
  first_name: '',
  gender: null,
  is_active: '',
  is_career: '',
  is_disability: null,
  is_relocate: null,
  job_title: '',
  last_name: '',
  location: '',
  mobile: '',
  module_status_id: '',
  module_status_name: '',
  nationality: '',
  pay_rate: '1000',
  pay_type_id: null,
  pay_type_name: null,
  phone_direct: '',
  phone_direct_ext: '',
  phone_home: '',
  phone_mobile: '',
  phone_work: '',
  phone_work_ext: '',
  preferred_contact: '',
  preferred_name: '',
  profile_summary: '',
  resource_key: '',
  resource_url: '',
  salutation: null,
  skills: '',
  source: '',
  source_id: '',
  ssn: '',
  state_name: '',
  status_colour_code: '',
  tags: null,
  tax_id: '',
  tax_term_id: null,
  tax_term_name: null,
  travel_requirement_id: null,
  travel_requirement_name: null,
  updated_by: '546',
  updated_date: '',
  updated_username: '',
  vendor_id: '0',
  vendor_name: null,
  veteran: 'No',
  visa_status_id: null,
  visa_status_name: null,
  zipcode: '',
};

ExperienceSection = ({data}) => {
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
      <ExperienceItem item={data} />
    </View>
  );
};

EducationSection = ({data}) => {
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
      <EducationItem item={data} />
    </View>
  );
};
CertificateSection = ({data}) => {
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
          Certificate
        </Text>
      </View>
      <CertificateItem item={data} />
    </View>
  );
};

const GeneralProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const {data, isError, isLoading, isSuccess} = useGetCandidatesQuery(
    user.candidate_id,
  );
  const [profileData, dispatch] = useReducer(reducer, initialState);
  const [states, setstates] = useState(state_data);
  const [selected_state, setSelectstate] = useState('');
  const [state_modal_visible, setstatesModalVisibe] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [countrys, setcountrys] = useState(country_data);
  const [selected_country, setSelectcountry] = useState('');
  const [country_modal_visible, setcountrysModalVisibe] = useState(false);
  const [is_Editabe, setisEditable] = useState(false);
  const regex = /(<([^>]+)>)/gi;
  useEffect(() => {
    if (isSuccess) {
      dispatch({type: 'INITIALIZE', payload: data.profile_data});
      setSelectstate(data.profile_data.state_name);
      setSelectcountry(data.profile_data.country_name);
    }
  }, [isSuccess]);
  function reducer(state, action) {
    switch (action.type) {
      case 'INITIALIZE':
        return action.payload;
      case 'first_name':
        return {...state, first_name: action.payload};
      case 'last_name':
        return {...state, last_name: action.payload};
      case 'email1':
        return {...state, email1: action.payload};
      case 'mobile':
        return {...state, mobile: action.payload};
      case 'address':
        return {...state, address: action.payload};
      case 'city':
        return {...state, city: action.payload};
      default:
        return initialState;
    }
  }

  if (isError) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'Profile'}
          />
          <Image
            source={require('../../assets/images/error.gif')}
            style={{
              width: verticalScale(150),
              height: verticalScale(150),
              resizeMode: 'contain',
              flex: 1,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (isLoading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'Profile'}
          />

          <ActivityIndicator
            color={colors.dark_primary_color}
            size={'large'}
            style={{flex: 1}}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (!is_Editabe && isSuccess) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'Profile'}
          />
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                width: wp(100),

                backgroundColor: colors.dark_primary_color,
                height: hp(40),
              }}>
              <View style={{position: 'absolute', top: wp(-5), right: wp(5)}}>
                <Gravatar emailAddress={`${data.profile_data.email1}`} />
              </View>
              <View style={styles.tabViewRow}>
                <View style={{width: wp(9)}}>
                  <FontAwesome name={'user'} size={wp(7)} color={'#fff'} />
                </View>

                <View>
                  <Text style={{...styles.profileInfoText, color: '#fff8'}}>
                    Name
                  </Text>
                  <Text style={styles.profileInfoText}>
                    {data.profile_data.candidate_name}
                  </Text>
                </View>
              </View>
              <View style={styles.tabViewRow}>
                <View style={{width: wp(9)}}>
                  <Ionicons name={'mail'} size={wp(7)} color={'#fff'} />
                </View>

                <View>
                  <Text style={{...styles.profileInfoText, color: '#fff8'}}>
                    Email
                  </Text>
                  <Text style={styles.profileInfoText}>
                    {data.profile_data.email1}
                  </Text>
                </View>
              </View>
              <View style={styles.tabViewRow}>
                <View style={{width: wp(9)}}>
                  <FontAwesome name={'mobile'} size={wp(7)} color={'#fff'} />
                </View>

                <View>
                  <Text style={{...styles.profileInfoText, color: '#fff8'}}>
                    Mobile
                  </Text>
                  <Text style={styles.profileInfoText}>
                    {data.profile_data.mobile}
                  </Text>
                </View>
              </View>
              <View style={styles.tabViewRow}>
                <View style={{width: wp(9)}}>
                  <Ionicons name={'location'} size={wp(7)} color={'#fff'} />
                </View>
                <View>
                  <Text style={{...styles.profileInfoText, color: '#fff8'}}>
                    Address
                  </Text>
                  <Text style={styles.profileInfoText}>
                    {data?.profile_data?.address} {data?.profile_data?.city}
                    {data?.profile_data?.state_name}{' '}
                    {data?.profile_data?.country_name}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.Card}>
              <Text
                style={{
                  fontSize: scale(16),
                  fontFamily: fonts.Medium,
                  color: '#343434',
                }}>
                Profile Summary
              </Text>
              <Text
                style={{
                  ...textStyles.Label,
                  textAlign: 'left',
                  color: colors.secondary_text_color,
                }}>
                {decode(data?.profile_data?.profile_summary)
                  .replace(regex, '')
                  .replace('&nbsp;', '')}
              </Text>

              <ExperienceSection data={data.experience} />
              <EducationSection data={data.education} />
              <CertificateSection data={data.certificate} />
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
  if (isSuccess && is_Editabe) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
          <StatusBar barStyle={'light-content'} />
          <CustomHeader
            show_backButton={true}
            isdrawer={false}
            onPress={() => setisEditable(false)}
            title={'Profile'}
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
                <Gravatar emailAddress={`${data.profile_data.email1}`} />
              </View>
              <CustomTextInput
                placeholder={'First Name *'}
                value={profileData.first_name}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                  dispatch({type: 'first_name', payload: text});
                }}
                errorMessage={''}
              />
              <CustomTextInput
                placeholder={'Last Name *'}
                value={profileData.last_name}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                  dispatch({type: 'last_name', payload: text});
                }}
                errorMessage={''}
              />
              <CustomTextInput
                placeholder={'Primary Email *'}
                value={profileData.email1}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                  dispatch({type: 'email1', payload: text});
                }}
                errorMessage={''}
              />
              <CustomTextInput
                placeholder={'Phone (Direct)'}
                value={profileData.mobile}
                borderWidth={1}
                lableColor={colors.dark_primary_color}
                borderRadius={scale(5)}
                onChangeText={text => {
                  dispatch({type: 'mobile', payload: text});
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
        {isApiLoading && <BlockLoading />}
      </KeyboardAvoidingView>
    );
  }
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
    width: widthPercentageToDP(12),
    height: widthPercentageToDP(12),
    borderRadius: widthPercentageToDP(10),
    right: widthPercentageToDP(2),
    bottom: widthPercentageToDP(2),
  },
  tabViewRow: {
    fontSize: scale(12),
    color: '#fff',
    width: widthPercentageToDP(55),
    marginLeft: widthPercentageToDP(8),
    flexDirection: 'row',
    paddingVertical: wp(1),
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.2)',
    marginBottom: 2,
  },
  profileInfoText: {
    ...textStyles.Label,
    fontSize: scale(12),
    color: '#fff',
    marginLeft: widthPercentageToDP(1),
    alignSelf: 'flex-start',
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
