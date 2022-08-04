import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButtoms from '../../components/generalButtoms/LinkButtoms'

export default function Bouncer(props) {
    
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Fishing Words</Text>
        <View style={styles.menu}>
            <CustomButtoms.NormalLinkButtom text='Log in' dir='Login' navigation={props.navigation}/>
            <CustomButtoms.NormalLinkButtom text='Sign Up' dir='SignUp' navigation={props.navigation}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#E0DFD5',
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
    },

    menu:{
        flex:1,
        flexDirection: 'column',
        marginHorizontal: 30,
        marginTop:50
    },
    text: {
        fontSize: 50,
        marginVertical: 100,
        textAlign: 'center',
        color:'#313638',
    },
})