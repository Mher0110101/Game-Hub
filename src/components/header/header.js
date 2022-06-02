import './header.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, userSelector } from '../Redux/slices'

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const logOut = () => {
        dispatch(removeUser())
    }

    const gameHubOnClick = () =>{
        document.querySelector('footer').style.display = 'block'
        document.querySelector('header').style.opacity = 1;   
    }
    return (
        <header className="header">
            <Link to='/Home' className='gameHub' onClick={gameHubOnClick}>Game Hub</Link>            
            {user && <button className='btn' onClick={logOut}/>}
            {user && <div className='userName'>{user}</div>}
            <Link to='/Login' className='logo' onClick={gameHubOnClick}></Link>
        </header>
    );           
}

export default Header;