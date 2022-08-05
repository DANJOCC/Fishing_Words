import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import socket,{ startSocket } from '../../services/socketIO.services';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import useStateGame from '../../components/playComponents/state'
import Grid from '../../components/playComponents/Grid';
import formatTime from '../../services/timeControl.services';
import { getConfig } from '../../features/roomConfig';
import CustomButtoms from '../../components/generalButtoms/LinkButtoms';
export default function RoomInvite() {

   const [wins, setWins]=useState(0)//victorias

    const dispatch=useDispatch()

    const [words, setWords]=useState([])//palabras para adivinar

    const {
      handleKey,  //manejar ingreso de palabras
      wordTried,  //manejar palabra ingresada
      restart,    //reiniciar estado de juego para siguiente ronda
      newWord,    //manejar nueva palabra para adivinar en siguiente ronda
      tries,      //numero de intentos por ronda
      noTurn,     //sin turnos disponibles
      turn,       //numero de intento actual  
      rigth,      //indicador palabra correcta
      currentTry}=useStateGame('')//estado general del juego

    const roomConfig=useSelector(state=>state.roomConfig)//configuracion de la sala

    const [timer, setTimer]=useState(Number(roomConfig.time))//tiempo de sala

    const [outTime, setOutTime]=useState(false)//indicador de tiempo fuera

    const [startGame, setStartGame]=useState(false)//indicador de inicio de juego

    const [word, setWord]=useState('')//palabra a intentar

    const [endGame, setEndGame]=useState(false)//indicador fin de juego

    const [next, setNext]=useState(0)//indicador de round

    const [players, setPlayer]=useState(['you'])//jugadores de sala

    const [room,setRoom]=useState('')

    const [roomId, setRoomId]=useState('')

    const interval=useRef()//referencia a intervalo

    const nextRound=()=>{//cambio de round
      restart()
      setNext((prevRound)=>{
        return prevRound+1
      })

      setTimer(Number(roomConfig.time))//reinicio de timer

      setOutTime(false)//reinicio de tiempo fuera

      next+1<roomConfig.rounds?newWord(words[next+1]):setEndGame(true) // siguiente palabra o fin de juego

    }

    useEffect(()=>{//transmitir fin de juego
      if(endGame){
        socket.emit('endGame')
      }
  },[endGame])

 
    useEffect(()=>{
        socket.connect()//conectar socket a server
  
        //nuevo jugador entrando a sala
  
        socket.on('newUser',(player)=>{
        
          if(players.length<2){
            setPlayer(()=>{
            let arrayPlayer= player
            return arrayPlayer
          })}
        })

        socket.on('endGame', ()=>{
          setEndGame(true)
          socket.emit('updateRanking',{
            username:user.username,
            newVictorie:wins,
            letters:roomConfig.length,
            rounds:roomConfig.rounds
          })
        })
  
        socket.on('state', (state)=>{
            dispatch(getConfig(state.config))
            setWords(state.words)
            setRoomId(state.roomId)
            newWord(state.words[0])
        })

        return ()=>{
            socket.disconnect()
        }
      },[])

 
  useEffect(()=>{//vigilar estado de juego e indicadores

    if(rigth){
      setWins((win)=>{
        return win+1
      })
      nextRound()
    }

    if(turn==roomConfig.tries){
      nextRound()
    }

    if(timer==0){
      nextRound()
    }
   
  },[rigth,turn,timer])

  useEffect(()=>{//vigilar numero de jugadores e iniciar juego
    if(players.length==2){
      setStartGame(true)
    }
  },[players])

  useEffect(()=>{
    return () => clearInterval(interval.current);
  },[])


  useEffect(()=>{//vigilar estado del timer

    if(!rigth && !noTurn && !outTime && startGame && !endGame){
      interval.current=setInterval(()=>{
        setTimer((prev)=>{
         return prev-1000
        })},1000)
    }else{
      clearInterval(interval.current);

    }

   
   },[rigth,noTurn,outTime,startGame,endGame])

  return (

    <View style={styles.container}>
    { startGame && <Text style={styles.text}>{}{formatTime(timer)}</Text>}
      <Text style={styles.text}>Room, {roomId}, {next}</Text>

     { !startGame && <TextInput style={styles.input}
      value={room}
         onChangeText={(value)=>{setRoom(value)}}
         />}


     { startGame && !endGame && <TextInput style={styles.input}
      value={word}
       maxLength={Number(roomConfig.length)}
        onKeyPress={(keyPress)=>handleKey(keyPress.nativeEvent.key)}
         onSubmitEditing={()=>{wordTried(); setWord('')}}
         onChangeText={(value)=>{setWord(value)}}
         />}

      {startGame && !endGame &&<Grid wordTried={currentTry} tries={tries} turn={turn} length={roomConfig.length}/>
      }

      {!startGame && !endGame && players.map((p,i)=>{
        return <Text key={i}>{p}</Text>
      })}


       <CustomButtoms.NormalLinkButtom
         text="Desconectarse" 
         onPress={()=>{
          socket.emit('exit')}}/>


        {!startGame && <CustomButtoms.NormalLinkButtom
         text="Unirse" 
         onPress={()=>{
          socket.emit('connected', ({id: room}))}}/>}

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
      fontSize:25,
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