
import { Body, Container, Icon, Left, ListItem } from 'native-base';
import React, { useEffect,useState } from 'react';
import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { withTheme } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import SegmentedControlTab from "react-native-segmented-control-tab";

import * as actionsCategories from '../../logic/actions/categories';
import * as actions from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import OrderItem from './OrderItem';
import ModalOrderInformationScreen from './ModalOrderInformationScreen'
import { suscribeFirebase } from '../../../config';

const width = Dimensions.get('window').width; // full width

function OrdersList ({
    route,
    deleteOrder,
    theme,
    onLoad,
    onRefresh,
    createdOrders,
    deliveredOrders,
    completedOrders,
    chargedOrders,
    isLoading,
    navigation,
    isAdding,
    isEditing,
    selectOrder,
    viewOrder,
    editOrderStatus,
}) {
    const { colors, roundness } = theme;
    const [modalOrder, setModalOrder] = useState(false);
    const [indexShowTab, changeIndexShowTab] = useState(0);
    useEffect(onLoad, []);
    
    const renderSectionHeader = ({ section }) => (
        <ListItem   style={{backgroundColor:colors.gray}} itemDivider icon>
            <Left>
                <Icon active name="clipboard-text"  style={{color:colors.white}} type="MaterialCommunityIcons"/>
            </Left>
    
            <Body>
                <Text style={{fontSize:16,fontFamily:'dosis-semi-bold',paddingLeft:0,color:colors.white}}>{section.title}</Text>
            </Body>
         </ListItem>
         );
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
               (
                    <Container width={width}>
                        <SegmentedControlTab
                            values={[ "Procesando", "Entregados", "Completados", "Cobrados"]}
                            activeTabStyle={{backgroundColor:colors.gray}}
                            tabsContainerStyle={{paddingTop:10,paddingBottom:10,marginRight:"10%",marginLeft:"10%"}}
                            tabTextStyle={{fontFamily:'dosis-semi-bold',color:colors.black}}
                            tabStyle={{borderColor:colors.black}}
                            selectedIndex={indexShowTab}
                            onTabPress={changeIndexShowTab}
                            tabBadgeContainerStyle={{backgroundColor:colors.black}}
                        />
                        {
                            !isLoading && (indexShowTab==0 ? createdOrders.length <= 0 : indexShowTab==1 ? deliveredOrders.length <= 0 : indexShowTab==2 ? completedOrders.length <= 0 : chargedOrders.length <= 0) && (
                                <View style={{flex:0.1, alignItems:'center', paddingTop:10}}>
                                        <MaterialCommunityIcons
                                            name="information"
                                            color={colors.black}
                                            size={50}
                                        />
                                        {indexShowTab==0 && <Text style={{paddingTop:10, fontSize:20, fontFamily:'dosis-bold', textAlign:'center'}}>Por el momento no hay órdenes procesando.</Text>}
                                        {indexShowTab==1 && <Text style={{paddingTop:10, fontSize:20, fontFamily:'dosis-bold', textAlign:'center'}}>Por el momento no hay órdenes entregadas.</Text>}
                                        {indexShowTab==2 && <Text style={{paddingTop:10, fontSize:20, fontFamily:'dosis-bold', textAlign:"center"}}>Por el momento no hay órdenes completadas.</Text>}
                                        {indexShowTab==3 && <Text style={{paddingTop:10, fontSize:20, fontFamily:'dosis-bold', textAlign:'center'}}>Por el momento no hay órdenes cobradas.</Text>}
                                </View>
                            )
                        }
                        {indexShowTab==0 &&
                            <SwipeListView
                                style={{marginTop:0}}
                                data={createdOrders}
                                useSectionList
                                sections={createdOrders}
                                renderSectionHeader={renderSectionHeader}
                                renderItem={ (order, rowMap) => (
                                    <OrderItem
                                        onPress={() => {setModalOrder(true);viewOrder(order.item);}}
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
                                                onPress={() => {selectOrder(navigation, order.item);rowMap[order.item.orderId].closeRow();}}
                                            >
                                                <MaterialCommunityIcons
                                                    name="pencil"
                                                    color={colors.black}
                                                    size={30}
                                                />
                                                <Text style={styles.backTextWhite}>Editar</Text>  
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnMiddle]}
                                                
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
                                                    color={colors.black}
                                                    size={30}
                                                />
                                                <Text style={styles.backTextWhite}>Eliminar</Text>
                                                
                                            </TouchableOpacity>
                                            
                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnRight, {borderWidth: 0, backgroundColor: colors.accent,borderRadius:0}]}
                                                onPress={() => {editOrderStatus(order.item, 2, null);changeIndexShowTab(1)}}
                                            >
                                                <MaterialCommunityIcons
                                                    name="check-circle"
                                                    color={colors.black}
                                                    size={30}
                                                />
                                                <Text style={styles.backTextWhite}>Entregado</Text>  
                                            </TouchableOpacity>

                                        </View>
                                    )
                                }
                                leftOpenValue={0}
                                rightOpenValue={-225}
                                
                                previewOpenDelay={1000}
                            />
                        }
                        {indexShowTab==1 &&
                            <SwipeListView
                                style={{marginTop:0}}
                                data={deliveredOrders}
                                useSectionList
                                sections={deliveredOrders}
                                renderSectionHeader={renderSectionHeader}
                                renderItem={ (order, rowMap) => (
                                    <OrderItem
                                        onPress={() => {setModalOrder(true);viewOrder(order.item);}}
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
                                                style={[styles.backRightBtn, styles.backRightBtnMiddle, {borderWidth: 0, backgroundColor: colors.accent,borderRadius:0}]}
                                                onPress={() => {editOrderStatus(order.item, 1, null);changeIndexShowTab(0)}}
                                            >
                                                <MaterialCommunityIcons
                                                    name="close-circle"
                                                    color={colors.black}
                                                    size={30}
                                                />
                                                <Text style={{...styles.backTextWhite,fontSize:12}}>Procesando</Text>  
                                            </TouchableOpacity>                                            
                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnRight, {borderWidth: 3, borderColor: colors.accent,borderRadius:0}]}
                                                onPress={() => {editOrderStatus(order.item, 3, null);changeIndexShowTab(2)}}
                                            >
                                                <MaterialCommunityIcons
                                                    name="check-circle"
                                                    color={colors.black}
                                                    size={30}
                                                />
                                                <Text style={{...styles.backTextWhite,fontSize:12}}>Completar</Text>  
                                            </TouchableOpacity>

                                        </View>
                                    )
                                }
                                leftOpenValue={0}
                                rightOpenValue={-150}
                                
                                previewOpenDelay={1000}
                            />
                        }
                        {indexShowTab==2 &&
                            <SwipeListView
                                style={{marginTop:0}}
                                data={completedOrders}
                                useSectionList
                                sections={completedOrders}
                                renderSectionHeader={renderSectionHeader}
                                renderItem={ (order, rowMap) => (
                                    <OrderItem
                                        onPress={() => {setModalOrder(true);viewOrder(order.item);}}
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
                                disableLeftSwipe={true}
                                keyExtractor={(order, index) => (index)}
                                leftOpenValue={0}
                                renderHiddenItem={() => (<></>)}
                                rightOpenValue={0}
                                
                                previewOpenDelay={1000}
                            />
                        }
                        {indexShowTab==3 &&
                            <SwipeListView
                                style={{marginTop:0}}
                                data={chargedOrders}
                                useSectionList
                                sections={chargedOrders}
                                renderSectionHeader={renderSectionHeader}
                                renderItem={ (order, rowMap) => (
                                    <OrderItem
                                        onPress={() => {setModalOrder(true);viewOrder(order.item);}}
                                        style={styles.rowFront}
                                        key={order.item.orderId}
                                        name={`${order.item.orderName}`}
                                        date={order.item.date.toDate().toString()}
                                        total={parseFloat(order.item.total) + parseFloat(order.item.hasTip?order.item.tip:0)} image={order.item.image}
                                        order={order.item}
                                        navigation={navigation}
                                        theme={theme}
                                    />
                                )}
                                refreshing={isLoading}
                                onRefresh={()=>onRefresh()}
                                disableRightSwipe={true}
                                disableLeftSwipe={true}
                                keyExtractor={(order, index) => (index)}
                                leftOpenValue={0}
                                renderHiddenItem={() => (<></>)}
                                rightOpenValue={0}
                                
                                previewOpenDelay={1000}
                            />
                        }         
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
            { <ModalOrderInformationScreen modal={modalOrder} closeModal={()=>setModalOrder(false)}  navigation={navigation} isAdmin={false} onlyDetail={true} newOrder={false}/>}
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
        paddingLeft: 20,
      
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
        right: 150,
        
    },
    backRightBtnMiddle: {
        backgroundColor: '#FF0D0D',
        right: 75,
        
    },
    backRightBtnRight: {
        backgroundColor: 'white',
        
        right: 0,
    },
    
})


export default connect(
    state => ({
        createdOrders: selectors.getCreatedOrdersByTable(state),
        deliveredOrders: selectors.getDeliveredOrdersByTable(state),
        completedOrders: selectors.getCompletedOrdersByTable(state),
        chargedOrders: selectors.getChargedOrdersByTable(state),
        isLoading: selectors.isFetchingOrders(state),
        isAdding: selectors.isAddingOrders(state),
        isEditing: selectors.isEditingOrders(state),
    }),
    dispatch => ({
        onLoad() {
            if(!suscribeFirebase){
                dispatch(actions.startFetchingOrders());
            }
        },
        onRefresh() {
            if(!suscribeFirebase){
                dispatch(actions.startFetchingOrders());
            }
            
        },
        viewOrder(order) {
            dispatch(actionsCategories.startFetchingCategories());
            dispatch(actions.activateOrder(order));
        },
        editOrderStatus(order,orderStatus,invoiceInfo) {
            dispatch(actions.startEditingOrderStatus(order,orderStatus,invoiceInfo));
        },
        deleteOrder(orderId){
            dispatch(actions.startRemovingOrder(orderId));
        },
        selectOrder(navigation, orderId){
            dispatch(actions.activateOrder(orderId));
            navigation.navigate('ProductSelect', { newOrder: false });
        }
    }),
)(withTheme(OrdersList));