import { connect } from 'react-redux';
import { Container } from 'native-base';
import React, { useEffect } from 'react';
import { withTheme } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Alert, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BranchItem from './BranchItem';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/branches';
import * as actionsUsers from '../../logic/actions/users';

const width = Dimensions.get('window').width; // full width

function BranchesList ({
    theme,
    onLoad,
    onRefresh,
    branches,
    isLoading,
    navigation,
    newBranch,
    isAdding,
    isEditing,
    selectBranch,
    viewBranch,
    deleteBranch,
    branchHasUsers,
    cannotDeleteBranch }) {
  
    const { colors, roundness } = theme;
    useEffect(onLoad, []);

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>  
            {
               (
                    <Container width={width}>
                        {
                            branches.length <= 0 && !isLoading && (
                                <View style={{flex:0.1,alignItems:'center',paddingTop:10}}>
                                        <MaterialCommunityIcons name="information" color='black' size={50} />
                                        <Text style={{paddingTop:10,fontSize:20,fontFamily:'dosis-bold',alignSelf:'center'}}>No hay sucursales registradas</Text>
                                </View>
                            )
                        }
                      
                        <SwipeListView
                            style={{marginTop:8}}
                            data={branches}
                            renderItem={ (branch, rowMap) => (
                                <BranchItem onPress={() => viewBranch(navigation, branch.item)} style={styles.rowFront} key={branch.item.id} name={`${branch.item.name}`} description={branch.item.location} image={branch.item.image} branch={branch.item} navigation={navigation} />
                            )}
                            refreshing={isLoading}
                            onRefresh={()=>onRefresh()}
                            disableRightSwipe={true}
                            closeOnRowPress={true}
                            keyExtractor={(branch, index) => (branch.id)}
                            renderHiddenItem={
                                (branch, rowMap) => (
                                    <View style={styles.rowBack}>
                                        
                                        <TouchableOpacity
                                            style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                            onPress={() => {selectBranch(navigation, branch.item);rowMap[branch.item.id].closeRow();}}
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
                                                rowMap[branch.item.id].closeRow();
                                                Alert.alert(
                                                    '¿Eliminar sucursal?',
                                                    'Esta acción no puede ser revertida',
                                                    [
                                                        {
                                                            text: 'Cancelar', 
                                                            style: 'cancel'
                                                        },
                                                        {
                                                            text: 'Eliminar',
                                                            onPress: () => branchHasUsers(branch.item.id) ? cannotDeleteBranch():deleteBranch(branch.item.id),
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
            <FloatingAction
                buttonSize={50}
                color='black'
                overrideWithAction={true}
                onPressItem={() => newBranch(navigation)}
                actions={[{
                    icon: (
                        <MaterialCommunityIcons name="plus" color='white' size={26}/>
                      ),
                    name:'addBranch'
                  }]}
            />
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
        branches: selectors.getBranches(state),
        isLoading: selectors.isFetchingBranches(state),
        isAdding: selectors.isAddingBranches(state),
        isEditing: selectors.isEditingBranches(state),
        branchHasUsers: (branchId)=>selectors.branchHasUsers(branchId,state)
    }),
    dispatch => ({
        onLoad() {
            dispatch(actions.startFetchingBranch());
            dispatch(actionsUsers.startFetchingUsers());
        },
        onRefresh() {
            dispatch(actions.startFetchingBranch());
        },
        newBranch(navigation) {
            dispatch(actions.deselectBranch());
            navigation.navigate('EditBranchScreen');
        },     
        selectBranch(navigation, branch) {
              dispatch(actions.selectBranch(branch));
              navigation.navigate('EditBranchScreen');
        },
        viewBranch(navigation, branch) {
            navigation.navigate('UserList');
            dispatch(actions.viewBranch(branch));
        },
        deleteBranch(id){
            dispatch(actions.startRemovingBranch(id));
        },
        cannotDeleteBranch(){
            Alert.alert(
                'Error al eliminar sucursal.',
                'Esta sucursal tiene usuarios. Para eliminarla, debe eliminar primero todos los usuarios dentro de la sucursal.',
                [
                    {
                        text: 'Ok', 
                        style: 'cancel'
                    },
                    
                ],
                {
                    cancelable: true,
                },
            )
        }
    }),
)(withTheme(BranchesList));