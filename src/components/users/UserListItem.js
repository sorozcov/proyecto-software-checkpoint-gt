import { Body, Left, ListItem, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import default_pic from '../../assets/resources/default.png';



class UserListItem extends Component{
    constructor(props){
        super();
        this.image = (props.image != null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${props.image}_400x400.jpg?alt=media` : null);
        this.style = props.style;
    }

    render(){ 
        return(
            <ListItem thumbnail style={{...this.style}}>
                <Left>
                    <Thumbnail circle source={this.image === null ? default_pic : {uri: this.image, cache:'force-cache'}} />
                </Left>
                <Body>
                    <Text style={{ fontFamily: 'dosis-semi-bold', fontSize: 18 }}>{this.props.name}</Text>
                    <Text style={{ fontFamily:'dosis-semi-bold', fontSize: 15 }} note numberOfLines={1}>{this.props.description}</Text>
                </Body>
               
            </ListItem>
        );
    }
}

export default UserListItem;