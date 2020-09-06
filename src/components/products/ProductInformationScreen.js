import 'firebase/firestore';
import { Text } from 'native-base';
import React,{useState,useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, View ,FlatList} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ImagePicker from '../../components/general/ImagePickerProduct';
import * as actionsProducts from '../../logic/actions/products';
import * as selectors from '../../logic/reducers';
import MyCheckbox from '../general/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function ProductInformationScreen({
    theme,
    navigation,
    dirty,
    valid,
    handleSubmit,
    initialValues,
    route,
    ingredients,
    additionals,
    changeIngredientDefault,
    changeAdditionalDefault
}) {
    const { colors, roundness } = theme;
    const{isAdmin}=route.params;
    const [quantity, setQuantity] = useState(0);
    const isNew = initialValues==null;

    if(!isNew)
        navigation.setOptions({ title: 'PRODUCTO' });
        
        useEffect(() => {
            initialValues.quantity=initialValues.quantity==undefined || initialValues.quantity==null ? 0 : initialValues.quantity;
            setQuantity(initialValues.quantity);
        },[]);
    
    
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
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        <Card
                            title={initialValues.productName}
                            titleStyle={{fontFamily:'dosis-bold',fontSize:22}}
                        >
                            <Field
                                name={'image'}
                                component={ImagePicker}
                                image={isNew ? null : initialValues.image}
                                showImageOnly={true}
                            />

                            <Text style={{paddingTop: 10,textAlign:'center',fontFamily:'dosis-light',fontSize:19}}>
                                {initialValues.description}
                            </Text>

                            <Text style={{paddingTop: 10,textAlign:'center',fontFamily:'dosis-semi-bold',fontSize:24}}>
                                {`Q${parseFloat(initialValues.price).toFixed(2)}`}
                            </Text>

                            <Field
                                name={'status'}
                                component={MyCheckbox}
                                label='ACTIVO'
                                containerStyle={{backgroundColor:null,width:'50%',alignSelf:'center'}}
                                center={true}
                                checked={!isNew?initialValues.status:true}
                            />

                            <Divider style={{ backgroundColor:'red',marginTop:10,marginBottom:10}}/>
                                <Text style={{paddingLeft: 10,fontFamily:'dosis-light',fontSize:19}}>
                                    {'Ingredientes'}  
                                </Text>

                                <FlatList
                                    data={ingredients.map((ingredient, i) => ({...ingredient, id: i}))}
                                    renderItem={({item}) => (
                                        <Field
                                            name={item.name}
                                            component={MyCheckbox}
                                            label={item.name}
                                            functionCheckbox={()=>changeIngredientDefault(item.id)}
                                            containerStyle={{backgroundColor:null,width:'80%',alignSelf:'center'}}
                                            center={true}
                                            checked={item.default}
                                        />
                                    )}
                                />
                            <Divider style={{backgroundColor:'red',marginTop:20,marginBottom:20}}/>

                            <Text style={{ paddingLeft: 10, fontFamily: 'dosis-light', fontSize: 18, marginBottom: 20}}>
                                {'Adicionales'}  
                            </Text>
                            
                            <FlatList
                                data={additionals.map((ingredient, i) => ({ ...ingredient, id: i }))}
                                renderItem={({item}) => (
                                    <>
                                        <Field
                                            name={item.name}
                                            component={MyCheckbox}
                                            label={`${item.name} (Q${item.cost})`}
                                            functionCheckbox={()=>changeAdditionalDefault(item.id)}
                                            containerStyle={{backgroundColor: null, width: '80%', alignSelf: 'center', justifyContent: 'center'}}
                                            center={true}
                                            checked={item.default}
                                        />
                                    </>
                                )
                                }
                            />
                        </Card>

                        <View style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'center',marginTop:15}}>
                            {
                            (isAdmin !== true) && (
                            <>            
                                <Button
                                    style={[styles.btn, styles.btnLeft]}
                                    onPress={() => {quantity>0 ? setQuantity(quantity-1) : setQuantity(0)}}
                                >
                                    <MaterialCommunityIcons
                                        name="minus"
                                        color={'black'}
                                        size={22}
                                    />	
                                </Button>
                                <View style={styles.infoTxt}>
                                    <Text style={{fontFamily:'dosis-light',fontSize:20}}>{quantity}</Text>
                                </View>
                                <Button
                                    style={[styles.btn, styles.btnRight]}
                                    onPress={() => {setQuantity(quantity+1)}}
                                >
                                    <MaterialCommunityIcons
                                        name="plus"
                                        color={'black'}
                                        size={22}
                                    />
                                    
                                </Button>
                            </>
                            )
                            }
                        </View>

                        <View style={{marginTop:'4%',marginBottom:'10%'}}>
                            {
                            isAdmin && false && (
                                <Button
                                    disabled={!isAdmin && (quantity==0 || quantity==undefined)}
                                    theme={roundness}
                                    color={'#000000'}
                                    icon={!isAdmin ? "plus" : "pencil"}
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
                                    
                                    onPress={handleSubmit(editProductForm)}
                                >
                                {isAdmin ? 'EDITAR PRODUCTO' : `AGREGAR ${quantity} POR Q${parseFloat(quantity*initialValues.price).toFixed(2)}`}
                                </Button>
                            )
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
        initialValues: selectors.getProduct(state,selectors.getSelectedProduct(state).productId),
        ingredients: selectors.getSelectedProductIngredients(state),
            additionals: selectors.getSelectedProductAdditionals(state),
        categories: selectors.getCategories(state),
    }),
    dispatch => ({
        createProduct(navigation, product) {
            dispatch(actionsProducts.startAddingProduct(product));
            navigation.navigate('Menu');
        },
        editProduct(navigation, product) {
            dispatch(actionsProducts.startEditingProduct(product));
            navigation.navigate('Menu');
        },
        addProduct(productId) {
        dispatch(actionsProducts.addProductToOrder(productId));
        },
        deleteProduct(productId) {
            dispatch(actionsProducts.deleteProductToOrder(productId));
        },
        changeIngredientDefault(ingredientId) {
            dispatch(actionsProducts.startEditingIngredient({ingredientId}))
        },
        changeAdditionalDefault(additionalId) {
            dispatch(actionsProducts.startEditingIngredient({additionalId}))
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
})(withTheme(ProductInformationScreen)));