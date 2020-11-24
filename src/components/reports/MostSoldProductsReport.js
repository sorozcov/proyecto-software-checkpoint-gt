import 'firebase/firestore';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { 
    View,
    Text,
    Modal,
    Platform,
    Dimensions,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableWithoutFeedback 
} from 'react-native';

import XLSX from 'xlsx';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';


import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme, DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import { BarChart, LineChart, PieChart, StackedBarChart } from 'react-native-chart-kit';

import OptionPicker from '../../components/general/OptionPicker';

import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';


function MostSoldProductsReport({
    theme,
    navigation,
    reportData,
    generateReport,
    isFetching
}) {
    const { colors, roundness } = theme;

    const chartConfig={
        backgroundGradientFrom: Platform.OS === 'ios' ? "#F8FAFB" : "#FFFFFF",
        backgroundGradientTo: Platform.OS === 'ios' ? "#F8FAFB" : "#FFFFFF",
        barRadius: 1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        fillShadowGradient:colors.accent,
        fillShadowGradientOpacity:1,
      }
    
    const [isInit, setIsInit] = useState(false);
    const [initDate, setInitDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [modalVisible, setModalVisible] = useState(false);

    const onInitDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setModalVisible(Platform.OS === 'ios');
        setInitDate(currentDate);
    };

    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setModalVisible(Platform.OS === 'ios');
        setEndDate(currentDate);
        if(selectedDate <= initDate) {
            setInitDate(new Date(new Date(selectedDate).setDate(selectedDate.getDate() - 1)))
        }
    };

    const graphReference = useRef();

    const createPDF = async() => {
        let snapshot = await captureRef(graphReference, {
            format: 'jpg',
            quality: 1,
            result: 'data-uri'
        });

        //TODO: Mejorar estilo de reporte.
        let html = `
        <center>
            <h1>REPORTE</h1>
            <h6>${new Date().toISOString().split('T')[0]}</h6>
        </center>
        
        <h2>Gráfica</h2>
        <img src="${snapshot}" width="100%" style="border:2px solid black;" />
        `;

        try {
            const { uri } = await Print.printToFileAsync({
                html,
                width: 250,
                height:300,
                base64: true,
            });

            await Sharing.shareAsync(uri);

        } catch (error) {
            console.error(error);
        };
    };

    const exportCSV = async(data) => {
        let salesData = reportData.byId.sort(function(o1, o2){
                return o2.quantity > o1.quantity;
            }).map(i => ({
                Nombre: i.name,
                Total: i.quantity,
            }));

        var ws = XLSX.utils.json_to_sheet(salesData);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Ventas");
        const wbout = XLSX.write(wb, {
          type: 'base64',
          bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + `reporte-${new Date().toISOString().split('T')[0]}.xlsx`;
        await FileSystem.writeAsStringAsync(uri, wbout, {
          encoding: FileSystem.EncodingType.Base64
        });
        
        await Sharing.shareAsync(uri, {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'MyWater data',
          UTI: 'com.microsoft.excel.xlsx'
        });
    };

  	return (
    	<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formContainer} ref={graphReference} collapsable={false}>
                        {reportData ? (
                            <BarChart
                                style={styles.graphStyle}
                                data={{
                                    labels: reportData.byId.sort(function(o1, o2){
                                        return o2.quantity > o1.quantity;
                                      }).map(i => i.name),
                                    datasets: [
                                        {
                                            data: reportData.byId.sort(function(o1,o2){
                                                return o2.quantity>o1.quantity;
                                            }).map(i => i.quantity)
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width}
                                height={Dimensions.get("window").height * 0.55}
                                chartConfig={chartConfig}
                                verticalLabelRotation={30}
                                fromZero = { true }
                                showValuesOnTopOfBars = { true }
                            />
                        ): (
                            <Text width={Dimensions.get("window").width} style={styles.warning}>{"¡Aún no hay reportes! \n Genera uno"}</Text>
                        )}
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
                            <TouchableWithoutFeedback 
                                onPressOut={(e) => {
                                    if (e.nativeEvent.locationY < 0) {
                                        setModalVisible(false)
                                    }
                                }}
                            >
                            <View style={styles.modalBackground}>
                                <View style={styles.modal}>
                                    <Text style={styles.titleStyle}> Selección de fecha </Text>
                                    {isInit ? (
                                        <DateTimePicker
                                            maximumDate={new Date(new Date(endDate).setDate(endDate.getDate() - 1))}
                                            style={styles.datePicker}
                                            testID="dateTimePicker"
                                            value={initDate}
                                            mode={'date'}
                                            display="default"
                                            locale={'es'}
                                            onChange={onInitDateChange}
                                        />
                                        ) : (
                                        <DateTimePicker
                                            maximumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                            style={styles.datePicker}
                                            testID="dateTimePicker"
                                            value={endDate}
                                            mode={'date'}
                                            display="default"
                                            locale={'es'}
                                            onChange={onEndDateChange}
                                        />
                                    )}
                                </View>
                            </View>                
                            </TouchableWithoutFeedback>
                        </Modal>
                        : modalVisible && (isInit ? (
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

                        <View style={{marginTop:'5%',marginBottom:'5%'}}>
                            <Button
                                disabled={!(initDate < endDate) || isFetching}
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
                                onPress={() => generateReport(initDate, endDate)}
                            >
                            {'GENERAR REPORTE'}
                            </Button>
                        </View>
                        { 
                            reportData && (
                                <View>
                                    <Text style={styles.subtitle}>Exportar a:</Text>
                                    
                                    <View style={styles.buttonsGrid}>
                                        <Button
                                            theme={roundness}
                                            color={'#000000'}
                                            icon={"file-chart"}
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
                                                width: '40%',
                                            }}
                                            onPress={createPDF}
                                        >
                                        {'PDF'}
                                        </Button>

                                        <Button
                                            theme={roundness}
                                            color={'#000000'}
                                            icon={"file-chart"}
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
                                                width: '40%',
                                            }}
                                            onPress={ ()=> exportCSV(reportData) }
                                        >
                                        {'CSV'}
                                        </Button>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </ScrollView>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={isFetching}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size="large" animating={isFetching} color={colors.primary} />
                        </View>
                    </View>
                </Modal>
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
	warning: {
		textAlign: 'center',
		fontFamily: 'dosis-regular',
        fontSize: 30,
        color:'#DA482D',
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
	modalB:{
		flex:1,
		flexDirection: 'row',
		margin: 0
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
    subtitle: {
		textAlign: 'center',
		fontFamily: 'dosis-regular',
        fontSize: 16,
        marginBottom: 8
    },
    buttonsGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 16
    },
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
    buttonsGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },   
});

export default connect(
	state => ({
        reportData: selectors.getReport(state, 'MOST-SOLD-PRODUCTS'),
        isFetching: selectors.getReportIsFetching(state)
	}),
	dispatch => ({
        generateReport(initDate, endDate) {
            dispatch(actions.startFetchingMostSoldProducts(initDate, endDate));
        },
	}),
)(withTheme(MostSoldProductsReport));