import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button } from 'native-base';

import default_pic from '../../src/resources/order.png';
import * as actions from '../../src/actions/orders';


class OrderItem extends Component{
    constructor(props){
        super();
        // this.image = (props.image != null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/OrderImages%2F${props.image}_400x400.jpg?alt=media` : null);
        this.image = null;
        this.style = props.style;
        this.onPress = props.onPress;
    }
    render(){
     
        return(
            <ListItem onPress={this.onPress} thumbnail style={{...this.style}}>
                <Left>
                    <Thumbnail square source={this.image === null ? default_pic : {uri: this.image}} />
                </Left>
                <Body>
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:18}}>{this.props.name}</Text>
                    <Text style={{fontFamily:'dosis-light',fontSize:15}} note numberOfLines={1}>{this.props.date}</Text>
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:15}} note numberOfLines={1}>Total: Q. {this.props.total}</Text>
                </Body>
               
            </ListItem>
        );
    }
}

export default connect(
    undefined,
    dispatch => ({
    //   selectOrder(navigation, order) {
    //     dispatch(actions.selectOrder(order));
    //     navigation.navigate('EditOrderScreen');
    //   },
    }),
  )(OrderItem);
  