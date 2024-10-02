//import { useContext } from 'react';
import ShowCard from "../components/ShowCard"
import Header from "../components/Header";
import { data } from "../data/TestData";
import './Home.css'
import './Pages.css';

//import { AuthContext } from '../AuthContext';

const Home = () => {

  //const { userID, savedShows } = useContext(AuthContext);

  return (
    <div className="container">
        <Header/>
      <h1 className="pageTitle">Popular</h1>
      <div className="cards">
        {data.map((show, index) => (
          <ShowCard
            key={index}
            id={show.id}
            name={show.name}
            rating={show.rating}
            img={show.img}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
