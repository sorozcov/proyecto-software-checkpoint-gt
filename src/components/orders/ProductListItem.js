import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from "react-native";
import { ListItem, Left, Body, Text, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-elements';
import * as actionsProducts from '../../logic/actions/products';



class ProductListItem extends Component{
    constructor(props){
        super();
        this.style = props.style;
        this.props = props;
    }
    render(){
     
        return(
            <ListItem thumbnail style={{...this.style}}>
                <Left>
                {this.props.product.image==null &&  <Avatar rounded size={55} overlayContainerStyle={{backgroundColor: 'white'}} icon={{name: 'food', color: 'black',type: 'material-community'}}  />}
                {this.props.product.image!=null &&  <Avatar rounded size={55} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/ProductImages%2F${this.props.product.image}_400x400.jpg?alt=media` }}  />}
                </Left>
                <Body>
                    <View style={{flexDirection:'row'}}>
                        <Text  style={{fontFamily:'dosis-light',fontSize:17}}>{this.props.name}</Text>
                        <Text  style={{fontFamily:'dosis-light',fontSize:17,paddingLeft:0}}>{`(Q ${parseFloat(this.props.product.price).toFixed(2)})`}</Text>
                        <View style={styles.row}>

                            <View style={this.props.onlyView !== true ? styles.infoTxt : styles.infoTxtView}>
                                <Text  style={{fontFamily:'dosis-light',fontSize:15}}>{this.props.product.quantity == null ? 0 : this.props.product.quantity}</Text>
                            </View> 
                            
                            {(this.props.onlyView !== true) &&    
                            <>            
                                <Button
                                    style={[styles.btn, styles.btnLeft]}
                                    onPress={() => {this.props.deleteProduct(this.props.product.productId)}}
                                >
                                    <MaterialCommunityIcons
                                    name="minus"
                                    color={'black'}
                                    size={15}
                                    />
                                    
                                </Button>
                                <Button
                                    style={[styles.btn, styles.btnRight]}
                                    onPress={() => {this.props.addProduct(this.props.product.productId)}}
                                >
                                    <MaterialCommunityIcons
                                    name="plus"
                                    color={'black'}
                                    size={15}
                                    />
                                    
                                </Button>
                            </>
                            }
                        </View>
                    </View>
                </Body>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
      row: {
          alignItems: 'center',
          flex: 1, 
          
      },
      btn: {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          width: 30,
          height: 30,
      },
      infoTxt: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#00AAE4',
        width: 30,
        height:30,
        right: 75,
      },
      infoTxtView: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#00AAE4',
        width: 30,
        height:30,
        right: 10,
      },
      btnLeft: {
          backgroundColor: '#B2FFFF',
          right: 40,
      },
      btnRight: {
          backgroundColor: '#00AAE4',
          right: 5,
      },
      
  })

export default connect(
    undefined,
    dispatch => ({
        addProduct(productId) {
            dispatch(actionsProducts.addProductToOrder(productId));
        },
        deleteProduct(productId) {
            dispatch(actionsProducts.deleteProductToOrder(productId));
        },
    }),
  )(ProductListItem);
  