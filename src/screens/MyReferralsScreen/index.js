import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import {wp} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {useGetReferralsQuery} from '../../store/services/taskApi';
import {commonStyles, textStyles} from '../../styles';
const Item = ({item, index}) => {
  return (
    <View key={`${index}`} style={{...styles.Row, flexDirection: 'column'}}>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Referral Name</Text>
        <Text style={styles.CardTextRight}>{item.first_name}</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Email</Text>
        <Text style={styles.CardTextRight}>{item.email_address}</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Job Title</Text>
        <Text style={styles.CardTextRight}>{item.job_title}</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Referred On</Text>
        <Text style={styles.CardTextRight}>
          {moment(item.created_date).format('DD-MMM-YYYY')}
        </Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Status</Text>
        <Text style={styles.CardTextRight}>{item.invitation_status}</Text>
      </View>
      <View style={styles.CardRowView}>
        <Text style={styles.CardTextLeft}>Referral Bonus</Text>
        <Text style={styles.CardTextRight}>${item.referral_bonus}</Text>
      </View>
    </View>
  );
};
const MyRefrerrals = ({navigation}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const {data, isError, isLoading, isFetching, isSuccess} =
    useGetReferralsQuery(user.candidate_id);
  if (isError) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'My Refrerrals'}
          />
          <Image
            source={require('../../assets/images/error.gif')}
            style={{
              width: verticalScale(150),
              height: verticalScale(150),
              resizeMode: 'contain',
              flex: 1,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (isLoading || isFetching) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'My Refrerrals'}
          />

          <ActivityIndicator
            color={colors.dark_primary_color}
            size={'large'}
            style={{flex: 1}}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (isSuccess) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar barStyle={'light-content'} />
        <ScrollView style={{flex: 1}}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'My Refrerrals'}
          />
          <View style={styles.Row}>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>
                Pending:{' '}
                {
                  data.result.filter(item =>
                    item.invitation_status.includes('Pending'),
                  ).length
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>
                Accepted:{' '}
                {
                  data.result.filter(item =>
                    item.invitation_status.includes('Applied'),
                  ).length
                }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>
                Placed:{' '}
                {
                  data.result.filter(item =>
                    item.invitation_status.includes('Placed'),
                  ).length
                }
              </Text>
            </TouchableOpacity>
          </View>
          {data.result.map((item, index) => (
            <Item item={item} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default MyRefrerrals;

const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 10,
    margin: 5,
    borderRadius: 5,
    paddingVertical: widthPercentageToDP(2),
    justifyContent: 'space-evenly',
  },
  CardRowView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: widthPercentageToDP(0.5),
    borderRadius: 5,
    justifyContent: 'space-evenly',
  },
  tab: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(2),
    backgroundColor: colors.dark_primary_color,
  },
  tabText: {
    ...textStyles.Label,
    color: '#fff',
  },
  CardTextLeft: {
    ...textStyles.Label,
    fontFamily: fonts.Medium,
    flex: 0.3,
  },
  CardTextRight: {
    ...textStyles.Label,
    fontFamily: fonts.Regular,
    flex: 0.6,
  },
});
