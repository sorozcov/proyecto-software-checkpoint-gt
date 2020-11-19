import 'firebase/firestore';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, StyleSheet, View, Platform, Dimensions, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
// import RNFetchBlob from 'react-native-fetch-blob';

import XLSX from 'xlsx';

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

    const chartConfig={
        backgroundGradientFrom: Platform.OS === 'ios' ? "#F8FAFB" : "#FFFFFF",
        backgroundGradientTo: Platform.OS === 'ios' ? "#F8FAFB" : "#FFFFFF",

        barRadius:1,
        // barPercentage:1,
        // color: (opacity = 1) => `rgba(0, 170, 204, ${opacity})`,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        fillShadowGradient:colors.accent,
        fillShadowGradientOpacity:1,
      }
    
    const [isInit, setIsInit] = useState(false);
    const [initDate, setInitDate] = useState(new Date()); // Today
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))); // Tomorrow
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
        let salesData = transformData(data);

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
                    <View style={styles.formContainer}>
                        {reportData ? (
                            <View ref={graphReference}>
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
                            </View>
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