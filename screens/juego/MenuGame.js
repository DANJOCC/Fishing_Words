import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButtoms from '../../components/generalButtoms/LinkButtoms'
import {useSelector,useDispatch} from 'react-redux'
import request from '../../services/request.services'
import {getProfile} from '../../features/user'
import alertCustomButtoms from '../../components/generalButtoms/alertButtoms'
export default function MenuGame(props) {

  const auth=useSelector(state=>state.auth)

  const dispatch=useDispatch()

  const profile=(username, token)=>{
      request.getProfile(username, token).then(response=>{
        if(response.status===200){
          dispatch(getProfile({
            username:response.username,
            tlf:response.tlf,
            password:response.password
          }))
          props.navigation.navigate('Profile')
        }
        else{
          alertCustomButtoms.alertLink(false, response.msg, props.navigation, 'MenuGame')
        }
      })
  }

  return (
    <View style={styles.container}>
      <CustomButtoms.NormalLinkButtom  text='Crear Sala' dir='Room' navigation={props.navigation}/>
      <CustomButtoms.NormalLinkButtom  text='Unirse a Sala' dir='Room' navigation={props.navigation}/>
      <CustomButtoms.NormalLinkButtom  text='Perfil'  onPress={()=>{profile(auth.user, auth.token)}}/>
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