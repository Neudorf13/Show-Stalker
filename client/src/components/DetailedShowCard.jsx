//DetailedShowCard.jsx

import './DetailedShowCard.css';
import PropTypes from "prop-types";

const DetailedShowCard = ({id, img, name, rating, summary}) => {

    //write function to add show to my shows
    const addShow = () => {
        console.log(id);
    };

  return (
    <div className="detailedShowCardContainer">

      <div className="showImage">
        <img src= {img} alt="" />
      </div>

      <div className="showInformation">
        <h1>{name}</h1>
        <h1>{rating}</h1>
        <p dangerouslySetInnerHTML={{ __html: summary }}></p>
        <button onClick={addShow}>+</button>
      </div>
    </div>
  )
}

DetailedShowCard.propTypes = {
    id: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
    summary: PropTypes.string,
}

export default DetailedShowCard
