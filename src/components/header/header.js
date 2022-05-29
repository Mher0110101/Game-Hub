import './header.css'
import {Link} from 'react-router-dom'

const Header = () => {
    const headerOnClick = () =>{
        document.querySelector('footer').style.display = 'block'
        document.querySelector('header').style.opacity = 1;   
    }
    return (
        <header className="header">
            <Link to='/Home' className='gameHub' onClick={headerOnClick}>Game Hub</Link> 
            <Link to='/Login' className='logo'></Link>
        </header>
    );           
}

export default Header;