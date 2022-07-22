import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    link:{
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#313638',
        margin:30,
        borderRadius: 50,
    },
    invalidLink:{
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#F06543',
        margin:30,
        borderRadius: 50,
    },
    text:{
        textAlign:'center',
        fontSize: 25,
        color:'#E8E9EB',
    },
    invalidText:{
        textAlign:'center',
        fontSize: 25,
        color:'#313638',
    }
})


const CustomButtoms={
    NormalLinkButtom:(props)=>{
        return(
            <TouchableOpacity 
             style={props.valid !== undefined && props.valid? styles.invalidLink:styles.link}
             disabled={props.valid !== undefined ? props.valid: false}
              onPress={props.onPress !== undefined ? props.onPress:()=>props.navigation.navigate(props.dir)}>

                <Text style={props.valid !== undefined && props.valid? styles.invalidText:styles.text}>{props.text}</Text>

            </TouchableOpacity>
        )
    },
}

export default CustomButtoms