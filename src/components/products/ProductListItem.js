import { Body, Left, ListItem, Text ,Right} from 'native-base';
import React, { Component,useState,useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../logic/actions/categories';
import { Avatar } from 'react-native-elements';
import Image from 'react-native-image-progress';
import default_pic from '../../assets/resources/food.png';
import * as firebase from "firebase";
import {imageExists} from 'image-exists'


    function ProductListItemAdmin (props){
       

    
        const [imageUrl, setImage] = useState(null);
        const [errorLoadingImage, setErrorLoadingImage] = useState(false);
        useEffect(()=>{async function getImage(){
            
            if(!errorLoadingImage){
            try{
                
                if(props.product.image!=null){
                    
                    let img = await firebase.storage().ref().child(`ProductImages/${props.product.image}_400x400.jpg`).getDownloadURL();
                    setImage(img);
                    // let img=`https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${props.product.image}_400x400.jpg?alt=media`
                    // imageExists(img, function(exists) {
                    //     console.log(str(exists)+"exists")
                    //     if (exists) {
                    //       console.log("it's alive!");
                    //       setImage(img);
                    //     }
                    //     else {
                    //         setErrorLoadingImage(true);
                
                    //         setTimeout(getImage,500);
                    //     }
                    //   });
                   
                    
                    
                } 
            }catch(error){
                setErrorLoadingImage(true);
                
                setTimeout(getImage,500);
            }
            }
        }
        getImage();

        },[props.product.image])
        const productImage = imageUrl === null ? default_pic : {uri: imageUrl, cache:'force-cache'}
        // // `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/UserImages%2F${props.product.image}_400x400.jpg?alt=media`
            

        
        return(
            <ListItem thumbnail style={{...props.style}} onPress={props.onPress}>
                <Left>
                <Image  source={productImage} imageStyle={{height: 60,width:60,borderRadius:60}} style={{height: 60,width:60,borderRadius:60}}/>
                </Left>
                <Body>
                    <Text  testID='productName' style={{fontFamily:'dosis-light',fontSize:17}}>{props.name}</Text>
                    
                </Body>
               
                    <Text  style={{fontFamily:'dosis-light',fontSize:17,paddingRight:25}}>Q {parseFloat(props.product.price).toFixed(2)}</Text>
               
                
            </ListItem>
        );
    
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
  