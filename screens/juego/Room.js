import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import io from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import socket,{ startSocket } from '../../services/socketIO.services';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import useStateGame from '../../components/playComponents/state'
import Grid from '../../components/playComponents/Grid';
export default function Room() {
    const [isConnected, setIsConnected] = useState(false);
    const {handleKey,wordTried,tries,turn,rigth,currentTry}=useStateGame('teamo')
    const roomConfig=useSelector(state=>state.roomConfig)
  useFocusEffect(
    React.useCallback(()=>{
      startSocket()
    })
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Room, {socket.id}</Text>
      <TextInput onKeyPress={(keyPress)=>handleKey(keyPress.nativeEvent.key)} onSubmitEditing={()=>{wordTried()}}/>
      <Grid wordTried={currentTry} tries={tries} turn={turn} length={roomConfig.length}/>
      <Text>connected: {isConnected? 'yes': 'no'}</Text>
      <Button onPress={()=>{
        setIsConnected(false)
        socket.emit('exit')}} title="desconectar"></Button>
        <Button onPress={()=>{
        setIsConnected(true)
        socket.emit('connected', roomConfig)}} title="conectar"></Button>
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
    text:{
      borderColor:'red',
      borderWidth:1
    }
})