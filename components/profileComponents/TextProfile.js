import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import editCustomButtoms from '../generalButtoms/editButtoms'
export default function TextProfile(props) {
    const [flag, setFlag]=useState(false)
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        value={props.text}
        onBlur={()=>setFlag(false)}
        editable={flag}
      ></TextInput>
    <editCustomButtoms.editNormalButtom onPress={()=> setFlag(true) }/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        flexDirection:'row',
    },
    input:{
        backgroundColor: 'white',
        width:270,
        marginHorizontal:10,
        borderRadius:25,
        padding:10
    },
})