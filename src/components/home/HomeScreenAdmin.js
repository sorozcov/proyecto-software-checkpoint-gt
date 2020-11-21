import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Image as ImageReact,StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Image from 'react-native-image-progress';
import React, { Component,useEffect, useState } from 'react';
import { Avatar, Caption, Drawer, Title, withTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import default_pic from '../../assets/resources/default.png';
import * as actionsLoggedUser from '../../logic/actions/loggedUser';
import * as selectors from '../../logic/reducers';
import BranchesStackScreen from '../branches/BranchesStackScreen';
import UsersStackScreen from '../users/UsersStackScreen';
import ReportsStackScreen from '../reports/ReportsStackScreen';
import MenuStackScreen from './MenuStackScreen';
import AboutModal from './AboutModal';
import * as firebase from "firebase";


function ReportsScreen() {
  return (
    <ReportsStackScreen />
  );
}

function Users() {
  return (
    <UsersStackScreen />
  );
}

function Branches() {
  return (
    <BranchesStackScreen />
  );
}

function Categories() {
  return(
    <MenuStackScreen />
  );
}

const DrawerR = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();


function DrawerContent(props) {
  const {navigation, user, logOff, toggleAppMode, isAdminMode} = props;
  const image = (user.image!=null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${user.image}_400x400.jpg?alt=media` : default_pic);
  const [imageUrl, setImage] = useState(null);
  const [errorLoadingImage, setErrorLoadingImage] = useState(false);
    useEffect(()=>{async function getImage(){
        
        if(!errorLoadingImage){
        try{
            
            if(props.user.image!=null){
                let img = await firebase.storage().ref().child(`UserImages/${props.user.image}_400x400.jpg`).getDownloadURL();
                
                setImage(img);
                
            } 
        }catch(error){
            
            setErrorLoadingImage(true);
            setTimeout(getImage,500);
        }
        }
    }
    getImage();

    },[props.user.image])
    const userImage = imageUrl === null ? default_pic : {uri: imageUrl, cache:'force-cache'};
    const [aboutModal, setAboutModal] = useState(false);
  return (
    <DrawerContentScrollView {...props}>
       {user.name!==undefined  && <View
            style={
              styles.drawerContent
            }
        >

            <View style={styles.userInfoSection}>

            <Image  source={userImage} imageStyle={{height: 130,width:130,borderRadius:130}} style={{height: 130,width:130,borderRadius:130,marginTop:10}}/>
                <Title style={styles.title}>{user.name + " "+ user.lastName}</Title>
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
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => setAboutModal(true)}
            >  
                <View style={styles.footer}>
                <ImageReact
                    source={ require('../../assets/images/checkpoint.jpg') }
                    style={styles.logoImage}
                    />
                    <Text style={styles.restaurantName}>Checkpoint Guatemala</Text>
                </View>
            </TouchableOpacity>    

            <AboutModal
                navigation={navigation}
                modal={aboutModal}
                closeModal={()=>setAboutModal(false)}
            />        
        </View>}
  </DrawerContentScrollView>
  );
}

function RootNavigator({theme, navigation, user, logOff, toggleAppMode, isAdminMode}) {
  return (
    <DrawerR.Navigator drawerContent={() => (
        <DrawerContent
            navigation={navigation}
            logOff={logOff}
            user={user}
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
        activeColor={colors.primary}
        inactiveColor={colors.gray2}
        lazy={false}
        shifting={false}
        barStyle={{ backgroundColor: colors.white ,paddingBottom:0,paddingTop:3,fontSize:'30px'}}
    > 
        <Tab.Screen
            name="Menu"
            component={Categories}
            options={{
                tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> MENÚ </Text>,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="food" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }} />
                ),
            }}
        />
        <Tab.Screen
            name="Sucursales"
            component={Branches}
            options={{
                tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> SUCURSALES </Text>,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="store" color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}/>
                ),
            }}
        />
        <Tab.Screen
            name="Usuarios"
            component={Users}
            options={{
                tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> USUARIOS </Text>,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-multiple"  color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}  />
                ),
            }}
        />
        <Tab.Screen
            name="Reportes"
            component={ReportsScreen}
            options={{
                tabBarLabel: <Text style={{ fontSize: 12,fontFamily:'dosis-bold' }}> REPORTES </Text>,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="chart-bar"  color={color} size={25}
                    style={{ marginTop: 0,paddingBottom:8 }}  />
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
        logOff:(navigation)=>{
    
        //Hacemos dispatch de loggoff
        navigation.replace('Login')
        dispatch(actionsLoggedUser.logout());
        
        },
        toggleAppMode:(navigation)=>{
        dispatch(actionsLoggedUser.toggleAdminAppMode());
        navigation.replace('HomeWaiters');
    
        },
    }),
)(withTheme(RootNavigator));