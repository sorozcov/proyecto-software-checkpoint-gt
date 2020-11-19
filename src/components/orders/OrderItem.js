import { Body, Left, ListItem, Text, Thumbnail, Right } from 'native-base';
import React, { Component } from 'react';
import TimeAgo from 'react-native-timeago';
import moment from 'moment'
import { connect } from 'react-redux';
import default_pic from '../../assets/resources/order.png';
import { Avatar } from 'react-native-paper';

class OrderItem extends Component{
    constructor(props){
        super();
        // this.image = (props.image != null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/OrderImages%2F${props.image}_400x400.jpg?alt=media` : null);
        this.image = null;
        this.style = props.style;
        this.onPress = props.onPress;
        this.theme=props.theme
    }
    render(){
     
        return(
            <ListItem onPress={this.onPress} thumbnail style={{...this.style}}>
                <Left>
                    <Avatar.Text size={55} label={this.props.order.table} color="white" style={{backgroundColor: this.props.theme.colors.accent}} />
                </Left>
                <Body>
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:21}}>{this.props.name}</Text>
                    
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:20}} note numberOfLines={1}>Total: Q. {parseFloat(this.props.total).toFixed(2)}</Text>
                </Body>
                <Right><Text style={{fontFamily:'dosis-light',fontSize:15}} note numberOfLines={1}><TimeAgo time={this.props.date} hideAgo={false} /></Text></Right>
               
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
  