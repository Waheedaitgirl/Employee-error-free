import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/theme';
import {textStyles} from '../styles/textStyles';
import ArrayInput from './ArrayInput';

const SkillsAdd = () => {
  const [skills, setSkills] = useState([
    {
      name: '',
      exp: '',
    },
  ]);

  return (
    <View
      style={{flex: 1, marginTop: wp(2), alignSelf: 'center', width: wp(98)}}>
      <Text
        style={{
          ...textStyles.Label,
          marginLeft: wp(2),
          color: colors.dark_primary_color,
        }}>
        Add skills
      </Text>
      {skills.map((item, index) => {
        return (
          <ArrayInput
            placeholder={'Add Skills'}
            skills={item}
            key={`${index}`}
            borderWidth={1}
            lableColor={colors.dark_primary_color}
            borderRadius={wp(2)}
            onAdd={skill => {
              let temp_skills = [...skills];
              temp_skills.push(skill);
              setSkills(temp_skills);
            }}
            onDelete={() => {
              let temp_skills = [...skills];
              temp_skills.splice(index, 1);
              setSkills(temp_skills);
            }}
            errorMessage={''}
          />
        );
      })}
      <TouchableOpacity
        onPress={() => {
          let temp_skils = [...skills];
          temp_skils.push({
            name: '',
            exp: '',
          });
          setSkills(temp_skils);
        }}
        style={{
          marginTop: wp(2),
          width: wp(20),
          backgroundColor: colors.dark_primary_color,
          borderRadius: 5,
          marginLeft: wp(1),
          height: wp(10),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AntDesign name={'plus'} size={wp(8)} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SkillsAdd;
