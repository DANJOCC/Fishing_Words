import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Row({wordTried,tries,length}) {
  

  //colorear celdas segun aciertos

  if(tries){
    return(<View style={styles.container}>
        {
          tries.map((cell, i)=>{
            if(cell.value==='yes'){
              return <Text style={styles.textGreen} key={i}>{cell.letter}</Text>
            }
            if(cell.value==='no'){
              return <Text style={styles.textGray} key={i}>{cell.letter}</Text>
            }
            if(cell.value==='maybe'){
              return <Text style={styles.textYellow} key={i}>{cell.letter}</Text>
            }
            
          })
        }
    </View>)
  }


  //Crear celdas con letras

  if(wordTried){
    let letters=wordTried.split('')

    return(
      <View style={styles.container}>
        { letters.map((letter, i)=>{
          return <Text style={styles.text} key={i}>{letter}</Text>
        })}
      {
        [...Array(Number(length-letters.length))].map((cell, i)=>{
            return <Text style={styles.text} key={i}></Text>
        })
      }
    </View>)
  }

  //crear celdas vacias

  return (
    <View style={styles.container}>
      {
        [...Array(Number(length))].map((cell, i)=>{
            return <Text style={styles.text} key={i}></Text>
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:0,
        flexDirection:'row',
        justifyContent:'center',
    },
    text:{
        borderColor:'#313638',
        backgroundColor:'#E8E9EB',
        margin:3,
        borderWidth:2,
        width:45,
        height:45,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25,
        fontWeight:'bold'
      },
      textGreen:{
        borderColor:'#313638',
        backgroundColor:'#069E2D',
        margin:3,
        borderWidth:2,
        width:45,
        height:45,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25,
        fontWeight:'bold'
      },
      textGray:{
        borderColor:'#313638',
        backgroundColor:'#6D676E',
        margin:3,
        borderWidth:2,
        width:45,
        height:45,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25,
        fontWeight:'bold'
      },
      textYellow:{
        borderColor:'#313638',
        backgroundColor:'#F09D51',
        margin:3,
        borderWidth:2,
        width:45,
        height:45,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25,
        fontWeight:'bold'
      },
})