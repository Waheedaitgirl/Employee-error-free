import React, {useState} from 'react';
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
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import AddReferrenceModal from '../../components/AddReferrenceModal';
import CustomHeader from '../../components/CustomHeader';
import {width, wp} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {
  useDeleteReferenceMutation,
  useGetReferenceQuery,
} from '../../store/services/taskApi';
import {commonStyles, textStyles} from '../../styles';
const Item = ({item, index, deleteReference}) => {
  const rightButtons = () => {
    return (
      <View style={styles.ActionButtonRows}>
        <TouchableOpacity
          onPress={() => deleteReference()}
          style={{...styles.ActionButton, backgroundColor: colors.error_text}}>
          <AntDesign name="delete" color={colors.white} size={scale(18)} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable
      key={`${index}`}
      containerStyle={{alignSelf: 'center', width: width - scale(10)}}
      renderRightActions={rightButtons}>
      <View style={{...styles.Row, flexDirection: 'column'}}>
        <View style={styles.CardRowView}>
          <Text style={styles.CardTextLeft}>Referral Name</Text>
          <Text style={styles.CardTextRight}>
            {item.first_name} {item.last_name}
          </Text>
        </View>
        <View style={styles.CardRowView}>
          <Text style={styles.CardTextLeft}>Email</Text>
          <Text style={styles.CardTextRight}>{item.email}</Text>
        </View>
      </View>
    </Swipeable>
  );
};
const MyReferences = ({navigation}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [
    deleteReference,
    {isLoading: DeleteLoading, isSuccess: deleteSuccess, isError: deleteError},
  ] = useDeleteReferenceMutation();
  const {data, isError, isSuccess, isLoading} = useGetReferenceQuery(
    user.candidate_id,
  );
  if (isError) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'My References'}
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
  if (isLoading || DeleteLoading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={true}
            onPress={() => navigation.openDrawer()}
            title={'My References'}
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
        <CustomHeader
          show_backButton={true}
          isdrawer={true}
          onPress={() => navigation.openDrawer()}
          title={'My References'}
        />
        <ScrollView style={{flex: 1}}>
          {data.data.map((item, index) => {
            return (
              <Item
                item={item}
                index={index}
                deleteReference={() =>
                  deleteReference(item.candidate_reference_id)
                }
              />
            );
          })}
        </ScrollView>
        {data.data.length < data.count[0].references_required && (
          <TouchableOpacity
            onPress={() => setIsModalVisible(!isModalVisible)}
            style={{
              alignSelf: 'flex-end',
              paddingHorizontal: widthPercentageToDP(5),
              paddingVertical: widthPercentageToDP(5),
              position: 'absolute',
              bottom: widthPercentageToDP(0),
            }}>
            <AntDesign
              name={'pluscircle'}
              size={widthPercentageToDP(10)}
              color={colors.dark_primary_color}
            />
          </TouchableOpacity>
        )}
        <AddReferrenceModal
          isModalVisible={isModalVisible}
          setIsModalVisible={() => setIsModalVisible(!isModalVisible)}
        />
      </SafeAreaView>
    );
  }
};

export default MyReferences;

const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
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
