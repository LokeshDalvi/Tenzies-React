import "./App.css";
import Die from "./components/Die";
import { useEffect, useState,useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const generateAllNewDice = () => {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  };

  const [dice, setDice] = new useState(() => generateAllNewDice());

  let gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const rollDice = () => {
    if (gameWon) {
      setDice(generateAllNewDice());
    }
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  };

  const hold = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  const diceNumbers = dice.map((die) => (
    <Die
      hold={() => hold(die.id)}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
    />
  ));
  const confetti = useRef(null)

  useEffect(() => {
    if (gameWon) {
      confetti.current.focus()
    }
  }, [gameWon]);

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && "Congratulations! You won! Press New Game to play again."}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceNumbers}</div>
      <button ref={confetti} onClick={rollDice} className="roll-dice">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
