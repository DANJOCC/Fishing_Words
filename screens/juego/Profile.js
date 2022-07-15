import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import ProfileView from '../../components/profileComponents/ProfileView'
import image from '../../utils/images/usuario-de-perfil.png'
export default function Profile() {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image}></Image>
      <Text>Imagen Arrecha</Text>
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
    width:200,
    height:200
  }
})