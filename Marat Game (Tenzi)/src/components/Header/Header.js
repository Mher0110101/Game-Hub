import './Header.css'

function Header() {
    return (
      <header className="header">
        <h1 className='headerTitle'>Tenzies</h1>
        <p className="headerDescription">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </header>
    )
}

export default Header