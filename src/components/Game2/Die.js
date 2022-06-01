import './Die.css'

function Die(props) {
    const dieStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    return (
        <div onClick={props.holdDice} className="dieItem" style={dieStyle}>{props.value}</div>
    )
}

export default Die