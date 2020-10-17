import { Body, Left, ListItem, Text, Thumbnail } from 'native-base';
import React, { Component,useEffect, useState } from 'react';
import default_pic from '../../assets/resources/default.png';
import Image from 'react-native-image-progress';
import * as firebase from "firebase";

function UserListItem (props){
    // constructor(props){
    //     super();
    //     props.image = (props.image != null ? `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${props.image}_400x400.jpg?alt=media` : null);
    //     props.style = props.style;
    //     console.log(props.name + " " + props.image)
    // }
   
    const [imageUrl, setImage] = useState(null);
    const [errorLoadingImage, setErrorLoadingImage] = useState(false);
    useEffect(()=>{async function getImage(){
        
        if(!errorLoadingImage){
        try{
            
            if(props.image!=null){
                let img = await firebase.storage().ref().child(`UserImages/${props.image}_400x400.jpg`).getDownloadURL();
                console.log("Firebase" + img)
                setImage(img);
                
            } 
        }catch(error){
            setErrorLoadingImage(true);
            setTimeout(getImage,500);
        }
        }
    }
    getImage();

    },[props.image])
    const userImage = imageUrl === null ? default_pic : {uri: imageUrl, cache:'force-cache'}
    // // `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${props.image}_400x400.jpg?alt=media`
        
    return(
        <ListItem thumbnail style={{...props.style}}>
            <Left>
                <Image  source={userImage} imageStyle={{height: 65,width:65,borderRadius:65}} style={{height: 65,width:65,borderRadius:65}}/>
              
            </Left>
            <Body>
                <Text style={{ fontFamily: 'dosis-semi-bold', fontSize: 18 }}>{props.name}</Text>
                <Text style={{ fontFamily:'dosis-semi-bold', fontSize: 15 }} note numberOfLines={1}>{props.description}</Text>
            </Body>
            
        </ListItem>
    );
    
}

export default UserListItem;