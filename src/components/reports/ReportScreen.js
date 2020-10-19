import 'firebase/firestore';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, StyleSheet, View, Platform, Dimensions, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { BarChart,LineChart } from 'react-native-chart-kit'

import { ScrollView } from 'react-native-gesture-handler';
import { Button, withTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as actions from '../../logic/actions/reports';
import * as selectors from '../../logic/reducers';




function ReportScreen({
    theme,
    navigation,
}) {
    const { colors, roundness } = theme;
    const screenWidth = Dimensions.get("window").width;
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
            data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(199, 43, 14, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    

    // DATE PICKER EXAMPLE
    const [isInit, setIsInit] = useState(false);
    const [initDate, setInitDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const onInitDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setInitDate(currentDate);
    };
    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setEndDate(currentDate);
    };

      const toggleShow = (show) => {
        setShow(!show);
      };
    
  	return (
    	<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.formContainer}>

                        <LineChart
                            style={styles.graphStyle}
                            data={data}
                            width={screenWidth}
                            height={Dimensions.get("window").height * 0.55}
                            yAxisLabel="Q."
                            chartConfig={chartConfig}
                            verticalLabelRotation={35}
                        />

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
                                    )}
                                </View>
                            </View>                
                            </TouchableWithoutFeedback>
                        </Modal>

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
                                {`${initDate.toDateString()}`}
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
                                {`${endDate.toDateString()}`}
                            </Button>

					    </View>

                        <View style={{marginTop:'4%',marginBottom:'10%'}}>
                            <Button
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
                                onPress={()=>{}}
                            >
                            {'GENERAR REPORTE'}
                            </Button>
                        </View>
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
	inputContainerStyle: {
		margin: 8,
	},
	inputContainerStyle: {
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 20,
	},
	titleStyle: {
		textAlign: 'center',
		fontFamily: 'dosis-regular',
		fontSize: 30,
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
	});

export default connect(
	state => ({
        data: selectors.getOrdersByDate(state),
	}),
	dispatch => ({
        // Updata data by dates.
        getData(initDate, endDate) {
            dispatch(actions.startFetchingDateReport(initDate, endDate));
        },
	}),
)(withTheme(ReportScreen));