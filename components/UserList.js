import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, Spinner } from 'native-base';
import { Dimensions, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import UserListItem from './UserListItem';
import * as actions from '../src/actions/users';
import * as selectors from '../src/reducers';
import { HeaderBackground } from '@react-navigation/stack';
import { ThemeColors } from 'react-navigation';
import { colors } from 'react-native-elements';

const width = Dimensions.get('window').width; // full width

function UserList ({ onLoad, users, isLoading, navigation, newUser }) {
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
        </View>
    )
}

export default connect(
    state => ({
        users: selectors.getUsers(state),
        isLoading: selectors.isFetchingUsers(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingUsers());
        },
        newUser(navigation) {
            dispatch(actions.deselectUser());
            navigation.navigate('SignupScreen');
        },
    }),
)(UserList)
