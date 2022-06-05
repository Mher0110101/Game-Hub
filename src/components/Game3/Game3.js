import { useEffect, useState } from 'react';
import './Game3.css';
import SingleCard from './componentsMemory/SingleCard';

const images = [
  {"src": "./Game3Img/apple.jpg", matched: false},
  {"src": "./Game3Img/cherry.jpg", matched: false},
  {"src": "./Game3Img/grape.jpg", matched: false},
  {"src": "./Game3Img/lemon.jpg", matched: false},
  {"src": "./Game3Img/pear.jpg", matched: false},
  {"src": "./Game3Img/strawberry.jpg", matched: false},
]
function Game3() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [chooseOne, setChooseOne] = useState(null)
  const [chooseTwo, setchooseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  // mixed images layout
  const mixedCards = () => {
    const mixedCards  = [...images, ...images]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    setChooseOne(null)
    setchooseTwo(null)
    setCards(mixedCards)
    setTurns(0)
  }
  const handleChoose = (card) => {
    chooseOne ? setchooseTwo(card) : setChooseOne(card)
  }
//compare 2 selected cards
useEffect(() => {
  if (chooseOne && chooseTwo) {
    setDisabled(true)
    if(chooseOne.src === chooseTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === chooseOne.src){
            return {...card, matched: true}
          }else{
            return card
          }
        })
      })
      console.log('dfgh');
      resetTurn()
    }else{
      console.log('no');
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [chooseOne, chooseTwo])
  // reset choosen
  const resetTurn = () => {
    setChooseOne(null)
    setchooseTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }
  // start a new game automaticly
  useEffect(() => {
    mixedCards()
  }, [])
  return (
    <div className="game3">
     <h1>Memory Game</h1>
     <button onClick={mixedCards}>New Game</button>
      <div className='flexContainer'>
        {cards.map(card => (
          <SingleCard 
           key = {card.id} 
           card = {card}
           handleChoose = {handleChoose}
           flipped = {card === chooseOne || card === chooseTwo || card.matched}
           disabled = {disabled}
           />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}
export default Game3;
