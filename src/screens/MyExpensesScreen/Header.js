import React, { useState } from 'react';
import {View, Text,TouchableOpacity, Platform, TouchableHighlight, StyleSheet} from 'react-native';
import Ionicons from  'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors, fonts } from '../../constants/theme';
import { scale, verticalScale } from 'react-native-size-matters';
import { width } from '../../constants/sacling';

import Menu, {
  renderers,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { textStyles } from '../../styles';
const { ContextMenu } = renderers;
const CustomHeader = ({title,onPress,NotificationPress,FilterPress,SearchPress}) => {
    const [showmenu, setShowMenu] = useState(false)
    return (
      <View  style={styles.touchable_bg}>
          <TouchableOpacity
              style={{
                  marginLeft: 12,
                  shadowColor: '#fff',
                  shadowOffset: {
                      width: 0,
                      height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.84,
                  elevation: 5,
              }}
              onPress={onPress}>
              <AntDesign color={colors.white} name="menu-fold"  size={scale(24)} />
          </TouchableOpacity>
        <Text
            style={{
                fontFamily:fonts.Bold,
                fontSize: scale(18),
                color: colors.white,
            }}>
          {title}
        </Text>

        <View style={{flexDirection:"row", width:width/3, justifyContent:"space-around"}} >
            <TouchableOpacity onPress={SearchPress} >
              <FontAwesome name={"search"} color={"#fff"} size={scale(18)} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setShowMenu(!showmenu)} >
             
              <Menu 
                onBackdropPress={() => setShowMenu(!showmenu) }
                renderer={ContextMenu}>
                <MenuTrigger>
                  <FontAwesome name={"filter"} color={"#fff"} size={scale(18)} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption 
                      customStyles={optionStyles}
                        value={"All"}
                        onSelect={() => FilterPress("All")}>
                       <Text style={textStyles.Label} >All</Text>
                  </MenuOption>
                  <MenuOption 
                    customStyles={optionStyles}
                    value='Unsubmitted'
                    onSelect={() => FilterPress("Unsubmitted")}>
                       <Text style={textStyles.Label} >Unsubmitted</Text>
                  </MenuOption>
                </MenuOptions>
            </Menu>
            </TouchableOpacity>
            <TouchableOpacity onPress={NotificationPress} >
              <Ionicons name={"notifications"} color={"#fff"} size={scale(18)} />
            </TouchableOpacity>
        </View>
      </View>
    );
  
};
const styles = StyleSheet.create({
  touchable_bg: {
    flexDirection: 'row',
    justifyContent:'space-between' ,  
    alignItems:"flex-end",
    width:width,
    position: 'relative',
    height:verticalScale(55.75),
    backgroundColor:colors.dark_primary_color,
    paddingVertical: verticalScale(10),
  },
  container: {
    flexDirection: 'column',
    padding: 30,
  },
  backdrop: {
    backgroundColor: '#fff',
    opacity: 1,
  },
  anchorStyle: {
    backgroundColor: 'blue',
  },  
});
const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: '#fff',
  },
  optionWrapper: {
    backgroundColor: '#fff',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: '#fff',
  },
};

const optionStyles = {
  optionTouchable: {
    underlayColor: '#fff',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor:'#fff',
    margin: 5,
  },
 
};

const menuProviderStyles = {
  menuProviderWrapper: styles.container,
  backdrop: styles.backdrop,
};
export default CustomHeader;