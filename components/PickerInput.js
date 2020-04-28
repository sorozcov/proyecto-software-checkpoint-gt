import React from 'react';
import { StyleSheet, View,Picker as PickerIOS } from 'react-native';
import {  Text } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';


export default function PickerInput(props) {
  const { input, meta, ...inputProps } = props;

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
      {Platform.OS == "ios" ?
        <PickerIOS
          selectedValue={input.value}
          mode="modal"
          itemStyle={styles.inputContainerStyle}
          onValueChange={input.onChange}>
          {inputProps.options.map(item => (
            <PickerIOS.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </PickerIOS>  
      : 
        <Picker
          selectedValue={input.value}
          style={styles.inputContainerStyle}
          prompt={inputProps.title}
          onValueChange={input.onChange}>
          {inputProps.options.map(item => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>}
        
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: {
    height: 58,
    paddingLeft:10,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
});