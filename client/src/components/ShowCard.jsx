import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ShowCard.css";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import AddShowButton from './AddShowButton';

const ShowCard = ({ id, name, rating, img }) => {

  const navigate = useNavigate();
  const defaultImage =
    "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
  const defaultRating = "NA";

  const fetchFullDetails = () => {
    return axios
      .post("http://localhost:8080/api/shows/detailedSearch", { id })
      .then((response) => {
        return response.data.show;
      })
      .catch((error) => {
        console.error("Error performing search operation", error.message);
        alert(
          "An error occurred accessing this show information. Please try again."
        );
        throw error;
      });
  };

  const handleImageClick = () => {
    fetchFullDetails().then((fullDetails) => {
      navigate(`/showDetails/${name}`, { state: { fullDetails } });
    });
  };

  return (
    <div>
      <div className="card">
        <img
          src={img ? img : defaultImage}
          alt={name}
          onClick={handleImageClick}
        />
        <h3>{name}</h3>
        <div className="ratingStar">
          <p>{rating ? rating : defaultRating}</p>
          <FaStar />
        </div>
        <AddShowButton id={id} name={name} rating={rating} img={img} className="addShowButton"/>
      </div>
    </div>
  );
};

ShowCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  rating: PropTypes.number,
  img: PropTypes.string,
};

export default ShowCard;
