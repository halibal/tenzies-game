import React from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

	const [dice, setDice] = React.useState(allNewDice());
	const [tenzies, setTenzies] = React.useState(false)


	// setting condition to win the game
	React.useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const chooseRandomDice = dice[Math.ceil(Math.random() * 6)].value
		const allSameValue = dice.every(die => die.value === chooseRandomDice)
		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice])


	// creates new dice
	function allNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid(),
			})
		}
		return newDice;
	};


	// rolls the dice whenever clicked on roll button
	function rollDice() {
		if (!tenzies) {
			setDice(oldDice => oldDice.map(die => {
				return die.isHeld
					? die
					: {
						value: Math.ceil(Math.random() * 6),
						isHeld: false,
						id: nanoid(),
					};
			}))
		} else {
			setTenzies(false);
			setDice(() => {
				const newDice = []
				for (let i = 0; i < 10; i++) {
					newDice.push({
						value: Math.ceil(Math.random() * 6),
						isHeld: false,
						id: nanoid(),
					})
				}
				return newDice;
			})
		}
	};


	// holds the dice that are selected
	function holdDice(id) {
		setDice(oldDice => oldDice.map(die => {
			return die.id === id
				? { ...die, isHeld: !die.isHeld }
				: die
		}))
	}


	// rendering through all dice elements and returning Die component
	const diceElements = dice.map(die => {
		return (
			<Die
				key={die.id}
				value={die.value}
				isHeld={die.isHeld}
				holdDice={() => holdDice(die.id)}
			/>
		)
	});


	// main return section
	return (
		<main className="App">
			{tenzies && <Confetti />}
			<h1 className='title'>Tenzies</h1>
			<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
			<div className='dice-container'>
				{diceElements}
			</div>
			<button
				className='roll-dice'
				onClick={rollDice}
			>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	);
}

export default App;

// todo next: 
// 1 - put real dots on the dice
// 2 - track the number of rolls
// 3 - track the time it took to win
// 4 - save the best time to localStorage
