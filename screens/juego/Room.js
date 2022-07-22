import { View, Text, StyleSheet, Button } from 'react-native'
import io from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import socket,{ startSocket } from '../../services/socketIO.services';
import { useFocusEffect } from '@react-navigation/native';
export default function Room() {
    const [isConnected, setIsConnected] = useState(false);
  
  useFocusEffect(
    React.useCallback(()=>{
      startSocket()
    })
  )

  return (
    <View style={styles.container}>
      <Text>Room, {socket.id}</Text>
      <Text>connected: {isConnected? 'yes': 'no'}</Text>
      <Button onPress={()=>{
        setIsConnected(false)
        socket.emit('exit')}} title="desconectar"></Button>
        <Button onPress={()=>{
        setIsConnected(true)
        socket.emit('connected')}} title="conectar"></Button>
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
})