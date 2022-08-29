import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MainRoutes} from '../../constants/routes';
import {colors, fonts} from '../../constants/theme';
export default CreateEducationItem = ({item, index}) => {
  const navigation = useNavigation();
  const swipeRef = React.useRef();
  const closeSwipable = () => {
    swipeRef?.current?.close();
  };

  const rightButtons = () => {
    return (
      <View style={styles.ActionButtonRows}>
        {/* <TouchableOpacity
          onPress={() => alert('Sure to Delete')}
          style={{...styles.ActionButton, backgroundColor: colors.error_text}}>
          <AntDesign name="delete" color={colors.white} size={scale(22)} />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            closeSwipable(),
              navigation.navigate(MainRoutes.AddEducationScreen, {item});
          }}
          style={styles.ActionButton}>
          <AntDesign name="edit" color={colors.white} size={scale(22)} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable ref={swipeRef} renderRightActions={rightButtons}>
      <View key={`${index}`} style={styles.EducationMainView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={styles.ImageView}
            source={require('../../assets/images/study.png')}
          />
        </View>
        <View style={{marginLeft: scale(15), width: '80%'}}>
          <Text style={styles.job_tiltetext}>{item.education_title}</Text>
          <Text numberOfLines={2} style={styles.Addresstext}>
            {item.education_details}
          </Text>

          <Text style={styles.date}>
            {`${moment(
              item.education_start_date !== null
                ? item.education_start_date
                : moment().subtract(4, 'years'),
            ).format('MMM YYYY')} - `}
            {item.is_currently_studying == '1'
              ? 'Present'
              : `${moment().format('MMM YYYY')}`}
            {'  •  '}
            {item.is_currently_studying == '1'
              ? '1' === '1'
                ? moment(item.education_end_date).fromNow()
                : moment([
                    item.education_start_date !== null
                      ? item.education_start_date
                      : moment().subtract(4, 'years'),
                  ]).from(moment([item.education_end_date]))
              : null}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  EducationMainView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.03)',

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
