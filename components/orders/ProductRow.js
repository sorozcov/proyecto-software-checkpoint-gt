import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { StyleSheet, View, Text } from 'react-native';
import { withTheme, Button } from 'react-native-paper';

import MyTextInput from '../textInput';

// import * as selectors from '../../src/reducers';
// import * as actions from '../../src/actions/orders';


function ProductRow({ theme, navigation, change, handleSubmit, next, cantidad, productId, productName }){
    const { roundness } = theme
    
    return(
        <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <Text>{productName}</Text>
            </View>
            <View style={styles.formContainer}>
                <Field name={'cantidad'} component={MyTextInput} type='number' placeholder='0' keyboardType='number'/>
                <View style={styles.buttonContainer}>
                    <Button
                        disabled={cantidad === undefined || cantidad === '0'}
                        theme={roundness}
                        color={'#000000'}
                        icon={"arrow-down-bold"}
                        height={50}
                        mode="contained"
                        labelStyle={{
                            fontFamily: "dosis-bold",
                            fontSize: 15,
                        }}
                        style={styles.button}
                        onPress={() => change('cantidad', cantidad === undefined ? '1' : (parseInt(cantidad) - 1).toString())}
                    />
                    <Button
                        theme={roundness}
                        color={'#000000'}
                        icon={"arrow-up-bold"}
                        height={50}
                        mode="contained"
                        labelStyle={{
                            fontFamily: "dosis-bold",
                            fontSize: 15,
                        }}
                        style={styles.button}
                        onPress={() => change('cantidad', cantidad === undefined ? '1' : (parseInt(cantidad) + 1).toString())}
                    />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        fontFamily: 'dosis',
        justifyContent: 'center',
        margin: 4,
    },
    buttonContainer: {
        marginTop: 4, 
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'dosis-regular',
        height: 50
    },
    formContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingTop: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 0.5
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});


const selector = formValueSelector('orderProducts')

export default connect(
    state => ({
        cantidad: selector(state, 'cantidad'),
    }),
    undefined,
)(reduxForm({
    form: 'orderProducts',
    enableReinitialize : true,
})(withTheme(ProductRow)));