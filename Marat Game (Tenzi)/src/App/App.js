import './App.css'
import Die from '../components/Die/Die'
import Header from '../components/Header/Header'
import {useState,useEffect} from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = useState(newDice())
  const [tenzies, setTenzies] = useState(false)
    
  useEffect(()=>{
    const allHeld = dice.every(die=>die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die=>die.value === firstValue)
    if(allHeld && allSameValue) { 
      setTenzies(true) 
    }
  },[dice])

  function newDieGenerator() {
    return {
        value:Math.ceil(Math.random() * 6),
        isHeld:false,
        id: nanoid()
      }
  }

  function newDice() {
    const newDiceArr = []
    for (let i = 0; i < 10; i++) {
        newDiceArr.push(newDieGenerator())
    }
    return newDiceArr
  }
  
  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die=>{
        return die.isHeld ? die : newDieGenerator()
      }))
    } else {
      setTenzies(false)
      setDice(newDice())
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die=>{
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} holdDice={()=>holdDice(die.id)} isHeld={die.isHeld}/>)

  return (
    <div className="app">
      <div className="container">
        {tenzies && <Confetti />}
        <Header/>
        <div className="dieBlock">
          {diceElements}
        </div>
        <button onClick={rollDice} className='dieRollBtn'>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </div>
  );
}

export default App;
