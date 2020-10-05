import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {Picker} from 'react-native-option-picker';



export default function OptionPicker({theme,
    containerStyle={},
    data=[],
    onPress=null
    }){
    const {colors} = theme
    const containerStyleFinal={...styles.container,...containerStyle}
    return (
      <View style={styles.container}>
        <Picker
          style={styles.pickerStyle}
          data={data}
          optionStyle={{...styles.optionStyle}}
          selectedOptionStyle={{...styles.selectedOptionStyle,backgroundColor:colors.accent}}
          optionTextStyle={{...styles.optionTextStyle,color:colors.accent}}
          selectedOptionTextStyle={{...styles.selectedOptionTextStyle}}
          onPress={onPress}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
   
    marginBottom:'0%'
  },
  optionStyle: {
    margin: 5,
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#E9EFFE',
    fontFamily: 'dosis-semi-bold',
  },
  selectedOptionStyle: {
    margin: 5,
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#497DF9',
    fontFamily: 'dosis-semi-bold',
  },
  optionTextStyle: {
    color: '#497DF9',
  },
  selectedOptionTextStyle: {
    color: '#ffffff',
  },
});