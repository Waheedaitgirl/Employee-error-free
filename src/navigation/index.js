import React, { useEffect, useState } from 'react';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import { colors } from '../constants/theme';
const MainApp = () => {
    const [is_loggedin , setIsLoggedIn] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsLoggedIn(true)
        },1000)
    })
    return(
        <NavigationContainer>
            <StatusBar
                backgroundColor={colors.dark_primary_color}
                barStyle={'dark-content'}
            />
            {
                is_loggedin
                
                ?
                    <MainStack />
                :
                    <AuthStack />
            }
        </NavigationContainer>
    )
};

export default MainApp

