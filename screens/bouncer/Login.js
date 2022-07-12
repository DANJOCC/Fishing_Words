import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LoginForm from '../../components/bouncerComponents/LoginForm'

export default function Login(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <LoginForm navigation={props.navigation}/>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
      flex:1,
      flexDirection: 'column',
      justifyContent:'center',
      backgroundColor: '#E0DFD5'
  },
  text: {
      fontSize: 30,
      marginVertical: 50,
      textAlign: 'center',
      color:'#313638',
  },
})