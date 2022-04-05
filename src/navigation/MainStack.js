import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen/index';
import EditProfileScreen from '../screens/EditProfileScreen'

// TimeSheet
import TimeSheetListScreen from '../screens/TimeSheetScreen';
import AddTimeSheetScreen from '../screens/TimeSheetScreen/AddTimeSheetScreen';
import DetailsSheetScreen from '../screens/TimeSheetScreen/DetailsTimeSheetScreen';

// Expenses screen
import MyExpensesScreen from '../screens/ExpensesScreen';
import ExpenseDetailsScreen from '../screens/ExpensesScreen/ExpansesDetails';
import AddExpenseScreen from '../screens/ExpensesScreen/AddExpenseScreen';

import MyTasksScreen from '../screens/MyTasksScreen';
import MyTimeScreen from '../screens/MyTimeScreen';
import LeavesScreen from '../screens/LeavesScreen';
import CalendarScreen from '../screens/CalendarScreen';
import DrawerContent from './DrawerContent';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
    return(
        <Stack.Navigator
            initialRouteName='HomeScreen'
        >
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="EditProfileScreen" 
                component={EditProfileScreen} 
                options={{
                    headerShown:false
                }}
            />
            
            <Stack.Screen 
                name="TimeSheetListScreen" 
                component={TimeSheetListScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="DetailsSheetScreen" 
                component={DetailsSheetScreen} 
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="AddTimeSheetScreen" 
                component={AddTimeSheetScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="MyExpensesScreen" 
                component={MyExpensesScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="ExpenseDetailsScreen" 
                component={ExpenseDetailsScreen} 
                options={{
                    headerShown:false
                }}
            />

            <Stack.Screen 
                name="AddExpenseScreen" 
                component={AddExpenseScreen} 
                options={{
                    headerShown:false
                }}
            />


            <Stack.Screen 
                name="MyTasksScreen" 
                component={MyTasksScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="MyTimeScreen" 
                component={MyTimeScreen} 
                options={{
                    headerShown:false
                }}
            />
            
            <Stack.Screen 
                name="LeavesScreen" 
                component={LeavesScreen} 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name="CalendarScreen" 
                component={CalendarScreen} 
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}
const StackNavigator = () => (
    <Drawer.Navigator
      gestureEnabled={false}
      screenOptions={{
        swipeEnabled:true,
        headerShown:false
      }}
        drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name ="MainStack" headerShown={false}>
                {props => <MainStack {...props} />}
            </Drawer.Screen>
    </Drawer.Navigator>
)

export default StackNavigator;