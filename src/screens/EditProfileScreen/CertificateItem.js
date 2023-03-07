import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MainRoutes} from '../../constants/routes';
import {colors, fonts} from '../../constants/theme';
const CertificateItem = ({item}) => {
  const navigation = useNavigation();
  const swipeRef = React.useRef();
  const closeSwipable = () => {
    swipeRef?.current?.close();
  };

  const rightButtons = () => {
    return (
      <View style={styles.ActionButtonRows}>
        <TouchableOpacity
          onPress={() => alert('Sure to Delete')}
          style={{...styles.ActionButton, backgroundColor: colors.error_text}}>
          <AntDesign name="delete" color={colors.white} size={scale(18)} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            closeSwipable(),
              navigation.navigate(MainRoutes.AddCertificateScreen);
          }}
          style={styles.ActionButton}>
          <AntDesign name="edit" color={colors.white} size={scale(18)} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable ref={swipeRef} renderRightActions={rightButtons}>
      <View style={styles.EducationMainView}>
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
          <Text
            numberOfLines={1}
            ellipsizeMode={'middle'}
            style={styles.job_tiltetext}>
            {item.credentials}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'middle'}
            style={styles.Addresstext}>
            Certificate No - {item.certification_no}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.date}>{item.expiry_date}</Text>
            <Text style={{...styles.date, marginRight: scale(0)}}>-</Text>
            <Text
              style={{
                ...styles.date,
                color: '#fff',
                width: 75,
                textAlign: 'center',
                borderRadius: 4,

                marginLeft: scale(10),
                backgroundColor: moment().isAfter(moment(item.expiry_date))
                  ? 'red'
                  : 'green',
              }}>
              {' '}
              {moment().isAfter(moment(item.expiry_date)) ? 'Expire' : 'Valid'}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CertificateItem;

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
    marginRight: scale(10),
    includeFontPadding: false,
  },
  ActionButtonRows: {
    borderTopRightRadius: scale(5),
    overflow: 'hidden',
    borderBottomRightRadius: scale(5),
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  ActionButton: {
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e6a020',
  },
});
