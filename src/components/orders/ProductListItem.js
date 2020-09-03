import React, { Component } from 'react';
import { View } from "react-native";
import { ListItem, Left, Body, Text, Right } from 'native-base';
import { Avatar } from 'react-native-elements';



class ProductListItem extends Component {
    constructor(props) {
        super();
        this.style = props.style;
        this.props = props;
    }
    render() {
     
        return (
            <ListItem  style={{backgroundColor: '#ffffff',
                minHeight:80,}} onPress={this.props.onPress}>
                <Left>
                {this.props.product.image==null &&  <Avatar rounded size={55} overlayContainerStyle={{backgroundColor: 'white'}} icon={{name: 'food', color: 'black',type: 'material-community'}}  />}
                {this.props.product.image!=null &&  <Avatar rounded size={55} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/ProductImages%2F${this.props.product.image}_400x400.jpg?alt=media` }}  />}
                </Left>
                <Body itemDivider style={{marginLeft:-10}}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text  style={{fontFamily:'dosis-light',fontSize:22}}>{this.props.name}</Text>
                            <Right><Text  style={{fontFamily:'dosis-light',fontSize:22,marginLeft:5}}>{`Q ${parseFloat(this.props.product.totalPrice).toFixed(2)}    `}</Text></Right>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <Text  style={{fontFamily:'dosis-light',fontSize:18}}>{'Cantidad: '}{this.props.product.quantity}</Text>
                           
                        </View>
                        
                        {this.props.product.ingredients.map((ingredient, i)=>
                            {
                                if(ingredient.default!=ingredient.selected){
                                    let modifyIng = ingredient.selected? 'SI': 'NO';
                                    return( 
                                    <View style={{flexDirection:'row',marginLeft:5}}>
                                        <Text  style={{fontFamily:'dosis-light',fontSize:14}}>{`${modifyIng} ${ingredient.name}`}</Text>
                                    </View>
                                    )
                                }
                            }
                        )}
                        {this.props.product.additionals.map((additional, i)=>
                            {
                                if(additional.default!=additional.selected){
                                    let modifyIng = additional.selected? 'SI': 'NO';
                                    return( 
                                    <View style={{flexDirection:'row',marginLeft:5}}>
                                        <Text  style={{fontFamily:'dosis-light',fontSize:14}}>{`${'ADICIONAL'} ${additional.name} (${additional.cost})`}</Text>
                                    </View>
                                    )
                                }
                            }
                        )}
                        
                        {this.props.product.additionalInstructions!=null && this.props.product.additionalInstructions!="" &&
                        <View style={{flexDirection:'row'}}>
                            <Text  style={{fontFamily:'dosis-light',fontSize:18}}>{'Instrucciones ad.: '}{this.props.product.additionalInstructions}</Text>
                         
                         </View>

                        }
                        
                    </View>
                </Body>
            </ListItem>
        );
    }
}

export default ProductListItem;
  