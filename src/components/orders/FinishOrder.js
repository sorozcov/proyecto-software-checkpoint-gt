import React from 'react';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { ListItem,Left,Icon,Body } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import ProductListItem from './ProductListItem';
import * as actions from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';




function FinishOrder({
    theme,
    navigation,
    orderProductsByCategory,
    orderProducts,
    activeOrder,
    sendOrder,
    finish,
    isAdding,
    addingError
}) {
    const { roundness } = theme;
    const renderSectionHeader = ({ section }) => (
        <ListItem style={{backgroundColor:'red'}} itemDivider icon>
            <Left> 
                <Icon active name="restaurant" />   
            </Left>

            <Body>
                <Text style={{fontSize:18,fontFamily:'dosis-semi-bold',paddingLeft:0}}>{section.title}</Text>
            </Body>
        </ListItem>
    );
    
    //Se calcula el total
    var total = 0
    orderProducts.forEach(product => {
        total = total + (product.quantity * parseInt(product.price));
    });

    return (
        <View style={styles.container}>
            <SwipeListView
                style={{marginTop:8}}
                useSectionList
                sections={orderProductsByCategory}
                
                renderSectionHeader={renderSectionHeader}
                renderItem={ (category, rowMap) => (
                    <ProductListItem
                        style={styles.rowFront}
                        key={category.item.productId}
                        name={`${category.item.productName}`}
                        product={category.item}
                        navigation={navigation}
                        onlyView={true}
                    />
                )}
                disableRightSwipe={true}
                closeOnRowPress={true}
                keyExtractor={product => product.productId}
                leftOpenValue={0}
                rightOpenValue={-150}
                previewRowKey={'0'}
                
                previewOpenDelay={1000}
            />
            <View style={styles.totalContainer}>
                <Text  style={{fontFamily:'dosis-light',fontSize:20}}>{'Total: Q. ' + parseFloat(total).toFixed(2)}</Text>
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
                    onPress={() => sendOrder(navigation, orderProducts, activeOrder, total)}
                >
                    {'FINALIZAR'}
                </Button>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        fontFamily: 'dosis',
        justifyContent: 'center',
        margin: 4,
        marginTop: 16
    },
    totalContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    buttonContainer: {
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
        backgroundColor: '#ffffff',
        height:70,
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
        orderProductsByCategory: selectors.getSelectedOrderProductsByCategory(state),
        activeOrder: selectors.getSelectedOrder(state),
        isAdding: selectors.isAddingOrders(state),
        addingError: selectors.getOrdersError(state),
    }),
    dispatch => ({
        sendOrder(navigation, orderProducts, activeOrder, total) {
            dispatch(actions.startAddingOrder(orderProducts, {...activeOrder, total}));
            dispatch(actions.deactivateOrder());
            navigation.navigate('OrdersList');
        },
        // finish(navigation) {
        //     dispatch(actions.deactivateOrder());
        //     navigation.navigate('NewOrder');
        // }
    }),
)(withTheme(FinishOrder));