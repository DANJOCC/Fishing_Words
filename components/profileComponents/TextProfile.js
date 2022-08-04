import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import editCustomButtoms from '../generalButtoms/editButtoms'
import { useValidation } from 'react-simple-form-validator';
export default function TextProfile(props) {
    const [flag, setFlag]=useState(false)
    const [data, setData]=useState(props.text)
    const rule=(name)=>{
      if(name==='username'){
        return {
          maxlength:15, minlength:3, hasSpecialCharacter:false, required:true
        }
      }
      else if(name==='password'){
        return {minlength:8, hasSpecialCharacter:false, required:true}
      }
      else if(name==='tlf'){
        return {hasNumber: true,required:true, minlength:10,}
      }
    }

    const {isFieldInError, getErrorsInField, isFormValid}=useValidation({
      fieldsRules:{
        data:rule(props.name),
      },
      state:{data}
    })
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        value={data}
        onChangeText={(value)=>{setData(value)}}
        onBlur={()=>setFlag(false)}
        editable={flag}
      ></TextInput>
    <editCustomButtoms.editNormalButtom onPress={()=> setFlag(true) }/>
      <Text style={styles.text}>
        {!flag && isFieldInError('data') && getErrorsInField('data').join('\n') }
       </Text> 
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    input:{
        backgroundColor: 'white',
        width:220,
        marginHorizontal:10,
        borderRadius:25,
        padding:10
    },
    text:{
      marginHorizontal:20,
      color:'red',
      flexDirection:'column'
    }
})