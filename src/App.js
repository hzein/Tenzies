import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [rolls, setRolls] = React.useState(0);
  const [timeInterval, setTimeInterval] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setTimer((prevTimer) => {
        clearInterval(timeInterval);
        return prevTimer;
      });
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (rolls === 0) {
      setTimeInterval(
        setInterval(() => {
          setTimer((prevTimer) => {
            return prevTimer + 1;
          });
        }, 1000)
      );
    }
    if (!tenzies) {
      setRolls((prevRolls) => prevRolls + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      if (localStorage.getItem("shortestTime")) {
        timer < localStorage.getItem("shortestTime") &&
          window.localStorage.setItem("shortestTime", timer);
      } else {
        window.localStorage.setItem("shortestTime", timer);
      }
      if (window.localStorage.getItem("numberOfRolls")) {
        rolls < window.localStorage.getItem("numberOfRolls") &&
          window.localStorage.setItem("numberOfRolls", rolls);
      } else {
        window.localStorage.setItem("numberOfRolls", rolls);
      }
      setRolls(0);
      setTimer(0);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <div className="game-info">
        <p>{`Number of Rolls: ${rolls}`}</p>
        <p>{`Timer: ${
          Math.floor(timer / 60) === 0 ? "00" : Math.floor(timer / 60)
        }:${timer <= 9 ? "0" : ""}${timer % 60}`}</p>
      </div>
      <div className="main">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
