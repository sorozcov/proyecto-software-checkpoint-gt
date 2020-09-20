import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, withTheme } from 'react-native-paper';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MyTextInput from '../general/textInput';
import * as actions from '../../logic/actions/orders';


function NewOrder({ theme, navigation, dirty, valid, handleSubmit, next }){

    const { roundness } = theme

    const proceed = values => {
        if (values.orderName && values.table) {
            next(navigation, values);
            values.orderName = null;
            values.table = null;
        }
        else {
            changeError(true)
        }
    }

    return(
        <KeyboardAvoidingView
            behavior={"padding"}
            // CHANGE behavior={Platform.OS == "ios" ? "padding" : "height"} 
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={{alignSelf:"center"}}>
                        <MaterialCommunityIcons name="food" color={'black'} size={125}
                            style={{ marginTop: 0, paddingBottom: 0,marginBottom: 0 }} title="Food"/>
                        <Text style={{ fontSize: 22, fontFamily: 'dosis-bold', paddingBottom: 10, paddingTop: 0  }}>NUEVO PEDIDO </Text>
                    </View>
                    <Field name={'table'} component={MyTextInput} label='Mesa' placeholder='No. de Mesa' keyboardType='numeric'/>
                    <Field name={'orderName'} component={MyTextInput} label='Nombre' placeholder='Ingresa un nombre' returnKeyType='done'/>
                    <View style={styles.buttonContainer}>
                        <Button
                            disabled={!(dirty && valid)}
                            theme={roundness}
                            color={'#000000'}
                            icon={"arrow-right-bold"}
                            height={50}
                            mode="contained"
                            labelStyle={{
                                fontFamily: "dosis-bold",
                                fontSize: 15,
                            }}
                            style={styles.button}
                            onPress={handleSubmit(proceed)}>
                            {'CONTINUAR'}
                        </Button>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    button: {
        fontFamily: 'dosis',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop:'4%',
        marginBottom:'10%',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontFamily: 'dosis-regular',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
    },
});


export default connect(
    undefined,
    dispatch => ({
        next(navigation, values) {
            navigation.navigate('ProductSelect', { newOrder: true });
            dispatch(actions.activateNewOrder(values));
        },
    }),
)(reduxForm({
    form: 'newOrder',
    enableReinitialize : true,
    validate: (values) => {
        const errors = {};

        errors.orderName = !values.orderName ? 'Este campo es obligatorio' : undefined;
        errors.table = !values.table ? 'Este campo es obligatorio' : undefined;
        
        return errors;
    }
})(withTheme(NewOrder)));