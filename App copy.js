import React from 'react';
import MainApp from './src/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';
import {store,persistor } from './src/store/index';
import {Provider} from 'react-redux';
const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MenuProvider>
                    <MainApp />
                </MenuProvider>
            </PersistGate>
        </Provider>
    );
};


export default App;
