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
    if(props.image != null)
      this.state.image = `https://firebasestorage.googleapis.com/v0/b/software-checkpoint-gt.appspot.com/o/ProductImages%2F${props.image}_400x400.jpg?alt=media`;
  }
  render() {
    this.props.input.onChange(this.state.image)
    
    let { image,actionPickerVisible } = this.state;
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {!image &&  <Avatar rounded size={175} overlayContainerStyle={{backgroundColor: '#E50000'}} icon={{name: 'food', color: 'white',type: 'material-community'}}  />}
        
        {image &&  <Avatar rounded size={175} source={{ uri: image }}  />}
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
        alert('Lo sentimos. Necesitamos permisos para la Cámara para funcionar correctamente.');
      }
    }
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          alert('Lo sentimos. Necesitamos permisos para la Cámara para funcionar correctamente.');
        }
      }
    
  };

  _takeImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.3,
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
        quality: 0.3,
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