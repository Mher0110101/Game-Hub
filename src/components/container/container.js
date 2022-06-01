import './container.css'
import {Link} from 'react-router-dom'

const Container = () => {

    const onClickHandler = (e) => {
        document.querySelector('footer').style.display = 'none'
        document.querySelector('header').style.opacity = 0.5;   
                   
        }
     
        return ( 
            <div id='container'>
                <Link to={'/game1'} className={'gameSnake'} onClick={onClickHandler}></Link>
                <Link to={'/game2'} className={'Game2Container'} onClick={onClickHandler}>Game2</Link>
                <Link to={'/game2'} className={'gameContainer'} onClick={onClickHandler}>Game3</Link>
                <Link to={'/game2'} className={'gameContainer'} onClick={onClickHandler}>Game4</Link>
            </div>                
        );            
             
}
export default Container