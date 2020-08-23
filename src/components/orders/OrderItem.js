import { Body, Left, ListItem, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import TimeAgo from 'react-native-timeago';
import moment from 'moment'
import { connect } from 'react-redux';
import default_pic from '../../assets/resources/order.png';


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
                    <Text style={{fontFamily:'dosis-light',fontSize:15}} note numberOfLines={1}><TimeAgo time={this.props.date} hideAgo={false} /></Text>
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:15}} note numberOfLines={1}>Total: Q. {this.props.total}</Text>
                </Body>
               
            </ListItem>
        );
    }
}

export default connect(
    undefined,
    dispatch => ({
      selectOrder(navigation, order) {
        dispatch(actions.selectOrder(order));
        navigation.navigate('FinishOrder');
      },
    }),
  )(OrderItem);
  