import './container.css'
import GameContainer from './gameContainer/gameContainer'
const Container = () => {
    return <div className="Container">
        <GameContainer name={'Game1'} />
        <GameContainer name={'Game2'}/>
        <GameContainer name={'Game3'}/>
        <GameContainer name={'Game4'}/>
    </div>
}

export default Container