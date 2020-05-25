import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { Dimensions, Modal, View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { withTheme } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import UserListItem from '.././UserListItem';
import * as actions from '../../src/actions/users';
import * as selectors from '../../src/reducers';
import { HeaderBackground } from '@react-navigation/stack';
import * as actionsUsers from '../../src/actions/users';

const width = Dimensions.get('window').width; // full width


function UserList ({ theme, onLoad, onRefresh,users, isLoading, navigation, newUser, isAdding, isEditing, selectUser, deleteUser, branch }) {
    const { colors, roundness } = theme;

    useEffect(onLoad, []);
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

           
            {
                 (
                    <Container  width={width}>
                             {
                                users.filter(user => branch === null ? user : user.restaurantName === branch.name).length <= 0 && !isLoading && (
                                    <View style={{flex:0.1,alignItems:'center',paddingTop:10}}>
                                            <MaterialCommunityIcons name="information" color='black' size={50} />
                                            <Text style={{paddingTop:10,fontSize:20,fontFamily:'dosis-bold',alignSelf:'center'}}>No hay usuarios registrados en esta sucursal</Text>
                                    </View>
                                )
                            }
                            <SwipeListView
                                style={{marginTop:8}}
                                data={users.filter(user => branch === null ? user : user.restaurantName === branch.name)}
                                renderItem={ (user, rowMap) => (
                                    <UserListItem style={styles.rowFront} key={user.item.uid} name={`${user.item.name} ${user.item.lastName}`} description={user.item.email} image={user.item.image} user={user.item} navigation={navigation} />
                                )}
                                disableRightSwipe={true}
                                refreshing={isLoading}
                                onRefresh={()=>onRefresh()}
                                keyExtractor={user => user.uid}
                                renderHiddenItem={
                                    (user, rowMap) => (
                                        <View style={styles.rowBack}>
                                            
                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                                onPress={() => {selectUser(navigation, user.item);rowMap[user.item.uid].closeRow();}}
                                            >
                                                <MaterialCommunityIcons
                                                name="pencil"
                                                color={'black'}
                                                size={30}
                                                />
                                                 <Text style={styles.backTextWhite}>Editar</Text>
                                               
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnRight]}
                                                
                                                onPress={ () => {
                                                    rowMap[user.item.uid].closeRow();
                                                    Alert.alert(
                                                        '¿Eliminar usuario?',
                                                        'Esta acción no puede ser revertida',
                                                        [
                                                            {
                                                                text: 'Cancelar', 
                                                                style: 'cancel'
                                                            },
                                                            {
                                                                text: 'Eliminar',
                                                                onPress: () => deleteUser(user.item.uid),
                                                                style: 'destructive'
                                                            }
                                                        ],
                                                        {
                                                            cancelable: true,
                                                        },
                                                    )
                                                }}
                                            >
                                                <MaterialCommunityIcons
                                                name="delete"
                                                color={'black'}
                                                size={30}
                                                />
                                                 <Text style={styles.backTextWhite}>Eliminar</Text>
                                               
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                leftOpenValue={0}
                                rightOpenValue={-150}
                                previewRowKey={'0'}
                                
                                previewOpenDelay={1000}
                            />

                                 
                        <FloatingAction
                            
                            buttonSize={50}
                            color='black'
                            overrideWithAction={true}
                            onPressItem={() => newUser(navigation)}
                            actions={[{
                                icon: (
                                    <MaterialCommunityIcons name="account-plus" color='white' size={20} style={{ marginRight: 4, }}/>
                                  ),
                                name:'AddUser'
                              }]}
                        />
                    </Container>
                )
            }
            <Modal
                transparent={true}
                animationType={'none'}
                visible={isAdding || isEditing}>
                <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" animating={isAdding || isEditing} color={colors.primary} />
                </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#ffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
      
    },
    rowFront: {        
        backgroundColor: '#ffffff',
 
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: '#FFF11B',
        right: 75,
        
    },
    backRightBtnRight: {
        backgroundColor: '#FF0D0D',
        
        right: 0,
    },
    
})

export default connect(
    state => ({
        users: selectors.getUsers(state),
        isLoading: selectors.isFetchingUsers(state),
        isAdding: selectors.isAddingUsers(state),
        isEditing: selectors.isEditingUsers(state),
        branch: selectors.getViewedBranch(state)
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
        },
        onRefresh() {
            dispatch(actions.startFetchingUsers());
        },

        newUser(navigation) {
            dispatch(actions.deselectUser());
            navigation.navigate('EditUserScreen');
        },

        selectUser(navigation, user) {
            dispatch(actionsUsers.selectUser(user));
            navigation.navigate('EditUserScreen');
        },

        deleteUser(uid) {
            dispatch(actions.startRemovingUser(uid))
        },
    }),
)(withTheme(UserList))
