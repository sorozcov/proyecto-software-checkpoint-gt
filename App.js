import * as React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from './screens/AuthScreen';


const Stack = createStackNavigator();
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAKPue3cCi_HLt9uZE7RoZIN2alLC0HJi8",
    authDomain: "software-checkpoint-gt.firebaseapp.com",
    databaseURL: "https://software-checkpoint-gt.firebaseio.com",
    projectId: "software-checkpoint-gt",
    storageBucket: "software-checkpoint-gt.appspot.com",
    messagingSenderId: "960829337971",
    appId: "1:960829337971:web:4bea91361f1deaf7ca9506",
    measurementId: "G-8RFP288CFR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();
  

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Initialize Firebase
        configureFirebase();
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
