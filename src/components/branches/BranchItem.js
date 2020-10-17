import { Body, Left, ListItem, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import default_pic from '../../assets/resources/checkpoint.jpg';
import * as actions from '../../logic/actions/branches';
import Image from 'react-native-image-progress';


class BranchItem extends Component{
    constructor(props){
        super();
      
        this.image = null;
        this.style = props.style;
        this.onPress = props.onPress;
    }
    render(){
     
        return(
            <ListItem onPress={this.onPress} thumbnail style={{...this.style}}>
                <Left>
                     <Image  source={default_pic} imageStyle={{height: 65,width:65,borderRadius:65}} style={{height: 65,width:65,borderRadius:65}}/>
                    
                </Left>
                <Body>
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:18}}>{this.props.name}</Text>
                    <Text style={{fontFamily:'dosis-light',fontSize:15}} note numberOfLines={1}>{this.props.description}</Text>
                </Body>
               
            </ListItem>
        );
    }
}

export default connect(
    undefined,
    dispatch => ({
      selectBranch(navigation, branch) {
        dispatch(actions.selectBranch(branch));
        navigation.navigate('EditBranchScreen');
      },
    }),
  )(BranchItem);
  