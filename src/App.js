import Die from "./Die";
import { nanoid } from 'nanoid' 
import { useState } from "react";

function App() {
  const [dice, setDice] = useState(setNewDice())

  function updateFixed(id) {
    console.log(id)
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
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same.</p>
        <p>Click each die to freeze it at its current value between rolls</p>

        <div className="dice">
          {diceElements}
        </div>

        <button onClick={setNewDice}>Roll Dice</button>
      </main>
    </div>
  );
}

export default App;
