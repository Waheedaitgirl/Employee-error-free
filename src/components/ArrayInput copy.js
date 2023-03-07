import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale, verticalScale} from 'react-native-size-matters';
import {width, wp} from '../constants/sacling';
import {colors, fonts} from '../constants/theme';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {textStyles} from '../styles/textStyles';

const ArrayInput = ({
  skills,
  placeholder,
  lableColor = colors.text_primary_color,
  onDelete,
  onAdd,
}) => {
  const [skill, setSkill] = useState({
    name: '',
    exp: '',
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
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: '#fff',
          width: wp(98),
          padding: wp(2),
          borderRadius: wp(2),
          elevation: 10,
          margin: wp(1),
        }}>
        <Text style={{...textStyles.Label, color: lableColor}}>
          {placeholder}
        </Text>

        <SearchableDropdown
            
            flatListPorps={{
                showsVerticalScrollIndicator:false
            }}
            onTextChange={text => console.log(text)}
            onItemSelect={text => setSkill({...skill, exp: text})}
            containerStyle={{
                backgroundColor:"#0000", 
            }}
            textInputStyle={{
                ...styles.textInput,
                padding: 12,
                width:wp(94),
                alignSelf:"center",
            }}
            itemStyle={{
                //single dropdown item style
                borderRadius:0,
                padding:wp(2),
                
            width:wp(94),
            borderWidth:0,
            borderColor:colors.divide_color,
            borderBottomWidth:1,
            alignSelf:"center",
            justifyContent:"center",
          }}
          itemTextStyle={{
           fontFamily:fonts.Medium,
            color:colors.primary_text_color,
          }}
          itemsContainerStyle={{
            marginTop: 2,
            borderRadius:wp(2),
            borderWidth:1,
            borderColor:colors.divide_color,
            maxHeight: '50%',
          }}
          items={skillslist}
          //mapping of item array
          defaultIndex={-1}
          textInputProps={{
            value:skills.name
          }}
          placeholder="Select Skill"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        <SearchableDropdown
            flatListPorps={{
                showsVerticalScrollIndicator:false
            }}
          onTextChange={text => console.log(text)}
          onItemSelect={text => setSkill({...skill, exp: text})}
          containerStyle={{
            backgroundColor:"#0000",
            
          }}
          textInputStyle={{
           ...styles.textInput,
            padding: 12,
            width:wp(94),
         
            alignSelf:"center",
            
          }}
          itemStyle={{
            //single dropdown item style
          borderRadius:0,
          padding:wp(2),
         
            width:wp(94),
            borderWidth:0,
            borderColor:colors.divide_color,
            borderBottomWidth:1,
            alignSelf:"center",
            justifyContent:"center",
          }}
          itemTextStyle={{
           fontFamily:fonts.Medium,
            color:colors.primary_text_color,
          }}
          itemsContainerStyle={{
            marginTop: 2,
            borderRadius:wp(2),
            borderWidth:1,
            borderColor:colors.divide_color,
            maxHeight: '50%',
          }}
          items={experiencelist}
          //mapping of item array
          defaultIndex={-1}
          //default selected item index
          placeholder="Enter Exp"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />

        <TouchableOpacity
          onPress={() => {
            console.log(skill, 'Skills');
            if (skill.name.trim().length != 0 && skill.exp.trim().length != 0) {
              onAdd(skill);
              setSkill({
                name: '',
                exp: '',
              });
            }
          }}
          style={styles.AddButton}>
          <AntDesign
            name={'pluscircle'}
            size={wp(10)}
            color={colors.dark_primary_color}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{flexDirection: 'row', flexWrap: 'wrap', overflow: 'scroll'}}>
        {skills.map((item, index) => {
          return (
            <View key={`${index}`} style={styles.SkillsItem}>
              <Text style={textStyles.skills_text}>
                {item?.name} {item?.exp}
              </Text>
              <TouchableOpacity
                onPress={() => onDelete(index)}
                style={styles.actionButton}>
                <MaterialCommunityIcons
                  name="delete"
                  color={colors.delete_icon}
                  size={scale(14)}
                />
              </TouchableOpacity>
            </View>
          );
        })}
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
    marginTop: wp(5),
    width: wp(10),
    alignSelf: 'flex-end',

    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    height: wp(10),
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
