import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Row(props) {
  return (
    <View style={styles.container}>
      {
        [...Array(Number(props.length))].map((cell, i)=>{
            console.log(i)
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
        borderWidth:2,
        width:45,
        height:45
      }
})