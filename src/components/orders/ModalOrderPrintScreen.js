import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import 'firebase/firestore';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
	Dimensions,
	Platform, StyleSheet,
	View,Image
} from 'react-native';
import { Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Button, IconButton, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import OptionPicker from '../../components/general/OptionPicker';
import * as actions from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import MyCheckbox from '../general/checkboxNoReduxForm';
import { uriToBlob } from "../general/ImagePickerUser";
import FinishOrder from './FinishOrder';
import { WebView } from 'react-native-webview';


const exportPDF = async (uri) => {
	
	try {
		
		await Sharing.shareAsync(uri);
    	
	} catch (error) {
    	console.error(error);
  	}
};


function OrderPrintScreen({ 
	uri,
	html,
	theme,
	closeModal, 
	modal,
	showPrintButton=true,
	}) {
	const { colors, roundness } = theme;
	console.log(html);
	return (
		<Modal
			transparent={true}
			animationType={'none'}
			isVisible={modal}
			avoidKeyboard={true}
			animationIn={"slideInUp"}
			animationOut={"slideOutDown"}
			coverScreen={true}
			onBackButtonPress={() => closeModal()}
			onBackdropPress={() => closeModal()}
			style={styles.modalB}
			animationInTiming={0}
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
		>
			<View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column', marginBottom: '6%' }}>
				
					{uri!=null && 
					<WebView
					style={{flex: 1}}
					// originWhitelist={['*']}
					source={{html:html}}
					// style={{ marginTop: 20 }}
					// javaScriptEnabled={true}
					// domStorageEnabled={true}
				  />}


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
							marginTop: 12,
						}}
						onPress={() => exportPDF(uri)}
							
						
					
					>
						COMPARTIR PDF
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
				<IconButton testID={'close-button'}  icon="close"  size={30} style={{ top: 20, right: 3, position: 'absolute', backgroundColor: '#D8D8D8'}} mode="contained" onPress={() => closeModal()}/>
				
			</View>

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
  )(withTheme(OrderPrintScreen));
