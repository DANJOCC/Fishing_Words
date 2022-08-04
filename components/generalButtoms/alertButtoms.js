import { Alert } from "react-native"

//Boton personalizado para alertas con navegacion incluida


const alertCustomButtoms={
    alertLink:(flag,msg,navigation, link)=>{
        Alert.alert(
            flag ? ' ': 'wrong',
            msg,
            [
                {
                    text: flag? 'OK': 'Try again',
                    style:'default',
                    onPress: ()=>{
                        if(flag){
                            navigation.navigate(link)
                        }
                    }
                },

            ]
        )
    }
}

export default alertCustomButtoms