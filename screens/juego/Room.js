import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import io from 'socket.io-client'
import React, { useEffect, useRef, useState } from 'react'
import socket,{ startSocket } from '../../services/socketIO.services';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import useStateGame from '../../components/playComponents/state'
import Grid from '../../components/playComponents/Grid';
import formatTime from '../../services/timeControl.services';
export default function Room() {
    const [isConnected, setIsConnected] = useState(false);
    const {handleKey,wordTried,tries,noTurn,turn,rigth,currentTry}=useStateGame('teamo')
    const roomConfig=useSelector(state=>state.roomConfig)
    const [timer, setTimer]=useState(Number(roomConfig.time))
    const [outTime, setOutTime]=useState(false)
    const [startGame, setStartGame]=useState(false)
    const [word, setWord]=useState('')
    const interval=useRef()
    const timeOut=useRef()
  useFocusEffect(
    React.useCallback(()=>{
      startSocket()
    })
  )
  useEffect(()=>{
    if(rigth){
      console.log('papi ganaste')
    }
    if(turn==roomConfig.tries){
      console.log('se acabaron las oportunidades')
    }
    if(timer==0){
      setOutTime(true)
      console.log('tiempo Fuera')
    }
  },[rigth,turn,timer])

  useEffect(()=>{
    return () => clearInterval(interval.current);
   
  },[])


  useEffect(()=>{

    if(!rigth && !noTurn && !outTime && startGame){
      interval.current=setInterval(()=>{
        setTimer((prev)=>{
         return prev-1000
        })},1000)
    }else{
      clearInterval(interval.current);

    }

   
   },[rigth,noTurn,outTime,startGame])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{}{formatTime(timer)}</Text>
      <Text >Room, {socket.id}</Text>

     { startGame && <TextInput style={styles.input}
      value={word}
       maxLength={Number(roomConfig.length)}
        onKeyPress={(keyPress)=>handleKey(keyPress.nativeEvent.key)}
         onSubmitEditing={()=>{wordTried(); setWord('')}}
         onChangeText={(value)=>{setWord(value)}}
         />}

      {startGame && <Grid wordTried={currentTry} tries={tries} turn={turn} length={roomConfig.length}/>
}
      <Text>connected: {isConnected? 'yes': 'no'}</Text>

      <Button onPress={()=>{
        setIsConnected(false)
        socket.emit('exit')}} title="desconectar"></Button>
        <Button onPress={()=>{
        setIsConnected(true)
        setStartGame(true)
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
      fontWeight:'bold',
      fontSize:30,
      textAlign: 'center',

    },
    input:{
      fontSize: 15,
      textAlign: 'center',
      fontSize:30,
      fontWeight:'bold',
      borderRadius:25,
      borderWidth:3,
      marginHorizontal: 50,
      marginVertical:20,
      borderColor:'#313638',
      backgroundColor:'#E8E9EB',
    }
})