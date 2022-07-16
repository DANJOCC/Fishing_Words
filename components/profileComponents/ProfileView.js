import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextProfile from './TextProfile'
import {useSelector,useDispatch} from 'react-redux'
export default function ProfileView() {
  const profile=useSelector(status=>status.profile)
  return (
    <View>
      <TextProfile text={profile.username} name="username"></TextProfile>
      <TextProfile text={profile.password} name='password'></TextProfile>
      <TextProfile text={profile.tlf} name='tlf'></TextProfile>
    </View>
  )
}

// const styles = StyleSheet.create({

// })