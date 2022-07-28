import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Row from './Row'

export default function Grid({wordTried, tries, turn,length}) {
  return (
    <View style={styles.container}>
      {tries.map((cell,i)=>{
        if(turn===i){
          return <Row key={i} length={length} wordTried={wordTried} tries={cell}/>
        }
        return <Row key={i} length={length} tries={cell}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:0,
  }
})