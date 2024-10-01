//import { useParams, useLocation } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import DetailedShowCard from "../components/DetailedShowCard";

//navigated to by clicking on a 'ShowCard' component
const ShowDetails = () => {
  //const { showName } = useParams(); //can probably delete now...

  const location = useLocation();
  const { fullDetails } = location.state || {};

  return (
    <div>
      <Header />
      <DetailedShowCard
        id={fullDetails.id}
        img={fullDetails.img}
        name={fullDetails.name}
        rating={fullDetails.rating}
        summary={fullDetails.summary}
        genres={fullDetails.genres}
      />
    </div>
  );
};

export default ShowDetails;
