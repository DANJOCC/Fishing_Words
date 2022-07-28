import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Row from './Row'

export default function Grid({wordTried, tries, turn,length}) {
  return (
    <View style={styles.container}>
      {tries.map((cell,i)=>{
        console.log(i+10)
        return <Row key={i} length={length}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:0,
  }
})