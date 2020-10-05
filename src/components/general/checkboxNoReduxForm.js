import React,{useState,useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text} from 'react-native-paper';
import { CheckBox } from 'react-native-elements';


export default function MyCheckbox(props) {
  
    const {checked,onCheck ,...inputProps} = props;
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
        size:30,
        ...inputProps
    }

    return (
        <View>
            <CheckBox
                center={inputOptions.center}
                title={inputOptions.label}
                onIconPress={!inputOptions.disabled ? ()=>{
                if(inputOptions.functionCheckbox == undefined)
                    !checked ? onCheck(true) : onCheck(false);
                else
                    inputOptions.functionCheckbox();
                    !checked ? onCheck(true) : onCheck(false);
                }:null}
                onPress={inputOptions.buttonPress && !inputOptions.disabled ? ()=>{
                if(inputOptions.functionCheckbox == undefined)
                    !checked ? onCheck(true) : onCheck(false);
                else
                    inputOptions.functionCheckbox();
                    !checked ? onCheck(true) : onCheck(false);
                }:null}
                textStyle={inputOptions.textStyle}
                checked={checked}
                iconRight={inputOptions.iconRight}
                size={inputOptions.size}
                uncheckedColor={inputOptions.uncheckedColor}
                checkedColor={inputOptions.checkedColor}
                containerStyle={inputStyle}
            />
        
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