import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState,useRef } from 'react'
import PhoneInput from 'react-native-phone-input'
import request from '../../services/request.services'
import {useSelector,useDispatch} from 'react-redux'
import * as SMS from 'expo-sms';
import CustomButtoms from '../../components/generalButtoms/LinkButtoms'
export default function Invite(props) {


    const auth=useSelector(status=>status.auth)

    const [tlf, setTlf]=useState('')
    const [phone, isValid]=useState(false)
    const phoneInput = useRef(undefined);

    const handleChange=(value, flag)=>{
        setTlf(value)
        isValid(flag)
        console.log(tlf)
    }

    const sendInvitation= async ()=>{
        const {result}= await SMS.sendSMSAsync(
            [tlf],
            'You are invite to play with me in Fishing words'
        )
        Alert.alert(
            '',
            'invitation sended' ,
            [
                {
                    text: 'OK',
                    style:'default',
                    onPress: ()=>{
                            props.navigation.navigate('Invite')
                    }
                },
            ]

        )
        
    }

    const isAvailableToSendSms = async ()=>{
        const Available= await SMS.isAvailableAsync()

        Available? sendInvitation(): Alert.alert(
            'sorry',
            'we can send the invitation' ,
            [
                {
                    text: 'OK',
                    style:'default',
                    onPress: ()=>{
                            props.navigation.navigate('Invite')
                    }
                },
            ]

        )
    }
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Invite your friends</Text>
      <PhoneInput style={styles.input} ref={phoneInput} initialCountry={'VE'} initialValue='+58' value={tlf} placeholder='phone Number' onChangePhoneNumber={(value)=>{handleChange(value, phoneInput.current.isValidNumber() )}}/>
      <Text>Is Valid Number: {phone ? 'Yes' : 'No'}</Text>
      <CustomButtoms.NormalLinkButtom text='Enviar invitacion' valid={!phone} onPress={
        ()=>{
            request.getCheckTlf(tlf.split('+')[1], auth.token).then(response=>{
                console.log(response.IsRegister)
                if(!response.IsRegister){
                    isAvailableToSendSms()
                }
                else{
                    Alert.alert(
                        'Sorry',
                        'user already have the game install' ,
                        [
                            {
                                text: 'OK',
                                style:'default',
                                onPress: ()=>{
                                        props.navigation.navigate('Invite')
                                }
                            },
                        ]
            
                    )
                }
            })
        }
      }/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        backgroundColor: '#E0DFD5'
    },
    input:{
        margin:20,
        padding:20,
        backgroundColor: 'white',
        borderRadius:25
    },
    text: {
        fontSize: 30,
        marginVertical: 50,
        textAlign: 'center',
        color:'#313638',
    },
})