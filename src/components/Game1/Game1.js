import './Game1.scss'
import React,{ useState, useRef, useEffect} from 'react';
import { useInterval } from "./useInterval.js";
import {CANVAS_SIZE,SNAKE_START, MOUSE_START, SCALE, DIRECTIONS, FOOD} from "./consts.js";

const gameOverSound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf3232f.mp3?filename=negative_beeps-6008.mp3')
const scoreSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-score-interface-217.mp3')

const Game1 = () => {
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [mouse, setMouse] = useState(MOUSE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [record, setRecord] = useState(0);
    const [food, setFood] = useState(FOOD[0])
    const level = useRef()
    const mouseImg = useRef()
    const snakeImg = useRef()

    useInterval(() => gameLoop(), speed);

    
    const endGame = () => {
      gameOverSound.play()
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
        scoreSound.play()
        let newMouse = createMouse();
        while (checkCollision(newMouse, newSnake)) {
          newMouse = createMouse();
        }        
        setFood(mouseImg.current.src = FOOD[Math.floor(Math.random() * FOOD.length)])
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
        if(score > record){
            setRecord(score)
        }
    };
  
    useEffect(() => {
      const context = canvasRef.current.getContext("2d");
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "green";      
      snake.forEach(([x, y]) => {
        context.drawImage( snakeImg.current, snake[0][0], snake[0][1], 1, 1)
        context.fillRect(x, y, 1, 1)
      });
      // context.fillStyle = "lightblue";      
      // context.fillRect(apple[0], apple[1], 1, 1)
      context.drawImage(mouseImg.current, mouse[0], mouse[1], 1.1,1.1)
    }, [snake, mouse, gameOver, score]);

    const enterPress= ({keyCode})=>{
      if(keyCode === 125 && gameOver === 'true'){
        startGame()
      }
    }
    let x1 = null
    let y1 = null
    const handleTouchStart = (ev)=>{
        x1 = ev.touches[0].clientX;
        y1 = ev.touches[0].clientY;
    }
    const handleTouchMove = (ev)=>{
        if(!x1 || !y1)
            return false
        let x2 = ev.touches[0].clientX;
        let y2 = ev.touches[0].clientY;
        // console.log(x1,y1)
        let xDelta = x2 - x1;
        let yDelta = y2 - y1;
        if(Math.abs(xDelta) > Math.abs(yDelta)){
            if(xDelta > 0){
                //rigth
                console.log('rigth')
                setDir(DIRECTIONS[39])
                // moveSnake(39)
            }else{
                //left
                console.log('left')
                setDir(DIRECTIONS[37])
                // moveSnake(37)
            }
        }
        else{
            if(yDelta > 0){
                //down
                console.log('down')
                setDir(DIRECTIONS[40])
                // moveSnake(40)
            }else{
                //top
                console.log('up')
                setDir(DIRECTIONS[38])
                // moveSnake(38)
            }
        }
        x1 = null;
        y1 = null;
    }
    
    return (
    <div onKeyDown={e => moveSnake(e)} id={'canvasSnake'}>
        <img ref={mouseImg} id='mouse' src={food} alt='/'/>
          <img ref={snakeImg} id='mouse' src="https://art.pixilart.com/bf702463aa6296c.png" alt='/'/>

        <div className='scoresStr'><div className='score'>Score: {score}</div>
        <div className='score'>Record: {record}</div></div>
      <canvas 
        onKeyDown={e => enterPress(e)}
        style={{ border: "3px solid rgb(195, 3, 233)" }}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div style={{color:"red",fontSize:"15px"}}>GAME OVER!</div>}
      <div className='canvasBottom'>
        <button onClick={startGame}  className='btn'>Start Game</button>
        <p >
          <select name='level' ref={level}>
            <option value='110' >medium</option>
            <option value="70">high</option>
            <option value='160'>low</option>
          </select>
        </p>
      </div>      
    </div>
    );      
};

export default (Game1);