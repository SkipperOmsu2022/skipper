import './starsRating.scss'

const StarsRating = ({rating, summary}) => {
    let filledStars = null, hollowStars = null;
    const roundedRating = Math.round(+rating)
        
    filledStars = Array.from({length: roundedRating}, (_, i) => <div className="star-icon filled" key={i}/>);
    hollowStars = Array.from({length: 5 - roundedRating}, (_, i) => <div className="star-icon" key={i}/>);

    return (
        <div className="stars-rating">
            {filledStars}
            {hollowStars}
            {summary ? <span className="grade" >{rating?.toFixed(1) || '–'}</span> : null}
        </div>
    )
}

const StarsRatingInput = ({rating, setRating, error}) => {
    let filledStars = null, hollowStars = null;

    const roundedRating = Math.round(+rating)
        
    filledStars = Array.from({length: roundedRating}, (_, i) => 
        <div 
            className="star-icon filled"
            key={i}
            onClick={() => setRating(i)}
        />).reverse();

    hollowStars = Array.from({length: 5 - roundedRating}, (_, i) => 
        <div 
            className="star-icon"
            key={4 - i}
            onClick={() => setRating(4 - i)}
        />);
    
    return (
        <div className={`stars-rating rating-input ${error ? "choose-rating" : ""}`}>
            {hollowStars}
            {filledStars}
        </div>
    )
}

export default StarsRating;
export { StarsRatingInput }