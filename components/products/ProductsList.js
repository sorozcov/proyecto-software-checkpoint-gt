import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, Spinner,ListItem,Left,Icon,Body } from 'native-base';
import { Dimensions, Modal, View, StyleSheet,Text,    TouchableOpacity,TouchableHighlight } from "react-native";
import { ActivityIndicator, withTheme,Button } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { HeaderBackground } from '@react-navigation/stack';

import * as actions from '../../src/actions/categories';
import * as actionsProducts from '../../src/actions/products';
import * as selectors from '../../src/reducers';

import CategoryListItem from '../CategoryListItem';


const width = Dimensions.get('window').width; // full width


function ProductsList ({ theme, onRefresh,onLoad, categories, isLoading, navigation, newProduct, isCreating, /*isEditing,*/ selectProduct}) {
    const { colors, roundness } = theme;
    const [listData, setListData] = useState(
        Array(5)
            .fill('')
            .map((_, i) => ({
                title: `title${i + 1}`,
                data: [
                    ...Array(5)
                        .fill('')
                        .map((_, j) => ({
                            key: `${i}.${j}`,
                            text: `item #${j}`,
                        })),
                ],
            }))
    );
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

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>I am {data.item.text} in a SwipeListView</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const renderSectionHeader = ({ section }) => <ListItem   style={{backgroundColor:'red'}} itemDivider icon>
    <Left>
             
                <Icon active name="restaurant" />
             
    </Left>
    <Body>
    <Text style={{fontSize:15,fontFamily:'dosis-bold',paddingLeft:0}}>{section.title}</Text>
    </Body>
     </ListItem>  ;
    useEffect(()=>{onLoad();
        setListData(categories.map(item=>{
            return {title:item.categoryName,
            data:[{key:0,text:"hola"},{key:1,text:"holaK"}]}
        }))}, []);
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
                                useSectionList
                                sections={listData}
                                renderSectionHeader={renderSectionHeader}
                                renderItem={ (category, rowMap) => (
                                    <CategoryListItem style={styles.rowFront} key={category.item.key} name={`${category.item.text}`} category={category.item} navigation={navigation} />
                                )}
                                disableRightSwipe={true}
                                closeOnRowPress={true}
                                refreshing={isLoading}
                                onRefresh={()=>onRefresh()}
                                keyExtractor={category => category.key}
                                renderHiddenItem={
                                    (category, rowMap) => (
                                        <View style={styles.rowBack}>
                                            
                                            <TouchableOpacity
                                                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                                onPress={() => selectProduct(navigation, category.item)}
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
                                                onPress={() => null}
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

                                  
                        <FloatingAction
                            distanceToEdge={20}
                            buttonSize={50}
                            color='black'
                            overrideWithAction={true}
                            onPressItem={() => newProduct(navigation)}
                            actions={[{
                                icon: (
                                    <MaterialCommunityIcons name="plus" color='white' size={25}/>
                                  ),
                                name:'AddProduct'
                              }]}
                        />
                        <Button
              
                            theme={roundness}
                            color={'#000000'}
                            icon={'pencil'}
                            height={50}
                            mode="contained"
                            labelStyle={{
                                fontFamily: "dosis-bold",
                                fontSize: 15,
                            }}
                            style={{
                                fontFamily: 'dosis',
                                marginLeft: '5%',
                                marginBottom:'3%',
                                marginRight: '20%',
                                justifyContent: 'center',
                                alignItems:'center'
                            }}
                            onPress={()=>navigation.navigate("CategoriesList")}>
                            {'CATEGORÍAS'}
                        </Button>
                    </Container>
                )
            }
            
            <Modal
                transparent={true}
                animationType={'none'}
                visible={isCreating /*|| isEditing*/}>
                <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" animating={isCreating /*|| isEditing*/} color={colors.primary} />
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
        borderRadius:10,
    },
    backRightBtnRight: {
        backgroundColor: '#FF0D0D',
        borderRadius:10,
        right: 0,
    },
    
})

export default connect(
    state => ({
        categories: selectors.getCategories(state),
        productsByCategories: selectors.getProductsByCategory(state),
        isLoading: selectors.isFetchingCategories(state) || selectors.isFetchingProducts(state),
        isCreating: selectors.isCreatingCategory(state),
        // isEditing: selectors.isEditingUsers(state),
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingCategories());
        },
         onRefresh() {
            dispatch(actions.startFetchingCategories());
        },
        newProduct(navigation) {
            dispatch(actionsProducts.deselectProduct());
            navigation.navigate('EditProductScreen');
        },

        selectProduct(navigation, product) {
              dispatch(actionsProducts.selectProduct(product));
              navigation.navigate('EditProductScreen');
        },
          
    }),
)(withTheme(ProductsList));
