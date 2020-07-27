import { Body, Left, ListItem, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import default_pic from '../../assets/resources/checkpoint.jpg';
import * as actions from '../../logic/actions/branches';



class BranchItem extends Component{
    constructor(props){
        super();
        // this.image = (props.image != null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/BranchImages%2F${props.image}_400x400.jpg?alt=media` : null);
        this.image = null;
        this.style = props.style;
        this.onPress = props.onPress;
    }
    render(){
     
        return(
            <ListItem onPress={this.onPress} thumbnail style={{...this.style}}>
                <Left>
                    <Thumbnail circle source={this.image === null ? default_pic : {uri: this.image}} />
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
  