import React,{useState,useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text} from 'react-native-paper';
import { CheckBox } from 'react-native-elements';


export default function MyCheckbox(props) {
  const [checked, setChecked] = useState(false);
  const { input, meta, ...inputProps } = props;
  let inputStyle={...styles.inputContainerStyle,...inputProps.containerStyle}
  let inputOptions={
    uncheckedColor:'red',
    checkedColor:'green',
    iconRight:true,
    textStyle:{fontFamily:'dosis-semi-bold',fontSize:14},
    containerStyle:styles.inputContainerStyle,
    label:'CHECKBOX',
    functionCheckbox:undefined,
    disabled:false,
    buttonPress:true,
    center:true,
    ...inputProps
  }
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setChecked(inputProps.checked)
    
  },[]);
  // Hacer update al componente y al redux form
  useEffect(() => {
    
    props.input.onChange(checked);
  });
  
  return (
    
    <View>
      <CheckBox
            center={inputOptions.center}
            title={inputOptions.label}
            onIconPress={!inputOptions.disabled ? ()=>{
              if(inputOptions.functionCheckbox == undefined)
                !checked ? setChecked(true) : setChecked(false);
              else
                inputOptions.functionCheckbox();
                !checked ? setChecked(true) : setChecked(false);
            }:null}
            onPress={inputOptions.buttonPress && !inputOptions.disabled ? ()=>{
              if(inputOptions.functionCheckbox == undefined)
                !checked ? setChecked(true) : setChecked(false);
              else
                inputOptions.functionCheckbox();
                !checked ? setChecked(true) : setChecked(false);
            }:null}
            textStyle={inputOptions.textStyle}
            checked={checked}
            iconRight={inputOptions.iconRight}
            size={30}
            uncheckedColor={inputOptions.uncheckedColor}
            checkedColor={inputOptions.checkedColor}
            containerStyle={inputStyle}
      />
      {meta.touched && (meta.error && <Text style={styles.textError}>{meta.error}</Text>)}
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: null,
    alignSelf: 'center',
  },
  textError: {
    color: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:5
  },
});