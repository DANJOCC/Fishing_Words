import { StyleSheet, Text,TextInput,View } from 'react-native'
import React, { useState }from 'react'
import { useValidation } from 'react-simple-form-validator';
import CustomButtoms from '../generalButtoms/LinkButtoms'

export default function LoginForm(props) {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [user,setUser]=useState({
        username:false,
        password:false,
      })

    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
        fieldsRules: {
          username: {minlength:3, maxlength:15, hasSpecialCharacter: false,required: true},
          password:{required: true, hasSpecialCharacter: false,  minlength: 8},
        },
        state: { username, password}
      });

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

        <CustomButtoms.NormalLinkButtom valid={!isFormValid} text='Sing Up' dir='Bouncer' navigation={props.navigation}/>    
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