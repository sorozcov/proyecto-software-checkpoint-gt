import React, { Component } from 'react';
import { Container, Content, Header, List } from 'native-base';
import { Dimensions } from "react-native";

import UserListItem from './UserListItem';

var width = Dimensions.get('window').width; // full width

export default class UserList extends Component{
    render(){
        return(
            <Container width={width}>
                <Header />
                <Content>
                    <List>
                        <UserListItem name="Nombre de usuario" description="Datos o descripción idk"/>
                        <UserListItem name="Nombre de usuario" description="Datos o descripción idk"/>
                        <UserListItem name="Nombre de usuario" description="Datos o descripción idk"/>
                        <UserListItem name="Nombre de usuario" description="Datos o descripción idk"/>
                        <UserListItem name="Nombre de usuario" description="Datos o descripción idk"/>
                        <UserListItem name="Nombre de usuario" description="Datos o descripción idk"/>
                        <UserListItem name="Nombre de usuario" description="Datos o descripción idk"/>
                    </List>
                </Content>
            </Container>
        )
    }
}