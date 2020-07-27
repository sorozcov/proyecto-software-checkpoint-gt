import isEmpty from 'lodash/isEmpty';
import toPairs from 'lodash/toPairs';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../logic/actions/orders';
import MyTextInput from '../general/textInput';



const PRODUCTS = [
    {
        name: 'Hamburguesa',
        id: 1
    },
    {
        name: 'Papas Fritas',
        id: 2
    },
    { 
        name: 'Alitas Picantes',
        id: 3
    },
    {
        name: 'Gaseosa',
        id: 4
    },
]

function voidTextInput (props) {
    const { meta } = props;

    return(
        <View>
            {meta.touched && (meta.error && <Text style={styles.textError}>{meta.error}</Text>)}
        </View>
    )
}


function SelectProducts({ theme, navigation, handleSubmit, next }){
    const { roundness } = theme

    const proceed = values => {
        next(navigation, values)
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <Field name={'dummy'} component={voidTextInput}></Field>
            {
                PRODUCTS.map(product => 
                    <View key={product.id} style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text>{product.name}</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <Field name={`${product.name}`} defaultValue={0} component={MyTextInput} type='number' placeholder='0' keyboardType='numeric'/>
                        </View>
                    </View>
                )
            }
                <Button
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
                    onPress={handleSubmit(proceed)}
                >
                    {'CONTINUAR'}
                </Button>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    button: {
        fontFamily: 'dosis',
        justifyContent: 'center',
        margin: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'dosis-regular',
        height: 50
    },
    formContainer: {
        flex: 2,
        paddingVertical: 8
    },
    itemContainer: {
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 0.5,
        height: 100
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    textError: {
        color: 'red',
        paddingHorizontal: 20,
        paddingVertical: 5,
        textAlign: 'center',
        width: '100%',
    },
});


export default connect(
    undefined,
    dispatch => ({
        next(navigation, values) {
            const products = toPairs(values).filter(pair => pair[1] != '0');
            dispatch(actions.addProducts(products));
            navigation.navigate('FinishOrder');
        },
    }),
)(reduxForm({
    form: 'orderProducts',
    enableReinitialize : true,
    validate: values => {
        const errors = {};
        
        isEmpty(values) ? errors.dummy = 'No hay productos en la orden' : undefined

        return errors;
    }
})(withTheme(SelectProducts)));