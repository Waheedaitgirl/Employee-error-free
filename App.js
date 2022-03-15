import React from 'react';
import MainApp from './src/navigation';
import { MenuProvider } from 'react-native-popup-menu';
import {store} from './src/store/index';
import {Provider} from 'react-redux';
const App = () => {
    return (
        <Provider store={store}>
            <MenuProvider>
                <MainApp />
            </MenuProvider>
        </Provider>
    );
};


export default App;
