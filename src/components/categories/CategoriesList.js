import { Container } from 'native-base';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { withTheme } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as actions from '../../logic/actions/categories';
import * as selectors from '../../logic/reducers';
import CategoryListItem from './CategoryListItem';
import { suscribeFirebase } from '../../../config';




const width = Dimensions.get('window').width; // full width


function CategoriesList ({ theme, onRefresh, onLoad, categories, isLoading, navigation, newCategory, isCreating, isEditing, selectCategory, deleteCategory, productsByCategories }) {
    const { colors, roundness } = theme;

    useEffect(onLoad, []);
    categories = [...new Set(categories)];

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
                 (
                    <Container width={width}>
                          {
                                categories.length <= 0 && !isLoading && (
                                    <View style={{flex:0.1,alignItems:'center',paddingTop:10}}>
                                            <MaterialCommunityIcons name="information" color='black' size={50} />
                                            <Text style={{paddingTop:10,fontSize:20,fontFamily:'dosis-bold',alignSelf:'center'}}>No hay categorías registradas</Text>
                                    </View>
                                )
                            }
                            <SwipeListView
                                style={{marginTop:8}}
                                data={categories}
                                renderItem={ (category, rowMap) => (
                                    <CategoryListItem style={styles.rowFront} key={category.item.categoryId} name={`${category.item.categoryName}`} category={category.item} navigation={navigation} />
                                )}
                                refreshing={isLoading}
                                onRefresh={()=>onRefresh()}
                                keyExtractor={category => category.categoryId}
                                renderHiddenItem={
                                    (category, rowMap) => (
                                        <View style={styles.rowBack}>
                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                                onPress={() => {selectCategory(navigation, category.item);rowMap[category.item.categoryId].closeRow();}}
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
                                                onPress={() => {
                                                    rowMap[category.item.categoryId].closeRow();
                                                    Alert.alert(
                                                        '¿Eliminar categoría?',
                                                        
                                                        'Esta acción no puede ser revertida',
                                                        [
                                                            {
                                                                text: 'Cancelar',
                                                                style: 'cancel'
                                                            },
                                                            {
                                                                text: 'Eliminar',
                                                                onPress: () => {
                                                                    const cate = productsByCategories.some(
                                                                        product => product.data.length > 0 && (product.categoryId == category.item.categoryId));
                                                                    if(cate === false) {
                                                                        deleteCategory(category.item.categoryId);
                                                                    } else {
                                                                        Alert.alert(
                                                                            "Error al eliminar",
                                                                            "No se puede eliminar porque hay productos que pertecen a esta categoría",
                                                                            
                                                                            [
                                                                                {
                                                                                    text: "OK",
                                                                                    onPress: () => console.log('OK, no eliminar categoría!')
                                                                                }
                                                                            ],
                                                                        );
                                                                    }
                                                                },
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
                                disableRightSwipe={true}
                                previewOpenDelay={1000}
                            />                                  
                        <FloatingAction
                            buttonSize={50}
                            color='black'
                            overrideWithAction={true}
                            onPressItem={() => newCategory(navigation)}
                            actions={[{
                                icon: (
                                    <MaterialCommunityIcons name="plus" color='white' size={25}/>
                                  ),
                                name:'AddCategory'
                              }]}
                        />
                    </Container>
                )
            }
            <Modal
                transparent={true}
                animationType={'none'}
                visible={isCreating || isEditing}>
                <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" animating={isCreating || isEditing} color={colors.primary} />
                </View>
                </View>
            </Modal>
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
        categories: selectors.getCategories(state),
        isLoading: selectors.isFetchingCategories(state),
        isCreating: selectors.isCreatingCategory(state),
        isEditing: selectors.isEditingCategory(state),
        productsByCategories: selectors.getProductsByCategory(state),
    }),
    dispatch => ({
        onLoad() {
            if(!suscribeFirebase){
                dispatch(actions.startFetchingCategories());
            }
        },

        onRefresh() {
            if(!suscribeFirebase){
                dispatch(actions.startFetchingCategories());
            }
        },

        newCategory(navigation) {
            dispatch(actions.deselectCategory());
            navigation.navigate('EditCategoryScreen');
        },

        selectCategory(navigation, category) {
              dispatch(actions.selectCategory(category));
              navigation.navigate('EditCategoryScreen');
        },
        
        deleteCategory(categoryId) {
            dispatch(actions.startRemovingCategory(categoryId));
        }
    }),
)(withTheme(CategoriesList));
