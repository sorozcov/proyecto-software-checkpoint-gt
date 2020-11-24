import 'firebase/firestore';
import { connect } from 'react-redux';
import React, { useState, useRef } from 'react';
import { 
    View,
    Text,
    Modal,
    Platform,
    StyleSheet,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableWithoutFeedback 
} from 'react-native';

import { Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme, DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import XLSX from 'xlsx';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';

import { BarChart, LineChart, PieChart, StackedBarChart } from 'react-native-chart-kit';

import moment from "moment";

import OptionPicker from '../../components/general/OptionPicker';

import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';


function ReportScreen({
    theme,
    navigation,
    reportDataByUser,
    generateReport,
    isLoading,
}) {

    const { colors, roundness } = theme;
    
    const screenWidth = Dimensions.get("window").width;

    const [isInit, setIsInit] = useState(false);
    const [initDate, setInitDate] = useState( Platform.OS=='ios' ? new Date(new Date().setDate(new Date().getDate() - 1)): new Date());
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

    const chartConfig={
        backgroundGradientFrom: Platform.OS === 'ios' ? "#F8FAFB" : "#FFFFFF",
        backgroundGradientTo: Platform.OS === 'ios' ? "#F8FAFB" : "#FFFFFF",
        barRadius:1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        fillShadowGradient:colors.accent,
        fillShadowGradientOpacity:1,
    }

    const colorsGraph = [
        "rgb(47, 145, 175)", 
        "rgb(181, 231, 122)", 
        "rgb(98, 141, 120)", 
        "rgb(148, 37, 170)", 
        "rgb(22, 190, 88)", 
        "rgb(27, 149, 93)", 
        "rgb(73, 14, 218)", 
        "rgb(45, 175, 82)", 
        "rgb(79, 53, 85)", 
        "rgb(173, 113, 70)", 
        "rgb(128, 107, 188)", 
        "rgb(48, 124, 186)", 
        "rgb(157, 90, 23)", 
        "rgb(199, 176, 191)", 
        "rgb(18, 251, 49)", 
        "rgb(94, 89, 181)", 
        "rgb(81, 184, 249)", 
        "rgb(25, 239, 125)", 
        "rgb(28, 24, 130)", 
        "rgb(105, 225, 238)"
    ]
    
    const graphOptions = [
		{
			id: 1,
			title: 'Barras',
			selected: true,
		},
		{
			id: 2,
			title: 'Pie',
			selected: false,
		}
    ];
    const [graphOption, setGraphOption] = useState(graphOptions[0]);

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
        let salesData = Object.values(data.users).filter(user=>user.total>0).map(user => {
            return {
                name: user.name,
                total: user.total,
            }
        })

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
                    <View style={styles.formContainer}>
                    {Platform.OS === 'ios' ?
                        <Modal
                            style={styles.modalView}
                            animationType="fade"
                            transparent={true}
                            avoidKeyboard={true}
                            presentationStyle={'pageSheet'}
                            coverScreen={true}
                            onBackButtonPress={() => setModalVisible(false)}
                            onRequestClose={() => setModalVisible(false)}
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
                                disabled={!(initDate < endDate) || isLoading}
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

                        

                        {reportDataByUser && reportDataByUser.users.total > 0 ? (

                            <View>
                            <Card 
                                title={"Ventas Por Usuario"}
                                titleStyle={{fontFamily:'dosis-bold',fontSize:18}}
                                containerStyle={{marginTop:10}}>
                                    <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{flex: 3}}>Día</DataTable.Title>
                                        <DataTable.Title style={{flex: 4}}>Usuario</DataTable.Title>
                                        <DataTable.Title numeric style={{flex: 2}}>Total</DataTable.Title>
                                    </DataTable.Header>
                                    {reportDataByUser.days.map(day=>(
                                        Object.values(day.byWaiter).filter(user => typeof user === 'object' && user.total > 0).map(user=>(
                                        <DataTable.Row>
                                            <DataTable.Cell style={{flex: 3}}>{day.id}</DataTable.Cell>
                                            <DataTable.Cell style={{flex: 4}}>{user.name}</DataTable.Cell>
                                            <DataTable.Cell numeric style={{flex: 2}}>GTQ {user.total}</DataTable.Cell>
                                        </DataTable.Row>

                                        ))
                                    ))}
                                </DataTable>
                                {reportDataByUser.users.total > 0 && <OptionPicker theme={theme} data={graphOptions} onPress={(elem)=>setGraphOption(elem)}/>}
                                {reportDataByUser.users.total > 0 && graphOption.id==1 && (
                                    <View ref={graphReference} collapsable={false}> 
                                        <BarChart 
                                            data={{
                                                labels: Object.values(reportDataByUser.users).filter(user=>user.total>0).map(user => user.name),
                                                datasets: [{
                                                    data: Object.values(reportDataByUser.users).filter(user=>user.total>0).map(user => user.total),
                                                }],
                                            }}
                                            showValuesOnTopOfBars={true}
                                            showBarTops={false}
                                            fromZero={true}
                                            width={Dimensions.get('window').width-60}
                                            height={240}
                                            yAxisLabel={'Q'} 
                                            chartConfig={chartConfig}
                                            style={styles.graphStyle}
                                        />
                                    </View>
                                )}
                                {reportDataByUser.users.total > 0 && graphOption.id==2 && (
                                    <View ref={graphReference} collapsable={false}>
                                        <PieChart
                                            data={Object.values(reportDataByUser.users).filter(user=>user.total>0)
                                                .map((user,index)=>({...user,legendFontSize: 8,color: colorsGraph[index], legendFontColor: "#7F7F7F",}))}
                                            width={Platform.OS=="ios"? (Dimensions.get('window').width -100) : Dimensions.get('window').width-50}
                                            height={220}
                                            chartConfig={chartConfig}
                                            accessor="total"
                                            backgroundColor="transparent"
                                            paddingLeft="25"                                    
                                            absolute={false}
                                        />
                                    </View>
                                )}
                            </Card>  
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
                                onPress={ ()=> exportCSV(reportDataByUser) }
                            >
                            {'Excel'}
                            </Button>
                        </View>
                            </View>
                            
                        ): (
                            <Text  style={{...styles.saleTitle, color: colors.accent}}>Sin ventas por el momento.</Text>
                        )}   
                    </View>
                </ScrollView>
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={isLoading}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size="large" animating={isLoading} color={colors.primary} />
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
        paddingBottom: 16,
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
    modal: {
        backgroundColor: '#FFFFFF',
        height: 350,
        width: '80%',
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    graphStyle: {
        paddingTop: 20,
        borderRadius: 16
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
        marginBottom: 16,
        marginTop:20,
    },  
});

export default connect(
	state => ({
        reportDataByUser: selectors.getReport(state, 'BY-USER'),
        isLoading: selectors.getReportIsFetching(state),
	}),
	dispatch => ({
        generateReport(initDate, endDate) {
            let dateInit = new Date(initDate)
            let dateEnd = new Date(endDate)
            if(Platform.OS!='ios'){
                dateInit = new Date(dateInit.setDate(dateInit.getDate() - 1))
                // dateEnd = new Date(dateEnd.setDate(dateEnd.getDate() - 1))
            }
            dispatch(actions.startFetchingReportByUser(dateInit, dateEnd));
        },
	}),
)(withTheme(ReportScreen));