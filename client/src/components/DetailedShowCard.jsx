//DetailedShowCard.jsx

import "./DetailedShowCard.css";
import PropTypes from "prop-types";

const DetailedShowCard = ({ id, img, name, rating, summary, genres }) => {
  //write function to add show to my shows
  const addShow = () => {
    console.log(id);
  };

  return (
    <div className="detailedShowCardContainer">
      <div className="showImage">
        <img src={img} alt="" />
      </div>

      <div className="showInformation">
        <div className="d_name_rating">
          <h1 className="d_name">{name}</h1>
          <div className="d_rating">
            <h1>{rating}</h1>
          </div>
          <button onClick={addShow}>Add to my shows</button>
        </div>

        <p>Genres: {genres.join(", ")}</p>
        <p dangerouslySetInnerHTML={{ __html: summary }}></p>
        
      </div>
    </div>
  );
};

DetailedShowCard.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  summary: PropTypes.string,
  genres: PropTypes.array,
};

export default DetailedShowCard;
