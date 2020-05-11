import React, { Component } from 'react';
import { ListItem, Left, Body, Text, Right, Button } from 'native-base';



export default class CategoryRow extends Component{
    constructor(props){
        super();
    }
    render(){
     
        return(
            <ListItem thumbnail>
                <Left>
                </Left>
                <Body>
                    <Text>{this.props.name}</Text>
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