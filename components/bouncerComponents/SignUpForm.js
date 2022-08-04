import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState,useRef }from 'react'
import { useValidation } from 'react-simple-form-validator';
import CustomButtoms from '../generalButtoms/LinkButtoms'
import PhoneInput from 'react-native-phone-input'
import request from '../../services/request.services';
import alertCustomButtoms from '../generalButtoms/alertButtoms';

export default function SignUpForm(props) {

  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [confirmPassword, setConfirmPassword]=useState('')
  const [tlf, setTlf]=useState('')
  const phoneInput = useRef(undefined); // referencia del componente PhoneInput
  const [user,setUser]=useState({
    username:false,
    password:false,
    confirmPassword:false,
    tlf:false
  })

  const {isFieldInError, getErrorsInField, isFormValid}=useValidation({
    fieldsRules:{
      username:{maxlength:15, minlength:3, hasSpecialCharacter:false, required:true},
      password:{minlength:8, hasSpecialCharacter:false, required:true},
      confirmPassword: {required:true, equalPassword:password},
    },
    state:{username,password,confirmPassword}
  })

  const handleTouchChanges=(field)=>{
    setUser({
      ...user,
      [field]:true
    })
  }

  const handleChanges=(name, value, flag)=>{
    switch (name) {
      case 'username':
        flag? setUsername(value): handleTouchChanges(name)
        break;
      case 'password':
        flag? setPassword(value): handleTouchChanges(name)
        break;
      case 'confirmPassword':
        flag? setConfirmPassword(value): handleTouchChanges(name)
        break;
        case 'tlf':
          setUser({
            ...user,
            tlf:phoneInput.current.isValidNumber() 
          })
          setTlf(value)
          
          break;        
      default:
        break;
    }
  }

  return (
    <View>
      <TextInput style={styles.input} placeholder='Username'
        value={username}
        onChangeText={(value)=>{handleChanges('username',value, true)}}
        onBlur={(value)=>{handleChanges('username',value, false)}}/>

      <Text style={styles.text}>
        {user.username && isFieldInError('username') && getErrorsInField('username').join('\n') }
       </Text>

      <TextInput style={styles.input} placeholder='Password'
        value={password}
        onChangeText={(value)=>{handleChanges('password',value, true)}}
        onBlur={(value)=>{handleChanges('password',value, false)}}/>

      <Text style={styles.text}>
        {user.password && isFieldInError('password') && getErrorsInField('password').join('\n') }
       </Text>

      <TextInput style={styles.input} placeholder='Confirm Password'
        value={confirmPassword}
        onChangeText={(value)=>{handleChanges('confirmPassword',value, true)}}
        onBlur={(value)=>{handleChanges('confirmPassword',value, false)}}/>

      <Text style={styles.text}>
        {user.confirmPassword && isFieldInError('confirmPassword') && getErrorsInField('confirmPassword').join('\n') }
       </Text>

       <PhoneInput style={styles.input} ref={phoneInput}
        initialCountry={'VE'} 
        initialValue='+58' value={tlf}
         textProps={{placeholder:'Phone Number'} }
         onChangePhoneNumber={(value)=>{handleChanges('tlf', value, true )}}/>

      <Text style={styles.text}>
        {!user.tlf && 'phone number is not valid' }
       </Text>

      <CustomButtoms.NormalLinkButtom valid={!isFormValid ? true:!user.tlf} text='Sing Up'
      
        onPress={
          ()=>{
            request.singUp({username,password,tlf})
            .then(response=>{
              response.status===201 ?

               alertCustomButtoms.alertLink(
                true,
                 response.msg
                 , props.navigation, 'Login') :

                   alertCustomButtoms.alertLink(
                  false,
                   response.msg
                   , props.navigation, 'Bouncer')
            })
          }
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        margin:20,
        padding:10,
        backgroundColor: 'white',
        borderRadius:25
    },
    text:{
      marginHorizontal:20,
      color:'red'
    }
})