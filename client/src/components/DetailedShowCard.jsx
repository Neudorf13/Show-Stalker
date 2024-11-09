//DetailedShowCard.jsx
import {useState, useEffect} from 'react';
import "./DetailedShowCard.css";
import PropTypes from "prop-types";

const DetailedShowCard = ({ id, img, name, rating, summary, genres }) => {

  const [calendarLinked, setCalendarLinked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
      const linked = localStorage.getItem('calendarSubscribed') === "true";
      console.log("calendar linked: " + linked);
      setCalendarLinked(linked);
  }, []);

  //write function to add show to my shows
  const addShow = () => {
    console.log("adding show with id: " + id);
  };

  // const removeShow = () => {
  //   console.log("removing show with id: " + id);
  // };

  const subscribeToShow = () => {
    console.log("subscribing to show.");
    setSubscribed(true);
  };

  const unsubscribeToShow = () => {
    console.log("unsubscribing to show.");
    setSubscribed(false);
  };

  const linkCalendar = () => {
    console.log("linking calendar...");
  };

  let buttonLabel;
  let buttonAction;

  if (!calendarLinked) {
    buttonLabel = "Link Google Calendar";
    buttonAction = linkCalendar;
  } else if (subscribed) {
    buttonLabel = "Unsubscribe";
    buttonAction = unsubscribeToShow;
  } else {
    buttonLabel = "Subscribe";
    buttonAction = subscribeToShow;
  }

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
          <button onClick={buttonAction}>{buttonLabel}</button>
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
