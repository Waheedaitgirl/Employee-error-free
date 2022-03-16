import React from 'react';
import { SafeAreaView,View,StyleSheet,Text} from 'react-native';
import { commonStyles,textStyles } from '../../styles';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import { scale } from 'react-native-size-matters';
import TimeSheetItem from './TimeSheetItem';
import CommentsBox from './CommentsBox';
import { AppScreenWidth } from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import DrawLine from '../../components/DrawLine';
import WeeklySummary from './Summary';
import UpLoadComponent from '../../components/Uploadcomponent';
import { colors } from '../../constants/theme';
    const DetailsSheetScreen = ({navigation, route}) => {
       let item = route.params.item
      
       let summary = [
           "Mar 14", "Mar 15", "Mar 16", "Mar 17", "Mar 18", "Mar 19", "Mar 20"]
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={false}
                    onPress={() => navigation.goBack()}
                    title={"Details TimeSheet"}
                />
              
               
                <TimeSheetItem 
                    time={item.time} 
                    name={item.name}
                    submittedto={item.submittedto}
                    status={item.status}
                    hours={item.hours}
                    onPress={() => {}}
                />
                <WeeklySummary summerydays={summary} />
                {
                    item.status == 'drafted' &&
                        <UpLoadComponent /> 
                }
                <View style={{width:AppScreenWidth}} >
                    <Text style={{...textStyles.smallheading,color:"#0090FF"}}>Comments</Text>
                    <DrawLine marginTop={scale(5)} />
                    <DrawLine marginTop={scale(1)} />
                    <CommentsBox 
                        title={"Approver Comment"}
                        name={"Approver"}
                        comment={"this is comment by approver"}
                    />
                    <CommentsBox 
                        title={"Submitter Comment"}
                        name={"Submitter"}
                        comment={null}
                    />

                    <CommentsBox 
                        title={"Document Attached"}
                        comment={null}
                    />
                </View>
                <Spacer />
                {
                    item.status == 'drafted' ?
                    <View>
                        <CustomButton 
                            onPress={() => navigation.goBack()}
                            loading={false}
                            backgroundColor={colors.blue}
                            text={"Submit Timesheet"}
                            loadingText={"Processing"}
                        />
                        <Spacer />
                        <CustomButton 
                            onPress={() => navigation.goBack()}
                            loading={false}
                            text={"Discard"}
                            loadingText={"Processing"}
                        />
                    </View>
                    :
                    <CustomButton 
                        onPress={() => navigation.goBack()}
                        loading={false}
                        backgroundColor={colors.blue}
                        text={"Back"}
                        loadingText={"Processing"}
                    />
                }
            </View>
        );
    };


export default DetailsSheetScreen;
