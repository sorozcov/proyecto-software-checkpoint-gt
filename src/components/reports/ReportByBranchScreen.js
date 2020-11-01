import 'firebase/firestore';
import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, StyleSheet, View, Platform, Dimensions, Modal, Text,   RefreshControl, } from 'react-native';
import {Card} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme,DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';
import { VictoryPie } from "victory-native";
import moment from "moment";


function ReportScreen({
    theme,
    navigation,
    reportDataByBranch,
    generateReport,
    isLoading,
}) {


    const { colors, roundness } = theme;
    
    const screenWidth = Dimensions.get("window").width;

    const [isInit, setIsInit] = useState(false);
    const [initDate, setInitDate] = useState(new Date(new Date().setDate(new Date().getDate()-1))); // Yesterday
    const [endDate, setEndDate] = useState(new Date()); // Today
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => generateReport(initDate, endDate), []);

    const onInitDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setModalVisible(Platform.OS === 'ios');
        setInitDate(currentDate);
    };
    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setModalVisible(Platform.OS === 'ios');
        setEndDate(currentDate);
    };
    console.log(reportDataByBranch)
  	return (
    	<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formContainer}>
                    {Platform.OS === 'ios' ?
                        <Modal
                            style={styles.modalView}
                            animationType="fade"
                            transparent={true}
                            avoidKeyboard={true}
                            presentationStyle={'pageSheet'}
                            coverScreen={true}
                            onBackButtonPress={()=> setModalVisible(false)}
                            onRequestClose={()=>setModalVisible(false)}
                            onDismiss={() => setModalVisible(false)}
                            deviceWidth={Dimensions.get("window").width}
                            deviceHeight={Dimensions.get("window").height}
                            visible={modalVisible}
                        >
                            <TouchableWithoutFeedback onPressOut={(e) => {
                                if (e.nativeEvent.locationY < 0) {
                                setModalVisible(false)
                                }}}
                            >
                            
                            <View style={styles.modalBackground}>
                                <View style={styles.modal}>
                                    <Text style={styles.titleStyle}> Selección de fecha </Text>
                                    {isInit ? (
                                        <DateTimePicker
                                            maximumDate={endDate}
                                            style={styles.datePicker}
                                            testID="dateTimePicker"
                                            value={initDate}
                                            mode={'date'}
                                            display="default"
                                            onChange={onInitDateChange}
                                        />
                                        ) : (
                                        <DateTimePicker
                                            minimumDate={initDate}
                                            maximumDate={new Date()}
                                            style={styles.datePicker}
                                            testID="dateTimePicker"
                                            value={endDate}
                                            mode={'date'}
                                            display="default"
                                            onChange={onEndDateChange}
                                        />
                                    )}
                                </View>
                            </View>                
                            </TouchableWithoutFeedback>
                        </Modal>
                        :modalVisible && (isInit ? (
                            <DateTimePicker
                                style={styles.datePicker}
                                testID="dateTimePicker"
                                value={initDate}
                                mode={'date'}
                                display="default"
                                onChange={onInitDateChange}
                            />
                            ) : (
                            <DateTimePicker
                                style={styles.datePicker}
                                testID="dateTimePicker"
                                value={endDate}
                                mode={'date'}
                                display="default"
                                onChange={onEndDateChange}
                            />
                        ))               
                        }
                        <View style={styles.datesStyle}>
                            <Button
                                theme={roundness}
                                color={'white'}
                                icon={"clock"}
                                mode="contained"
                                compact={true}
                                labelStyle={{
                                    fontFamily: "dosis-light",
                                    fontSize: 15,
                                }}
                                style={styles.dateBtn}
                                onPress={() => {
                                    setIsInit(true);
                                    setModalVisible(true);
                                }}
                            >
                                {`${initDate.toLocaleDateString('es-MX')}`}
                            </Button>

                            <Text fontFamily={'dosis-bold'}>a</Text>

                            <Button
                                theme={roundness}
                                color={'white'}
                                icon={"clock"}
                                mode="contained"
                                compact={true}
                                labelStyle={{
                                    fontFamily: "dosis-light",
                                    fontSize: 15,
                                }}
                                style={styles.dateBtn}
                                onPress={() => {
                                    setIsInit(false);
                                    setModalVisible(true);
                                }}
                            >
                                {`${endDate.toLocaleDateString('es-MX')}`}
                            </Button>

                        </View>

                        <View style={{marginTop:'4%',marginBottom:'10%'}}>
                            <Button
                                disabled={!(initDate < endDate)}
                                theme={roundness}
                                color={'#000000'}
                                icon={"chart-bar"}
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
                                onPress={()=>generateReport(initDate, endDate)}
                            >
                            {'GENERAR REPORTE'}
                            </Button>
                        </View>

                        {reportDataByBranch && reportDataByBranch.days ? (

                            <View>
                            <Card 
                                title={"Ventas Por Sucursal"}
                                titleStyle={{fontFamily:'dosis-bold',fontSize:18}}
                                containerStyle={{marginTop:10}}>
                                    <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{flex: 3}}>Día</DataTable.Title>
                                        <DataTable.Title style={{flex: 4}}>Sucursal</DataTable.Title>
                                        <DataTable.Title numeric style={{flex: 2}}>Total</DataTable.Title>
                                    </DataTable.Header>
                                    {reportDataByBranch.days.map(day=>(
                                        Object.values(day.byBranch).filter(branch => typeof branch === 'object').map(branch=>(
                                        <DataTable.Row>
                                            <DataTable.Cell style={{flex: 3}}>{day.id}</DataTable.Cell>
                                            <DataTable.Cell style={{flex: 4}}>{branch.name}</DataTable.Cell>
                                            <DataTable.Cell numeric style={{flex: 2}}>GTQ {branch.total}</DataTable.Cell>
                                        </DataTable.Row>

                                        ))
                                    ))}
                                    
                                </DataTable>
                                {reportDataByBranch.branches.total > 0 ?
                                    <View>
                    
                                    <VictoryPie
                                    data={Object.values(reportDataByBranch.branches).filter(branch=>branch.total>0)}
                                    // theme={VictoryTheme.material}
                                    // colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                                    
                                    style={{
                                        data: {
                                            fillOpacity: 0.9, stroke: colors.accent, strokeWidth: 2,
                                        },
                                        labels: {
                                            fontSize: 12, fill: colors.accent,padding:5
                                        },
                                        margin:0,
                                        
                                        }}
                                    x = "name"
                                    innerRadius={0}
                                    // labelRadius={}
                                    // labelComponent={<VictoryLabel angle={45}/>}
                                    labels={({ datum }) => `${datum.name}`}
                                    y = "total"
                                    padding={{ top: 0, bottom: 0,left:screenWidth*0.2 ,right:screenWidth*0.2 }}
                                    origin={{x:screenWidth*0.42}}
                                    width={screenWidth*0.8}
                                    height={250}
                                    
                                    />
                                    </View>
                                    
                                    :
                                    null
                                    }
                            </Card>  
                            </View>
                        ): (
                            <Text  style={{...styles.saleTitle,color:colors.accent}}>Sin ventas por el momento.</Text>
                        )}
                        
                        

                        
                    </View>
                </ScrollView>
            </View>
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
        reportDataByBranch: selectors.getReport(state, 'BY-BRANCH'),
        isLoading:selectors.getDashboardSalessIsFetching(state),
	}),
	dispatch => ({
        generateReport(initDate, endDate) {
            dispatch(actions.startFetchingReportByBranch(initDate, endDate));
        },
	}),
)(withTheme(ReportScreen));