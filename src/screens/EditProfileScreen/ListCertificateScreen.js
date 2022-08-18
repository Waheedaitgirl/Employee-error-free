import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import {commonStyles} from '../../styles';
import CustomButton from '../../components/Button';
import {colors, fonts} from '../../constants/theme';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Swipeable from 'react-native-gesture-handler/Swipeable';
const ListCertificateScreen = ({navigation}) => {
  const data = [
    {
      certificate_type: 'Google Analytics Certification',
      certification_name: 'Google Analytics Certification',
      certification_no: 'AES_529721',
      key:"1",
      certification_expiry: '2100-10-10',
    },
    {
      certificate_type: 'IBM Data Engineering Professional Certificate',
      certification_name: 'IBM Data Engineering Professional Certificate',
      certification_no: 'IBM_20129',
      key:"2",
      certification_expiry: '2012-10-10',
    },
    {
      certificate_type: 'Harvard Certificate',
      certification_name: 'Harvard Certificate',
      certification_no: 'HAV_912734',
      key:"3",
      certification_expiry: '2025-12-31',
    },
    {
      certificate_type: 'Google Analytics Certification',
      certification_name: 'Google Analytics Certification',
      certification_no: 'AES_529721',
      key:"4",
      certification_expiry: '2100-10-10',
    },
    {
      certificate_type: 'IBM Data Engineering Professional Certificate',
      certification_name: 'IBM Data Engineering Professional Certificate',
      certification_no: 'IBM_20129',
      key:"5",
      certification_expiry: '2012-10-10',
    },
    {
      certificate_type: 'Harvard Certificate',
      certification_name: 'Harvard Certificate',
      certification_no: 'HAV_912734',
      key:"6",
      certification_expiry: '2025-12-31',
    },
    {
      certificate_type: 'Google Analytics Certification',
      certification_name: 'Google Analytics Certification',
      certification_no: 'AES_529721',
      key:"7",
      certification_expiry: '2100-10-10',
    },
    {
      certificate_type: 'IBM Data Engineering Professional Certificate',
      certification_name: 'IBM Data Engineering Professional Certificate',
      certification_no: 'IBM_20129',
      key:"7",
      certification_expiry: '2012-10-10',
    },
    {
      certificate_type: 'Harvard Certificate',
      certification_name: 'Harvard Certificate',
      certification_no: 'HAV_912734',
      key:"8",
      certification_expiry: '2025-12-31',
    },
  ];
  let rowRefs = new Map();
  const rightButtons = () => {
    return(
        <View 
            style={styles.ActionButtonRows}>
            <TouchableOpacity
                onPress={() => alert("Sure to Delete")}
                style={{...styles.ActionButton,backgroundColor:colors.error_text}} 
                >
                <AntDesign name='delete' color={colors.white} size={scale(22)} />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => alert("Sure to Edit")} 
                style={styles.ActionButton}>
                <AntDesign name='edit' color={colors.white} size={scale(22)} />
            </TouchableOpacity>
        </View>
    )
  }

  const createEducationItem = ({item, index}) => {
    return (
      <Swipeable
        key={item.key}
        ref={ref => {
          if (ref && !rowRefs.get(item.key)) {
            rowRefs.set(item.key, ref);
          }
        }}
        onSwipeableWillOpen={()=>{
          [...rowRefs.entries()].forEach(([key, ref]) => {
            if (key !== item.key && ref) ref.close();
          });
       }}
       renderRightActions={rightButtons} >
      <View    key={`${index}`} style={styles.EducationMainView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome5
            color={colors.dark_primary_color}
            name={'medal'}
            size={scale(40)}
          />
        </View>
        <View style={{marginLeft: scale(15), width: '80%'}}>
          <Text numberOfLines={1}   ellipsizeMode={"middle"} style={styles.job_tiltetext}>{item.certificate_type}</Text>
          <Text numberOfLines={1} ellipsizeMode={"middle"} style={styles.Addresstext}>
            {item.certification_name} - {item.certification_no}
          </Text>
          <View style={{flexDirection:"row"}} >
            <Text style={styles.date}>{item.certification_expiry}</Text>
            <Text style={{...styles.date,marginRight:scale(0),}}>-</Text>
            <Text
              style={{
                ...styles.date,
                color: '#fff',
                width: 75,
                textAlign: 'center',
                borderRadius: 4,
               
                marginLeft:scale(10),
                backgroundColor: moment().isAfter(
                  moment(item.certification_expiry),
                )
                  ? 'red'
                  : 'green',
              }}>
              {' '}
              {moment().isAfter(moment(item.certification_expiry))
                ? 'Expire'
                : 'Valid'}
            </Text>
          </View>
        </View>
      </View>
      </Swipeable>
    );
  };

  const EduListing = () => {
    return (
      <FlatList
        disableVirtualization={false}
        showsVerticalScrollIndicator={false}
        data={data}
        ListEmptyComponent={emptySection}
        renderItem={createEducationItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const emptySection = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            marginTop: heightPercentageToDP(10),
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
            No Specility to show
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        {EduListing()}
        <CustomButton
          loading={false}
          loadingText={'Saving'}
          onPress={() => alert('Adddd')}
          text={'Add Certificate'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListCertificateScreen;

const styles = StyleSheet.create({
  EducationMainView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.03)',

    marginHorizontal: scale(12),
    paddingVertical: verticalScale(8),
  },
  ImageView: {
    width: wp(15),
    height: wp(15),
    // tintColor:colors.dark_primary_color,
    borderRadius: wp(15),
  },
  job_tiltetext: {
    fontFamily: fonts.Medium,
    fontSize: scale(14),
    includeFontPadding: false,
    color: '#191919',
  },
  Addresstext: {
    fontFamily: fonts.Medium,
    fontSize: scale(12),
    includeFontPadding: false,
    color: '#191919',
  },
  date: {
    fontFamily: fonts.Medium,
    fontSize: scale(11),
    marginRight:scale(10),
    includeFontPadding: false,
  },
  ActionButtonRows:{ 
    borderTopRightRadius:scale(5),
    overflow:"hidden",
    borderBottomRightRadius:scale(5),
    justifyContent:"space-evenly", 
    backgroundColor:"red", 
    alignItems:"center",
    marginVertical:scale(5)
},
ActionButton:{
    paddingHorizontal:scale(10),
    justifyContent:"center", 
    alignItems:"center", 
    flex:1, 
    backgroundColor:"#e6a020"
}
});
