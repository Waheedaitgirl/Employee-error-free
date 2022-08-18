import React from 'react';
import {SafeAreaView,StyleSheet,Image,FlatList,Text, TouchableOpacity, StatusBar,View} from 'react-native';
import { commonStyles } from '../../styles';
import CustomButton from '../../components/Button';
import { colors, fonts } from '../../constants/theme';
import { scale, verticalScale } from 'react-native-size-matters';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import moment from 'moment';

    const ListCertificateScreen = ({navigation}) => {
    
        const createEducationItem = ({item, index}) => {
            return (
                <TouchableOpacity
                    key={`${index}`}
                    style={styles.EducationMainView}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                        <Image 
                            style={styles.ImageView}
                            source={require("../../assets/images/study.png")}
                        />
                    </View>
                    <View style={{marginLeft: scale(15), width: '80%'}}>
                        <Text style={styles.job_tiltetext}>
                            Full Stack Web Developer
                        </Text>
                        <Text style={styles.Addresstext}>
                            Vertelligence - New York, USA
                        </Text>


                        <Text
                            style={styles.date}>
                                {`${moment().format('MMM YYYY')} -`} 
                                {
                                    "2" === "1"
                                    ?
                                        "Present" 
                                    :
                                        `${moment().format('MMM YYYY')}`
                                }
                                {"  •  "}

                                { "2" === "1"
                                    ?
                                        moment('2019-04-30T07:30:53.000Z').fromNow() 
                                    :
                                        moment([2007, 0, 28]).from(moment([2020, 10, 29]))
                                }
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };
    
        const  EduListing = () => {
            return (
              <FlatList
                disableVirtualization={false}
                showsVerticalScrollIndicator={false}
                data={[1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20]}
                ListEmptyComponent={emptySection}
                renderItem={createEducationItem}
                keyExtractor={(item, index) => index.toString()}
              />
            );
        };
    
    
        const  emptySection = () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop:heightPercentageToDP(10),
                  }}>
                  <Image
                    source={require('../../assets/images/study.png')}
                    style={{
                      // position: 'absolute',
                      zIndex: 20,
                      height: 200,
                      // top: -20,
                      width: 200,
                    }}
                  />
                  <Text
                    style={{
                      color: '#a4a4a4',
                      fontSize: 18,
                      marginTop: 10,
                    }}>
                    No  Specility to show
                  </Text>
                </View>
              </View>
            );
        };
    
    
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
                <StatusBar barStyle={"light-content"} />
                <View style={commonStyles.container} >
                    {EduListing()}
                    <CustomButton 
                        loading={false}
                        loadingText={"Saving"}
                        onPress={() =>alert("Adddd") }
                        text={"Add Education"}
                        
                    />
                </View>
            </SafeAreaView>
            
        );
    };


export default ListCertificateScreen;

const styles = StyleSheet.create({
    EducationMainView:{
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,.03)",
      
       
        marginHorizontal: scale(12),
        paddingVertical: verticalScale(8),
       
    },
    ImageView:{
        width:wp(15), 
        height:wp(15) ,
       // tintColor:colors.dark_primary_color, 
        borderRadius:wp(15)
    },
    job_tiltetext:{
        fontFamily: fonts.Medium,
        fontSize: scale(14),
        includeFontPadding:false,
        color:"#191919",
    },
    Addresstext:{
        fontFamily: fonts.Medium,
        fontSize: scale(12),
        includeFontPadding:false,
        color:"#191919",
    },
    date:{
        fontFamily: fonts.Medium,
        fontSize: scale(11),
        includeFontPadding:false,
       
    }
})
