import { useState } from "react"
import { useSelector } from "react-redux"

export default () => {
    const roomConfig=useSelector(state=>state.roomConfig)
    const [solution,setSolution]=useState('')
    const [turn, setTurn]=useState(0)//intento
    const [currentTry, setTry]=useState('')//palabra intentada
    const [tries, setTries]=useState([...Array(Number(roomConfig.tries))])//lista de intentos en forma de array
    const [noTurn, setNoTurn]=useState(false)
    const [rigth, setRigth]=useState(false)//palabra correcta


    const restart=()=>{//reiniciar valores por ronda
        setTurn(0)
        setTries([...Array(Number(roomConfig.tries))])
        setNoTurn(false)
        setRigth(false)
    }

    const newWord=(solution)=>{//nueva palabra por ronda
        setSolution(solution.toLowerCase())
    }
    const saveTry=(wordArray)=>{//guardar intentos
        if(currentTry===solution){
            setRigth(true)
        }
        setTries((lastTry)=>{
            let newWordArray=[...lastTry]
            newWordArray[turn]=wordArray
            return newWordArray
        })
        
        setTurn((lastTurn)=>{
            return lastTurn+1
        })
        if(turn+1 == roomConfig.tries){
            setNoTurn(true)
        }
        setTry('')
      

    }    

    const wordTried=()=>{//confirmar aciertos en palabra intentada y validar

        if(turn == roomConfig.tries){
            console.log('you use all your tries')
            return
        }
        if(currentTry.length!=roomConfig.length){
            console.log('complete the f*cking word... bitch')
            return
        }
        const solutionArray=[...solution]
        const wordArray=[...currentTry].map((char)=>{//separar palabra en letras
            return {letter:char,value:'no'}
        })

        //confirmar aciertos

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

    const handleKey=(value)=>{//Confirmar y validar caracter ingresado

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

  return {handleKey,wordTried,newWord,restart,tries, turn, rigth, currentTry, noTurn}
}
