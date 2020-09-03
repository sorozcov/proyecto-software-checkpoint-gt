
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
import * as actionsProducts from '../../logic/actions/products';
import * as selectors from '../../logic/reducers';
import MyCheckbox from '../general/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FinishOrder from './FinishOrder';
import * as actions from '../../logic/actions/orders';

function OrderInformationScreen({ theme, dirty, valid, handleSubmit,navigation,closeModal, modal, submitFunction,initialValues,isAdding,finishOrderButton=true,sendOrder,orderProducts,activeOrder,orderProductsByCategory }) {
	const { colors, roundness } = theme;
	const [quantity, setQuantity] = useState(0);

	console.log(activeOrder)
	
	const editProductForm = values => {
		// var selectedCategory = categories.filter(category => category.categoryId == values.category[0])[0];
		// values.category = selectedCategory;
		// values.categoryId = selectedCategory.categoryId;
		values={...initialValues,...values}

		// if(isNew){
		//   createProduct(navigation,values)
		// } else {
		//   editProduct(navigation,values)
		// }
		
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
				<FinishOrder navigation={navigation}/>
				<View style={{marginTop:'1%',marginBottom:'10%'}}>
					{ <Button
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
					</Button>}
					
				</View>
				<IconButton testID={'close-button'}  icon="close"  size={30} style={{top:20,right:3,position:'absolute',backgroundColor:'#D8D8D8'}} mode="contained" onPress={()=>closeModal()}  />
				
			</View>
			{finishOrderButton && 
					<Button
					disabled={false}
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
					
					onPress={() => sendOrder(navigation, orderProducts, activeOrder, total)}>
					{'PROCESAR ORDEN'}
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
});

export default connect(
	state => ({
		initialValues: selectors.getSelectedProduct(state)!=null?selectors.getProduct(state,selectors.getSelectedProduct(state).productId):{},
        orderProducts: selectors.getSelectedOrderProducts(state),
        orderProductsByCategory: selectors.getSelectedOrderProductsByCategory(state),
        activeOrder: selectors.getSelectedOrder(state),
        isAdding: selectors.isAddingOrders(state),
        addingError: selectors.getOrdersError(state),
	}),
	dispatch => ({

		sendOrder(navigation, orderProducts, activeOrder, total) {
            // dispatch(actions.startAddingOrder(orderProducts, {...activeOrder, total}));
            // dispatch(actions.deactivateOrder());
            navigation.navigate('OrdersList');
        },
	}),
  )(reduxForm({
	form: 'editProductForm',
	enableReinitialize : true,
	validate: (values) => {
	  const errors = {};
	  errors.productName = !values.productName ? 'Este campo es obligatorio' : undefined;
	  errors.description = !values.description ? 'Este campo es obligatorio' : undefined;
	  errors.category = values.category && values.category.length === 0 ? 'Este campo es obligatorio' : undefined;
	  errors.price = !values.price ? 'Este campo es obligatorio' : isNaN(parseFloat(values.price)) ? 'Ingresa un número correcto' : undefined;
	  return errors;
	}
  })(withTheme(OrderInformationScreen)));