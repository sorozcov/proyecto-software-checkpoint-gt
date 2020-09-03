
import { Body, Container, Icon, Left, ListItem } from 'native-base';
import React, { useEffect,useState } from 'react';
import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { withTheme } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import * as actionsCategories from '../../logic/actions/categories';
import * as actions from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import OrderItem from './OrderItem';
import ModalOrderInformationScreen from './ModalOrderInformationScreen'

const width = Dimensions.get('window').width; // full width

function OrdersList ({
    deleteOrder,
    theme,
    onLoad,
    onRefresh,
    orders,
    isLoading,
    navigation,
    newOrder,
    isAdding,
    isEditing,
    selectOrder,
    viewOrder,
}) {
    const { colors, roundness } = theme;
    const [modalOrder, setModalOrder] = useState(false);
    useEffect(onLoad, []);
    const renderSectionHeader = ({ section }) => (
        <ListItem   style={{backgroundColor:'black'}} itemDivider icon>
            <Left>
                <Icon active name="receipt"  style={{color:'white'}} type="MaterialCommunityIcons"/>
            </Left>
    
            <Body>
                <Text style={{fontSize:18,fontFamily:'dosis-semi-bold',paddingLeft:0,color:'white'}}>{section.title}</Text>
            </Body>
         </ListItem>
         );
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
               (
                    <Container width={width}>
                        {
                            orders.length <= 0 && !isLoading && (
                                <View style={{flex:0.1, alignItems:'center', paddingTop:10}}>
                                        <MaterialCommunityIcons
                                            name="information"
                                            color='black'
                                            size={50}
                                        />
                                        <Text style={{paddingTop:10, fontSize:20, fontFamily:'dosis-bold', alignSelf:'center'}}>Aún no hay ordenes</Text>
                                </View>
                            )
                        }
                      
                        <SwipeListView
                            style={{marginTop:0}}
                            data={orders}
                            useSectionList
                            sections={orders}
                            renderSectionHeader={renderSectionHeader}
                            renderItem={ (order, rowMap) => (
                                <OrderItem
                                    onPress={() => {setModalOrder(true);viewOrder(navigation, order.item);}}
                                    style={styles.rowFront}
                                    key={order.item.orderId}
                                    name={`${order.item.orderName}`}
                                    date={order.item.date.toDate().toString()}
                                    total={order.item.total} image={order.item.image}
                                    order={order.item}
                                    navigation={navigation}
                                    theme={theme}
                                />
                            )}
                            refreshing={isLoading}
                            onRefresh={()=>onRefresh()}
                            disableRightSwipe={true}
                            closeOnRowPress={true}
                            keyExtractor={(order, index) => (order.orderId)}
                            renderHiddenItem={
                                (order, rowMap) => (
                                    <View style={styles.rowBack}>
                                        <TouchableOpacity
                                            style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                            // onPress={() => {selectOrder(navigation, order.item);rowMap[order.item.id].closeRow();}}
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
                                                rowMap[order.item.orderId].closeRow();
                                                Alert.alert(
                                                    '¿Eliminar orden?',
                                                    'Esta acción no puede ser revertida',
                                                    [
                                                        {
                                                            text: 'Cancelar', 
                                                            style: 'cancel'
                                                        },
                                                        {
                                                            text: 'Eliminar',
                                                            onPress: () => deleteOrder(order.item.orderId),
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
                            
                            previewOpenDelay={1000}
                        />
                                  
                    </Container>
                )
            }
            <Modal
                transparent={true}
                animationType={'none'}
                visible={isAdding || isEditing}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" animating={isAdding || isEditing} color={colors.primary} />
                    </View>
                </View>
            </Modal>
            { <ModalOrderInformationScreen modal={modalOrder} closeModal={()=>setModalOrder(false)}  navigation={navigation} isAdmin={false} onlyDetail={true}/>}
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
        orders: selectors.getOrdersByTable(state),
        isLoading: selectors.isFetchingOrders(state),
        isAdding: selectors.isAddingOrders(state),
        isEditing: selectors.isEditingOrders(state),
        orderHasUsers: (orderId)=>selectors.orderHasUsers(orderId, state)
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingOrders());
        },
        onRefresh() {
            dispatch(actions.startFetchingOrders());
        },
        newOrder(navigation) {
            navigation.navigate('NewOrder');
        },
        viewOrder(navigation, order) {
            dispatch(actionsCategories.startFetchingCategories());
           
            dispatch(actions.activateOrder(order));
            // navigation.navigate('FinishOrder');
        },
        deleteOrder(orderId){
            dispatch(actions.startRemovingOrder(orderId));
        }
    }),
)(withTheme(OrdersList));