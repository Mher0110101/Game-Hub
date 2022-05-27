import './Game1.css'
import { useState, useRef, useEffect } from 'react';
import { useInterval } from "./useInterval.js";
import {CANVAS_SIZE,SNAKE_START, APPLE_START, SCALE,SPEED, DIRECTIONS} from "./consts.js";
import './mouse.png'

const Game1 = () => {
    const img = './mouse.png'
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
  
    useInterval(() => gameLoop(), speed);
  
    const endGame = () => {
      setSpeed(null);
      setGameOver(true);
    };
  
    const moveSnake = ({ keyCode }) =>
      keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  
    const createApple = () =>
      apple.map((a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));
  
    const checkCollision = (piece, snk = snake) => {
      if (
        piece[0] * SCALE >= CANVAS_SIZE[0] ||
        piece[0] < 0 ||
        piece[1] * SCALE >= CANVAS_SIZE[1] ||
        piece[1] < 0
      )
        return true;
  
      for (const segment of snk) {
        if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
      }
      return false;
    };
  
    const checkAppleCollision = newSnake => {
      if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
        let newApple = createApple();
        while (checkCollision(newApple, newSnake)) {
          newApple = createApple();
        }
        setScore(score + 1);
        setApple(newApple);
        return true;
      }
      return false;
    };
  
    const gameLoop = () => {
      const snakeCopy = JSON.parse(JSON.stringify(snake));
      const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
      snakeCopy.unshift(newSnakeHead);
      if (checkCollision(newSnakeHead)) endGame();
      if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
      setSnake(snakeCopy);
    };
  
    const startGame = () => {
      setSnake(SNAKE_START);
      setApple(APPLE_START);
      setDir([0, -1]);
      setSpeed(SPEED);
      setGameOver(false);
      setScore(0);
    };
  
    useEffect(() => {
      const context = canvasRef.current.getContext("2d");
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "blueviolet";
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
      context.fillStyle = "lightblue";
      //context.drawImage(img, 0, 0)
      context.fillRect(apple[0], apple[1], 1, 1);
    }, [snake, apple, gameOver, score]);

    return (
        <div role="button" tabIndex="0" onKeyDown={e => moveSnake(e)} id={'canvasSnake'}>
        <div className='score'>Score: {score}</div>
      <canvas
        style={{ border: "5px solid rgb(195, 3, 233)" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div>GAME OVER!</div>}
      <div className='canvasBottom'>
        <button onClick={startGame} className='btn'>Start Game</button>
        <select name='level' value={'level'}>
          <option value="high">high</option>
          <option value={'medium'}>medium</option>
          <option value={'low'}>low</option>
        </select>
        
      </div>
      
    </div>
    );
      
};

export default Game1;