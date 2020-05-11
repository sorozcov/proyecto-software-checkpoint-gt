import React, { Component } from 'react';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button } from 'native-base';

import default_pic from '../src/resources/default.png';

export default class UserListItem extends Component{
    render(){
        return(
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={this.props.image === null ? default_pic : {uri: this.props.image}} />
                </Left>
                <Body>
                    <Text>{this.props.name}</Text>
                    <Text note numberOfLines={1}>{this.props.description}</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>Ver</Text>
                    </Button>
                </Right>
            </ListItem>
        );
    }
}
