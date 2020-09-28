import React,{useState} from 'react';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { ListItem,Left,Icon,Body } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Divider } from 'react-native-elements';
import ProductListItem from './ProductListItem';
import * as actions from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import ModalProductInformationScreen from '../products/ModalProductInformationScreen'
import * as actionsProducts from '../../logic/actions/products';
import * as actionsOrders from '../../logic/actions/orders';


function FinishOrder({
    theme,
    navigation,
    orderProductsByCategory,
    orderProducts,
    activeOrder,
    onlyDetail,
    selectProductInformation,
    deleteProductOfOrder,
    newOrder,
}) {
    const { roundness,colors } = theme;
    const [modalProduct, setModalProduct] = useState(false);
    // console.log(activeOrder)
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
        total = total + parseFloat(product.totalPrice);
    });

    return (
        <View style={styles.container}>
            {activeOrder.table!==undefined && <View style={{height:25,direction:'row',alignItems:'center',}}>
                <Text style={{ fontFamily:'dosis-semi-bold',fontSize:19,}}>
                     {'ORDEN' +' MESA '+activeOrder.table+ " " +activeOrder.orderName}  
                </Text>
            </View>}
            <Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} />
            <View style={{height:20}}>
                
                <Text style={{paddingLeft: 18,fontFamily:'dosis-light',fontSize:18}}>
                    {'Detalle'}  
                </Text>
               
            </View>
            <Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} />
           
            <SwipeListView
                style={{flex:1}}
                useSectionList
                sections={orderProductsByCategory}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={product => product.index}
                renderItem={ (category, rowMap) => (
                    <ProductListItem
                        style={styles.rowFront}
                        key={category.item.index}
                        name={`${category.item.productName}`}
                        product={category.item}
                        navigation={navigation}
                        onlyView={true}
                        onPress={onlyDetail?null:()=>{setModalProduct(true);selectProductInformation(category.item);}} 
                        
                    />
                )}
                renderHiddenItem= {
                    onlyDetail?null: (product, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnRight]}
                                onPress={ () => {
                                    rowMap[product.item.index].closeRow();
                                    Alert.alert(
                                        '¿Eliminar producto de la orden?',
                                        'Esta acción no puede ser revertida',
                                        [
                                            {
                                                text: 'Cancelar', 
                                                style: 'cancel'
                                            },
                                            {
                                                text: 'Eliminar',
                                                onPress: () => deleteProductOfOrder(product.item.index),
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
                disableRightSwipe={true}
                closeOnRowPress={true}
                leftOpenValue={0}
                rightOpenValue={-75}
                previewRowKey={'0'}
                
                previewOpenDelay={1000}
            />
           
           
            { <ModalProductInformationScreen modal={modalProduct} closeModal={()=>setModalProduct(false)}  isAdmin={false} onlyDetail={onlyDetail} newOrder={newOrder} />}
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
        marginTop: 5,
        alignItems: 'center'
    },
    buttonContainer: {
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'dosis-regular',
        flexDirection:'column',
        marginTop:22,
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
        height:100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#ffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
      
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
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
    backTextWhite: {
        fontFamily: 'dosis-regular',
    },
});


export default connect(
    (state, { newOrder }) => ({
        orderProducts: newOrder ? 
            selectors.getNewOrderProducts(state) :
            selectors.getSelectedOrderProducts(state),
        orderProductsByCategory: newOrder ? 
            selectors.getNewOrderProductsByCategory(state) :
            selectors.getSelectedOrderProductsByCategory(state),
        activeOrder: newOrder ? 
            selectors.getNewOrder(state) :
            selectors.getSelectedOrder(state),
        isAdding: selectors.isAddingOrders(state),
        addingError: selectors.getOrdersError(state),
    }),
    (dispatch, { newOrder }) => ({
        selectProductInformation(product) {
            dispatch(actionsProducts.selectProduct(product));
        },
		deleteProductOfOrder(index) {
            newOrder ? dispatch(actionsOrders.deleteProductOfNewOrder(index)) : dispatch(actionsOrders.deleteProductOfOrder(index));
		},
    }),
)(withTheme(FinishOrder));