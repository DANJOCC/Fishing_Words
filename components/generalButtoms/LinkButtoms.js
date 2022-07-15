import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    link:{
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#313638',
        color:'#E8E9EB',
        margin:30,
        borderRadius: 50,
    },
    text:{
        textAlign:'center',
        fontSize: 25,
        color:'#E8E9EB',
    }
})


const CustomButtoms={
    NormalLinkButtom:(props)=>{
        return(
            <TouchableOpacity 
             style={styles.link}
             disabled={props.valid !== undefined ? props.valid: false}
              onPress={props.onPress !== undefined ? props.onPress:()=>props.navigation.navigate(props.dir)}>

                <Text style={styles.text}>{props.text}</Text>

            </TouchableOpacity>
        )
    },
}

export default CustomButtoms