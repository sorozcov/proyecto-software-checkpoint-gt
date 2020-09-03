import React,{useState} from 'react';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { ListItem,Left,Icon,Body } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Card, Divider } from 'react-native-elements';
import ProductListItem from './ProductListItem';
import * as actions from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import ModalProductInformationScreen from '../products/ModalProductInformationScreen'
import * as actionsProducts from '../../logic/actions/products';


function FinishOrder({
    theme,
    navigation,
    orderProductsByCategory,
    orderProducts,
    activeOrder,
    sendOrder,
    finish,
    isAdding,
    addingError,
    finishOrderButton=false,
    selectProductInformation,
}) {
    const { roundness,colors } = theme;
    const [modalProduct, setModalProduct] = useState(false);
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
            <View style={{flex:0.05,direction:'row',alignItems:'center',}}>
                <Text style={{ fontFamily:'dosis-semi-bold',fontSize:19,}}>
                     {'ORDEN' +' MESA '+activeOrder.table+ " " +activeOrder.name}  
                </Text>
            </View>
            <Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} />
            <View style={{flex:0.04}}>
                
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
                renderItem={ (category, rowMap) => (
                    <ProductListItem
                        style={styles.rowFront}
                        key={category.item.productId}
                        name={`${category.item.productName}`}
                        product={category.item}
                        navigation={navigation}
                        onlyView={true}
                        onPress={()=>{setModalProduct(true);selectProductInformation(navigation, category.item);}} 
                        
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
           
            { <ModalProductInformationScreen modal={modalProduct} closeModal={()=>setModalProduct(false)}  isAdmin={false}/>}
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
        selectProductInformation(navigation, product) {
            dispatch(actionsProducts.selectProduct(product));
            // navigation.navigate('ProductInformationScreen',{isAdmin:true});
        },
        // finish(navigation) {
        //     dispatch(actions.deactivateOrder());
        //     navigation.navigate('NewOrder');
        // }
    }),
)(withTheme(FinishOrder));