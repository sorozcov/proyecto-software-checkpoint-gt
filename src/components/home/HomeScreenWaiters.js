import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, Caption, Drawer, Title, withTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import default_pic from '../../assets/resources/default.png';
import * as actionsLoggedUser from '../../logic/actions/loggedUser';
import * as selectors from '../../logic/reducers';
import BranchSelectionModal from './BranchSelectionModal';


import NewOrdersStackScreen from '../orders/NewOrderStackScreen';
import OrderStackScreen from '../orders/OrdersStackScreen';



const DrawerR = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();



function DrawerContent(props) {
    const {navigation, user, logOff, toggleAppMode, isAdminMode} = props;
    const image = (user.image!=null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${user.image}_400x400.jpg?alt=media` : default_pic);

    const [branchModal, setBranchModal] = useState(false);

    return (
        <DrawerContentScrollView {...props}>
        {
        user.name!==undefined && (
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    {
                        image!=18 && (
                            <Avatar.Image
                                source={{
                                    uri:
                                    image,
                                }}
                                size={140}
                                style={{marginTop:10}}
                            />
                        )
                    }
                    {
                        image==18 && (
                            <Avatar.Image
                                source={
                                    image
                                }
                                size={140}
                                style={{marginTop:10}}
                            />
                        )
                    }
                    <Title style={styles.title}>{user.name + " " + user.lastName}</Title>
                    <Caption style={styles.caption}>{user.restaurantName}</Caption>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                    

                    {
                        user.userTypeId == 1 && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <MaterialCommunityIcons
                                    name="account-convert"
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label={`Cambiar a modo ${isAdminMode ? "mesero": "administrador"}`}
                                labelStyle={{ fontSize: 16,fontFamily:'dosis-bold' }}
                                onPress={() => toggleAppMode(navigation)}
                            />
                        )
                    }
                    {
                        (user.userTypeId == 1 || user.canChangeBranch == true) && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <MaterialCommunityIcons
                                    name="store"
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label={`Cambiar sucursal`}
                                labelStyle={{ fontSize: 16,fontFamily:'dosis-bold' }}
                                onPress={() => setBranchModal(true)}
                            />
                        )
                    }
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
                        onPress={() => logOff(navigation)}
                    />
                </Drawer.Section>

                <View style={styles.footer}>
                    <Image
                        source={ require('../../assets/images/checkpoint.jpg') }
                        style={styles.logoImage}
                    />
                    <Text style={styles.restaurantName}>Checkpoint Guatemala</Text>
                </View>

                <BranchSelectionModal
                    navigation={navigation}
                    modal={branchModal}
                    closeModal={()=>setBranchModal(false)}
                />
            </View>
        )}
        </DrawerContentScrollView>
    );
}


function RootNavigator({theme, navigation, user, logOff, toggleAppMode, isAdminMode}) {

    return (
        <DrawerR.Navigator drawerContent={() => (
            <DrawerContent
                navigation={navigation}
                user={user}
                logOff={logOff}
                toggleAppMode={toggleAppMode}
                isAdminMode={isAdminMode}
            />
        )}>
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
        
            <Tab.Screen name="NewOrder"  component={NewOrdersStackScreen}
                options={{
                tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> NUEVO PEDIDO </Text>,
                
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="food" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }} />
                ),
                }}
            />
            <Tab.Screen name="Orders" component={OrderStackScreen} options={{
                tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> PEDIDOS </Text>,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="format-list-numbered" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}/>
                ),
                }}
            />
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
    user: selectors.getLoggedUser(state),
    isAdminMode: selectors.getIsAdminMode(state),
}),
dispatch => ({
    logOff:(navigation) => {
        //Hacemos dispatch de loggoff
        navigation.replace('Login')
        dispatch(actionsLoggedUser.logout());
    },
    toggleAppMode:(navigation) => {
        dispatch(actionsLoggedUser.toggleAdminAppMode());
        navigation.replace('HomeAdmin');
    },
}),
)(withTheme(RootNavigator));