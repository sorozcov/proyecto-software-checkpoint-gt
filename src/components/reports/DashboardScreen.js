import 'firebase/firestore';
import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, StyleSheet, View, Platform, Dimensions, Modal, Text,   RefreshControl, } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { BarChart,LineChart,PieChart } from 'react-native-chart-kit';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {Card} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme,DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/dashboardSales';
import { VictoryTheme,VictoryPie } from "victory-native";
import moment from "moment";





function ReportScreen({
    theme,
    navigation,
    dashboardData,
    generateDashboard,
    dashboardDataWaiters,
    dashboardDataBranches,
    navigateReport,
    isLoading,
    onRefresh
}) {
    useEffect(generateDashboard, []);
    const { colors, roundness } = theme;
    
    const screenWidth = Dimensions.get("window").width;

  	return (
    	<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}         
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
                    <View style={styles.formContainer}>
                        {dashboardData ? (

                            <View>
                            <Card>
                                    <Text  style={{...styles.saleTitle,color:colors.accent}}>{moment(new Date()).format('LL')}</Text>
                            </Card>
                            <Card
                                    title={"Total Ventas"}
                                    
                                    titleStyle={{fontFamily:'dosis-bold',fontSize:22}}
                                    containerStyle={{marginTop:10}}>
                                    <Text  style={{...styles.saleTitle,color:colors.accent}}>GTQ {parseFloat(dashboardData.total).toFixed(2)}</Text>
                            </Card>
                            <Card 
                                title={"Ventas Por Sucursal"}
                                titleStyle={{fontFamily:'dosis-bold',fontSize:18}}
                                containerStyle={{marginTop:10}}>
                                    <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Sucursal</DataTable.Title>
                                        <DataTable.Title numeric>Total</DataTable.Title>
                                    </DataTable.Header>
                                    {dashboardDataBranches.map(branch=>(
                                        <DataTable.Row>
                                            <DataTable.Cell>{branch.name}</DataTable.Cell>
                                            <DataTable.Cell numeric>GTQ {branch.total}</DataTable.Cell>
                                        </DataTable.Row>
    
                                    ))}
                                    
                                </DataTable>
                            </Card>
                            <Card 
                                title={"Ventas Por Sucursal Gráfica"}
                                titleStyle={{fontFamily:'dosis-bold',fontSize:18}}
                                containerStyle={{marginTop:10}}>
                                    {dashboardData.total!=0 ?<PieChart
                                    data={dashboardDataBranches.map(branch=>({name:branch.name,
                                    total: branch.total,
                                    color: "rgb(0, 0, 255)",
                                    legendFontColor: "#7F7F7F",
                                    legendFontSize: 10}))}
                                    width={screenWidth*0.8}
                                    height={220}
                                    chartConfig={chartConfig}
                                    accessor="total"
                                    backgroundColor="transparent"
                                    paddingLeft={screenWidth*0.05}
                                    hasLegend={true}
                                    />:
                                    <Text  style={{...styles.saleTitle,color:colors.accent}}>Sin ventas por el momento.</Text>
                                    }
                                    
                            </Card>
                            <Card 
                                title={"Ventas Por Mesero Gráfica"}
                                titleStyle={{fontFamily:'dosis-bold',fontSize:18}}
                                containerStyle={{marginTop:10}}>
                                    {dashboardData.total!=0 ?null:
                                    <Text  style={{...styles.saleTitle,color:colors.accent}}>Sin ventas por el momento.</Text>
                                    }
                                    
                            </Card>


                            {/* <Card 
                                title={"Ventas Por Mesero"}
                                titleStyle={{fontFamily:'dosis-bold',fontSize:18}}
                                containerStyle={{marginTop:10}}>
                                    <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Mesero</DataTable.Title>
                                        <DataTable.Title numeric>Total</DataTable.Title>
                                    </DataTable.Header>
                                    {dashboardDataWaiters.map(waiter=>(
                                        <DataTable.Row>
                                            <DataTable.Cell>{waiter.name}</DataTable.Cell>
                                            <DataTable.Cell numeric>GTQ {waiter.total}</DataTable.Cell>
                                        </DataTable.Row>
    
                                    ))}
                                    
                                </DataTable>
                            </Card> */}
                           
                            

                           
                            </View>
                        ): (
                            <Text width={Dimensions.get("window").width} style={styles.warning}>{"No hay información disponible por el momento."}</Text>
                        )}
                        
                        

                        
                    </View>
                </ScrollView>
            </View>
            <FloatingAction
                buttonSize={50}
                color='black'
                // floatingIcon={<MaterialCommunityIcons name="file-chart" color='white' size={20} style={{ marginRight: 4, }}/>}
                onPressItem={(name) => navigateReport(navigation,name)}
                actions={[{
                    icon: (
                        <MaterialCommunityIcons name="file-chart" color='white' size={25}/>
                    ),
                    name:'ReportsByDay',
                    text:'Reporte de Ventas Por Fechas',
                    position:1,
                    textStyle:{fontFamily:'dosis-light'},
                    buttonSize:45,
                    color:'#00A8C8'
                    
                }]}
            />
    	</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		fontFamily: 'dosis-regular',
	},
	contentContainer: {
		paddingTop: 30,
	},
	titleStyle: {
		textAlign: 'center',
		fontFamily: 'dosis-regular',
		fontSize: 30,
		paddingBottom: '6%',
		paddingTop: '8%',
	},
	saleTitle: {
		textAlign: 'center',
		fontFamily: 'dosis-semi-bold',
        fontSize: 25,
		paddingBottom: '2%',
		paddingTop: '2%',
	},
	textStyle:{
		textAlign: 'center', 
		fontFamily: 'dosis-semi-bold',
		fontSize: 16,
		paddingTop: 20,
		paddingBottom: 20,
    },
	modalB:{
		flex:1,
		flexDirection: 'row',
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
    graphStyle: {

    },
    dateBtn: {
        flex: 1,
        height: 70,
        fontFamily: 'dosis',
        marginLeft: '3%',
        marginRight: '3%',
        justifyContent: 'center'
    },
    datesStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    datePicker: {
        height:200
    },
	});

export default connect(
	state => ({
        dashboardData: selectors.getDashboardSalesReport(state),
        dashboardDataWaiters:selectors.getDashboardSalesReportByWaiter(state),
        dashboardDataBranches:selectors.getDashboardSalesReportByBranch(state),
        isLoading:selectors.getDashboardSalessIsFetching(state),
	}),
	dispatch => ({
        generateDashboard() {
            dispatch(actions.startFetchingDashboardSalesReport());
        },
        onRefresh() {
            dispatch(actions.startFetchingDashboardSalesReport());
        },
        navigateReport(navigation,screen) {
            navigation.navigate(screen);
        },
	}),
)(withTheme(ReportScreen));