import { Body, Container, Icon, Left, ListItem } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, withTheme, Button } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import * as actionsCategories from '../../logic/actions/categories';
import * as actionsProducts from '../../logic/actions/products';
import * as actionsOrders from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import ProductListItem from '../products/ProductListItem';
import { SearchBar } from 'react-native-elements';

const width = Dimensions.get('window').width; // full width
import ModalProductInformationScreen from '../products/ModalProductInformationScreen'
import ModalOrderInformationScreen from './ModalOrderInformationScreen'

function ProductsList ({
    theme,
    onLoad,
    isLoading,
    navigation,
    productsByCategories,
    searchProductText,
    onSearchProduct,
    selectProductInformation
}) {
    const { colors, roundness } = theme;
    const [modalProduct, setModalProduct] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);
    
    const renderSectionHeader = ({ section }) => (
    <ListItem   style={{backgroundColor:'red'}} itemDivider icon>
        <Left>
            <Icon active name="restaurant" />
        </Left>

        <Body>
            <Text style={{fontSize:18,fontFamily:'dosis-semi-bold',paddingLeft:0}}>{section.title}</Text>
        </Body>
     </ListItem>
     );

    useEffect(onLoad, []);


    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <SearchBar
                placeholder="Buscar producto..."
                onChangeText={onSearchProduct}
                value={searchProductText}
                showCancel={true}
                showLoading={false}
                containerStyle={{width:'100%',backgroundColor:'black'}}
                //inputContainerStyle={{backgroundColor:'white',fontFamily:'dosis-light',fontSize:17}}
                
                inputStyle={{fontFamily:'dosis-light',fontSize:19}}
            />
            <Container width={width}>
                    {
                        productsByCategories.length <= 0 && !isLoading && (
                            <View style={{flex:0.1,alignItems:'center',paddingTop:10}}>
                                    <MaterialCommunityIcons
                                        name="information"
                                        color='black'
                                        size={50}
                                    />
                                    <Text style={{paddingTop:10,fontSize:20,fontFamily:'dosis-bold',alignSelf:'center'}}>No hay productos registrados</Text>
                            </View>
                        )
                    }
                    <SwipeListView
                        style={{marginTop:8,marginBottom:8}}
                        useSectionList
                        sections={productsByCategories}
                        
                        renderSectionHeader={renderSectionHeader}
                        renderItem={ (category, rowMap) => (
                            <ProductListItem
                                style={styles.rowFront}
                                key={category.item.productId}
                                name={`${category.item.productName}`}
                                product={category.item}
                                navigation={navigation}
                                onPress={()=>{setModalProduct(true);selectProductInformation(navigation, category.item);}} 
                            />
                        )}
                        disableRightSwipe={true}
                        closeOnRowPress={true}
                        refreshing={isLoading}
                        // onRefresh={()=>onLoad()}
                        keyExtractor={product => product.productId}
                        leftOpenValue={0}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        
                        previewOpenDelay={1000}
                    />
                
            </Container>
            <Button
                theme={{roundness:0}}
                color={'#000000'}
                icon={()=><MaterialCommunityIcons
                    name="clipboard-text-outline"
                    color='white'
                    size={24}
                    style={{paddingRight:30}}
                />
                    }
                
                height={55}
                mode="contained"
                labelStyle={{
                    fontFamily: "dosis-bold",
                    fontSize: 15,
                    paddingLeft:5,
                }}
                contentStyle={{height:'100%',}}
                style={{marginLeft: '0%',
                marginRight: '0%',
                width:'100%',
                
                justifyContent: 'center',}}
                onPress={() => setModalOrder(true)}
                
            >
                {'VER ORDEN'}
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
            { <ModalProductInformationScreen modal={modalProduct} closeModal={()=>setModalProduct(false)}  isAdmin={false}/>}
            { <ModalOrderInformationScreen modal={modalOrder} closeModal={()=>setModalOrder(false)}  navigation={navigation} isAdmin={false}/>}
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
  button: {
      margin:10,
      width:'100%'
  },
    rowFront: {        
        backgroundColor: '#ffffff',
        height:70,
    },    
})

export default connect(
    state => ({
        user: selectors.getLoggedUser(state),
        productsByCategories: selectors.getProductsByCategoryActive(state),
        isLoading: selectors.isFetchingCategories(state) || selectors.isFetchingProducts(state),
        searchProductText:selectors.getSearchTextProduct(state)
    }),
    dispatch => ({
        onLoad() {
            dispatch(actionsCategories.startFetchingCategories());
            dispatch(actionsProducts.startFetchingProducts());
        },
        onSearchProduct(searchText) {
            dispatch(actionsProducts.productSearchStarted(searchText));
            
        },
        selectProductInformation(navigation, product) {
            dispatch(actionsProducts.selectProduct(product));
            // navigation.navigate('ProductInformationScreen',{isAdmin:true});
        },
    }),
)(withTheme(ProductsList));
