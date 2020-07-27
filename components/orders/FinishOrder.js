import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { ListItem,Left,Icon,Body } from 'native-base';
import { withTheme, Button } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';

import ProductListItem from './ProductListItem';

import * as selectors from '../../src/reducers';
import * as actions from '../../src/actions/orders';


function FinishOrder({ theme, navigation, orderProductsByCategory, orderProducts, activeOrder, sendOrder, finish, isAdding, addingError }){
    const { roundness } = theme
    const renderSectionHeader = ({ section }) => <ListItem   style={{backgroundColor:'red'}} itemDivider icon>
    <Left>
             
                <Icon active name="restaurant" />
             
    </Left>
    <Body>
    <Text style={{fontSize:18,fontFamily:'dosis-semi-bold',paddingLeft:0}}>{section.title}</Text>
    </Body>
     </ListItem>  ;

    return(
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <SwipeListView
                    style={{marginTop:8}}
                    useSectionList
                    sections={orderProductsByCategory}
                    
                    renderSectionHeader={renderSectionHeader}
                    renderItem={ (category, rowMap) => (
                        <ProductListItem style={styles.rowFront} key={category.item.productId} name={`${category.item.productName}`} product={category.item} navigation={navigation} onlyView={true}/>
                    )}
                    disableRightSwipe={true}
                    closeOnRowPress={true}
                    keyExtractor={product => product.productId}
                    leftOpenValue={0}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    
                    previewOpenDelay={1000}
                />
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
                        onPress={() => sendOrder(navigation, orderProducts, activeOrder)}
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
        orderProductsByCategory: selectors.getSelectedOrderProductsByCategory(state),
        orderProducts: selectors.getSelectedOrderProducts(state),
        activeOrder: selectors.getSelectedOrder(state),
        isAdding: selectors.isAddingOrders(state),
        addingError: selectors.getOrdersError(state),
    }),
    dispatch => ({
        sendOrder(navigation, orderProducts, activeOrder) {
            dispatch(actions.startAddingOrder(orderProducts, activeOrder));
            dispatch(actions.deactivateOrder());
            navigation.navigate('NewOrder');
        },
        // finish(navigation) {
        //     dispatch(actions.deactivateOrder());
        //     navigation.navigate('NewOrder');
        // }
    }),
)(withTheme(FinishOrder));