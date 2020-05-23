import * as React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from './screens/AuthScreen';



import configureStore from './store';
import HomeScreen from './screens/HomeScreenAdmin';
//Importamos firebaseApp para que este de forma global
import { firebaseApp } from './firebase';


//Mute warnings
//console.disableYellowBox = true;



//Se crea el store
const store = configureStore();
//store.subscribe(() => console.log(store.getState()))

//Se configura el tema 
const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E50000',
    accent: '#0097B5',
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
          'dosis-regular': require('./assets/fonts/Dosis-Regular.ttf'),
          'dosis-medium': require('./assets/fonts/Dosis-Medium.ttf'),
          'dosis-light': require('./assets/fonts/Dosis-Light.ttf'),
          'dosis-extra-light': require('./assets/fonts/Dosis-ExtraLight.ttf'),
          'dosis-semi-bold': require('./assets/fonts/Dosis-SemiBold.ttf'),
          'dosis-bold': require('./assets/fonts/Dosis-Bold.ttf'),
          'dosis-extra-bold': require('./assets/fonts/Dosis-ExtraBold.ttf'),
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
            { true ? <AuthScreen />
            : <HomeScreen/>}
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
