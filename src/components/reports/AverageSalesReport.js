import 'firebase/firestore';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    View, 
    Platform, 
    Dimensions, 
    Modal, 
    Text, 
    TouchableWithoutFeedback 
} from 'react-native';

import map from 'lodash/map';

import XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import { Button, withTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

import OptionPicker from '../general/OptionPicker';

import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';


function AverageSalesReport({
    theme,
    navigation,
    reportData,
    generateReport,
}) {
    const { colors, roundness } = theme;
    const groupOptions = [
        {
			id: 'WEEKDAY',
			title: 'Día',
			selected: true,
		},
		{
			id: 'MONTH',
			title: 'Mes',
			selected: false,
		},
    ]

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(199, 43, 14, ${opacity})`,
    };
    
    const [isInit, setIsInit] = useState(false);
    const [initDate, setInitDate] = useState(new Date(new Date().setDate(new Date().getDate()-1)));
    const [endDate, setEndDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [groupBy, setGroupBy] = useState(
		{
			id: 'WEEKDAY',
			title: 'Día',
			selected: true,
		}
	);


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

    const filterChange = elem => {        
        if(reportData) {
            generateReport(initDate, endDate, elem.id)
        }
    }

    const exportCSV = async(data) => {
        data = data.saleById;

        var ws = await XLSX.utils.json_to_sheet(data);
        var wb = await XLSX.utils.book_new();

        await XLSX.utils.book_append_sheet(wb, ws, 'Report');

        const wbout = await XLSX.write(wb, {
            type: 'base64',
            bookType: 'xlsx',
        });

        const uri = FileSystem.cacheDirectory + 'report.xlsx';


        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(uri, {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            dialogTitle: 'REPORT DATA',
            UTI: 'com.microsoft.excel.xlsx',
        });
    };
    
  	return (
    	<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View>
                        {reportData ? (
                            <View style={styles.formContainer}>
                                <LineChart
                                    data={{
                                        labels: reportData.identifiers,
                                        datasets: [
                                            {
                                                data: map(reportData.sales, sale => sale.total),//(sale.total / (sale.count === 0 ? 1 : sale.count).toFixed(2)))
                                                strokeWidth: 3
                                            }
                                        ]
                                    }}
                                    width={Dimensions.get("window").width - 24}
                                    height={Dimensions.get("window").height * 0.55}
                                    yAxisLabel="Q."
                                    chartConfig={chartConfig}
                                    verticalLabelRotation={60}
                                    xLabelsOffset={-4}
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
                        <View style={styles.pickerStyle}>
                            <OptionPicker 
                                theme={theme} 
                                data={groupOptions} 
                                onPress={elem => {
                                    setGroupBy(elem)
                                    filterChange(elem)
                                }}/>
                        </View>

                        <View style={{marginTop: '4%', marginBottom: '2%'}}>
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
                                onPress={() => generateReport(initDate, endDate, groupBy.id)}
                            >
                            {'GENERAR REPORTE'}
                            </Button>
                        </View>

                        { 
                            reportData && (
                                <View style={{marginBottom: '2%'}}>
                                    <Button
                                        theme={roundness}
                                        color={'#000000'}
                                        icon={"file-export"}
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
                                        onPress={ ()=> exportCSV(reportData) }
                                    >
                                    {'EXPORTAR DATOS'}
                                    </Button>
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
	formContainer: {
        alignItems: 'center'
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
        justifyContent:'center',
    },
    pickerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 16,
    },
    datePicker: {
        height:200
    },
});

export default connect(
	state => ({
        reportData: selectors.getReport(state, 'AVERAGE'),
	}),
	dispatch => ({
        generateReport(initDate, endDate, groupBy) {
            dispatch(actions.startFetchingAverageReport(initDate, endDate, groupBy));
        },
	}),
)(withTheme(AverageSalesReport));