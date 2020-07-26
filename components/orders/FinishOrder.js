import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { withTheme, Button } from 'react-native-paper';

import ProductItem from './ProductItem';

import * as selectors from '../../src/reducers';
import * as actions from '../../src/actions/orders';


function FinishOrder({ theme, navigation, orderProducts, activeOrder, sendOrder, finish, isAdding, addingError }){
    const { roundness } = theme

    return(
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.linesContainer}>
                    {
                        orderProducts.map(product => 
                            <ProductItem style={styles.rowFront} key={product.name} name={product.name} description={'Sin especificaciones'} cantidad={product.cantidad} image={null} />
                        )
                    }
                </View>
                <View style={styles.buttonContainer}>
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
                        onPress={() => sendOrder(orderProducts, activeOrder)}
                    >
                        {'FINALIZAR'}
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    button: {
        fontFamily: 'dosis',
        justifyContent: 'center',
        margin: 4,
        marginTop: 16
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'dosis-regular',
    },
    linesContainer: {
        flex: 2,
        paddingVertical: 8
    },
    itemContainer: {
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 0.5,
        height: 100
    },
    rowFront: {
        backgroundColor: '#ffffff'
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});


export default connect(
    state => ({
        orderProducts: selectors.getSelectedOrderProducts(state),
        activeOrder: selectors.getSelectedOrder(state),
        isAdding: selectors.isAddingOrders(state),
        addingError: selectors.getOrdersError(state),
    }),
    dispatch => ({
        sendOrder(orderProducts, activeOrder) {
            dispatch(actions.startAddingOrder(orderProducts, activeOrder));
        },
        finish(navigation) {
            dispatch(actions.deactivateOrder());
            navigation.navigate('NewOrder');
        }
    }),
)(withTheme(FinishOrder));