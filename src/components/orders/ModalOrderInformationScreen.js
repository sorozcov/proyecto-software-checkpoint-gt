
import 'firebase/firestore';
import { Field, reduxForm, submit } from 'redux-form';
import { Button, withTheme,IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { Text } from 'native-base';
import React,{useState,useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, View ,FlatList, Dimensions, Platform} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import ImagePicker from '../../components/general/ImagePickerProduct';
import {Picker} from 'react-native-option-picker';
import OptionPicker from '../../components/general/OptionPicker'
import * as actionsProducts from '../../logic/actions/products';
import * as selectors from '../../logic/reducers';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FinishOrder from './FinishOrder';
import * as actions from '../../logic/actions/orders';

import MyCheckbox from '../general/checkboxNoReduxForm';

function OrderInformationScreen({ 
	theme,
	navigation,
	closeModal, 
	modal,
	finishOrderButton=true,
	sendOrder,
	orderProducts,
	activeOrder, 
	onlyDetail=false, 
	newOrder, 
	user,
	editOrderStatus,
	editOrderStatusCompleted,
	showPrintButton=false,
	}) {

	const charge = activeOrder.status == 3; 
	const chargeView = activeOrder.status >=4; 

	const { colors, roundness } = theme;
	
	const dataTip = [
		{
			id: 15,
			title: '15%',
			selected: false,
		},
		{
			id: 10,
			title: '10%',
			selected: true,
		},
		{
			id: 5,
			title: '5%',
			selected: false,
		},
		
		// {
		// 	id: -1,
		// 	title: 'Otro',
		// 	selected: false,
		// },
	];
	const dataInvoice = [
		{
			id: true,
			title: 'Factura',
			selected: true,
		},
		{
			id: false,
			title: 'Sin Factura',
			selected: false,
			},
	];

	const [tip, setTip] = useState(
		{
			id: 10,
			title: '10%',
			selected: true,
		}
	);
	const [discount, setDiscount] = useState({
		id: 10,
		title: '10%',
		selected: true,
	});
	useEffect(()=>{
		console.log(dataTip)
		dataTip.forEach((type,index)=>{
			if(activeOrder.hasTip && type.id==activeOrder.tipType.id){
				dataTip[index]=activeOrder.tipType
			}else{
				if(activeOrder.hasTip){
					dataTip[index]={...type,selected:false}
				}else{
					dataTip[index]={...type}
				}
				
			}
		})
			
	},[activeOrder])
	const [invoice, setInvoice] = useState(false);
	const [discounts, setDiscounts] = useState(false);
	const [closeOrder, setCloseOrder] = useState(false);
	const [tips, setTips] = useState(true);
	
	//Se calcula el total
	var total = 0
	orderProducts.forEach(product => {
		total = total + parseFloat(product.totalPrice);
	});
	if(charge && discounts){
		total=total-(total*discount.id/100)
	}
	if(charge && tips){
		total=total+(total*tip.id/100)
	}

	return (
		<Modal
			transparent={true}
			animationType={'none'}
			isVisible={modal}
			avoidKeyboard={true}
			animationIn={"slideInUp"}
			animationOut={"slideOutDown"}
			coverScreen={true}
			onBackButtonPress={()=>closeModal()}
			onBackdropPress={()=>closeModal()}
			style={styles.modalB}
			animationInTiming={0}
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
			// onSwipeComplete={()=>closeModal()}
			// swipeDirection={['right']}
			// propagateSwipe={false}
		>
			<View style={{ flex: 1,backgroundColor:'white',flexDirection:'column',marginBottom:'6%'}}>
				<FinishOrder navigation={navigation} onlyDetail={onlyDetail} newOrder={newOrder}/>
				{(charge || chargeView) && <View>
					<Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} />
					<MyCheckbox name={'tip'} disabled={false}  label='PROPINA' containerStyle={{backgroundColor:null,width:'50%',alignSelf:'center',height:40}} size={20} checkedColor={theme.colors.accent} center={true} checked={chargeView ? activeOrder.hasTip!==false : tips} onCheck={(check)=>setTips(check)} disabled={chargeView}/>
					{chargeView && activeOrder.hasTip!==false &&
					<Text style={{fontFamily:'dosis-semi-bold', fontSize:18, textAlign:'center'}}>
						Q.{(parseFloat(activeOrder.tip).toFixed(2))}  
					</Text> }
					{ charge && tips &&
					<OptionPicker theme={theme} data={dataTip} onPress={(elem)=>setTip(elem)}/>}
					<Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} />
					<MyCheckbox name={'invoice'} disabled={false}  label='FACTURA' containerStyle={{backgroundColor:null,width:'50%',alignSelf:'center',height:40}} size={20} checkedColor={theme.colors.accent} center={true} checked={chargeView ? activeOrder.status===5 : invoice} onCheck={(check)=>setInvoice(check)} disabled={chargeView}/>
					<Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} />
					{/* <MyCheckbox name={'discount'} disabled={false}  label='DESCUENTOS' containerStyle={{backgroundColor:null,width:'50%',alignSelf:'center',height:40}} size={20} checkedColor={theme.colors.accent} center={true} checked={chargeView ? activeOrder.discount!==false : discounts} onCheck={(check)=>setDiscounts(check)} disabled={chargeView}/> */}
					<MyCheckbox name={'closeOrder'} disabled={false}  label='CERRAR CUENTA' containerStyle={{backgroundColor:null,width:'50%',alignSelf:'center',height:40}} size={20} checkedColor={theme.colors.accent} center={true} checked={chargeView ? activeOrder.closeOrder!==false : closeOrder} onCheck={(check)=>setCloseOrder(check)} disabled={chargeView}/>
					<Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} />
					
					{/* {chargeView && activeOrder.discount!==false && 
					<Text style={{fontFamily:'dosis-semi-bold', fontSize:18, textAlign:'center'}}>
						{activeOrder.discount}  
					</Text> }
					{charge && discounts &&
					<OptionPicker theme={theme} data={dataTip} onPress={(elem)=>setDiscount(elem)}/>}
					<Divider style={{ backgroundColor: colors.accent,marginTop:10,marginBottom:10 }} /> */}
					
					
					
				</View>}
				<View style={styles.totalContainer}>
				
                	<Text  style={{fontFamily:'dosis-light',fontSize:24}}>{'Total: Q. ' + parseFloat(total).toFixed(2)}</Text>
           		</View>
				
				<View style={{marginTop:'1%',marginBottom:'8%'}}>
					
					{showPrintButton && <Button
					
					theme={roundness}
					color={colors.accent}
					icon={"printer"}
					height={50}
					mode="contained"
					labelStyle={{
						fontFamily: "dosis-bold",
						fontSize: 15,
					}}
					style={{
						fontFamily: 'dosis',
						marginLeft: '5%',
						marginRight: '5%',
						justifyContent: 'center',
					}}
					
					onPress={()=>closeModal()}>
					Imprimir Cuenta
					</Button>}
					{/* { <Button
					//   disabled={!isAdmin && (quantity==0 || quantity==undefined)}
					theme={roundness}
					color={colors.accent}
					icon={"backburger"}
					height={50}
					mode="contained"
					labelStyle={{
						fontFamily: "dosis-bold",
						fontSize: 15,
					}}
					style={{
						fontFamily: 'dosis',
						marginLeft: '5%',
						marginRight: '5%',
						justifyContent: 'center',
					}}
					
					onPress={()=>closeModal()}>
					REGRESAR
					</Button>} */}
					
				</View>
				<IconButton testID={'close-button'}  icon="close"  size={30} style={{top:20,right:3,position:'absolute',backgroundColor:'#D8D8D8'}} mode="contained" onPress={()=>closeModal()}  />
				
			</View>
			{finishOrderButton && !onlyDetail &&  !charge &&
					<Button
					disabled={total==0}
					theme={{roundness:0}}
					color={'#000000'}
					icon={"arrow-right-bold"}
					height={Platform.OS=='ios' ? 80 : 65}
					mode="contained"
					labelStyle={{
						fontFamily: "dosis-bold",
						fontSize: 15,
						
					}}
					style={{
						fontFamily: 'dosis',
						bottom:'0%',
						width:'100%',
						justifyContent: 'center',
						
						position:'absolute',
					}}
					
					onPress={() =>{ 
						closeModal();
						sendOrder(activeOrder, total, user);
						}}>
					{(!newOrder ? 'Actualizar' : 'PROCESAR') + ` ORDEN POR Q${parseFloat(total).toFixed(2)}`}
					</Button>
				
				}
				{charge && !closeOrder &&
					<Button
					disabled={total==0}
					theme={{roundness:0}}
					color={'#000000'}
					icon={"cash-register"}
					height={Platform.OS=='ios' ? 80 : 65}
					mode="contained"
					labelStyle={{
						fontFamily: "dosis-bold",
						fontSize: 15,
						
					}}
					style={{
						fontFamily: 'dosis',
						bottom: '0%',
						width:'100%',
						
						justifyContent: 'center',
						
						position:'absolute',
					}}
					
					onPress={() =>{ 
						closeModal();
						editOrderStatusCompleted(activeOrder, { tip, tips, invoice, discounts, discount,closeOrder});
						}}>
					{( 'COBRAR') + ` ORDEN POR Q${parseFloat(total).toFixed(2)}`}
					</Button>
				
				}
				{charge && closeOrder &&
					<Button
					disabled={total==0}
					theme={{roundness:0}}
					color={'#000000'}
					icon={"cash-register"}
					height={Platform.OS=='ios' ? 80 : 65}
					mode="contained"
					labelStyle={{
						fontFamily: "dosis-bold",
						fontSize: 15,
						
					}}
					style={{
						fontFamily: 'dosis',
						bottom:'0%',
						width:'100%',
						justifyContent: 'center',
						
						position:'absolute',
					}}
					
					onPress={() =>{ 
						closeModal();
						editOrderStatus(activeOrder, { tip, tips, invoice, discounts, discount,closeOrder});
						}}>
					{( 'COBRAR Y CERRAR CUENTA') + ` POR Q${parseFloat(total).toFixed(2)}`}
					</Button>
				
				}
		</Modal>
	);
}
	
const styles = StyleSheet.create({
	modalB:{
		flex:1,
		flexDirection: 'row',
		paddingTop: Platform.OS === 'ios'  ? 20 : 0,
		margin: 0
	},
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
	
	  },
	  modal: {
		backgroundColor: '#FFFFFF',
		height: 350,
		width: '80%',
		borderRadius: 10,
		
		justifyContent: 'space-around'
	  },
	  container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		fontFamily: 'dosis-regular',
	  },
	  row: {
		alignItems: 'center',
		flex: 1, 
		
	  },
	  contentContainer: {
		paddingTop: 30,
	  },
	  inputContainerStyle: {
		margin: 8,
	  },
	  inputContainerStyle: {
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 20,
	  },
	  titleStyle: {
		textAlign: 'center',
		fontFamily: 'dosis-extra-bold',
		fontSize: 30,
		paddingBottom: '6%',
		paddingTop: '8%',
	  },
	  textStyle:{
		textAlign: 'center', 
		fontFamily: 'dosis-semi-bold',
		fontSize: 16,
		paddingTop: 20,
		paddingBottom: 20,
	  },
	  btnLeft: {
		backgroundColor: '#B2FFFF',
		justifyContent:'center',
		alignItems:'center',
		height:40,
		marginRight:10
	  },
	  btnRight: {
		  backgroundColor: '#00AAE4',
		  justifyContent:'center',
		  alignItems:'center',
		  height:40,
		  marginLeft:10
	  },
	  infoTxt: {
		alignItems: 'center',
		justifyContent:'center',
		borderWidth: 2,
		borderColor: '#00AAE4',
		width: 40,
		
		height:40,
	  },
	  infoTxtView: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		borderWidth: 1,
		borderColor: '#00AAE4',
		width: 30,
		height:30,
		right: 10,
	  },
	  totalContainer: {
        marginTop: 5,
        alignItems: 'center'
	},
	
});

export default connect(
	(state, { newOrder }) => ({
        orderProducts: newOrder ? selectors.getNewOrderProducts(state) : selectors.getSelectedOrderProducts(state),
        activeOrder: newOrder ? selectors.getNewOrder(state) : selectors.getSelectedOrder(state),
        isAdding: selectors.isAddingOrders(state),
		addingError: selectors.getOrdersError(state),
		user: selectors.getLoggedUser(state)
	}),
	(dispatch, { newOrder, navigation }) => ({

		sendOrder(activeOrder, total, user) {
			if(!newOrder){
				dispatch(actions.startEditingOrder({...activeOrder, total}));
				dispatch(actions.deactivateOrder());
				navigation.pop();
				navigation.navigate('OrdersList');
			} else {
				const branchId = user.restaurantId;
				const branchName = user.restaurantName;
				
				let newOrder  = activeOrder;
				
				newOrder = {
					...newOrder,
					['branch']: { 
						branchId,
						branchName,
					},
					['user']: user ,
				};
				
				dispatch(actions.startAddingOrder({...newOrder, total}));
				dispatch(actions.deactivateNewOrder());
				navigation.popToTop();
				navigation.navigate('Orders');
			}
		},
        editOrderStatus(order,invoiceInfo) {
			order.discount = invoiceInfo.discounts ? invoiceInfo.discount.title : false;
			order.tip = invoiceInfo.tips ? (invoiceInfo.tip.id/100)*order.total : 0;
			order.hasTip = invoiceInfo.tips
			order.tipType = invoiceInfo.tips ? invoiceInfo.tip : null
			order.status = invoiceInfo.invoice ? 5 : 4;
			// dispatch(actions.startEditingOrderStatus(order, invoiceInfo.invoice ? 5 : 4, null));
			dispatch(actions.startEditingOrderStatus(order, invoiceInfo.invoice ? 5 : 4, null));
		},
		editOrderStatusCompleted(order,invoiceInfo) {
			order.discount = invoiceInfo.discounts ? invoiceInfo.discount.id/100 : 0;
			order.tip = invoiceInfo.tips ? (invoiceInfo.tip.id/100)*order.total : 0;
			order.hasTip = invoiceInfo.tips
			order.tipType = invoiceInfo.tips ? invoiceInfo.tip : null
			order.status = 3;
			order.closeOrder = invoiceInfo.closeOrder
			// dispatch(actions.startEditingOrderStatus(order, invoiceInfo.invoice ? 5 : 4, null));
			dispatch(actions.startEditingOrderStatus(order, 3, null));
        },
	}),
  )(withTheme(OrderInformationScreen));