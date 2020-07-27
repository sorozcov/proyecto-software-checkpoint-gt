import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from "firebase";
import * as React from 'react';
import { View } from 'react-native';
import { ActionPicker } from 'react-native-action-picker';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-paper';

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      // return the blob
      resolve(xhr.response);
    };
    
    xhr.onerror = function() {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    
    xhr.send(null);
  });
}


export const uploadToFirebase = (blob,uid) => {
  return new Promise((resolve, reject)=>{
    let storageRef = firebase.storage().ref();
    let img = "ProductImages/" + uid+'.jpg';
    storageRef.child(img).put(blob, {
      contentType: 'image/jpeg'
    }).then((snapshot)=>{
      blob.close();
      resolve(snapshot);
    }).catch((error)=>{
      reject(error);
    });
  });
}

 

export default class ImagePickerProduct extends React.Component {
  
  state = {
    image: null,
    actionPickerVisible:false
  };
  input = this.props.input;
  constructor(props){
    super(props)
    
    
    
  }
  render() {
    this.props.input.onChange(this.state.image)
    
    let { image,actionPickerVisible } = this.state;
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {!image &&  <Avatar size={200} overlayContainerStyle={{backgroundColor: '#00C331'}} icon={{name: 'image', color: 'white',type: 'material'}}  />}
        
        {image &&  <Avatar  size={200} source={{ uri: image }}  />}
        <Button labelStyle={{fontFamily:"dosis-bold"}} onPress={()=>this.setState({ actionPickerVisible: true })} >Cambiar Imagen</Button>
        <ActionPicker
            style={{fontFamily:"dosis-medium"}}
          options={this.createOptions()}
          isVisible={actionPickerVisible}
          onCancelRequest={()=>this.setState({ actionPickerVisible: false})} />
       
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    
  };

  _takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      }).then(result=>{
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            this.setState({ actionPickerVisible: false})
        }

      }) 
    } catch (E) {
      console.log(E);
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      }).then(result=>{
            if (!result.cancelled) {
                this.setState({ image: result.uri });
                this.setState({ actionPickerVisible: false})
            }

          })    
    } catch (E) {
      console.log(E);
    }
  };

  createOptions = () => {
    return [
      {label: 'Abrir Galería', action: () => this._pickImage()},
      {label: 'Abrir Cámara', action: () => this._takeImage()},
      
    ];
  }
}