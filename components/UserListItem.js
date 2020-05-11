import React, { Component } from 'react';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button } from 'native-base';

import default_pic from '../src/resources/default.png';


export default class UserListItem extends Component{
    constructor(props){
        super();
        this.image = (props.image!=null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${props.image}_400x400.jpg?alt=media` : null);
        
    }
    render(){
     
        return(
            <ListItem thumbnail>
                <Left>
                    <Thumbnail circle source={this.image === null ? default_pic : {uri: this.image}} />
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
