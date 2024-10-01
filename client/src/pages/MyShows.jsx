import Header from "../components/Header";
import FavoriteShowCard from "../components/FavoriteShowCard";
import UpComingEpisodePanel from "../components/UpComingEpisodePanel";
import "./Pages.css";
import './MyShows.css';

const MyShows = () => {
  return (
    <div>
      <Header />
      <h1 className="pageTitle">My Shows</h1>
      <div className="myShowsContainer">
        <div className="favoriteShowsContainer">
          <FavoriteShowCard />
          <FavoriteShowCard />
          <FavoriteShowCard />
          <FavoriteShowCard />
          <FavoriteShowCard />
        </div>

        <div className="upComingPanel">
          <UpComingEpisodePanel />
        </div>
      </div>
    </div>
  );
};

export default MyShows;
