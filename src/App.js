import Die from "./Die";
import { nanoid } from 'nanoid' 
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(setNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numAttempts, setNumAttempts] = useState(0)

  useEffect(() => {
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)
    const allFixed = dice.every(die => die.isFixed)
    if (sameValue && allFixed) {
      setTenzies(true)
    }  
  }, [dice])

  function updateFixed(id) {
    setNumAttempts(prev => prev + 1)
    setDice(prevDice => prevDice.map(die => {
     return die.id === id ?
        {...die, isFixed: !die.isFixed} : die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isFixed ? die : {
          value: Math.ceil(Math.random() * 6),
          isFixed: false,
          id: nanoid()
        }
      }))
    } else {
      setNumAttempts(0)
      setTenzies(false)
      setDice(setNewDice())
    }
  } 

  function setNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(
        {
          value: Math.ceil(Math.random() * 6),
          isFixed: false,
          id: nanoid()
        }
    )}
    return newDice
  }

  const diceElements = dice.map(die => 
                <Die value={die.value} key={die.id} id={die.id} 
                      isFixed={die.isFixed} 
                      updateFixed={() => updateFixed(die.id)}/>)

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
        <h2>Number of attempts: {numAttempts}</h2>
        <div className="dice">
          {diceElements}
        </div>

        <button onClick={rollDice}>
          {tenzies ? "Reset Game" : "Roll Dice"}
        </button>
      </main>
    </div>
  );
}

export default App;
