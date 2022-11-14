import { images } from "assets/images"
import { BackButton } from "components/BackButton"
import { SWRButton } from "components/SWRButton"
import { SWRText } from "components/SWRText"
import { SWRTextInput } from "components/inputs/SWRTextInput"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { setSignUpData, SignUpData, step } from '../SignUpFlow'
import { PuzzleImage } from "../../../components/PuzzleImage"
import { useAuth } from '../contexts/auth'
import React, { useState } from 'react'
import {AgentInit} from 'src/agentdec/agentaction'
import { useAgent } from '@aries-framework/react-hooks'
import deviceStorage from '../services/jwtstore';
import axios from 'axios';
import { createseedphrase , createpripubkey } from "contexts/keygeneration"
import { storeCryptoKey , storeCryptoAddress , storeSeedPhrase } from "src/app/services/keychain"
export const CreateAccountHuman = (props: {
	data: SignUpData,
	setData: setSignUpData
	next: step
	back: step
}) => {

	const { setPIN , getWalletCredentials } = useAuth()
	const [walletId , setWalletId] = useState('')
	const [name , setname] = useState('')
	const { setAgent } = useAgent()

	
	const passcodeCreate = async (pin: string , walletId: string , salt?: string) => {
		try {
		  await setPIN(pin , walletId , salt)
		}catch (e){
			//fill in
		}
	}

	//User registeration on HLF
	const hlfregister = async() => {
		axios.post("http://44.209.184.166:8080/register",{
        email: props.data.firstName,
        password: props.data.password,
      }//need to create header and data interface constants for API calls 
    )
    .then((response) => {
      deviceStorage.saveKey("id_token", response.data.token);
    })
	}

	//agentInitialization 
	const agentInitialization = async() =>{

		const agent = AgentInit.build(props.data.firstName , props.data.firstName+props.data.lastName , props.data.password);
		setAgent(agent);
	}


	const nextEnabled = (props.data.firstName.length > 0 &&
		props.data.lastName.length > 0 &&
		props.data.password.length > 0 &&
		props.data.password === props.data.password2)
		//passcodeCreate(props.data.password , props.data.firstName)
	
	const on = async() => {
		let userseed = await createseedphrase();
		let userkeys = await createpripubkey(userseed.mnemonic)
		let resultone = await storeCryptoKey(userkeys);
		let resulttwo = await storeCryptoAddress(userkeys);
		let resultthree = await storeSeedPhrase(userseed);

		if(resultone&&resulttwo&&resultthree){
			passcodeCreate(props.data.password , props.data.firstName , userseed.mnemonic.toString());
			agentInitialization;
			hlfregister;
			props.next
		}
	}

	return (
		<View style={gs.fullScreen} >
			<BackButton onPressOverride={props.back} leftAlign style={{position: 'absolute'}}/>
			<PuzzleImage width={200}/>
			<SWRText font={'medium'} style={styles.title}>Create an account</SWRText>
			<SWRTextInput withTitle value={props.data.firstName} name={'First Name'} containerStyle={styles.textInput} onChange={(firstName) => {
				props.setData({...props.data, firstName})	
			}}/>
			<SWRTextInput withTitle value={props.data.lastName} name={'Last Name'} containerStyle={styles.textInput} onChange={(lastName) => {
				props.setData({...props.data, lastName})	
			}}/>
			<SWRTextInput withTitle value={props.data.password} name={'Password'} containerStyle={styles.textInput} onChange={(password) => {
				props.setData({...props.data, password})	
			}}/>
			<SWRTextInput withTitle value={props.data.password2} name={'Confirm Password'} containerStyle={styles.textInput} onChange={(password2) => {
				props.setData({...props.data, password2})	
			}}/>

			<SWRButton disabled={!nextEnabled} onPress={on} style={styles.nextButton}>
				<SWRText style={gs.h4}>Next</SWRText>
			</SWRButton>
			<Image source={images.woman_at_desk} style={styles.officeDeskImage}/>
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 37
	},
	textInput: {
		marginVertical: 3
	},
	nextButton: {
		width: '100%',
		marginTop: 15
	},
	officeDeskImage: {
		marginTop: 10,
		height: 150,
		width: 220
	}
})