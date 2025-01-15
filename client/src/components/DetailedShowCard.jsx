//DetailedShowCard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./DetailedShowCard.css";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

import AddShowButton from "./AddShowButton";
import LinkCalendarButton from "./LinkCalendarButton";
import SubscribeToShowButton from "./SubscribeToShowButton";

const DetailedShowCard = ({ id, img, name, rating, summary, genres }) => {
  const [calendarLinked, setCalendarLinked] = useState(false);
  const [upComing, setUpComing] = useState([]); //list: upcoming episodes for show

  useEffect(() => {
    const linked = localStorage.getItem("calendarSubscribed") === "true";
    console.log("calendar linked: " + linked);
    setCalendarLinked(linked);
  }, []);

  useEffect(() => {
    const fetchEpisodes = async () => {
      await findUpcomingEpisodes();
    };

    fetchEpisodes();
    console.log("upcoming");
    console.log(upComing);
  }, []);

  const findUpcomingEpisodes = async () => {
    console.log("finding upcoming episodes...");

    try {
      const url = `https://api.tvmaze.com/shows/${id}/episodes`;
      const response = await axios.get(url);

      const episodes = response.data;
      console.log(episodes);

      const today = new Date();

      const upcomingEpisodes = episodes.filter((episode) => {
        const airdate = new Date(episode.airdate);
        return airdate >= today;
      });

      console.log(upcomingEpisodes);
      setUpComing(upcomingEpisodes);
    } catch (error) {
      console.error(
        "Something went wrong while searching for upcoming episodes",
        error
      );
    }
  };

  return (
    <div>
      <div className="detailedShowCardContainer">
        <div className="showImage">
          <img src={img} alt="" />
        </div>

        <div className="showInformation">
          <div className="d_name_rating">
            <h1 className="d_name">{name}</h1>
            <div className="d_rating">
              <h1>{rating}</h1>
              <FaStar />
            </div>
            <AddShowButton id={id} name={name} rating={rating} img={img} />
            {!calendarLinked ? (
              <LinkCalendarButton />
            ) : (
              <SubscribeToShowButton id={id} />
            )}
          </div>

          <p>Genres: {genres.join(", ")}</p>
          <p dangerouslySetInnerHTML={{ __html: summary }}></p>

          <h2>Upcoming Episodes</h2>
          <ul>
            {upComing.map((episode) => (
              <li key={episode.id}>
                <h3>{episode.name}</h3>
                <p>
                  Season: {episode.season}, Episode: {episode.number}
                </p>
                <p>
                  Airs on: {episode.airdate} at {episode.airtime}
                </p>
              </li>
            ))}
          </ul>
        </div>
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
