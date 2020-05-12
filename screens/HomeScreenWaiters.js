import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {withTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import { createDrawerNavigator,  DrawerItem,DrawerContentScrollView, } from '@react-navigation/drawer';
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer } from 'react-native-paper';

const DrawerR = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();


function DrawerContent(props) {
  const {navigation} = props;
  return (
    <DrawerContentScrollView {...props}>
    <View
      style={
        styles.drawerContent
      }
    >
   
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
          size={140}
          style={{marginTop:10}}
        />
        <Title style={styles.title}>Nombre</Title>
        <Caption style={styles.caption}>Checkpoint Majadas</Caption>
       
      </View>
      <Drawer.Section style={styles.drawerSection}>
        
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="logout"
              color={color}
              size={size}
            />
          )}
          label="Cerrar sesión"
          labelStyle={{ fontSize: 16,fontFamily:'dosis-bold' }}
          onPress={() => {navigation.navigate('Login') }}
        />
        
      </Drawer.Section>
      <View style={styles.footer}>
      <Image
            source={ require('../assets/images/checkpoint.jpg') }
            style={styles.logoImage}
          />
          <Text style={styles.restaurantName}>Checkpoint GT</Text>
      </View>
     
    </View>
  </DrawerContentScrollView>
  );
}




function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text>Nuevo Pedido!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pedidos!</Text>
    </View>
  );
}

function RootNavigator({theme,navigation}) {
  return (
    <DrawerR.Navigator drawerContent={() => <DrawerContent navigation={navigation}/>}>
      <DrawerR.Screen name="Main" component={Main} />
    </DrawerR.Navigator>
  );
};






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
       
        <Tab.Screen name="NewOrder"  component={HomeScreen}
                options={{
                  tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> NUEVO PEDIDO </Text>,
                  
                  
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="food" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }} />
                  ),
                }} />
        <Tab.Screen name="Orders" component={SettingsScreen} options={{
                   tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> PEDIDOS </Text>,
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="format-list-numbered" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}/>
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
    alignSelf:'center',
    bottom:0,
    position:'relative',
    
  
  },
  footer:{
    flex:1,
    flexDirection:'column',
    alignSelf:'center'
    
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  textStyle:{
    textAlign: 'center', 
    fontFamily: 'dosis-semi-bold',
    fontSize:16,
    
  },
  drawerContent: {
    flex: 1,
    flexDirection:'column',
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor:'black',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
  },
  checkpointInfo: {
    paddingLeft: 20,
    backgroundColor:'red',
    marginBottom:10,
    paddingBottom:10,
    paddingTop:10,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily:'dosis-bold',
    color:'white'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily:'dosis-bold',
    color:'white'
  },
  restaurantName: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily:'dosis-bold',
    color:'black',

  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

Main = withTheme(Main);
export default connect(
  state => ({
    
  }),
  dispatch => ({
    
  }),
)(withTheme(RootNavigator));