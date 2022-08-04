import { StyleSheet, Text,TouchableOpacity } from "react-native"


//Botom personalizado para edicion

const style=StyleSheet.create({
    edit:{
        padding:15,
        backgroundColor: '#313638',
        color:'#E8E9EB',
        borderRadius: 20,
    },
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize: 16,
        color:'#E8E9EB',
    }
})

const editCustomButtoms={
    editNormalButtom:(props)=>{
        return(<TouchableOpacity style={style.edit}
            onPress={props.onPress !== undefined ? props.onPress:()=>{}}
        >
            <Text style={style.text}>
                Editar
            </Text>

        </TouchableOpacity>)
    }
}

export default editCustomButtoms