import { Body, Container, Icon, Left, ListItem } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { ActivityIndicator, withTheme } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as actionsCategories from '../../logic/actions/categories';
import * as actionsProducts from '../../logic/actions/products';
import * as selectors from '../../logic/reducers';
import ProductListItem from './ProductListItem';
import { SearchBar } from 'react-native-elements';
import ModalProductInformationScreen from './ModalProductInformationScreen'
import ModalIngrediens from './ModalIngrediens'


const width = Dimensions.get('window').width; // full width


function ProductsList ({ theme, onRefresh,onLoad, categories, isLoading, navigation, newProduct, isCreating, isEditing, isRemoving, selectProduct,selectProductInformation,productsByCategories, deleteProduct, user,initialValuesProduct,ingredients,additionals}) {
    const { colors, roundness } = theme;
    const [modalProduct, setModalProduct] = useState(false);
    
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    
    

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const [section] = rowKey.split('.');
        const newData = [...listData];
        const prevIndex = listData[section].data.findIndex(
            item => item.key === rowKey
        );
        newData[section].data.splice(prevIndex, 1);
        setListData(newData);
    };


    const renderSectionHeader = ({ section }) => <ListItem   style={{backgroundColor:'red'}} itemDivider icon>
    <Left>
             
                <Icon active name="restaurant" />
             
    </Left>
    <Body>
    <Text style={{fontSize:18,fontFamily:'dosis-semi-bold',paddingLeft:0}}>{section.title}</Text>
    </Body>
     </ListItem>  ;
   useEffect(onLoad, []);
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} testID={"productListTotal"}> 

            
            {
                 (
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
                                testID={"productList"}
                                renderSectionHeader={renderSectionHeader}
                                renderItem={ (category, rowMap) => (
                                    <ProductListItem style={styles.rowFront} key={category.item.productId} name={`${category.item.productName}`} product={category.item} navigation={navigation} 
                                    onPress={()=>{setModalProduct(true);selectProductInformation(navigation, category.item);}} />
                                )}
                                disableRightSwipe={true}
                                closeOnRowPress={true}
                                refreshing={isLoading}
                                onRefresh={()=>onRefresh()}
                                keyExtractor={product => product.productId}
                                renderHiddenItem={
                                    (product, rowMap) => (
                                        <View style={styles.rowBack}>
                                            
                                            <TouchableOpacity
                                                testID={'selectProductButton'}
                                                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                                
                                                onPress={() => {selectProduct(navigation, product.item);rowMap[product.item.productId].closeRow();}}
                                            >
                                                <MaterialCommunityIcons
                                                name="pencil"
                                                color={'black'}
                                                size={30}
                                                />
                                                 <Text style={styles.backTextWhite}>Editar</Text>
                                               
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnRight]}
                                                onPress={ () => {
                                                    rowMap[product.item.productId].closeRow();
                                                    Alert.alert(
                                                        '¿Eliminar producto?',
                                                        'Esta acción no puede ser revertida',
                                                        [
                                                            {
                                                                text: 'Cancelar', 
                                                                style: 'cancel'
                                                            },
                                                            {
                                                                text: 'Eliminar',
                                                                onPress: () => deleteProduct(product.item.productId),
                                                                style: 'destructive'
                                                            }
                                                        ],
                                                        {
                                                            cancelable: true,
                                                        },
                                                    )
                                                }}
                                            >
                                                <MaterialCommunityIcons
                                                name="delete"
                                                color={'black'}
                                                size={30}
                                                />
                                                 <Text style={styles.backTextWhite}>Eliminar</Text>
                                               
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                leftOpenValue={0}
                                rightOpenValue={-150}
                                previewRowKey={'0'}
                                
                                previewOpenDelay={1000}
                            />

                        {
                            user.userTypeId != 2 && (
                                <FloatingAction
                                    buttonSize={50}
                                    color='black'
                                    
                                    onPressItem={(name) => newProduct(navigation,name)}
                                    actions={[{
                                        icon: (
                                            <MaterialCommunityIcons name="food" color='white' size={25}/>
                                        ),
                                        name:'EditProductScreen',
                                        text:'Agregar Producto',
                                        position:1,
                                        textStyle:{fontFamily:'dosis-light'},
                                        buttonSize:45,
                                        color:'#00A8C8'
                                        
                                    },
                                    {
                                        icon: (
                                            <MaterialCommunityIcons name="view-list" color='white' size={25}/>
                                        ),
                                        name:'CategoriesList',
                                        text:'Ver Categorías',
                                        position:2,
                                        textStyle:{fontFamily:'dosis-light'},
                                        buttonSize:45,
                                        color:'#00A8C8'
                                    },
                                    {
                                        icon: (
                                            <MaterialCommunityIcons name="playlist-plus" color='white' size={25}/>
                                        ),
                                        name:'EditCategoryScreen',
                                        text:'Agregar Categoría',
                                        position:3,
                                        textStyle:{fontFamily:'dosis-light'},
                                        buttonSize:45,
                                        color:'#00A8C8'
                                    }]}
                                />
                            )
                        }
                        
                    </Container>
                )
            }
            
            <Modal
                transparent={true}
                animationType={'none'}
                visible={isCreating || isEditing || isRemoving}>
                <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" animating={isCreating || isEditing || isRemoving} color={colors.primary} />
                </View>
                </View>
            </Modal>
            { <ModalProductInformationScreen modal={modalProduct} closeModal={()=>setModalProduct(false)}  isAdmin={true}/>}
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
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#ffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
      
    },
    rowFront: {        
        backgroundColor: '#ffffff',
        height:70,
 
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: '#FFF11B',
        right: 75,
      
    },
    backRightBtnRight: {
        backgroundColor: '#FF0D0D',
        
        right: 0,
    },
    
})

export default connect(
    state => ({
        user: selectors.getLoggedUser(state),
        categories: selectors.getCategories(state),
        productsByCategories: selectors.getProductsByCategory(state),
        isLoading: selectors.isFetchingCategories(state) || selectors.isFetchingProducts(state),
        isCreating: selectors.isCreatingCategory(state) || selectors.isAddingProducts(state),
        isEditing: selectors.isEditingProducts(state),
        isRemoving: selectors.isRemovingProducts(state),
        initialValuesProduct: selectors.getSelectedProduct(state) !=null ? selectors.getProduct(state,selectors.getSelectedProduct(state).productId) : {},
	     ingredients: selectors.getSelectedProductIngredients(state),
		  additionals: selectors.getSelectedProductAdditionals(state),
	

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
        newProduct(navigation,screen) {
            dispatch(actionsProducts.deselectProduct());
            dispatch(actionsCategories.deselectCategory());
            navigation.navigate(screen);
        },

        selectProduct(navigation, product) {
              dispatch(actionsProducts.selectProduct(product));
              navigation.navigate('EditProductScreen');
        },
        selectProductInformation(navigation, product) {
            dispatch(actionsProducts.selectProduct(product));
            // navigation.navigate('ProductInformationScreen',{isAdmin:true});
        },
        deleteProduct(productId) {
            dispatch(actionsProducts.startRemovingProduct(productId))
        },
    }),
)(withTheme(ProductsList));
