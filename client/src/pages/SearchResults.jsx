import { useLocation } from 'react-router-dom';
import Header from "../components/Header";
import ShowCard from '../components/ShowCard';
import '../components/ShowCard.css';
import './Home.css';



const SearchResults = () => {
    const location = useLocation();

    //searchResults data comes from SearchBar component
    const searchResults = location.state?.searchResults || [];

    let content;

  if (searchResults.length > 0) {
    content = (
      <div className='cards'>
        {searchResults.map((show, index) => (
          <ShowCard
            key={index}
            id={show.id}
            name={show.name}
            rating={show.rating}
            img={show.img}
          />
        ))}
      </div>
    );
  } else {
    content = <p>No results found.</p>;
  }

  return (
    <div className='container'>
        <Header></Header>
      <h1>Search Results:</h1>
      {content}
    </div>
  )
}

export default SearchResults
