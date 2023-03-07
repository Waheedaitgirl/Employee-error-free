import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {scale, verticalScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wp} from '../constants/sacling';
import {colors, fonts} from '../constants/theme';

const ArrayInput = ({skills, onDelete}) => {
  const [skill, setSkill] = useState({
    skill_name: skills.skill_name,
    total_experience: `${skills.total_experience} Year`,
  });

  const [experiencelist] = useState([
    {id: 1, name: '1 Year'},
    {id: 2, name: '2 Year'},
    {id: 3, name: '3 Year'},
    {id: 4, name: '4 Year'},
    {id: 5, name: '5 Year'},
    {id: 6, name: '6 Year'},
    {id: 7, name: '7 Year'},
    {id: 8, name: '8 Year'},
    {id: 9, name: '9 Year'},
    {id: 10, name: '10 Year'},
  ]);

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

  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: wp(96),
        paddingVertical: wp(1),
        borderRadius: wp(2),
        borderWidth: 0.5,
        borderColor: '#0003',
        margin: wp(1),
      }}>
      <SearchableDropdown
        flatListPorps={{
          showsVerticalScrollIndicator: false,
        }}
        onTextChange={text => setSkill({...skill, skill_name: text})}
        onItemSelect={text => setSkill({...skill, skill_name: text.name})}
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
        textInputProps={{
          style: {
            ...styles.textInput,
            padding: 12,
            marginTop: 0,

            alignSelf: 'center',
          },
          value: `${skill.skill_name}`,
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
      <View
        style={{
          width: wp(94),
          alignItems: 'flex-start',
          alignSelf: 'center',
          marginTop: wp(2),
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <SearchableDropdown
          flatListPorps={{
            showsVerticalScrollIndicator: false,
          }}
          onTextChange={text => setSkill({...skill, total_experience: text})}
          onItemSelect={text =>
            setSkill({...skill, total_experience: text.name})
          }
          containerStyle={{
            paddingTop: 0,
            marginTop: 0,
          }}
          textInputStyle={{
            ...styles.textInput,
            padding: 12,
            width: wp(84),
            alignSelf: 'center',
          }}
          textInputProps={{
            style: {
              ...styles.textInput,
              padding: 12,
              marginTop: 0,
              width: wp(80),
              alignSelf: 'center',
            },
            value: `${skill.total_experience}`,
          }}
          itemStyle={{
            borderRadius: 0,
            padding: wp(2),
            width: wp(80),
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
          items={experiencelist}
          defaultIndex={-1}
          placeholder="Select years of exp"
          resetValue={false}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          onPress={() => {
            onDelete();
          }}
          style={styles.AddButton}>
          <MaterialCommunityIcons name={'delete'} size={wp(8)} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArrayInput;

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
