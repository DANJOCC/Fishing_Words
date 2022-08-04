import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import ProfileView from '../../components/profileComponents/ProfileView'
import image from '../../utils/images/usuario-de-perfil.png'
import {useSelector} from 'react-redux'
export default function Profile() {
  const profile=useSelector(status=>status.profile)
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image}></Image>
      <Text style={styles.text}>{profile.username}</Text>
      <ProfileView/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#E0DFD5'
},
  image:{
    margin:10,
    width:150,
    height:150
  },
  text:{
    fontSize:40,

  }
})