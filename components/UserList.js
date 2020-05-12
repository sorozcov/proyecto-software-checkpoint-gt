import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, Spinner } from 'native-base';
import { Dimensions, Modal, View, StyleSheet } from "react-native";
import { ActivityIndicator, withTheme } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import UserListItem from './UserListItem';
import * as actions from '../src/actions/users';
import * as selectors from '../src/reducers';
import { HeaderBackground } from '@react-navigation/stack';

const width = Dimensions.get('window').width; // full width

function UserList ({ theme, onLoad, users, isLoading, navigation, newUser, isAdding, isEditing }) {
    const { colors, roundness } = theme;
    useEffect(onLoad, []);
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
                isLoading && (
                    <Spinner color='red' />
                )
            }
            {
                users.length < 0 && !isLoading && (
                    <View>No hay usuarios registrados</View>
                )
            }
            {
                users.length > 0 && !isLoading && (
                    <Container width={width}>
                        <Content>
                            <List>
                                {
                                    users.map(user => <UserListItem key={user.uid} name={`${user.name} ${user.lastName}`} description={user.email} image={user.image} user={user} navigation={navigation} />)
                                }
                            </List>
                        </Content>            
                        <FloatingAction
                            buttonSize={50}
                            color='black'
                            overrideWithAction={true}
                            onPressItem={() => newUser(navigation)}
                            actions={[{
                                icon: (
                                    <MaterialCommunityIcons name="account-plus" color='white' size={20} style={{ marginRight: 3, }}/>
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
  }
})

export default connect(
    state => ({
        users: selectors.getUsers(state),
        isLoading: selectors.isFetchingUsers(state),
        isAdding: selectors.isAddingUsers(state),
        isEditing: selectors.isEditingUsers(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
        },
        newUser(navigation) {
            dispatch(actions.deselectUser());
            navigation.navigate('EditUserScreen');
        },
    }),
)(withTheme(UserList))
