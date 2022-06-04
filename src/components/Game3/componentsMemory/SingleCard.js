import './SingleCard.css'

function SingleCard({card, handleChoose, flipped, disabled}) {
    const handleClick = () => {
        if(!disabled) {
            handleChoose(card)
        }
        
    }
    return (
     
            <div className='card' key = {card.id}>
          <div className= {flipped ? 'flipped' : ""}>
            <img 
                className='front' 
                // onClick={} 
                src = {card.src} 
                alt="card front"/>
            <img 
                className='back' 
                onClick={handleClick} 
                src='images/frontBackground.jpeg' 
                alt='card back'/>
          </div>
        </div>
       
    )
}
export default SingleCard;