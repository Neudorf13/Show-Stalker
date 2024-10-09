//import { useContext } from 'react';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import ShowCard from '../components/ShowCard';
import "./Pages.css";
//import './MyShows.css';
import './Home.css';
//import { AuthContext } from '../AuthContext';

const MyShows = () => {

  //const { savedShows } = useContext(AuthContext);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const localStorageShows = localStorage.getItem('savedShows');

    if(localStorageShows) {
      try {
        const parsedShows = JSON.parse(localStorageShows);
        setShows(parsedShows || []);
      }
      catch(error) {
        console.error('Error parsing saved shows from localStorage:', error);
        setShows([]);
      }
    }
  }, []);

  return (
    <div className='container'>
      <Header />
      <h1 className="pageTitle">My Shows</h1>
      <div className="cards">
      {shows.length > 0 ? (
            shows.map((show) => (
              <ShowCard
                key={show.showID}
                id={show.showID}
                name={show.showName}
                rating={show.showRating}
                img={show.showImage}
              />
            ))
          ) : (
            <p>No saved shows yet.</p>
          )}
        {/* <div className="favoriteShowsContainer">
          <FavoriteShowCard />
          <FavoriteShowCard />
          <FavoriteShowCard />
          <FavoriteShowCard />
          <FavoriteShowCard />
        </div>

        <div className="upComingPanel">
          <UpComingEpisodePanel />
        </div> */}

      </div>
    </div>
  );
};

export default MyShows;
