import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


export default class MultiSelectExample extends Component {
  
  state = {
    selectedItems : [],
  };

  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };
  

  constructor(props){
    super(props)
    props.input.value = props.selectedItems;
    this.input = props.input;
    this.meta = props.meta;
    this.inputProps = props;
    this.state.selectedItems = this.input.value;
  }
  
  render() {
    this.props.input.onChange(this.state.selectedItems);
   return(
   <KeyboardAvoidingView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainerStyle}>
     
      <SectionedMultiSelect
       
        flatListProps={{nestedScrollEnabled: true}}
        hideTags={this.inputProps.single}
        items={this.inputProps.options}
        uniqueKey="value"
        ref={(component) => { this.multiSelect = component }}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={this.state.selectedItems}
        selectText={this.inputProps.selectedText}
        searchInputPlaceholderText={this.inputProps.placeholderText}
        fontSize={16}
        onAddItem={ () => {}}
        canAddItems={false}
        flatListProps={{nestedScrollEnabled: true}}
        tagRemoveIconColor="red"
        tagBorderColor="red"
        tagTextColor="red"
        selectedItemTextColor="black"
        selectedItemIconColor="black"
        itemTextColor="gray"
        displayKey="label"
        searchInputStyle={{ color: 'black' }}
        submitButtonColor="red"
        selectedText={"seleccionados"}
        noResultsComponent={<Text>Lo siento. No hay resultados.</Text>}
        searchPlaceholderText={this.inputProps.placeholderText + "..."}
        modalWithSafeAreaView={true}
        confirmText={this.inputProps.placeholderText}
        // submitButtonText={this.inputProps.placeholderText}
        single={this.inputProps.single}
        colors={{primary:"red",chipColor:"red"}}
        styles={{container: {
          flex: 0.6},selectToggle:styles.pickerContainer2,selectToggleText:{fontSize:16,color:'gray'}}}
      />
      
      </View>
      {this.meta.touched && (this.meta.error && <Text style={styles.textError}>{this.meta.error}</Text>)}
    </View>
    </KeyboardAvoidingView>
  
  

  );
  }
}


const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
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
  pickerContainer2: {
    borderWidth: 1,
    marginRight:10,
    marginLeft:10,
    height:58,
    borderRadius: 10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:15,
    marginBottom:10,
    backgroundColor: '#f5f5f5',
    borderColor: 'gray',
  }, 
  listContainer: {
    borderWidth: 1,
    marginRight:10,
    marginLeft:10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    borderColor: 'gray',
  }, 
  pickerContainer2inside: {
    borderRadius: 10,
    paddingRight:10,
    paddingLeft:10,
    backgroundColor: '#f5f5f5',
  },
  textError: {
    color: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:5
  },
});