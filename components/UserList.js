import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Header, List, Spinner } from 'native-base';
import { Dimensions } from "react-native";

import UserListItem from './UserListItem';
import * as actions from '../src/actions/users';
import * as selectors from '../src/reducers';

const width = Dimensions.get('window').width; // full width

function UserList ({ onLoad, users, isLoading }) {
    useEffect(onLoad, []);

    return(
        <Fragment>
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
                        <Header/>
                        <Content>
                            <List>
                                {
                                    users.map(({ name, lastName, image, uid, email }) => <UserListItem key={uid} name={`${name} ${lastName}`} description={email} image={image}/>)
                                }
                            </List>
                        </Content>
                    </Container>
                )
            }
        </Fragment>
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
    }),
)(UserList)
