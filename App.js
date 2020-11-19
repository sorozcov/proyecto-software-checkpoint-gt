import * as React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from './src/components/login/AuthScreen';
//SettingsTimeAgo and Dates on app
let TimeAgo = require('react-native-timeago');
let moment = require('moment'); //load moment module to set local language
require('moment/locale/es'); //for import moment local language file during the application build
moment.locale('es');//set moment local language to zh-cn




import configureStore from './src/logic/store';


//Mute warnings
console.disableYellowBox = true;

console.warn = () => {};


//Se crea el store
export const store = configureStore();

// store.subscribe(() => console.log(store.getState()))

//Se configura el tema 
const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    red: 'red',
    primary: '#E50000',
    black:'black',
    white:'white',
    accent: '#00AACC',
    gray2:'#605856',
    gray:'#FF2D2D'
  },
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();
  

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Initialize Firebase
        
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'dosis-regular': require('./src/assets/fonts/Dosis-Regular.ttf'),
          'dosis-medium': require('./src/assets/fonts/Dosis-Medium.ttf'),
          'dosis-light': require('./src/assets/fonts/Dosis-Light.ttf'),
          'dosis-extra-light': require('./src/assets/fonts/Dosis-ExtraLight.ttf'),
          'dosis-semi-bold': require('./src/assets/fonts/Dosis-SemiBold.ttf'),
          'dosis-bold': require('./src/assets/fonts/Dosis-Bold.ttf'),
          'dosis-extra-bold': require('./src/assets/fonts/Dosis-ExtraBold.ttf'),
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
             <AuthScreen />
            
          </View>
        </PaperProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
