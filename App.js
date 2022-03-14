import React from 'react';
import MainApp from './src/navigation';
import { MenuProvider } from 'react-native-popup-menu';
const App = () => {
    return (
        <MenuProvider>
            <MainApp />
        </MenuProvider>
    );
};


export default App;
