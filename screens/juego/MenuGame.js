import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButtoms from '../../components/generalButtoms/LinkButtoms'

export default function MenuGame(props) {
  return (
    <View style={styles.container}>
      <CustomButtoms.NormalLinkButtom  text='Crear Sala' dir='MenuGame' navigation={props.navigation}/>
      <CustomButtoms.NormalLinkButtom  text='Unirse a Sala' dir='MenuGame' navigation={props.navigation}/>
      <CustomButtoms.NormalLinkButtom  text='Perfil' dir='Profile' navigation={props.navigation}/>
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