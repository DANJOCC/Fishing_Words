import { useState } from "react"
import { useSelector } from "react-redux"

export default (solution) => {
    const roomConfig=useSelector(state=>state.roomConfig)
    const [turn, setTurn]=useState(0)//intento
    const [currentTry, setTry]=useState('')//palabra intentada
    const [tries, setTries]=useState([...Array(Number(roomConfig.tries))])//lista de intentos en forma de array
    const [historial, setHistorial]=useState([])//historial de intentos en forma string
    const [rigth, setRigth]=useState(false)//palabra correcta

    const saveTry=(wordArray)=>{
        if(currentTry===solution){
            setRigth(true)
        }
        setTries((lastTry)=>{
            let newWordArray=[...lastTry]
            newWordArray[turn]=wordArray
            return newWordArray
        })
        
        setHistorial((lastWord)=>{
            return [...lastWord, currentTry]
        })
        setTurn((lastTurn)=>{
            return lastTurn+1
        })
        setTry('')
      

    }    

    const wordTried=()=>{
        console.log(currentTry)
        if(turn > roomConfig.tries){
            console.log('you use all your tries')
            return
        }
        if(currentTry.length!=roomConfig.length){
            console.log('complete the f*cking word... bitch')
            return
        }
        const solutionArray=[...solution]
        const wordArray=[...currentTry].map((char)=>{
            return {letter:char,value:'no'}
        })

        wordArray.forEach((char,i)=>{
            if(solutionArray[i]===char.letter){
                wordArray[i].value='yes'
                solutionArray[i]=null
            }
        })
        wordArray.forEach((char,i)=>{
            if(solutionArray.includes(char.letter) && char.value!=='yes'){
                wordArray[i].value='maybe'
                solutionArray[solutionArray.indexOf(char.letter)]=null
            }
        })

        
        saveTry(wordArray)
    }

    const handleKey=(value)=>{

        if(value==='Backspace'){
            setTry((last)=>{
                return last.slice(0,-1)
            })
            return
        }
        if(/^[A-Za-z]$/.test(value) && currentTry.length<roomConfig.length){
           
            setTry((last)=>{
                return last+value.toLowerCase()
            })
           
        }
        
    }

  return {handleKey,wordTried,tries, turn, rigth, currentTry}
}
