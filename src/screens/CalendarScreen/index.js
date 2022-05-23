import React, { useEffect, useState } from 'react';
import {SafeAreaView,StatusBar, Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { commonStyles,textStyles } from '../../styles';
import CustomHeader from '../../components/CustomHeader';

import { colors, fonts } from '../../constants/theme';
import { AppScreenWidth, hp, width } from '../../constants/sacling';
import { useSelector } from 'react-redux';
import { useWindowDimensions } from 'react-native';
import RenderHtml, { HTMLContentModel, defaultHTMLElementModels } from 'react-native-render-html';
import {encode, decode} from 'html-entities';
    
const HomeScreen = ({navigation}) => {
        const html = `
  <h1>This HTML snippet is now rendered with native components !</h1>
  <h2>Enjoy a webview-free and blazing fast application</h2>
  <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
  <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br>;
           </br>
  <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
        const source = {
            html: `<p style='color:black;text-align:center;'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&lt;br /&gt;
            &lt;br /&gt;
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&lt;br /&gt;
            &lt;br /&gt;
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q&lt;strong&gt;uis&lt;/strong&gt;&lt;strong&gt; nostrud exercitation &lt;/strong&gt;&lt;strong&gt;u&lt;/strong&gt;llamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse&lt;strong&gt; cillum dolore eu fugiat nulla pariatur&lt;/strong&gt;. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            &lt;ul&gt;
                &lt;li&gt;this is bullet 1&lt;/li&gt;
                &lt;li&gt;this is bullet 2&lt;/li&gt;
                &lt;li&gt;this is bullet 3&lt;/li&gt;
            &lt;/ul&gt;
            Create New Number List&nbsp;
            
            &lt;ol&gt;
                &lt;li&gt;Numbe&lt;/li&gt;
                &lt;li&gt;Nuber&lt;/li&gt;
                &lt;li&gt;NUmerer]&lt;/li&gt;
                &lt;li&gt;&lt;samp&gt;asdasdasdsadasd&lt;/samp&gt;&lt;/li&gt;
            &lt;/ol&gt;</P>`
          };
          const source2 = {
            html: `<ol style="list-style-type: upper-roman; color: blue; font-weight: bold;">
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
            <li>Six</li>
            <li>Seven</li>
            <li>Eight</li>
          </ol>`
          };
          const customHTMLElementModels = {
            img: defaultHTMLElementModels.img.extend({
              contentModel: HTMLContentModel.mixed
            })
          };
        
        const {user} = useSelector(state => state.LoginReducer)
        const { width } = useWindowDimensions();
        useEffect(() => {
            console.log(decode(source));
        })
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={{flex:1,}} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        onPress={() => navigation.openDrawer()}
                        title={"Jobs"}
                    />
                   <RenderHtml
                    contentWidth={width}
                    source={{html:html}}
                    customHTMLElementModels={customHTMLElementModels}
                    />
                
                </View>
            </SafeAreaView>
            
        );
    };


export default HomeScreen;

const styles = StyleSheet.create({
    main:{
        height:hp(55),
        width:width*1.2,
        zIndex:-1,
        position:"absolute",
        top:verticalScale(40),
        borderBottomRightRadius:hp(100),
        backgroundColor:colors.dark_primary_color
    },
    main2:{
        height:hp(5),
        width:width,
        zIndex:10,
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:scale(5),
        bottom:scale(0),
     
        borderTopLeftRadius:hp(3),
        borderTopRightRadius:hp(3),
        backgroundColor:colors.dark_primary_color
    },
    headingtext:{
        ...textStyles.heading,
        fontSize:scale(22), 
        color:"#fff", 
        textAlign:"left"
    },
    nameText:{
        ...textStyles.title,
        fontSize:scale(18),
        marginTop:scale(2), 
        marginHorizontal:scale(5), 
        color:"#fff", 
        textAlign:"left"
    },
    paragraph:{
        ...textStyles.paragraph,
        fontSize:scale(12), 
        color:"#fff", 
       includeFontPadding:false,
        marginHorizontal:scale(5), 
        textAlign:"left"
    },
    row:{
        width:AppScreenWidth,
        alignSelf:"center",
        flexDirection:"row",
        marginVertical:hp(2),
        justifyContent:"space-evenly"
    },
    box:{
        width:((AppScreenWidth/2)-scale(20)),
        height:((AppScreenWidth/2)-scale(20)),
        backgroundColor:"#fff",
        elevation:10,
        padding:hp(5),
        justifyContent:"center",
        alignItems:"center",
        borderRadius:scale(10),
        borderBottomWidth:3,
        borderWidth:0,
        borderColor:"#fff",
        borderBottomColor:colors.secondary_text_color,
    },
    textStyle: {
        marginTop:scale(10),
        fontFamily:fonts.Medium,
        fontSize:scale(14),
        color: colors.secondary_text_color
    },
})
