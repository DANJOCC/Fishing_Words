import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SwitchSelector from "react-native-switch-selector";
import CustomButtoms from '../../components/generalButtoms/LinkButtoms';
import {useDispatch} from 'react-redux'
import { getConfig } from '../../features/roomConfig';
export default function RoomMaker(props){
    
    const dispatch=useDispatch()

    const [time, setTime]=useState('300000')
    const [length, setLength]=useState('5')
    const [rounds, setRounds]=useState('3')
    const [tries, setTries]=useState('6')

    const TimeOptions=[
        {label:"5:00", value:"300000"},
        {label:"10:00", value:"600000"},
        {label:"15:00", value:"900000"}
    ]

    const LengthWordOptions=[
        {label:"4 letters", value:"4"},
        {label:"5 letters", value:"5"},
        {label:"6 letters", value:"6"},
    ]
    
    const RoundOptions=[
        {label:"1 round", value:"1"},
        {label:"2 rounds", value:"2"},
        {label:"3 rounds", value:"3"},
    ]

    const GuessesOptions=[
        {label:"3 tries", value:"3"},
        {label:"6 tries", value:"6"},
        {label:"9 tries", value:"9"},
    ]



  return (
    <View style={styles.container}>

    <Text style={styles.text}>Elige opciones de sala</Text>

      <SwitchSelector
      style={styles.options}
        options={TimeOptions}
        initial={0}
        selectedColor="#E8E9EB"
        buttonColor="#F06543"
        onPress={(value)=>setTime(value)}
      />
      <SwitchSelector 
      style={styles.options}
        options={LengthWordOptions}
        initial={1}
        selectedColor="#E8E9EB"
        buttonColor="#F06543"
        onPress={(value)=>setLength(value)}
      />
      <SwitchSelector 
      style={styles.options}
        options={RoundOptions}
        initial={2}
        selectedColor="#E8E9EB"
        buttonColor="#F06543"
        onPress={(value)=>setRounds(value)}
      />
      <SwitchSelector 
      style={styles.options}
        options={GuessesOptions}
        initial={1}
        selectedColor="#E8E9EB"
        buttonColor="#F06543"
        onPress={(value)=>setTries(value)}
      />

        <CustomButtoms.NormalLinkButtom
         text="Iniciar sala" 
         onPress={()=>{
            dispatch(getConfig({time,length,rounds,tries}))
            props.navigation.navigate('Room')
            }}/>
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
    options:{
        margin:20
    },
    text:{
        textAlign: 'center',
        fontSize: 25
    }
})