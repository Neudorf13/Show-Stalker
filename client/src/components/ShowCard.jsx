import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ShowCard.css";
import PropTypes from "prop-types";
//import StarIcon from '@mui/icons-material/Star';
//import star from '../assets/star.png';
//const starImage = "https://static.tvmaze.com/images/star.png";

const ShowCard = ({ id, name, rating, img }) => {
  const navigate = useNavigate();
  const defaultImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
  const defaultRating = "NA";

  const fetchFullDetails = () => {

    return axios.post('http://localhost:8080/api/detailedSearch', {id})
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error performing search operation', error.message);
      alert('An error occurred accessing this show information. Please try again.');
      throw error;
    })
  };

  //navigate(`/showDetails/${name}`, {state: {name: name, rating: rating, img: img}});
  const handleImageClick = () => {

    fetchFullDetails()
    .then(fullDetails => {
      navigate(`/showDetails/${name}`, { state: { fullDetails } });
    })
  
  };

  return (
    <div>
      <div className="card">
        <img src={img ? img : defaultImage} alt={name} onClick={handleImageClick}/>
        <p>{name}</p>
        <p>{rating ? rating : defaultRating}</p>
      </div>
    </div>
  );
};

ShowCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  rating: PropTypes.number,
  img: PropTypes.string,
}

export default ShowCard;
