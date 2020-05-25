import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, Left, Thumbnail, Body, Text, Right, Button } from 'native-base';

import * as actions from '../src/actions/categories';


class CategoryListItem extends Component{
    constructor(props){
        super();
        this.style = props.style;
    }
    render(){
     
        return(
            <ListItem thumbnail style={{...this.style}}>
                <Body>
                    <Text style={{fontFamily:'dosis-semi-bold',fontSize:18}}>{this.props.name}</Text>
                </Body>
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
  )(CategoryListItem);
  