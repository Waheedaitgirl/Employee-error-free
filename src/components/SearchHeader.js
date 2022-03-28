import React, { useState } from 'react';
import {View, Text,TouchableOpacity, Platform,TextInput, StyleSheet} from 'react-native';
import Ionicons from  'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors, fonts } from '../constants/theme';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppScreenWidth, width } from '../constants/sacling';
import Animated, {
  LightSpeedInRight, LightSpeedOutLeft, FadeOutDown, FadeInDown
 } from 'react-native-reanimated';
import Menu, {
  renderers,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { commonStyles, textStyles } from '../styles';
const { ContextMenu } = renderers;
const CustomHeader = ({title,onPress,NotificationPress,FilterPress,SearchPress}) => {
    const [showmenu, setShowMenu] = useState(false)
    const [show_search, setShowSearch] = useState(false)

    if(show_search){
        return(
          <View style={{...commonStyles.hedaerWithIcons,justifyContent:"center"}}>
            
          <Animated.View 
            style={{

              backgroundColor:"rgba(0,0,0,.1)",
              justifyContent:"space-between",
              paddingHorizontal:scale(7),
              alignItems:"center", 
              flexDirection:"row", 
              borderRadius:scale(5),
              alignSelf:"center",
              height:verticalScale(35),
              width:width-scale(10)
            }}
              entering={LightSpeedInRight.duration(1000)} 
              exiting={LightSpeedOutLeft.duration(1000)} >
              <TouchableOpacity  onPress={() => setShowSearch(!show_search)} >
                  <FontAwesome name={"search"} color={"#fff"} size={scale(20)} />
              </TouchableOpacity>
              <TextInput
                  placeholder={"Search Here"}
                  placeholderTextColor={"#fff"}
                  style={{
                    paddingTop:0,
                    paddingBottom:0,
                    paddingHorizontal:scale(10),
                    fontFamily:fonts.Light,
                    fontSize:scale(12),
                    color:"#fff",
                    height:verticalScale(30),
                    width:AppScreenWidth-scale(60),
                    borderRadius:scale(5), 
                    backgroundColor:"rgba(0,0,0,0)",
                  }}
              />
        
              <TouchableOpacity  onPress={() => setShowSearch(!show_search)} >
                  <AntDesign name={"close"} color={"#fff"} size={scale(20)} />
              </TouchableOpacity>
          </Animated.View>
        </View>
        )
    }else{
      return (
        <View style={{...commonStyles.hedaerWithIcons}}>
          
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={onPress}>
                    <AntDesign color={colors.white} name="menu-fold"  size={scale(28)} />
                </TouchableOpacity>
           
           
            
                    <Text style={styles.title}>
                      {title}
                    </Text>
    
                  <View style={styles.LeftIconView} >
              <TouchableOpacity onPress={() => setShowSearch(!show_search)} >
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
    }
    
  
};
const styles = StyleSheet.create({
    menuButton:{
        marginLeft: 12,
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title:{
        fontFamily:fonts.Bold,
        fontSize: scale(18),
        color: colors.white,
    },
    LeftIconView:{
        flexDirection:"row", 
        width:width/3, 
        justifyContent:"space-around"
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

export default CustomHeader;