import { StyleSheet, Text,TextInput,View } from 'react-native'
import React, { useState }from 'react'
import { useDispatch} from 'react-redux'
import { useValidation } from 'react-simple-form-validator';
import CustomButtoms from '../generalButtoms/LinkButtoms'
import request from '../../services/request.services';
import { getAuth } from '../../features/auth';
import alertCustomButtoms from '../generalButtoms/alertButtoms';

export default function LoginForm(props) {
    const dispatch=useDispatch()
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
    
    const save=(data)=>{
      dispatch(getAuth(data))
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

        <CustomButtoms.NormalLinkButtom valid={!isFormValid} text='Log In'
          onPress={()=>{
            request.logIn({username, password}).then(
              response=>{
                if(response.status===200){
                    save({
                      token:response.token,
                      username:response.username
                    })                  

                  alertCustomButtoms.alertLink(true, response.msg+' '+response.username, props.navigation, 'MenuGame')
                }
                else{
                  alertCustomButtoms.alertLink(false, response.msg, props.navigation, 'Login')
                }
              }
            )
          }}
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