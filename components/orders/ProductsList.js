import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, Spinner,ListItem,Left,Icon,Body } from 'native-base';
import { Dimensions, Modal, View, StyleSheet,Text,    TouchableOpacity,TouchableHighlight, Alert } from "react-native";
import { ActivityIndicator, withTheme,Button } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';


import * as actionsCategories from '../../src/actions/categories';
import * as actionsProducts from '../../src/actions/products';
import * as actionsOrders from '../../src/actions/orders';
import * as selectors from '../../src/reducers';
import ProductListItem from './ProductListItem';
const width = Dimensions.get('window').width; // full width


function ProductsList ({ theme, onRefresh,onLoad, isLoading, navigation, next, productsByCategories, user, productsOfOrder}) {
    const { colors, roundness } = theme;

    const renderSectionHeader = ({ section }) => <ListItem   style={{backgroundColor:'red'}} itemDivider icon>
    <Left>
             
                <Icon active name="restaurant" />
             
    </Left>
    <Body>
    <Text style={{fontSize:18,fontFamily:'dosis-semi-bold',paddingLeft:0}}>{section.title}</Text>
    </Body>
     </ListItem>  ;

   useEffect(onLoad, []);

    
    const proceed = () => {
        next(navigation, productsOfOrder)
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Container width={width}>
                    {
                        productsByCategories.length <= 0 && !isLoading && (
                            <View style={{flex:0.1,alignItems:'center',paddingTop:10}}>
                                    <MaterialCommunityIcons name="information" color='black' size={50} />
                                    <Text style={{paddingTop:10,fontSize:20,fontFamily:'dosis-bold',alignSelf:'center'}}>No hay productos registrados</Text>
                            </View>
                        )
                    }
                    <SwipeListView
                        style={{marginTop:8}}
                        useSectionList
                        sections={productsByCategories}
                        
                        renderSectionHeader={renderSectionHeader}
                        renderItem={ (category, rowMap) => (
                            <ProductListItem style={styles.rowFront} key={category.item.productId} name={`${category.item.productName}`} product={category.item} navigation={navigation} />
                        )}
                        disableRightSwipe={true}
                        closeOnRowPress={true}
                        refreshing={isLoading}
                        onRefresh={()=>onRefresh()}
                        keyExtractor={product => product.productId}
                        leftOpenValue={0}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        
                        previewOpenDelay={1000}
                    />
                
            </Container>
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
                    onPress={proceed}
                >
                    {'CONTINUAR'}
                </Button>
            <Modal
                transparent={true}
                animationType={'none'}
                visible={false}>
                <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" animating={false} color={colors.primary} />
                </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
    rowFront: {        
        backgroundColor: '#ffffff',
 
    },    
})

export default connect(
    state => ({
        user: selectors.getLoggedUser(state),
        productsByCategories: selectors.getProductsByCategory(state),
        isLoading: selectors.isFetchingCategories(state) || selectors.isFetchingProducts(state),
        productsOfOrder: selectors.getProductsOfOrder(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actionsCategories.startFetchingCategories());
            dispatch(actionsProducts.startFetchingProducts());
        },
         onRefresh() {
            dispatch(actionsCategories.startFetchingCategories());
            dispatch(actionsProducts.startFetchingProducts());
        },
        next(navigation, products) {
            dispatch(actionsOrders.addProducts(products));
            navigation.navigate('FinishOrder');
        },
    }),
)(withTheme(ProductsList));
