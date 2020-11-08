import 'firebase/firestore';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, StyleSheet, View, Platform, Dimensions, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import RNFetchBlob from 'react-native-fetch-blob';
import { captureRef } from 'react-native-view-shot'

import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as actions from '../../logic/actions/reports';
import * as selectors from '../../logic/reducers';




function ReportScreen({
    theme,
    navigation,
    reportData,
    generateReport,
}) {
    const { colors, roundness } = theme;


    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: Platform.OS === 'ios' ? "#08130D" : "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(199, 43, 14, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    
    const [isInit, setIsInit] = useState(false);
    const [initDate, setInitDate] = useState(new Date(new Date().setDate(new Date().getDate()-1))); // Yesterday
    const [endDate, setEndDate] = useState(new Date()); // Today
    const [modalVisible, setModalVisible] = useState(false);

    const graphReference = useRef();


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

    const toggleShow = (show) => {
        setShow(!show);
    };

    const createPDF = async() => {
        let snapshot = await captureRef(graphReference, {
            format: 'jpg',
            quality: 1,
        });

        console.log(snapshot)
        let html = 
		`
            <img src="${snapshot}" width="100%" style="border:2px solid black; height:${300}px; width:${300}px;" />
        `;
        html += '<p>Hello world</p>'

        try {
            const { uri } = await Print.printToFileAsync({ 
                html,
                width: 250,
                height:300,
                base64: true,
            });

            if (Platform.OS === "ios"){
                await Sharing.shareAsync(uri);
            } else {	
                console.log("Falta opción para Android")
            };

        } catch (error) {
            console.error(error);
        };
    };

    const exportCSV = async(data) => {
        let salesData = transformData(data);
    
        const headerString = 'total,díaSemana,Mes,Año,Fecha\n';
        const rowString = salesData.map( row => `${row.total},${row.día},${row.mes},${row.ano},${row.fecha}\n`).join('');
        const csvString = `${headerString}${rowString}`;

        const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
        console.log('pathToWrite ', pathToWrite);

        RNFetchBlob.fs
        .writeFile(pathToWrite, csvString, 'utf8')
        .then(() => console.log('done writing csv file yeaaaah'))
        .catch( error => console.log(error));
        console.log(csvString)
    };

    const transformData = data => {
        let transformData = [];
        let sales = data.saleById;

        for(var key in sales){
            let salesInfo = {};

            let date = sales[key].id;
            let day = sales[key].dayOfWeek;
            let month = sales[key].month;
            let total = sales[key].total;
            let year = sales[key].year;

            salesInfo['total'] = total;
            salesInfo['día'] = day;
            salesInfo['mes'] = month;
            salesInfo['ano'] = year;
            salesInfo['fecha'] = date;

            transformData.push(salesInfo);
        };

        return transformData;
    };

  	return (
    	<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formContainer} ref={graphReference}>
                        {reportData ? (
                            <LineChart
                                style={styles.graphStyle}
                                data={{
                                    labels: reportData.sale,
                                    datasets: [
                                        {
                                        data: reportData.sale.map(i => reportData.saleById[i]['total'])
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width}
                                height={Dimensions.get("window").height * 0.55}
                                yAxisLabel="Q."
                                chartConfig={chartConfig}
                                verticalLabelRotation={45}
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
                                            locale={'es'}
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
                                            locale={'es'}
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

                        <View style={{marginTop:'5%',marginBottom:'5%'}}>
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
    subtitle: {
		textAlign: 'center',
		fontFamily: 'dosis-regular',
        fontSize: 16,
		padding: '5%',
    },
    buttonsGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },   
});

export default connect(
	state => ({
        reportData: selectors.getReport(state, 'BY-DATE'),
	}),
	dispatch => ({
        // Updata data by dates.
        generateReport(initDate, endDate) {
            dispatch(actions.startFetchingDateReport(initDate, endDate));
        },
	}),
)(withTheme(ReportScreen));