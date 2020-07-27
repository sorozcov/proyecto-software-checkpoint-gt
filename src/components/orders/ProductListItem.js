import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from "react-native";
import { ListItem, Left, Body, Text, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as actionsProducts from '../../logic/actions/products';



class CategoryListItem extends Component{
    constructor(props){
        super();
        this.style = props.style;
        this.props = props;
    }
    render(){
     
        return(
            <ListItem thumbnail style={{...this.style}}>
                <Left>
                    {/* <Thumbnail circle source={this.image === null ? default_pic : {uri: this.image}} /> */}
                </Left>
                <Body>
                    <View style={{flexDirection:'row'}}>
                        <Text  style={{fontFamily:'dosis-light',fontSize:17}}>{this.props.name + ' (Q. ' + this.props.product.price + ')'}</Text>
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
  )(CategoryListItem);
  