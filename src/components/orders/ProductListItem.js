import React, { Component } from 'react';
import { View } from "react-native";
import { ListItem, Left, Body, Text } from 'native-base';
import { Avatar } from 'react-native-elements';



class ProductListItem extends Component {
    constructor(props) {
        super();
        this.style = props.style;
        this.props = props;
    }
    render() {
     
        return (
            <ListItem thumbnail style={{...this.style}}>
                <Left>
                {this.props.product.image==null &&  <Avatar rounded size={55} overlayContainerStyle={{backgroundColor: 'white'}} icon={{name: 'food', color: 'black',type: 'material-community'}}  />}
                {this.props.product.image!=null &&  <Avatar rounded size={55} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/ProductImages%2F${this.props.product.image}_400x400.jpg?alt=media` }}  />}
                </Left>
                <Body>
                    <View style={{flexDirection:'row'}}>
                        <Text  style={{fontFamily:'dosis-light',fontSize:17}}>{this.props.name}</Text>
                        <Text  style={{fontFamily:'dosis-light',fontSize:17,paddingLeft:0}}>{`(Q ${parseFloat(this.props.product.price).toFixed(2)})`}</Text>
                    </View>
                </Body>
            </ListItem>
        );
    }
}

export default ProductListItem;
  