import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import BaseUrl from '../api/BaseUrl';
import {colors} from '../constants/theme';
import {textStyles} from '../styles/textStyles';
import ArrayInput from './ArrayInput';
const SkillsAdd = () => {
  const {user} = useSelector(state => state.LoginReducer);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
    );
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', '*/*');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow',
    };
    fetch(
      `${BaseUrl}moduleskills?module_pk_id=${user.candidate_id}`,
      requestOptions,
    )
      .then(data => {
        if (data.status == 200) {
          data
            .json()
            .then(res => {
              setSkills(res._embedded.ModuleSkills);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log(data.status);
        }
      })
      .catch(error => {
        console.log('ERRRRRRRRRRRRRRRRRRR');
        //  console.log(error);
      });
  }, []);

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
            skill_name: '',
            total_experience: '3',
            is_new: true,
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
