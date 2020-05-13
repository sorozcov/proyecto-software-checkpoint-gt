import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button } from 'native-base';

import default_pic from '../../src/resources/checkpoint.jpg';
import * as actions from '../../src/actions/branches';


class BranchItem extends Component{
    constructor(props){
        super();
        // this.image = (props.image != null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/BranchImages%2F${props.image}_400x400.jpg?alt=media` : null);
        this.image = null;
        this.style = props.style;
    }
    render(){
     
        return(
            <ListItem thumbnail style={{...this.style}}>
                <Left>
                    <Thumbnail circle source={this.image === null ? default_pic : {uri: this.image}} />
                </Left>
                <Body>
                    <Text>{this.props.name}</Text>
                    <Text note numberOfLines={1}>{this.props.description}</Text>
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
  