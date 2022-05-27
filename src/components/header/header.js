import './header.css'
import Logo from '../Logo/logo';
import {Link} from 'react-router-dom'

const Header = () => {
    const headerOnClick = () =>{
        document.getElementById('container').style.display = 'flex'
        document.querySelector('footer').style.display = 'block'
        document.querySelector('header').style.opacity = 1;   
    }
    return (
        <header className="header">
           <Link to='../..' className='gameHub' onClick={headerOnClick}>Game Hub</Link> 
        <Logo />
        </header>
    );           
}

export default Header;