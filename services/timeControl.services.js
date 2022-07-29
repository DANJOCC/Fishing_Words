export default function formatTime(time){
    let s=Math.floor(time/1000)
    let min=Math.floor(s/60)
    s=s%60
    min=min%60

    return min.toString().padStart(2,'0')+':'+s.toString().padStart(2,'0')
    
}