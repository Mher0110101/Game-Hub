import './Game1.css'
import { useState, useRef, useEffect, memo } from 'react';
import { useInterval } from "./useInterval.js";
import {CANVAS_SIZE,SNAKE_START, MOUSE_START, SCALE, DIRECTIONS} from "./consts.js";


const Game1 = () => {

    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [mouse, setMouse] = useState(MOUSE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const level = useRef()
    const mouseImg = useRef()
    useInterval(() => gameLoop(), speed);
  
    const endGame = () => {
      setSpeed(null);
      setGameOver(true);
    };
  
    const moveSnake = ({ keyCode }) =>
      keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  
    const createMouse = () =>
      mouse.map((a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));
  
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
  
    const checkMouseCollision = newSnake => {
      if (newSnake[0][0] === mouse[0] && newSnake[0][1] === mouse[1]) {
        let newMouse = createMouse();
        while (checkCollision(newMouse, newSnake)) {
          newMouse = createMouse();
        }
        setScore(score + 1);
        setMouse(newMouse);
        return true;
      }
      return false;
    };
  
    const gameLoop = () => {
      const snakeCopy = JSON.parse(JSON.stringify(snake));
      const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
      snakeCopy.unshift(newSnakeHead);
      if (checkCollision(newSnakeHead)) endGame();
      if (!checkMouseCollision(snakeCopy)) snakeCopy.pop();
      setSnake(snakeCopy);
    };
  
    const startGame = () => {
      setSnake(SNAKE_START);
      setMouse(MOUSE_START);
      setDir([0, -1]);
      setSpeed(level.current.value);
      setGameOver(false);
      setScore(0);
    };
  
    useEffect(() => {
      const context = canvasRef.current.getContext("2d");
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "blueviolet";
      snake.forEach(([x, y]) => {
        context.fillRect(x, y, 1, 1)
      });
      // context.fillStyle = "lightblue";      
      // context.fillRect(apple[0], apple[1], 1, 1)
      context.drawImage(mouseImg.current, mouse[0], mouse[1], 1.1,1.1)
      mouseImg.current.style.display = 'flax';;
    }, [snake, mouse, gameOver, score]);


    
    return (
      
        <div role="button" tabIndex="0" onKeyDown={e => moveSnake(e)} id={'canvasSnake'}>
        <img ref={mouseImg} id='mouse' src="https://cdn3.iconfinder.com/data/icons/animal-emoji/50/Mouse-128.png" />
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
        <p >
          <select name='level' ref={level}>
            <option value="70">high</option>
            <option value='110' selected='selected'>medium</option>
            <option value='160'>low</option>
          </select>
        </p>
      </div>
      
    </div>
    );
      
};

export default (Game1);