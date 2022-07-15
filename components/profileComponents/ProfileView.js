import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextProfile from './TextProfile'

export default function ProfileView() {
  return (
    <View>
      <TextProfile text={'aqui va nombre'}></TextProfile>
      <TextProfile text={'aqui va password'}></TextProfile>
      <TextProfile text={'aqui va tlf'}></TextProfile>
    </View>
  )
}

// const styles = StyleSheet.create({

// })