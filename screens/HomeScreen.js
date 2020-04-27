import * as React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from '../components/ImagePickerUser';




function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function AnotherScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function AnotherScreen2() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function Main({theme, navigation}) {
  const {colors} = theme;
  return (
    
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#000000"
       
        shifting={false}
        barStyle={{ backgroundColor: colors.primary ,paddingBottom:10,paddingTop:12,fontSize:'30px'}}
      >
       
        <Tab.Screen name="Menu"  component={HomeScreen}
                options={{
                  tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> EXPLORAR </Text>,
                  
                  
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }} />
                  ),
                }} />
        <Tab.Screen name="Usuarios" component={SettingsScreen} options={{
                   tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> MIS VENTAS </Text>,
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}/>
                  ),
                }} />
         <Tab.Screen name="Sucursales" component={AnotherScreen} options={{
                   tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> PERFIL </Text>,
                 
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account"  color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}  />
                  ),
                  
                }} />
        <Tab.Screen name="Reportes" component={AnotherScreen2} options={{
                   tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> PERFIL </Text>,
                 
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account"  color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}  />
                  ),
                  
                }} />
             
      </Tab.Navigator>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'dosis-regular',
  },
  topContainer: {
    flex: 0.8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  inputContainerStyle: {
    margin: 8,
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-semi-bold',
    fontSize:16
  }
});

export default withTheme(Main);