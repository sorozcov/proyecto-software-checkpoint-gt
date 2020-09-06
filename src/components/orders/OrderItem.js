import { Body, Left, ListItem, Text, Thumbnail, Right } from 'native-base';
import React, { Component } from 'react';
import TimeAgo from 'react-native-timeago';
import moment from 'moment'
import { connect } from 'react-redux';
import default_pic from '../../assets/resources/order.png';
import { Avatar } from 'react-native-elements';

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
                    {/* <Thumbnail square source={this.image === null ? default_pic : {uri: this.image}} /> */}
                    <Avatar testID={'noImageProductComponent'} rounded size={55} overlayContainerStyle={{backgroundColor: '#563400'}} title={this.props.order.table} icon={{name: 'receipt', color: 'black',type: 'material-community'}}  />
                </Left>
                <Body>
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:21}}>{this.props.name}</Text>
                    
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:20}} note numberOfLines={1}>Total: Q. {this.props.total}</Text>
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
  