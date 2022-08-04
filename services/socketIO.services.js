import io from 'socket.io-client'

//Conexion de socket


const socket=io('https://fishingwords.herokuapp.com',{
    transports: ['websocket'],
    jsonp: false
})

export const startSocket=()=>{
    socket.connect()
  
}

export default socket