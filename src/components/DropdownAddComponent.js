import React from 'react';
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { textStyles} from '../styles/textStyles';
import { colors, fonts } from '../constants/theme';
import { scale } from 'react-native-size-matters';
import { width, wp } from '../constants/sacling';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
    const DropdownAddComponent = 
    ({
            show_add_button=true,
            width=wp(84), 
            AddButtonPress,
            placeholder,
            items,setItems,
            selectedItems,
            setSelectItems,
            isVisible,
            setIsVisible,
           }) => { 
        return (
            <View style={{marginTop:scale(5), backgroundColor:"#fff"}} >
                <Text 
                    style={{
                        ...textStyles.Label,
                        marginLeft:scale(5), 
                        color:colors.dark_primary_color
                    }}>
                        Add {placeholder}
                </Text>
                 <View style={styles.mainRow} >
                        <DropDownPicker
                            open={isVisible}
                            value={selectedItems}
                            searchable={true}
                            searchPlaceholder="Search Here ..."
                            placeholder={`Select a ${placeholder}`}
                            modalTitle={"Please Select"}
                            listMode="MODAL"
                            items={items}
                            setOpen={setIsVisible}
                            setValue={setSelectItems}
                            setItems={setItems}
                            style={{
                                ...styles.style, 
                                minWidth:width,
                                maxWidth:width,
                            }}
                            containerProps={{...styles.containerProps,}}
                            containerStyle={{...styles.containerStyle,}}
                            labelStyle={styles.AllLabelText}
                            searchContainerStyle={styles.searchContainerStyle}
                            searchTextInputProps={styles.searchTextInputProps}
                            searchTextInputStyle={styles.AllLabelText}
                            customItemContainerStyle={{
                                backgroundColor: "#000",
                                width:wp(96),
                            }}
                          
                            CloseIconComponent={({style}) => (
                                <Ionicons
                                    color={"#fff"}
                                    name={"close"} 
                                    size={scale(28)}
                                    style={{
                                      
                                        alignSelf:"center"
                                    }} 
                                />
                            )}
                            modalProps={{
                                animationIn:"slideInUp",
                                animationInTiming:300,
                                animationOut:"slideOutDown",
                                animationOutTiming:300
                            }}
                            placeholderStyle={{
                                color: "#696969",
                                fontFamily:fonts.Medium,
                                includeFontPadding:false
                            }}
                            
                            listItemContainerStyle={{
                                height:scale(40),
                                borderBottomWidth:1,
                                width:wp(96),
                                borderBottomColor:"rgba(0,0,0,.1)"
                            }}
                            listItemLabelStyle={styles.AllLabelText}
                            selectedItemContainerStyle={{
                                backgroundColor: "rgba(0,0,0,.1)",
                               
                            }}
                            selectedItemLabelStyle={styles.AllLabelText}
                        /> 
                        {
                            show_add_button && 
                                <TouchableOpacity 
                                    style={styles.AddSquareButton}
                                    onPress={() => AddButtonPress()}
                                >
                                    <AntDesign 
                                        name={"plus"} 
                                        size={scale(20)} 
                                        color={colors.white} 
                                    />
                                </TouchableOpacity>  
                        }
                    </View> 
                
                
            </View>
        );
    };



export default DropdownAddComponent;

const styles = StyleSheet.create({
    mainRow:{
        flexDirection:"row", 
        width:width, 
      
        height:scale(40),
        justifyContent:"space-evenly", 
        alignSelf:"center"
    },
    AddSquareButton:{
        zIndex:-1, 
        width:scale(35), 
        justifyContent:"center",
        alignItems:"center",
        borderRadius:scale(5),
        height:scale(40), 
        backgroundColor:colors.dark_primary_color
    },
    style:{
        backgroundColor:"#fff",
        minWidth:wp(84),
        maxWidth:wp(84),
        marginTop:0,
        alignSelf:"center",
        height:scale(40),
        maxHeight:scale(40),
        minHeight:scale(40),
        borderWidth:1,
        borderColor:colors.divide_color,  
    },
    containerProps:{
        minWidth:wp(84),
        maxWidth:wp(84),
        backgroundColor:"#fff",
        marginTop:0,
        maxHeight:scale(30),
        minHeight:scale(30),
        padding:0,
        paddingBottom:0,
        paddingTop:0,
        paddingVertical:0,
    },
    containerStyle:{
        minWidth:wp(84),
        maxWidth:wp(84),
        height:scale(30),
        backgroundColor:"#fff",
        minHeight:scale(30),
        maxHeight:scale(30),
        padding:0,
        marginTop:0,
        paddingBottom:0,
        paddingTop:0,
        paddingVertical:0,
    },
    AllLabelText:{
        color: "#2e2b2b",
        fontFamily:fonts.Medium,
        includeFontPadding:false
    },
    searchTextInputProps:{
        borderWidth:0,
        backgroundColor:"rgba(255,255,255,.9)",
        height:scale(35),
    },
    searchContainerStyle:{
        borderBottomColor:"rgba(0,0,0,.1)",
        borderBottomWidth:2,
        backgroundColor:colors.dark_primary_color,
        width:wp(100),
      
        height:scale(55),
        paddingTop:scale(5),
        padding:scale(5),
    }
})
