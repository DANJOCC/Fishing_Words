import io from 'socket.io-client'
const socket=io('http://192.168.1.103:3000',{
    transports: ['websocket'],
    jsonp: false
})

export const startSocket=()=>{
    socket.connect()

    socket.on('connect', () => {
        setIsConnected(true);
      });
  
      socket.on('disconnect', () => {
        setIsConnected(false);
      });

}

export default socket