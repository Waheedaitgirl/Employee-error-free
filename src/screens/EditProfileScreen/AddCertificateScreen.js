import moment from 'moment';
import React, {useReducer, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {scale, verticalScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import CalenderInput from '../../components/DateInputMethod';
import CustomTextInput from '../../components/TextInput';
import UpLoadComponent from '../../components/Uploadcomponent';
import {wp} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {commonStyles, textStyles} from '../../styles';
const initialState = {
  recurimentType: '',
  certificateNo: '',
  startDate: '',
  endDate: '',
  currentlyWorking: true,
  jobDuties: '',
};
const AddCertificateScreen = ({navigation}) => {
  const [experienceData, dispatch] = useReducer(reducer, initialState);
  const [skillslist] = useState([
    {id: 1, name: 'React native'},
    {id: 2, name: 'ReactJs'},
    {id: 3, name: 'NodeJs'},
    {id: 4, name: 'Web3.0'},
    {id: 5, name: 'Mysql'},
    {id: 6, name: 'Data Analysis'},
    {id: 7, name: 'Machine Learning'},
    {id: 8, name: 'Project Management'},
    {id: 9, name: 'Data Analysis'},
    {id: 10, name: 'Atomic Energy'},
  ]);
  const [filepath, setFilePath] = useState({
    path: null,
    ext: null,
    name: null,
  });
  function reducer(state, action) {
    switch (action.type) {
      case 'recurimentType':
        return {...state, recurimentType: action.payload};
      case 'certificateNo':
        return {...state, certificateNo: action.payload};
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
          title={'Add Certificate'}
        />
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5
              color={colors.dark_primary_color}
              name={'medal'}
              style={{marginVertical: wp(10)}}
              size={scale(120)}
            />
          </View>

          <Text
            style={{
              ...textStyles.Label,
              marginLeft: wp(2),
              color: colors.dark_primary_color,
            }}>
            Requirement Type
          </Text>
          <SearchableDropdown
            flatListPorps={{
              showsVerticalScrollIndicator: false,
            }}
            onTextChange={text => console.log(text)}
            onItemSelect={text => dispatch({type: 'recurimentType'})}
            containerStyle={{
              backgroundColor: '#0000',
            }}
            textInputStyle={{
              ...styles.textInput,
              padding: 12,
              marginTop: 0,
              width: wp(94),
              alignSelf: 'center',
            }}
            itemStyle={{
              //single dropdown item style
              borderRadius: 0,
              padding: wp(2),

              width: wp(94),
              borderWidth: 0,
              borderColor: colors.divide_color,
              borderBottomWidth: 1,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            itemTextStyle={{
              fontFamily: fonts.Medium,
              color: colors.primary_text_color,
            }}
            itemsContainerStyle={{
              marginTop: 2,
              borderRadius: wp(2),
              borderWidth: 1,
              borderColor: colors.divide_color,
            }}
            items={skillslist}
            defaultIndex={-1}
            placeholder="Select Skill"
            resetValue={false}
            underlineColorAndroid="transparent"
          />
          <CustomTextInput
            placeholder={'Certification No'}
            value={experienceData.certificateNo}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={scale(5)}
            onChangeText={text => {
              dispatch({type: 'certificateNo', payload: text});
            }}
            errorMessage={''}
          />

          <CalenderInput
            placeholder={'Expiry Date'}
            value={experienceData.endDate}
            errorMessage={''}
            onChangeText={date =>
              dispatch({
                type: 'endDate',
                payload: moment(new Date(date)).format('MMM-YYYY'),
              })
            }
          />
          <UpLoadComponent
            title={'Certificate File'}
            filepath={filepath}
            wdt={wp(96)}
            setFilePath={file => setFilePath(file)}
          />
          <View style={{height: wp(20)}} />
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

export default AddCertificateScreen;
const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    justifyContent: 'center',

    alignSelf: 'center',
    alignSelf: 'center',
    minHeight: verticalScale(50),
    paddingTop: scale(5),
  },
  textInput: {
    backgroundColor: '#fff',
    marginVertical: verticalScale(0),
    width: wp(94),
    borderColor: colors.divide_color,
    borderBottomWidth: 1,
    paddingVertical: 0,
    height: verticalScale(40),
    fontFamily: fonts.Medium,
    paddingHorizontal: scale(10),
    color: colors.text_primary_color,
    marginTop: wp(2),
    borderWidth: 1,
    borderRadius: wp(2),
  },
  AddButton: {
    width: wp(10),
    borderRadius: wp(1),
    backgroundColor: colors.delete_icon,
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  SkillsItem: {
    paddingHorizontal: scale(5),
    paddingVertical: scale(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.1)',
    margin: scale(5),
    borderRadius: scale(5),
  },
  actionButton: {
    paddingLeft: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
