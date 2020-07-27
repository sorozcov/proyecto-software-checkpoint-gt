import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';


export default function MyTextInput(props) {
  const { input, meta, ...inputProps } = props;

  return (
    <View>
      <TextInput
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={styles.inputContainerStyle}
        placeholderTextColor={'red'}
        mode={'outlined'}
        editable={inputProps.disabled == null}
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        keyboardType={inputProps.keyboardType}
        secureTextEntry={inputProps.secureTextEntry}
        multiline={inputProps.multiline}
        />
      {meta.touched && (meta.error && <Text style={styles.textError}>{meta.error}</Text>)}
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  textError: {
    color: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:5
  },
});