import React from 'react';
import 'firebase/firestore';
import { Button, withTheme } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Modal from 'react-native-modal';

function AboutModal({
    navigation,
	theme,
	closeModal,
	modal,
}) {

    const { colors, roundness } = theme;
    
	return (
		<Modal
			transparent={true}
			animationType={'none'}
			isVisible={modal}
			avoidKeyboard={true}
			coverScreen={true}
			onBackButtonPress={()=>closeModal()}
			style={styles.modalB}
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
			// onSwipeComplete={()=>closeModal()}
        	// swipeDirection={['down']}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modal}>
					<Text style={styles.title(colors)} >
						{'App creada por:'}
					</Text>
					<Divider style={styles.contentDivider(colors)} />
					<Text style={styles.text} >
						{'Silvio Orozco'}
					</Text>
					<Text style={styles.text} >
						{'Luis Cuellar'}
					</Text>
					<Text style={styles.text} >
						{'Douglas de León'}
					</Text>
					<Text style={styles.text} >
						{'Gerardo Méndez'}
					</Text>
					<Text style={styles.text} >
						{'José Miguel Castañeda'}
					</Text>
					<View style={{paddingBottom: '5%'}}>						
						<Button
							theme={roundness}
							color={'#000000'}
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
								marginTop: 10,
								justifyContent: 'center',
							}}
							onPress={()=>closeModal()}
						>
							{'Regresar'}
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
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
    title (colors) {
        return {
            textAlign: 'center',
            fontFamily:'dosis-extra-bold',
            color: colors.accent,
            fontSize: 20
        }
    },
    text: {
        textAlign: 'center',
        fontFamily:'dosis-semi-bold',
        fontSize:16
    },
    contentDivider (colors) {
        return {
            backgroundColor: colors.accent,
            marginTop:2,
            marginLeft: '10%',
            marginRight: '10%',
            marginBottom:2
        }
    }
});
	
export default withTheme(AboutModal);