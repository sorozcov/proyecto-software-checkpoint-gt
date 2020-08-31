import { Body, Left, ListItem, Text ,Right} from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../logic/actions/categories';
import { Avatar } from 'react-native-elements';

class ProductListItemAdmin extends Component{
    constructor(props){
        super();
        this.style = props.style;
        this.props=props;
        this.product = this.props.product
        
    }
    render(){
     
        return(
            <ListItem thumbnail style={{...this.style}} onPress={this.props.onPress}>
                <Left>
                {this.props.product.image==null &&  <Avatar testID={'noImageProductComponent'} rounded size={55} overlayContainerStyle={{backgroundColor: 'white'}} icon={{name: 'food', color: 'black',type: 'material-community'}}  />}
                {this.props.product.image!=null &&  <Avatar testID={'imageProductComponent'} rounded size={55} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/ProductImages%2F${this.props.product.image}_400x400.jpg?alt=media` }}  />}
                
                </Left>
                <Body>
                    <Text  testID='productName' style={{fontFamily:'dosis-light',fontSize:17}}>{this.props.name}</Text>
                    
                </Body>
               
                    <Text  style={{fontFamily:'dosis-light',fontSize:17,paddingRight:25}}>Q {parseFloat(this.props.product.price).toFixed(2)}</Text>
               
                
            </ListItem>
        );
    }
}

export default connect(
    undefined,
    dispatch => ({
      selectCategory(navigation, category) {
        dispatch(actions.selectCategory(category));
        navigation.navigate('EditCategoryScreen');
      },
    }),
  )(ProductListItemAdmin);
  